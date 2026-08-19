import React from "react";
import { Stage, Group, Divider, AtlasGlyph, UpRight, segBtn, T1, T2 } from "./_shared";

function SidebarIcon({ size = 14, color = T1 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" /><line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

/** Verbs make it explicit these are one-shot actions, not modes. */
export function ActionVerbLabels() {
  return (
    <Stage note="Verb labels ('Open panel' / 'New tab') say action, not mode — nothing implies a persistent selected state.">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: T2 }}>
          <AtlasGlyph size={15} /> Ask Atlas
        </div>
        <Group>
          <button style={{ ...segBtn, gap: 6, whiteSpace: "nowrap" }}><SidebarIcon /> Open panel</button>
          <Divider />
          <button style={{ ...segBtn, gap: 6, whiteSpace: "nowrap" }}>New tab <UpRight /></button>
        </Group>
      </div>
    </Stage>
  );
}
