import React from "react";
import { Stage, UpRight, ExpandGlyph, T1, T2, ACTION } from "./_shared";

// Hypothesis: a soft indigo-tinted banner row — more discoverable, feels like a feature, not a footnote
export function SoftBanner() {
  return (
    <Stage note="Soft banner: tinted full-width row makes the upgrade path discoverable; one-line, one-click">
      <button style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
        padding: "7px 12px", borderRadius: 10, background: "#eef2ff", border: "0.5px solid #dfe5fd",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: T1 }}>
          <ExpandGlyph size={13} /> Need a larger workspace?
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 600, color: ACTION }}>
          Full screen <UpRight size={11} />
        </span>
      </button>
    </Stage>
  );
}
