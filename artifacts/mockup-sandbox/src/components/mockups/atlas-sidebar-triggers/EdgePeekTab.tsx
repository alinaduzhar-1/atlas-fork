import React from "react";
import { TopNav, HomeBody, Callout, BG, INDIGO, T2 } from "../atlas-fullscreen-entry/_shared";

/** Hypothesis: the sidebar is always "peeking" — a slim vertical tab hugs the
 * right edge; clicking (or dragging) slides the panel out. */
export function EdgePeekTab() {
  return (
    <div className="h-screen w-full flex flex-col relative" style={{ background: BG }}>
      <TopNav />
      <HomeBody />
      {/* Edge tab */}
      <div
        style={{
          position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
          background: "#fff", border: "1px solid #dbdad6", borderRight: "none",
          borderRadius: "12px 0 0 12px", padding: "14px 8px 14px 10px",
          boxShadow: "-4px 4px 16px rgba(26,29,35,0.08)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}
      >
        <svg width="20" height="17" viewBox="0 0 20 17" fill="none">
          <path d="M5.2 0.8h9.6l4.6 7.7-4.6 7.7H5.2L0.6 8.5 5.2 0.8z" stroke={INDIGO} strokeWidth="1.6" fill="none" />
        </svg>
        <span style={{ writingMode: "vertical-rl", fontSize: 11.5, fontWeight: 600, color: T2, letterSpacing: "0.8px" }}>ATLAS</span>
        <div style={{ width: 6, height: 6, borderRadius: 3, background: "#e14b4b" }} title="unread" />
      </div>
      <Callout>Slim right-edge tab, always peeking — click or drag to slide the sidebar open</Callout>
    </div>
  );
}
