import React from "react";
import { Stage, Group, Divider, AtlasGlyph, Chevron, UpRight, segBtn, BORDER, T1, T2 } from "./_shared";

function SidebarIcon({ size = 14, color = T1 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" /><line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

/** Single "Ask Atlas" button; where it opens is a remembered preference in a caret menu. */
export function AskAtlasModeMenu() {
  return (
    <Stage note="One CTA; the caret menu sets a remembered 'opens in' preference (radio). Cleanest header, one extra step to switch modes.">
      <div style={{ position: "relative" }}>
        <Group>
          <button style={{ ...segBtn, gap: 6 }}><AtlasGlyph /> Ask Atlas</button>
          <Divider />
          <button style={{ ...segBtn, padding: "0 8px" }}><Chevron /></button>
        </Group>
        <div style={{ position: "absolute", top: 40, right: 0, width: 190, background: "#fff", border: `0.5px solid ${BORDER}`, borderRadius: 10, boxShadow: "0 8px 24px rgba(26,29,35,0.11)", padding: 4, zIndex: 5 }}>
          <div style={{ padding: "6px 10px 4px", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.4px", textTransform: "uppercase", color: T2 }}>Opens in</div>
          {[
            { label: "Sidebar", icon: <SidebarIcon size={13} />, checked: true },
            { label: "Full screen", icon: <UpRight size={12} color={T1} />, checked: false },
          ].map(({ label, icon, checked }) => (
            <div key={label} className="flex items-center justify-between" style={{ padding: "8px 10px", borderRadius: 7, fontSize: 12.5, color: T1, background: checked ? "#f2f1ee" : "transparent" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>{icon} {label}</div>
              {checked && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T1} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>}
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}
