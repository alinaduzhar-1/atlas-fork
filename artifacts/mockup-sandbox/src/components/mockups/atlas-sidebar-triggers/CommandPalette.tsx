import React from "react";
import { TopNav, HomeBody, Callout, BG, T1, T2, BORDER, INDIGO, Hexagon } from "../atlas-fullscreen-entry/_shared";

/** Hypothesis: keyboard-first — a Cmd+K palette where "Ask Atlas" is the top
 * action; typing a question opens the sidebar with it submitted. */
export function CommandPalette() {
  return (
    <div className="h-screen w-full flex flex-col relative" style={{ background: BG }}>
      <TopNav />
      <div style={{ filter: "blur(1px)", opacity: 0.55, pointerEvents: "none", display: "flex", flexDirection: "column", flex: 1 }}>
        <HomeBody />
      </div>
      {/* Overlay palette */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(26,29,35,0.25)", display: "flex", justifyContent: "center", paddingTop: 120 }}>
        <div className="rounded-2xl" style={{ width: 560, height: "fit-content", background: "#fff", boxShadow: "0 24px 64px rgba(26,29,35,0.25)", overflow: "hidden" }}>
          <div className="flex items-center" style={{ gap: 10, padding: "14px 16px", borderBottom: `1px solid ${BORDER}` }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T2} strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            <span style={{ fontSize: 14, color: T1 }}>when is my project deadline?</span>
            <span style={{ marginLeft: "auto", fontSize: 11, color: T2, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "1px 5px" }}>⌘K</span>
          </div>
          <div style={{ padding: 8 }}>
            <div className="flex items-center rounded-lg" style={{ gap: 10, padding: "10px 10px", background: "#eef0fe" }}>
              <Hexagon size={16} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T1 }}>Ask Atlas: "when is my project deadline?"</div>
                <div style={{ fontSize: 11.5, color: T2 }}>Opens the Atlas sidebar with your question</div>
              </div>
              <span style={{ marginLeft: "auto", fontSize: 11, color: T2 }}>↵</span>
            </div>
            {[
              ["Go to Off-the-job", "Page"],
              ["Go to Portfolio", "Page"],
              ["Search learning content for \"deadline\"", "Search"],
            ].map(([l, k]) => (
              <div key={l} className="flex items-center justify-between rounded-lg" style={{ padding: "9px 10px" }}>
                <span style={{ fontSize: 13, color: T1 }}>{l}</span>
                <span style={{ fontSize: 11, color: T2 }}>{k}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Callout>⌘K palette — "Ask Atlas" is the top action; Enter opens the sidebar with the question</Callout>
    </div>
  );
}
