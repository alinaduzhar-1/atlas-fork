import { ArrowUpRight } from "lucide-react";
import { Frame } from "./_Frame";

// Baseline: current implementation — the button flips to a light-indigo tinted pill while full screen is open
export function TintedPillActive() {
  return (
    <Frame note="Current: pill flips to a light-indigo fill while full screen is open; clicking refocuses the tab">
      <button className="flex items-center transition-colors hover:bg-[#e2e8ff]" style={{ height: 32, gap: 6, padding: "0 14px", borderRadius: 999, background: "#eef2ff", border: "0.5px solid #dfe5fd", fontSize: 13, fontWeight: 600, color: "#1a1a19", letterSpacing: "0.28px", whiteSpace: "nowrap" }}>
        <img src="/__mockup/images/atlas-icon.svg" alt="" style={{ width: 16, height: 16, marginRight: 2 }} />
        Atlas full screen
        <ArrowUpRight size={14} style={{ color: "#3b3fd8" }} />
      </button>
    </Frame>
  );
}
