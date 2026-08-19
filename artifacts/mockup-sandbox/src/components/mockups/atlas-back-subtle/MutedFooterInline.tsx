import { ArrowLeft } from "lucide-react";
import { BORDER, FullScreenShell, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * S4 — Muted inline sidebar footer: "← Back to Multiverse" lives in the
 * sidebar footer alongside the "powered by" line — same quiet grey as the
 * credit text. Both pieces of Multiverse context together, neither dominant.
 */
export function MutedFooterInline() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex items-baseline" style={{ gap: 8 }}>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
        </div>
      }
      sidebarFooter={
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
          <button
            className="flex items-center self-start"
            style={{ gap: 4, color: "#9b9d9d", fontSize: 12, fontWeight: 500, letterSpacing: "0.1px" }}
          >
            <ArrowLeft size={11} strokeWidth={1.8} color="#9b9d9d" />
            Back to Multiverse
          </button>
          <span style={{ fontSize: 11.5, color: "#b0b2b2", letterSpacing: "0.2px" }}>Atlas is powered by Multiverse</span>
        </div>
      }
    />
  );
}
