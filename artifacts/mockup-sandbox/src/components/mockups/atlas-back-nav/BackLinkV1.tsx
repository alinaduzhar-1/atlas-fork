import { ChevronRight } from "lucide-react";
import { FullScreenShell, INDIGO, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * A1 — Breadcrumb inline with lockup: "Multiverse › Atlas" sits on one line
 * above the identity, like a path — familiar web pattern, very compact.
 */
export function BackLinkV1() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex flex-col" style={{ gap: 8 }}>
          <div className="flex items-center" style={{ gap: 3 }}>
            <button style={{ fontSize: 12, fontWeight: 500, color: T2, padding: 0 }}>
              Multiverse
            </button>
            <ChevronRight size={11} color={T2} />
            <span style={{ fontSize: 12, fontWeight: 600, color: INDIGO }}>Atlas</span>
          </div>
          <div className="flex items-baseline" style={{ gap: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
          </div>
        </div>
      }
    />
  );
}
