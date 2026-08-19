import React from "react";
import { Stage, Group, Divider, AtlasGlyph, UpRight, Chevron, segBtn, BORDER, T1, T2, SHADOW } from "./_shared";

/** One primary action; the window option lives in a small menu. */
export function DropdownMenu() {
  return (
    <Stage note="Primary 'Ask Atlas' + chevron menu. Cleanest header footprint; full screen becomes a second-step choice (shown open).">
      <div style={{ position: "relative" }}>
        <Group>
          <button style={segBtn}><AtlasGlyph /> Ask Atlas</button>
          <Divider />
          <button style={{ ...segBtn, padding: "0 7px" }}><Chevron /></button>
        </Group>
        {/* Open menu */}
        <div style={{ position: "absolute", top: 38, right: 0, width: 180, background: "#fff", border: `0.5px solid ${BORDER}`, borderRadius: 10, boxShadow: "0 8px 24px rgba(26,29,35,0.12)", padding: 4, zIndex: 5 }}>
          {[
            { label: "Open sidebar", icon: <AtlasGlyph size={14} /> },
            { label: "Atlas Window", icon: <UpRight size={12} color={T1} /> },
          ].map(({ label, icon }, i) => (
            <div key={label} className="flex items-center" style={{ gap: 8, padding: "8px 10px", borderRadius: 7, fontSize: 12.5, color: T1, background: i === 1 ? "#f2f1ee" : "transparent" }}>
              {icon} {label}
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}
