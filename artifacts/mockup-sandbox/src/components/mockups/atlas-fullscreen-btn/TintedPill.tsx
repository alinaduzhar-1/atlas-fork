import { ArrowUpRight } from "lucide-react";
import { Frame } from "./_Frame";

// Hypothesis: one continuous light-indigo pill — softer, reads as a single branded action
export function TintedPill() {
  return (
    <Frame note="Tinted pill: whole control washed in light indigo; label picks up the brand color">
      <button className="flex items-center transition-colors hover:bg-[#e2e8ff]" style={{ height: 32, gap: 6, padding: "0 14px", borderRadius: 999, background: "#eef2ff", border: "0.5px solid #dfe5fd", fontSize: 13, fontWeight: 500, color: "#3b3fd8", letterSpacing: "0.28px", whiteSpace: "nowrap" }}>
        <img src="/__mockup/images/atlas-icon.svg" alt="" style={{ width: 16, height: 16 }} />
        Atlas full screen
        <ArrowUpRight size={14} style={{ color: "#3b3fd8" }} />
      </button>
    </Frame>
  );
}
