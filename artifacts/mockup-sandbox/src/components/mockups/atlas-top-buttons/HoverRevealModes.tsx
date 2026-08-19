import React, { useState } from "react";
import { Stage, Group, Divider, AtlasGlyph, UpRight, segBtn, BORDER, T1, T2 } from "./_shared";

function SidebarIcon({ size = 14, color = T1 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" /><line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

/** Compact by default; hovering the Ask Atlas pill slides out the two mode segments. */
export function HoverRevealModes() {
  const [hover, setHover] = useState(true);
  return (
    <Stage note="Hover (or focus) on Ask Atlas slides out the mode segments — compact at rest, explicit on intent. Shown hovered; click the pill to toggle.">
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setHover(h => !h)} style={{ cursor: "pointer" }}>
        <Group>
          <button style={{ ...segBtn, gap: 6 }}><AtlasGlyph /> Ask Atlas</button>
          <div style={{ display: "flex", alignItems: "stretch", overflow: "hidden", maxWidth: hover ? 260 : 0, opacity: hover ? 1 : 0, transition: "max-width 0.25s ease, opacity 0.2s ease" }}>
            <Divider />
            <button style={{ ...segBtn, gap: 6, whiteSpace: "nowrap" }}><SidebarIcon /> Sidebar</button>
            <Divider />
            <button style={{ ...segBtn, gap: 6, whiteSpace: "nowrap" }}>Full screen <UpRight /></button>
          </div>
        </Group>
      </div>
    </Stage>
  );
}
