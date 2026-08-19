import React from "react";
import { Stage, Group, Divider, AtlasGlyph, UpRight, segBtn, BORDER, T1, T2 } from "./_shared";

function SidebarIcon({ size = 14, color = T1 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" /><line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

/** Panel looks like a button; full screen looks like an external link — different affordance for a different behavior. */
export function ExternalLinkAffordance() {
  return (
    <Stage note="Panel = in-page button; Full screen = link-style with ↗, honestly signalling 'this leaves the page / opens a tab'. Behavior difference is visible before clicking.">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: T2 }}>
          <AtlasGlyph size={15} /> Ask Atlas
        </div>
        <Group>
          <button style={{ ...segBtn, gap: 6, whiteSpace: "nowrap" }}><SidebarIcon /> Panel</button>
        </Group>
        <a href="#" onClick={(e) => e.preventDefault()} style={{
          display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 500,
          color: T1, textDecoration: "underline", textUnderlineOffset: 3, whiteSpace: "nowrap",
        }}>
          Full screen <UpRight size={12} color={T1} />
        </a>
      </div>
    </Stage>
  );
}
