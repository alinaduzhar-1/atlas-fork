import { ArrowUpRight } from "lucide-react";
import { Frame } from "./_Frame";

// Hypothesis: keep the active pill subtle but always show a caption explaining WHY the sidebar can't open
export function TooltipExplainer() {
  return (
    <Frame note="Explainer: active pill + persistent tooltip clarifying the sidebar is unavailable meanwhile">
      <div style={{ position: "relative" }}>
        <button className="flex items-center" style={{ height: 32, gap: 6, padding: "0 14px", borderRadius: 999, background: "#eef2ff", border: "0.5px solid #dfe5fd", fontSize: 13, fontWeight: 600, color: "#1a1a19", letterSpacing: "0.28px", whiteSpace: "nowrap" }}>
          <img src="/__mockup/images/atlas-icon.svg" alt="" style={{ width: 16, height: 16, marginRight: 2 }} />
          Atlas full screen
          <ArrowUpRight size={14} style={{ color: "#3b3fd8" }} />
        </button>
        <div style={{
          position: "absolute", top: 40, right: 0, background: "#212223", color: "#fff",
          fontSize: 11.5, lineHeight: 1.45, padding: "8px 10px", borderRadius: 8, width: 210,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.18)",
        }}>
          Atlas is in full screen. The sidebar panel is paused until you close that tab.
          <div style={{ position: "absolute", top: -4, right: 24, width: 8, height: 8, background: "#212223", transform: "rotate(45deg)" }} />
        </div>
      </div>
    </Frame>
  );
}
