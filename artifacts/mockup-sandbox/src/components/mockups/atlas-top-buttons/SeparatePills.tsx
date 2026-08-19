import React from "react";
import { Stage, Group, AtlasGlyph, UpRight, segBtn, T2 } from "./_shared";

/** Two independent pills — equal-weight sibling actions. */
export function SeparatePills() {
  return (
    <Stage note="Two separate pills. Clearest tap targets and equal weight — costs more header width and reads as two features, not one.">
      <Group>
        <button style={segBtn}><AtlasGlyph /> Ask Atlas</button>
      </Group>
      <div style={{ width: 4 }} />
      <Group>
        <button style={segBtn}>Atlas Window <UpRight /></button>
      </Group>
    </Stage>
  );
}
