import { useEffect, useRef, useCallback } from "react";
import { VERTEX_SHADER, FRAGMENT_SHADER, type ShaderParams } from "./butterfly/shaders";

const WAVE_PARAMS: ShaderParams = {
  intensity: 0.65,
  symmetry: 1.0,
  noiseScale: 1.6,
  noiseSpeed: 45,
  animate: true,
  grainAmount: 0.15,
  flowAngle: 90,
  curveDistortion: 0.5,
  depthIntensity: 0.45,
  highlightStrength: 0.35,
  foldScale: 0.5,
  colorCount: 4,
  colors: [
    [0.85, 0.93, 0.25],
    [0.78, 0.83, 0.63],
    [0.94, 0.93, 0.88],
    [0.63, 0.66, 0.38],
  ],
};

const TOTAL_DURATION = 3000;

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

interface AtlasShaderWaveProps {
  onComplete: () => void;
}

export default function AtlasShaderWave({ onComplete }: AtlasShaderWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { antialias: true, preserveDrawingBuffer: false, alpha: true });
    if (!gl) {
      onCompleteRef.current();
      return;
    }

    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, VERTEX_SHADER);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      onCompleteRef.current();
      return;
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, FRAGMENT_SHADER);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      onCompleteRef.current();
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      onCompleteRef.current();
      return;
    }

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const locs: Record<string, WebGLUniformLocation | null> = {};
    const uniformNames = [
      "u_resolution", "u_time", "u_intensity", "u_symmetry",
      "u_noiseScale", "u_noiseSpeed", "u_grainAmount",
      "u_flowAngle", "u_curveDistortion", "u_depthIntensity",
      "u_highlightStrength", "u_foldScale", "u_colorCount",
    ];
    uniformNames.forEach(name => {
      locs[name] = gl.getUniformLocation(program, name);
    });
    for (let i = 0; i < 8; i++) {
      locs[`u_colors_${i}`] = gl.getUniformLocation(program, `u_colors[${i}]`);
    }

    gl.useProgram(program);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    startTimeRef.current = performance.now();

    const render = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const progress = Math.min(elapsed / TOTAL_DURATION, 1);

      if (progress >= 1) {
        cancelAnimationFrame(animFrameRef.current);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteProgram(program);
        gl.deleteBuffer(posBuffer);
        onCompleteRef.current();
        return;
      }

      const time = elapsed / 1000 * (WAVE_PARAMS.noiseSpeed / 100);
      const p = WAVE_PARAMS;

      let opacity: number;
      if (progress < 0.3) {
        opacity = easeInOutSine(progress / 0.3) * 0.7;
      } else if (progress < 0.55) {
        opacity = 0.7;
      } else {
        opacity = 0.7 * (1 - easeInOutSine((progress - 0.55) / 0.45));
      }

      canvas.style.opacity = String(opacity);

      const rise = easeInOutSine(Math.min(progress / 0.5, 1));
      const settle = progress > 0.5 ? easeInOutSine((progress - 0.5) / 0.5) : 0;
      const yOffset = 60 * (1 - rise) + 15 * settle;
      canvas.style.transform = `translateY(${yOffset}px)`;

      gl.uniform2f(locs.u_resolution, canvas.width, canvas.height);
      gl.uniform1f(locs.u_time, time);
      gl.uniform1f(locs.u_intensity, p.intensity);
      gl.uniform1f(locs.u_symmetry, p.symmetry);
      gl.uniform1f(locs.u_noiseScale, p.noiseScale);
      gl.uniform1f(locs.u_noiseSpeed, p.noiseSpeed);
      gl.uniform1f(locs.u_grainAmount, p.grainAmount);
      gl.uniform1f(locs.u_flowAngle, p.flowAngle);
      gl.uniform1f(locs.u_curveDistortion, p.curveDistortion);
      gl.uniform1f(locs.u_depthIntensity, p.depthIntensity);
      gl.uniform1f(locs.u_highlightStrength, p.highlightStrength);
      gl.uniform1f(locs.u_foldScale, p.foldScale);
      gl.uniform1i(locs.u_colorCount, p.colorCount);
      for (let i = 0; i < 8; i++) {
        const color = p.colors[i] || p.colors[p.colors.length - 1];
        gl.uniform3fv(locs[`u_colors_${i}`], color);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
      gl.deleteBuffer(posBuffer);
    };
  }, []);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 20,
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          willChange: "opacity, transform",
          maskImage: "radial-gradient(ellipse 140% 70% at 50% 90%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 65%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 140% 70% at 50% 90%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 65%, transparent 85%)",
        }}
      />
    </div>
  );
}
