import { BORDER, ChatArea, FullScreenShell, INDIGO, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * S2 — Hexagon-only home button: just the Multiverse hexagon in the top-left
 * of the sidebar — no text, no arrow. Universally understood as "home" via
 * tooltip on hover. Cleanest possible exit with zero visual noise.
 */
export function HexHomeButton() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex items-center" style={{ gap: 10 }}>
          <button
            className="flex items-center justify-center rounded-md flex-shrink-0"
            style={{
              width: 26, height: 26,
              border: `1px solid ${BORDER}`,
              background: "#fff",
            }}
            title="Back to Multiverse"
            aria-label="Back to Multiverse"
          >
            <svg width="13" height="11" viewBox="0 0 20 17" fill={INDIGO}>
              <path d="M5.4 0.5h9.2L19.2 8.5l-4.6 8H5.4L0.8 8.5z" />
            </svg>
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
