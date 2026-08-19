import React from "react";
import { Stage, Group, Divider, AtlasGlyph, UpRight, Chevron, segBtn, BORDER, T1, T2, SHADOW } from "./_shared";

/** One "Ask Atlas" label; full-screen moves to a small chevron menu with both modes listed. */
export function SingleChevronSplit() {
  return (
    <Stage note="Minimal header: one Atlas mention, chevron reveals 'Sidebar' and 'Full screen'. Keeps the label light; discoverability depends on the menu.">
      <div style={{ position: "relative" }}>
        <Group>
          <button style={{ ...segBtn, gap: 6 }}>
            <AtlasGlyph /> Ask Atlas
          </button>
          <Divider />
          <button style={{ ...segBtn, padding: "0 9px" }}>
            <Chevron size={13} />
          </button>
        </Group>
        {/* Menu shown open */}
        <div style={{
          position: "absolute", top: 40, right: 0, width: 170,
          background: "#fff", border: `0.5px solid ${BORDER}`,
          borderRadius: 10, boxShadow: "0 8px 24px rgba(26,29,35,0.11)",
          padding: 4, zIndex: 5,
        }}>
          {[
            { label: "Sidebar", icon: "▣" },
            { label: "Full screen", icon: null, arrow: true },
          ].map(({ label, icon, arrow }) => (
            <div key={label} className="flex items-center justify-between" style={{
              padding: "8px 10px", borderRadius: 7,
              fontSize: 12.5, color: T1,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {icon && <span style={{ fontSize: 11, color: T2 }}>{icon}</span>}
                {label}
              </div>
              {arrow && <UpRight size={11} color={T2} />}
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}
