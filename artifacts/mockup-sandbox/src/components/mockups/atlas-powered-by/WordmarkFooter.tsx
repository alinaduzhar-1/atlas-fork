import { FullScreenShell, INDIGO, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * C — Wordmark lockup footer: "powered by" as a tiny eyebrow above the
 * multiverse wordmark in brand indigo — a proper brand sign-off, more
 * deliberate than a single grey sentence.
 */
export function WordmarkFooter() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex items-baseline" style={{ gap: 8 }}>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
        </div>
      }
      sidebarFooter={
        <div style={{ borderTop: "1px solid #dbdad6", paddingTop: 10 }}>
          <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.8px", color: "#9b9d9d", textTransform: "uppercase", marginBottom: 2 }}>
            Powered by
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.2px", color: INDIGO }}>multiverse</div>
        </div>
      }
    />
  );
}
