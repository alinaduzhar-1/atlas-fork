import React from "react";
import { Stage, Group, AtlasGlyph, UpRight, segBtn, BORDER, SHADOW, T1, T2, INDIGO } from "./_shared";

function Row({ label, note, children }: { label: string; note: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, width: "100%" }}>
      <div style={{ width: 220, textAlign: "right" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T1 }}>{label}</div>
        <div style={{ fontSize: 11, color: T2, lineHeight: 1.4, marginTop: 2 }}>{note}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>{children}</div>
    </div>
  );
}

export function CopyVariants() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center" style={{ background: "#f5f4f1", gap: 28 }}>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: T2, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 4 }}>Label copy exploration</div>

      {/* A: current */}
      <Row label="Atlas full view" note="Current — describes the destination, not the action">
        <div className="flex items-stretch overflow-hidden" style={{ height: 32, borderRadius: 8, background: "#fff", border: `0.5px solid ${BORDER}`, boxShadow: SHADOW }}>
          <button style={{ ...segBtn, gap: 6, whiteSpace: "nowrap" }}>
            <AtlasGlyph size={15} /> Atlas full view <UpRight size={12} />
          </button>
        </div>
      </Row>

      {/* B: Ask Atlas in full screen */}
      <Row label="Ask Atlas in full screen" note="Verb-led — action + context, makes it feel like an invitation">
        <div className="flex items-stretch overflow-hidden" style={{ height: 32, borderRadius: 8, background: "#fff", border: `0.5px solid ${BORDER}`, boxShadow: SHADOW }}>
          <button style={{ ...segBtn, gap: 6, whiteSpace: "nowrap" }}>
            <AtlasGlyph size={15} /> Ask Atlas in full screen <UpRight size={12} />
          </button>
        </div>
      </Row>

      {/* C: Open Atlas */}
      <Row label="Open Atlas" note="Short & punchy — implies something's about to unfold">
        <div className="flex items-stretch overflow-hidden" style={{ height: 32, borderRadius: 8, background: "#fff", border: `0.5px solid ${BORDER}`, boxShadow: SHADOW }}>
          <button style={{ ...segBtn, gap: 6, whiteSpace: "nowrap" }}>
            <AtlasGlyph size={15} /> Open Atlas <UpRight size={12} />
          </button>
        </div>
      </Row>

      {/* D: Atlas full screen */}
      <Row label="Atlas full screen" note="No 'view' — more direct, still spatial">
        <div className="flex items-stretch overflow-hidden" style={{ height: 32, borderRadius: 8, background: "#fff", border: `0.5px solid ${BORDER}`, boxShadow: SHADOW }}>
          <button style={{ ...segBtn, gap: 6, whiteSpace: "nowrap" }}>
            <AtlasGlyph size={15} /> Atlas full screen <UpRight size={12} />
          </button>
        </div>
      </Row>

      {/* E: Ask Atlas ↗ (icon only carries the 'external' signal) */}
      <Row label="Ask Atlas ↗" note="Minimal — arrow carries the 'new tab' signal; shortest read time">
        <div className="flex items-stretch overflow-hidden" style={{ height: 32, borderRadius: 8, background: "#fff", border: `0.5px solid ${BORDER}`, boxShadow: SHADOW }}>
          <button style={{ ...segBtn, gap: 6, whiteSpace: "nowrap" }}>
            <AtlasGlyph size={15} /> Ask Atlas <UpRight size={12} />
          </button>
        </div>
      </Row>
    </div>
  );
}
