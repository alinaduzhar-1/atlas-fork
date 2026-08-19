import React from "react";
import { Stage, UpRight, ExpandGlyph, T1, ACTION } from "./_shared";

// Ghost dashed row — same layout as SoftBanner, swaps the tinted fill for a dashed outline
export function GhostExpandRow() {
  return (
    <Stage note="Ghost expand: same layout as Soft Banner but outlined/dashed — lighter presence, still structured">
      <button style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
        padding: "7px 12px", borderRadius: 10, background: "transparent",
        border: "1.2px dashed #c7cdf9",
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
