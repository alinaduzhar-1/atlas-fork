import React from "react";
import { TopNav, HomeBody, Callout, BG, T1, T2, BORDER, INDIGO, Hexagon } from "../atlas-fullscreen-entry/_shared";

/** Primary re-entry: home dashboard surfaces the last conversation as a
 * prominent "Continue with Atlas" card above the dashboard widgets. */
export function HomeContinueCard() {
  return (
    <div className="h-screen w-full flex flex-col relative" style={{ background: BG }}>
      <TopNav />
      <HomeBody
        topSlot={
          <div
            className="flex items-center justify-between rounded-xl"
            style={{
              background: "#fff",
              border: `1px solid ${BORDER}`,
              borderLeft: `3px solid ${INDIGO}`,
              padding: "14px 18px",
              marginBottom: 16,
              boxShadow: "0 2px 8px rgba(74,95,247,0.07)",
            }}
          >
            <div className="flex items-center" style={{ gap: 12, minWidth: 0 }}>
              <div
                className="flex items-center justify-center rounded-lg"
                style={{ width: 36, height: 36, background: "#eef0fe", flexShrink: 0 }}
              >
                <Hexagon size={17} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: T2, letterSpacing: "0.5px", marginBottom: 2 }}>
                  CONTINUE WITH ATLAS
                </div>
                <div
                  style={{
                    fontSize: 13.5, fontWeight: 600, color: T1,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 520,
                  }}
                >
                  "Help with project submission deadline"
                </div>
                <div style={{ fontSize: 12, color: T2, marginTop: 1 }}>
                  Last message 20 min ago · 6 messages
                </div>
              </div>
            </div>
            <div className="flex items-center" style={{ gap: 8, flexShrink: 0 }}>
              <button
                className="rounded-lg"
                style={{
                  border: `1px solid ${BORDER}`, background: "#fff",
                  padding: "7px 14px", fontSize: 12.5, fontWeight: 500, color: T1,
                }}
              >
                Open in sidebar
              </button>
              <button
                className="flex items-center rounded-lg"
                style={{
                  gap: 6, background: INDIGO, color: "#fff",
                  padding: "7px 14px", fontSize: 12.5, fontWeight: 600,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                Full screen
              </button>
            </div>
          </div>
        }
      />
      <Callout>Home card gives conversation title + recency — two actions: sidebar or full screen</Callout>
    </div>
  );
}
