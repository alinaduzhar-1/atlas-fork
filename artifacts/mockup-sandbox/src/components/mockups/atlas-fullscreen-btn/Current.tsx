import { ArrowUpRight } from "lucide-react";
import { Frame } from "./_Frame";

// Baseline: the brand chip as currently implemented in the app header
export function Current() {
  return (
    <Frame note="Current: brand chip — indigo icon block + white label segment, full pill">
      <div className="flex items-stretch overflow-hidden" style={{ height: 32, borderRadius: 999, border: "0.5px solid #dbdad6", boxShadow: "0px 1px 4px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-center" style={{ width: 34, background: "#eef2ff" }}>
          <img src="/__mockup/images/atlas-icon.svg" alt="" style={{ width: 16, height: 16 }} />
        </div>
        <button className="flex items-center bg-white transition-colors hover:bg-[#f5f3ee]" style={{ gap: 4, padding: "0 12px", fontSize: 13, fontWeight: 500, color: "#1a1a19", letterSpacing: "0.28px", whiteSpace: "nowrap" }}>
          Atlas full screen
          <ArrowUpRight size={14} style={{ color: "#4f46e5" }} />
        </button>
      </div>
    </Frame>
  );
}
