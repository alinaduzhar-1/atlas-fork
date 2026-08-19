import { ArrowLeft } from "lucide-react";
import { FullScreenShell, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * D — Footer return button: the sidebar footer becomes an actionable
 * "← Return to Multiverse" button, replacing the passive powered-by credit —
 * exit and brand credit merge into one element.
 */
export function FooterReturn() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex items-baseline" style={{ gap: 8 }}>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
        </div>
      }
      sidebarFooter={
        <button className="flex items-center justify-center w-full rounded-lg hover:bg-[#f0efec]" style={{ gap: 6, border: "1px solid #dbdad6", background: "#fff", padding: "8px 0", fontSize: 12.5, fontWeight: 600, color: T1 }}>
          <ArrowLeft size={13} /> Return to Multiverse
        </button>
      }
    />
  );
}
