import React from "react";
import { Stage, UpRight, TabGlyph, BORDER, T1, T2, ACTION, TINT, TINT_BORDER } from "./_shared";

function Knob({ on }: { on: boolean }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", width: 26, height: 16, borderRadius: 999,
      background: on ? ACTION : "#d4d3cf", padding: 2,
      justifyContent: on ? "flex-end" : "flex-start", transition: "all .15s",
    }}>
      <span style={{ width: 12, height: 12, borderRadius: 999, background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
    </span>
  );
}

// Hypothesis: a literal switch inside the pill — on/off is instantly legible; ↗ keeps the separate-tab promise
export function SwitchPill() {
  return (
    <Stage
      note="Switch pill: the toggle reads on/off at a glance; the ↗ arrow stays to say 'lives in a separate tab'"
      off={
        <button className="flex items-center bg-white hover:bg-[#f5f3ee] transition-colors" style={{ height: 32, gap: 8, padding: "0 12px", borderRadius: 999, border: `0.5px solid ${BORDER}`, boxShadow: "0px 1px 4px rgba(0,0,0,0.06)", fontSize: 13, fontWeight: 600, color: T1, whiteSpace: "nowrap" }}>
          Atlas full screen <Knob on={false} /> <UpRight size={12} color={T2} />
        </button>
      }
      on={
        <button className="flex items-center transition-colors hover:bg-[#e2e8ff]" style={{ height: 32, gap: 8, padding: "0 12px", borderRadius: 999, background: TINT, border: `0.5px solid ${TINT_BORDER}`, fontSize: 13, fontWeight: 600, color: T1, whiteSpace: "nowrap" }}>
          Atlas full screen <Knob on={true} /> <UpRight size={12} />
        </button>
      }
    />
  );
}
