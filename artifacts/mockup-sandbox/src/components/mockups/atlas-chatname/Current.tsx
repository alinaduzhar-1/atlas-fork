import { useEffect, useRef, useState } from "react";
import { PanelShell, MoreButton, PinGlyph, chats, useHover, TEXT_PRIMARY, TEXT_SECONDARY, HOVER_BG } from "./_shared";
import "./_group.css";

function MarqueeTitle({ text, active }: { text: string; active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    if (active && containerRef.current && textRef.current) {
      const overflow = textRef.current.scrollWidth - containerRef.current.clientWidth;
      setShift(overflow > 0 ? overflow : 0);
    } else {
      setShift(0);
    }
  }, [active, text]);

  const animate = active && shift > 0;

  return (
    <div ref={containerRef} className="flex-1 min-w-0 overflow-hidden">
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: TEXT_PRIMARY,
          letterSpacing: "0.28px",
          display: "inline-block",
          whiteSpace: "nowrap",
          maxWidth: animate ? "none" : "100%",
          overflow: animate ? "visible" : "hidden",
          textOverflow: animate ? "clip" : "ellipsis",
          verticalAlign: "bottom",
          ...(animate
            ? {
                animation: `atlas-title-marquee ${Math.max(3, shift / 25)}s linear infinite`,
                ["--marquee-shift" as string]: `-${shift}px`,
              }
            : {}),
        }}
        ref={textRef}
      >
        {text}
      </span>
    </div>
  );
}

export function Current() {
  const { hovered, setHovered } = useHover();
  return (
    <PanelShell>
      <div className="flex flex-col">
        {chats.map((chat) => {
          const isHovered = hovered === chat.id;
          return (
            <div
              key={chat.id}
              className="relative flex items-center rounded-lg cursor-pointer w-full"
              style={{ padding: "12px 8px", gap: 8, background: isHovered ? HOVER_BG : "#fff" }}
              onMouseEnter={() => setHovered(chat.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex flex-col flex-1 min-w-0" style={{ gap: 4 }}>
                <div className="flex items-center" style={{ gap: 8 }}>
                  <MarqueeTitle text={chat.name} active={isHovered} />
                  {chat.pinned && <PinGlyph />}
                  <div style={{ position: "absolute", right: 8, top: 12 }}>
                    <MoreButton visible={isHovered} />
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: TEXT_SECONDARY,
                    letterSpacing: "0.24px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {chat.preview}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </PanelShell>
  );
}
