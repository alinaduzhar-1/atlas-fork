import React, { useState } from "react";
import { Stage, Group, Divider, AtlasGlyph, UpRight, BORDER, T1, T2, INDIGO } from "./_shared";

function SidebarIcon({ size = 14, color = T1 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

function FullscreenIcon({ size = 13, color = T1 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

type Mode = "sidebar" | "fullscreen";

export function ContinueTwoSegments() {
  const [active, setActive] = useState<Mode>("sidebar");

  const btn = (mode: Mode): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 6,
    padding: "0 14px", fontSize: 13, fontWeight: 500,
    height: "100%", background: active === mode ? INDIGO : "transparent",
    color: active === mode ? "#fff" : T1,
    whiteSpace: "nowrap", transition: "background 0.15s, color 0.15s",
    cursor: "pointer",
  });

  const iconColor = (mode: Mode) => active === mode ? "#fff" : T1;

  return (
    <Stage note="'Continue with Atlas' is a plain label. Clicking Sidebar or Full screen sets an active state — highlighted in indigo.">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Plain label */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: T2 }}>
          <AtlasGlyph size={15} />
          Continue with Atlas
        </div>
        {/* Action buttons */}
        <Group>
          <button style={btn("sidebar")} onClick={() => setActive("sidebar")}>
            <SidebarIcon color={iconColor("sidebar")} /> Sidebar
          </button>
          <Divider />
          <button style={btn("fullscreen")} onClick={() => setActive("fullscreen")}>
            <FullscreenIcon color={iconColor("fullscreen")} /> Full screen
          </button>
        </Group>
      </div>
    </Stage>
  );
}
