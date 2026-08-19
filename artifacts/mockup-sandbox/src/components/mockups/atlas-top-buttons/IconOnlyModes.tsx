import React from "react";
import { Stage, Group, Divider, AtlasGlyph, UpRight, segBtn, BORDER, T1, T2, SHADOW } from "./_shared";

function SidebarIcon({ size = 15, color = T2 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

/** 
 * "Ask Atlas" stays as the primary CTA. Two icon-only mode selectors sit in a 
 * companion group — sidebar panel icon + expand-to-fullscreen icon.
 * Tooltip labels carry meaning without cluttering the header.
 */
export function IconOnlyModes() {
  return (
    <Stage note="Ask Atlas is the only word; sidebar and full screen are icon-only in a companion group. Leanest header, relies on icon legibility.">
      <div style={{ display: "flex", gap: 6 }}>
        {/* Primary */}
        <Group>
          <button style={{ ...segBtn, gap: 6 }}>
            <AtlasGlyph /> Ask Atlas
          </button>
        </Group>
        {/* Mode selector */}
        <Group>
          <button style={{ ...segBtn, padding: "0 10px" }} title="Open sidebar">
            <SidebarIcon />
          </button>
          <Divider />
          <button style={{ ...segBtn, padding: "0 10px" }} title="Full screen">
            <UpRight />
          </button>
        </Group>
      </div>
    </Stage>
  );
}
