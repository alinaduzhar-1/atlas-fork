import React from "react";
import { Stage, AtlasGlyph, UpRight, BORDER, T1, T2, INDIGO, SHADOW } from "./_shared";

/** Clear hierarchy: Panel is the everyday action (one solid button); full screen is a quiet icon link. */
export function PrimaryPanelQuietTab() {
  return (
    <Stage note="Hierarchy over symmetry: 'Ask Atlas' opens the panel (primary); full screen is a quiet ↗ icon for the rarer 'give me room' moment.">
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <button style={{
          display: "flex", alignItems: "center", gap: 6, height: 32, padding: "0 14px",
          borderRadius: 8, fontSize: 13, fontWeight: 500, color: T1,
          background: "#fff", border: `0.5px solid ${BORDER}`, boxShadow: SHADOW, whiteSpace: "nowrap",
        }}>
          <AtlasGlyph /> Ask Atlas
        </button>
        <button title="Open in new tab" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 32, height: 32, borderRadius: 8, color: T2,
        }}>
          <UpRight size={14} />
        </button>
      </div>
    </Stage>
  );
}
