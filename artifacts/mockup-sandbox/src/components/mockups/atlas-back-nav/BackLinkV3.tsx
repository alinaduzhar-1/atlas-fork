import { ArrowLeft } from "lucide-react";
import { FullScreenShell, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * A3 — Pill badge back button: the back affordance is a small rounded pill
 * with a subtle border, styled like a chip — more tactile and button-like,
 * makes the interactive nature unmistakable.
 */
export function BackLinkV3() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex flex-col" style={{ gap: 10 }}>
          <button
            className="flex items-center self-start rounded-full"
            style={{
              gap: 5,
              fontSize: 11.5,
              fontWeight: 600,
              color: T2,
              padding: "3px 9px 3px 6px",
              border: "1px solid #dbdad6",
              background: "#fff",
              letterSpacing: "0.1px",
            }}
          >
            <ArrowLeft size={11} /> Multiverse
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
