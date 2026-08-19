import React, { useState, useRef } from "react";
import { Stage, Group, Divider, AtlasGlyph, UpRight, segBtn, T1, T2 } from "./_shared";

function SidebarIcon({ size = 14, color = T1 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" /><line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

/** No persistent active state — just a brief press flash confirming the action fired. Click to try. */
export function EphemeralPressFeedback() {
  const [flash, setFlash] = useState<"panel" | "full" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const fire = (which: "panel" | "full") => {
    setFlash(which);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlash(null), 450);
  };
  const btn = (which: "panel" | "full"): React.CSSProperties => ({
    ...segBtn, gap: 6, whiteSpace: "nowrap", cursor: "pointer",
    background: flash === which ? "#e6e4df" : "transparent",
    transition: flash === which ? "none" : "background 0.45s ease",
  });
  return (
    <Stage note="Compromise: no persistent state, but a ~450ms press flash confirms the click landed (useful when the result appears elsewhere). Try clicking.">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: T2 }}>
          <AtlasGlyph size={15} /> Ask Atlas
        </div>
        <Group>
          <button style={btn("panel")} onClick={() => fire("panel")}><SidebarIcon /> Panel</button>
          <Divider />
          <button style={btn("full")} onClick={() => fire("full")}>Full screen <UpRight /></button>
        </Group>
      </div>
    </Stage>
  );
}
