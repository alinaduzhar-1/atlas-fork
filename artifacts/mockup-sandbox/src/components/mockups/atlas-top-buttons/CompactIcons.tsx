import React from "react";
import { Stage, Group, Divider, AtlasGlyph, UpRight, segBtn, T2 } from "./_shared";

/** Ultra-compact: label on the primary, tighter window segment with mini-label on hover (tooltip shown). */
export function CompactIcons() {
  return (
    <Stage note="Compromise: keep tab 1's compact arrow but add a persistent tooltip-style microlabel below, so meaning isn't hover-gated.">
      <div style={{ position: "relative" }}>
        <Group>
          <button style={segBtn}><AtlasGlyph /> Ask Atlas</button>
          <Divider />
          <button style={{ ...segBtn, padding: "0 8px" }}><UpRight /></button>
        </Group>
        <div style={{ position: "absolute", top: 38, right: -6, background: "#212223", color: "#fff", fontSize: 10.5, padding: "3px 8px", borderRadius: 6, whiteSpace: "nowrap" }}>
          Atlas Window
          <div style={{ position: "absolute", top: -3, right: 16, width: 6, height: 6, background: "#212223", transform: "rotate(45deg)" }} />
        </div>
      </div>
    </Stage>
  );
}
