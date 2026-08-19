import { ArrowLeft } from "lucide-react";
import { ChatArea, FullScreenShell, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * S1 — Ghost text link top-left: no top bar at all. A barely-there
 * "← Multiverse" sits in the very top-left corner of the sidebar header
 * beside the Atlas lockup — secondary colour, no border, no bg.
 * Visible but never the focal point.
 */
export function GhostTextLink() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex flex-col" style={{ gap: 8 }}>
          <button
            className="flex items-center self-start"
            style={{ gap: 4, color: "#9b9d9d", fontSize: 11.5, fontWeight: 500, letterSpacing: "0.1px" }}
          >
            <ArrowLeft size={11} strokeWidth={1.8} color="#9b9d9d" />
            Multiverse
          </button>
          <div className="flex items-baseline" style={{ gap: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
          </div>
        </div>
      }
    />
  );
}
