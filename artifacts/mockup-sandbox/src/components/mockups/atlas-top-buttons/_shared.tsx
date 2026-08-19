import React from "react";

// Exact values from client/src/components/navigation.tsx top-right controls
export const BORDER = "#dbdad6";
export const T1 = "#212223";
export const T2 = "#6f7171";
export const INDIGO = "#4a5ff7";
export const SHADOW = "0px 1px 4px 0px rgba(0,0,0,0.06)";

export function AtlasGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="6" fill={INDIGO} />
      <path d="M7 16 L10 8 L12.5 13.5 L15 8 L18 16" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function UpRight({ size = 13, color = T2 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function Chevron({ size = 12, color = T2 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Stage: renders the control on the app's header background with a label */
export function Stage({ children, note }: { children: React.ReactNode; note: string }) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center" style={{ background: "#f5f4f1", gap: 18 }}>
      <div className="flex items-center" style={{ gap: 4 }}>{children}</div>
      <div style={{ fontSize: 11.5, color: T2, maxWidth: 380, textAlign: "center", lineHeight: 1.5 }}>{note}</div>
    </div>
  );
}

export const segBtn: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 4, padding: "0 12px",
  fontSize: 13, fontWeight: 500, color: T1, height: "100%", background: "transparent",
};

export function Group({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-stretch overflow-hidden" style={{ height: 32, borderRadius: 8, background: "#fff", border: `0.5px solid ${BORDER}`, boxShadow: SHADOW }}>
      {children}
    </div>
  );
}

export function Divider() {
  return <div style={{ width: 0.5, background: BORDER }} />;
}
