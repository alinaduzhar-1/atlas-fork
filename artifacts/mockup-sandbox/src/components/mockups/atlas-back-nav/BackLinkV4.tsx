import { ArrowLeft } from "lucide-react";
import { FullScreenShell, INDIGO, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * A4 — Back link with MV hexagon inline: the Multiverse hexagon glyph sits
 * beside "Back to Multiverse" — reinforces brand recognition and makes the
 * destination of the link crystal-clear before the user clicks.
 */
export function BackLinkV4() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex flex-col" style={{ gap: 10 }}>
          <button className="flex items-center" style={{ gap: 5, color: T2, fontSize: 12, fontWeight: 500 }}>
            <ArrowLeft size={12} />
            <svg width="13" height="11" viewBox="0 0 20 17" fill={INDIGO} style={{ opacity: 0.7, flexShrink: 0 }}>
              <path d="M5.4 0.5h9.2L19.2 8.5l-4.6 8H5.4L0.8 8.5z" />
            </svg>
            Back to Multiverse
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
