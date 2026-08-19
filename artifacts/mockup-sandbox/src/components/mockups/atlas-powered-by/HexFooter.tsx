import { FullScreenShell, INDIGO, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * A — Hexagon + text footer: the Multiverse hexagon glyph sits beside the
 * credit line in the sidebar footer — small brand mark makes it feel like
 * an official signature rather than plain fine print.
 */
export function HexFooter() {
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
          <div className="flex items-center" style={{ gap: 6 }}>
            <svg width="14" height="12" viewBox="0 0 20 17" fill={INDIGO} style={{ opacity: 0.75, flexShrink: 0 }}>
              <path d="M5.4 0.5h9.2L19.2 8.5l-4.6 8H5.4L0.8 8.5z" />
            </svg>
            <span style={{ fontSize: 11.5, color: T2, letterSpacing: "0.2px" }}>Atlas is powered by Multiverse</span>
          </div>
        </div>
      }
    />
  );
}
