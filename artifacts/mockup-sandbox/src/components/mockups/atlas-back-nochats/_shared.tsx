import React from "react";

export const T1 = "#212223";
export const T2 = "#6f7171";
export const BORDER = "#dbdad6";
export const INDIGO = "#4a5ff7";

export function Lockup() {
  return (
    <div className="flex items-center" style={{ gap: 8 }}>
      <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.3px", color: T1 }}>Atlas</span>
      <Hexagon />
      <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.3px", color: T2 }}>AI Guide</span>
    </div>
  );
}

export function Hexagon() {
  return (
    <svg width="20" height="17" viewBox="0 0 20 17" fill="none">
      <path d="M5.2 0.8h9.6l4.6 7.7-4.6 7.7H5.2L0.6 8.5 5.2 0.8z" stroke={INDIGO} strokeWidth="1.6" fill="none" />
    </svg>
  );
}

export function BackButton({ style }: { style?: React.CSSProperties }) {
  return (
    <button
      className="flex items-center transition-colors"
      style={{ gap: 6, color: T2, fontSize: 13, fontWeight: 500, letterSpacing: "0.2px", ...style }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back to Multiverse
    </button>
  );
}

/** Centered welcome body of the no-chats full screen view */
export function WelcomeBody({ topSlot }: { topSlot?: React.ReactNode }) {
  return (
    <div className="flex-1 flex items-center justify-center px-5">
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 560 }}>
        {topSlot}
        {/* Atlas icon */}
        <div
          className="flex items-center justify-center"
          style={{ width: 44, height: 42, borderRadius: 12, background: "#fff", boxShadow: "0px 4px 8px rgba(26,29,35,0.08), 0px 0px 1px rgba(144,146,145,0.56)", transform: "rotate(-3.88deg)", marginBottom: 16 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="2.4" strokeLinecap="round">
            <path d="M4 18 L8 6 L12 15 L16 6 L20 18" />
          </svg>
        </div>
        <p style={{ fontSize: 18, fontWeight: 500, color: T1, letterSpacing: "0.36px", textAlign: "center", marginBottom: 24 }}>
          Hey Sarah, I can help you navigate your apprenticeship
        </p>
        {/* Suggestion chips */}
        <div className="flex flex-wrap justify-center" style={{ gap: 8, marginBottom: 28 }}>
          {["What should I focus on next?", "Log my OTJ hours", "Help with my project", "Explain a KSB"].map(label => (
            <span key={label} className="rounded-full" style={{ border: `1px solid ${BORDER}`, padding: "7px 14px", fontSize: 13, color: T1, background: "#fff" }}>
              {label}
            </span>
          ))}
        </div>
        {/* Input */}
        <div className="w-full rounded-xl" style={{ border: `1px solid ${BORDER}`, background: "#fff", padding: "12px 14px" }}>
          <div style={{ fontSize: 14, color: "#9b9d9d" }}>Ask me anything...</div>
          <div className="flex items-center justify-between" style={{ marginTop: 16 }}>
            <span style={{ color: T2, fontSize: 18 }}>+</span>
            <div className="flex items-center justify-center rounded-lg" style={{ width: 30, height: 30, background: "#aab4fa" }}>
              <span style={{ color: "#fff", fontSize: 15 }}>↑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Shell({ header, children, footer }: { header: React.ReactNode; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="h-screen w-full flex flex-col" style={{ background: "#f5f4f1" }}>
      <header className="flex items-center justify-between" style={{ padding: 16 }}>
        {header}
        <div className="flex items-center" style={{ gap: 8 }}>
          <div className="rounded-full flex items-center justify-center" style={{ width: 32, height: 32, background: "#e8e6f8", color: INDIGO, fontSize: 12, fontWeight: 700 }}>SM</div>
        </div>
      </header>
      {children}
      {footer}
      <div style={{ textAlign: "center", padding: "0 0 14px 0", fontSize: 11.5, color: "#9b9d9d" }}>
        Atlas is powered by <span style={{ textDecoration: "underline" }}>Multiverse</span>
      </div>
    </div>
  );
}
