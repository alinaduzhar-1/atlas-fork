import React from "react";
import { TopNav, HomeBody, ExpandIcon, Callout, BG, T1, T2, BORDER, INDIGO, Hexagon } from "./_shared";

/** Hypothesis: the home dashboard resurfaces the last Atlas conversation as a
 * "continue" card — full screen is the natural place to pick it back up. */
export function HomeContinueCard() {
  return (
    <div className="h-screen w-full flex flex-col relative" style={{ background: BG }}>
      <TopNav />
      <HomeBody
        topSlot={
          <div
            className="flex items-center justify-between rounded-xl"
            style={{ background: "#fff", border: `1px solid ${BORDER}`, borderLeft: `3px solid ${INDIGO}`, padding: "14px 16px", marginBottom: 14 }}
          >
            <div className="flex items-center" style={{ gap: 12, minWidth: 0 }}>
              <div className="flex items-center justify-center rounded-lg" style={{ width: 34, height: 34, background: "#eef0fe", flexShrink: 0 }}>
                <Hexagon size={16} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: T1 }}>Continue with Atlas</div>
                <div style={{ fontSize: 12.5, color: T2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 480 }}>
                  "Help with project submission deadline" — last message 20 min ago
                </div>
              </div>
            </div>
            <button className="flex items-center rounded-lg" style={{ gap: 6, background: INDIGO, color: "#fff", padding: "8px 14px", fontSize: 12.5, fontWeight: 600, flexShrink: 0 }}>
              <ExpandIcon size={12} color="#fff" /> Open full screen
            </button>
          </div>
        }
      />
      <Callout>Home surfaces the last conversation as a "Continue with Atlas" card</Callout>
    </div>
  );
}
