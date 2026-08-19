import React from "react";
import { Stage, TabGlyph, UpRight, BORDER, T1, T2, ACTION, TINT, TINT_BORDER } from "./_shared";

// Hypothesis: label + trailing status word that flips (Off → On, tinted); tab glyph carries the separate-tab meaning
export function StatusChip() {
  return (
    <Stage
      note="Status chip: 'On/Off' badge flips with state; the little window-arrow glyph says it's a separate tab"
      off={
        <button className="flex items-center bg-white hover:bg-[#f5f3ee] transition-colors" style={{ height: 32, gap: 7, padding: "0 12px", borderRadius: 999, border: `0.5px solid ${BORDER}`, boxShadow: "0px 1px 4px rgba(0,0,0,0.06)", fontSize: 13, fontWeight: 600, color: T1, whiteSpace: "nowrap" }}>
          <TabGlyph size={13} color={T2} />
          Atlas full screen
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.4px", color: T2, background: "#f0efec", borderRadius: 999, padding: "2px 8px" }}>OFF</span>
        </button>
      }
      on={
        <button className="flex items-center transition-colors hover:bg-[#e2e8ff]" style={{ height: 32, gap: 7, padding: "0 12px", borderRadius: 999, background: TINT, border: `0.5px solid ${TINT_BORDER}`, fontSize: 13, fontWeight: 600, color: T1, whiteSpace: "nowrap" }}>
          <TabGlyph size={13} />
          Atlas full screen
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 700, letterSpacing: "0.4px", color: "#fff", background: ACTION, borderRadius: 999, padding: "2px 8px" }}>
            ON <UpRight size={9} color="#fff" />
          </span>
        </button>
      }
    />
  );
}
