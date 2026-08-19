import { ArrowLeft } from "lucide-react";
import { FullScreenShell, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * A — Back link above the lockup: a quiet "← Multiverse" line sits at the
 * very top of the sidebar, above the Atlas identity — the classic
 * "product within a product" escape hatch (like Gmail ← Google).
 */
export function BackLinkAboveLockup() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex flex-col" style={{ gap: 10 }}>
          <button className="flex items-center" style={{ gap: 6, color: T2, fontSize: 12.5, fontWeight: 500 }}>
            <ArrowLeft size={13} /> Back to Multiverse
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
