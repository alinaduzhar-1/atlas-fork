import { ArrowUpRight } from "lucide-react";
import { Frame } from "./_Frame";

// Hypothesis: promote to a primary action — filled brand indigo, white glyphs
export function PrimaryFilled() {
  return (
    <Frame note="Primary filled: strongest emphasis, reads as the main action">
      <button
        className="flex items-center transition-opacity hover:opacity-90"
        style={{ height: 32, gap: 6, padding: "0 14px", borderRadius: 8, background: "#4f46e5", color: "#ffffff", fontSize: 13, fontWeight: 600, letterSpacing: "0.28px", boxShadow: "0px 1px 4px rgba(79,70,229,0.35)" }}
      >
        <img src="/__mockup/images/atlas-icon.svg" alt="" style={{ width: 16, height: 16, filter: "brightness(0) invert(1)" }} />
        Atlas full view
        <ArrowUpRight size={14} style={{ color: "rgba(255,255,255,0.85)" }} />
      </button>
    </Frame>
  );
}
