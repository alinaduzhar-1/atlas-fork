import React from "react";
import { TopNav, HomeBody, Callout, BG, INDIGO } from "../atlas-fullscreen-entry/_shared";

/** Hypothesis: the classic assistant pattern — a floating Atlas bubble
 * anchored bottom-right, visible on every page, opens the sidebar. */
export function FloatingBubble() {
  return (
    <div className="h-screen w-full flex flex-col relative" style={{ background: BG }}>
      <TopNav />
      <HomeBody />
      {/* Floating bubble */}
      <div style={{ position: "absolute", right: 24, bottom: 24, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
        <div className="rounded-xl" style={{ background: "#fff", border: "1px solid #dbdad6", boxShadow: "0 8px 24px rgba(26,29,35,0.12)", padding: "10px 14px", fontSize: 13, color: "#212223", maxWidth: 260 }}>
          Your project deadline is in 8 days — want help planning the week?
        </div>
        <button
          className="rounded-full flex items-center justify-center"
          style={{ width: 54, height: 54, background: INDIGO, boxShadow: "0 8px 20px rgba(74,95,247,0.4)" }}
        >
          <svg width="24" height="21" viewBox="0 0 20 17" fill="none">
            <path d="M5.2 0.8h9.6l4.6 7.7-4.6 7.7H5.2L0.6 8.5 5.2 0.8z" stroke="#fff" strokeWidth="1.8" fill="none" />
          </svg>
        </button>
      </div>
      <Callout>Floating Atlas bubble (bottom-right) with a proactive nudge — tap to open the sidebar</Callout>
    </div>
  );
}
