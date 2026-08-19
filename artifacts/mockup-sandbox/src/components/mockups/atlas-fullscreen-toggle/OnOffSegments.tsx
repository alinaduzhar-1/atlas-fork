import React from "react";
import { Stage, TabGlyph, BORDER, T1, T2, ACTION, TINT, TINT_BORDER } from "./_shared";

function Seg({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <button style={{
      display: "flex", alignItems: "center", gap: 4, padding: "0 10px", height: "100%",
      fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap",
      background: active ? TINT : "transparent", color: active ? "#3b3fd8" : T2,
    }}>
      {children}
    </button>
  );
}

// Hypothesis: segmented On | Off — state is explicit and clickable; tab glyph on the label says where it opens
export function OnOffSegments() {
  const Label = (
    <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 10px", fontSize: 13, fontWeight: 600, color: T1, whiteSpace: "nowrap" }}>
      Atlas full screen <TabGlyph size={12} color={T2} />
    </span>
  );
  return (
    <Stage
      note="Segments: explicit On/Off you can click; the tab glyph next to the label signals 'opens in its own tab'"
      off={
        <div className="flex items-stretch overflow-hidden bg-white" style={{ height: 32, borderRadius: 999, border: `0.5px solid ${BORDER}`, boxShadow: "0px 1px 4px rgba(0,0,0,0.06)" }}>
          {Label}
          <div style={{ width: 0.5, background: BORDER }} />
          <Seg>On</Seg>
          <div style={{ width: 0.5, background: BORDER }} />
          <Seg active>Off</Seg>
        </div>
      }
      on={
        <div className="flex items-stretch overflow-hidden bg-white" style={{ height: 32, borderRadius: 999, border: `0.5px solid ${TINT_BORDER}` }}>
          {Label}
          <div style={{ width: 0.5, background: TINT_BORDER }} />
          <Seg active>On</Seg>
          <div style={{ width: 0.5, background: TINT_BORDER }} />
          <Seg>Off</Seg>
        </div>
      }
    />
  );
}
