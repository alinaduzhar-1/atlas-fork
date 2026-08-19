import { FullScreenShell, T1, T2 } from "./_shared";

/**
 * C — Credit in the sidebar footer: the header is pure "Atlas · AI Guide";
 * the Multiverse association moves to the very bottom of the sidebar where
 * legal/brand credits conventionally live.
 */
export function FsFooterCredit() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex items-baseline" style={{ gap: 8 }}>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
        </div>
      }
      sidebarFooter={
        <div style={{ fontSize: 10.5, color: "#b3b1ac", borderTop: "1px solid #e7e5e1", paddingTop: 10 }}>
          Atlas is powered by Multiverse
        </div>
      }
    />
  );
}
