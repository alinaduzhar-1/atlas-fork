import React from "react";

export const BORDER = "#dbdad6";
export const T1 = "#1a1a19";
export const T2 = "#6f7171";
export const ACTION = "#4a5ff7";
export const TINT = "#eef2ff";
export const TINT_BORDER = "#dfe5fd";

export function UpRight({ size = 13, color = ACTION }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

/** Small "external tab" glyph: window with an arrow leaving it */
export function TabGlyph({ size = 13, color = ACTION }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6M10 14 21 3" />
    </svg>
  );
}

/** Two-row stage: OFF state on top, ON state below, with row labels */
export function Stage({ off, on, note }: { off: React.ReactNode; on: React.ReactNode; note: string }) {
  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ width: 34, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.8px", color: "#8f918f", textTransform: "uppercase", textAlign: "right" }}>{label}</span>
      <div className="flex items-center justify-end rounded-xl" style={{ width: 340, height: 56, background: "#fff", border: `0.5px solid ${BORDER}`, padding: "0 14px", gap: 6, boxShadow: "0px 1px 4px rgba(0,0,0,0.06)" }}>
        {children}
        <div className="flex items-center justify-center rounded-full" style={{ width: 28, height: 28, background: "#4f46e5", color: "#fff", fontSize: 10, fontWeight: 600 }}>SM</div>
      </div>
    </div>
  );
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center" style={{ background: "#faf9f6", gap: 18 }}>
      <Row label="Off">{off}</Row>
      <Row label="On">{on}</Row>
      <div style={{ fontSize: 11.5, color: T2, maxWidth: 420, textAlign: "center", lineHeight: 1.5 }}>{note}</div>
    </div>
  );
}
