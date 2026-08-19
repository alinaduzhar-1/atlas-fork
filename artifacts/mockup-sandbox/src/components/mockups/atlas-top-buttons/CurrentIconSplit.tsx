import React from "react";
import { Stage, Group, Divider, AtlasGlyph, UpRight, segBtn } from "./_shared";

/** Baseline — what's live today on tab 1: label + icon-only arrow segment. */
export function CurrentIconSplit() {
  return (
    <Stage note="Current (tab 1): 'Ask Atlas' label, icon-only full-screen segment. Compact but the arrow's meaning is only revealed on hover.">
      <Group>
        <button style={segBtn}><AtlasGlyph /> Ask Atlas</button>
        <Divider />
        <button style={{ ...segBtn, padding: "0 8px" }}><UpRight /></button>
      </Group>
    </Stage>
  );
}
