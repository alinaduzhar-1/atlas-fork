import React from "react";
import { AtlasGlyph, UpRight, BORDER, T1, T2 } from "./_shared";

function SidebarIcon({ size = 14, color = T1 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" /><line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

/** Modes live in the Atlas panel header, not the top bar — top bar keeps a single Ask Atlas button. */
export function PanelHeaderModes() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center" style={{ background: "#f5f4f1", gap: 18 }}>
      <div style={{ width: 340, background: "#fff", border: `0.5px solid ${BORDER}`, borderRadius: 14, boxShadow: "0 6px 20px rgba(26,29,35,0.08)", overflow: "hidden" }}>
        {/* Panel header */}
        <div className="flex items-center justify-between" style={{ padding: "12px 14px", borderBottom: `0.5px solid ${BORDER}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, color: T1 }}>
            Atlas <AtlasGlyph size={16} /> <span style={{ fontWeight: 400, color: T2 }}>AI Guide</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button title="Sidebar (current)" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 7, background: "#f2f1ee" }}>
              <SidebarIcon />
            </button>
            <button title="Full screen" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 7 }}>
              <UpRight size={13} color={T1} />
            </button>
            <button title="Close" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 7, color: T2, fontSize: 15 }}>×</button>
          </div>
        </div>
        <div style={{ padding: "18px 14px 22px", fontSize: 12.5, color: T2, lineHeight: 1.5 }}>
          Hey Sarah, I can help you navigate your apprenticeship…
        </div>
      </div>
      <div style={{ fontSize: 11.5, color: T2, maxWidth: 380, textAlign: "center", lineHeight: 1.5 }}>
        Mode switch lives inside the Atlas panel header — the top bar needs only one Ask Atlas button. Switch modes once you're already talking.
      </div>
    </div>
  );
}
