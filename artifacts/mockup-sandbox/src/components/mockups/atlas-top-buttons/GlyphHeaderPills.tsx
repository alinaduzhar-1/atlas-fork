import React from "react";
import { Stage, AtlasGlyph, UpRight, BORDER, T1, T2, SHADOW } from "./_shared";

const pill: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 6,
  height: 32, padding: "0 14px", borderRadius: 8,
  fontSize: 13, fontWeight: 500, color: T1,
  background: "#fff", border: `0.5px solid ${BORDER}`,
  boxShadow: `0px 1px 4px 0px rgba(0,0,0,0.06)`,
  whiteSpace: "nowrap",
};

/** Glyph carries the "Atlas" brand; labels are purely functional. */
export function GlyphHeaderPills() {
  return (
    <Stage note="Glyph is the only Atlas signal. Two sibling pills: one opens the sidebar, one jumps to full screen. Zero word repetition.">
      <div style={{ display: "flex", gap: 4 }}>
        <button style={pill}>
          <AtlasGlyph /> Sidebar
        </button>
        <button style={pill}>
          <AtlasGlyph /> Full screen <UpRight size={12} color={T2} />
        </button>
      </div>
    </Stage>
  );
}
