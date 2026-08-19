import { ArrowUpRight } from "lucide-react";
import { Frame } from "./_Frame";

// Hypothesis: maximum prominence — solid indigo pill, white glyphs; Atlas as THE header action
export function SolidIndigo() {
  return (
    <Frame note="Solid indigo: strongest emphasis in the header; unmistakable primary action">
      <button className="flex items-center transition-opacity hover:opacity-90" style={{ height: 32, gap: 6, padding: "0 14px", borderRadius: 999, background: "#4a5ff7", fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "0.28px", whiteSpace: "nowrap", boxShadow: "0px 1px 4px rgba(74,95,247,0.35)" }}>
        <img src="/__mockup/images/atlas-icon.svg" alt="" style={{ width: 16, height: 16, filter: "brightness(0) invert(1)" }} />
        Atlas full screen
        <ArrowUpRight size={14} style={{ color: "rgba(255,255,255,0.85)" }} />
      </button>
    </Frame>
  );
}
