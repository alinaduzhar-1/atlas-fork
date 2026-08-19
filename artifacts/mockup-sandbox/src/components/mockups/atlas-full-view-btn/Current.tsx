import { ArrowUpRight } from "lucide-react";
import { Frame } from "./_Frame";

// Exact copy of the current app button (values from client/src/components/navigation.tsx)
export function Current() {
  return (
    <Frame note="Current: white pill, icon + label + arrow">
      <div className="flex items-stretch overflow-hidden" style={{ height: 32, borderRadius: 8, background: "#ffffff", border: "0.5px solid #dbdad6", boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.06)" }}>
        <button className="flex items-center transition-colors hover:bg-[#f5f3ee]" style={{ gap: 4, padding: "0 12px", fontSize: 13, fontWeight: 500, color: "#1a1a19", letterSpacing: "0.28px" }}>
          <img src="/__mockup/images/atlas-icon.svg" alt="" style={{ width: 16, height: 16 }} />
          Atlas full view
          <ArrowUpRight size={14} style={{ color: "#6b6a66" }} />
        </button>
      </div>
    </Frame>
  );
}
