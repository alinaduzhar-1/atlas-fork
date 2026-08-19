import React from "react";
import { Stage, Group, Divider, AtlasGlyph, UpRight, segBtn, T2 } from "./_shared";

/** Tab 2 as built: both actions labelled inside one split control. */
export function LabelledSplit() {
  return (
    <Stage note="Tab 2 as built: both actions labelled. Self-explanatory, but the control is wide and the two labels compete for attention.">
      <Group>
        <button style={segBtn}><AtlasGlyph /> Ask Atlas</button>
        <Divider />
        <button style={segBtn}>Atlas Window <UpRight /></button>
      </Group>
    </Stage>
  );
}
