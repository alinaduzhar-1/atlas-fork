import { ArrowLeft } from "lucide-react";
import { BORDER, FullScreenShell, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * A2 — Separator + indented: back link sits in its own zone above a 1px rule,
 * then the Atlas lockup starts below. Clear visual hierarchy; the separator
 * tells you "you're entering a different product space".
 */
export function BackLinkV2() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex flex-col" style={{ gap: 0 }}>
          <button className="flex items-center" style={{ gap: 5, color: T2, fontSize: 12, fontWeight: 500, paddingBottom: 10 }}>
            <ArrowLeft size={12} /> Multiverse
          </button>
          <div style={{ height: 1, background: BORDER, margin: "0 -16px", marginBottom: 12 }} />
          <div className="flex items-baseline" style={{ gap: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
          </div>
        </div>
      }
    />
  );
}
