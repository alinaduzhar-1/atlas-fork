import React, { useState } from "react";
import { Stage, Group, Divider, AtlasGlyph, BORDER, T1, T2 } from "./_shared";

function SidebarIcon({ size = 15, color = T1 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" /><line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}
function ExpandIcon({ size = 14, color = T1 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

/** Icon-only segmented toggle next to the Ask Atlas label — like an editor view switcher. */
export function ModeIconToggle() {
  const [mode, setMode] = useState<"side" | "full">("side");
  return (
    <Stage note="Icon-only segmented toggle (view-switcher pattern). Smallest footprint; relies on tooltips for labels.">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: T2 }}>
          <AtlasGlyph size={15} /> Ask Atlas
        </div>
        <div style={{ display: "flex", height: 32, padding: 3, gap: 2, borderRadius: 9, background: "#eceae6", alignItems: "stretch" }}>
          <button title="Sidebar" onClick={() => setMode("side")} style={{
            display: "flex", alignItems: "center", justifyContent: "center", width: 34, borderRadius: 7,
            background: mode === "side" ? "#fff" : "transparent",
            boxShadow: mode === "side" ? "0 1px 3px rgba(0,0,0,0.10)" : "none",
          }}><SidebarIcon color={mode === "side" ? T1 : T2} /></button>
          <button title="Full screen" onClick={() => setMode("full")} style={{
            display: "flex", alignItems: "center", justifyContent: "center", width: 34, borderRadius: 7,
            background: mode === "full" ? "#fff" : "transparent",
            boxShadow: mode === "full" ? "0 1px 3px rgba(0,0,0,0.10)" : "none",
          }}><ExpandIcon color={mode === "full" ? T1 : T2} /></button>
        </div>
      </div>
    </Stage>
  );
}
