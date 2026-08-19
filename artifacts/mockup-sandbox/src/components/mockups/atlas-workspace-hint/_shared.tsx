import React from "react";

export const BORDER = "#dbdad6";
export const T1 = "#212223";
export const T2 = "#6f7171";
export const T3 = "#8f918f";
export const ACTION = "#4a5ff7";

export function UpRight({ size = 12, color = ACTION }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function ExpandGlyph({ size = 13, color = ACTION }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

/** Composer mock: the Atlas panel input box the hint sits above */
export function Composer() {
  return (
    <div style={{ width: "100%", border: `1px solid ${BORDER}`, borderRadius: 16, padding: 8, background: "#fff" }}>
      <div style={{ padding: 8, fontSize: 13, color: T2 }}>Ask me anything...</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 32 }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: T2, fontSize: 18, lineHeight: 1 }}>+</div>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: ACTION, opacity: 0.64, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5m-6 6 6-6 6 6" /></svg>
        </div>
      </div>
    </div>
  );
}

/** Stage: panel-width column on the app background, hint slot above composer */
export function Stage({ children, note }: { children: React.ReactNode; note: string }) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center" style={{ background: "#f5f4f1", gap: 20 }}>
      <div style={{ width: 330, display: "flex", flexDirection: "column", gap: 6 }}>
        {children}
        <Composer />
      </div>
      <div style={{ fontSize: 11.5, color: T2, maxWidth: 380, textAlign: "center", lineHeight: 1.5 }}>{note}</div>
    </div>
  );
}
