import { FullScreenShell, INDIGO, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * B — Multiverse logo as the exit: the hexagon sits to the LEFT of the Atlas
 * lockup as a clickable home button (tooltip "Back to Multiverse") — the web
 * convention that the top-left logo takes you home.
 */
export function LogoAsExit() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex items-center" style={{ gap: 10 }}>
          <button
            className="flex items-center justify-center rounded-lg flex-shrink-0 hover:opacity-80"
            style={{ width: 28, height: 28, border: "1px solid #dbdad6", background: "#fff" }}
            aria-label="Back to Multiverse"
            title="Back to Multiverse"
          >
            <svg width="16" height="14" viewBox="0 0 20 17" fill={INDIGO}>
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
