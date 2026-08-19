import { ArrowLeft } from "lucide-react";
import { BORDER, ChatArea, SidebarBody, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * V4 — Quiet link above lockup: the back link lives at the very top of the
 * sidebar, above "Atlas AI Guide" — tiny, grey, out of the way, exactly
 * where users look first for navigation.
 */
export function AboveLockup() {
  return (
    <div className="h-screen w-full flex" style={{ background: "#f5f4f1" }}>
      <div className="flex flex-col flex-shrink-0" style={{ width: 264, borderRight: `1px solid ${BORDER}`, background: "#faf9f7" }}>
        <div style={{ padding: "12px 16px 0 16px" }}>
          <button className="flex items-center" style={{ gap: 4, color: "#9b9d9d", fontSize: 11.5, fontWeight: 500, marginBottom: 10 }}>
            <ArrowLeft size={11} strokeWidth={1.8} /> Back to Multiverse
          </button>
          <div className="flex items-baseline" style={{ gap: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
          </div>
        </div>
        <SidebarBody />
      </div>
      <div className="flex-1 flex flex-col" style={{ minWidth: 0 }}>
        <ChatArea />
      </div>
    </div>
  );
}
