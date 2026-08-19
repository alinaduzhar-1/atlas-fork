import { ArrowLeft } from "lucide-react";
import { BORDER, ChatArea, SidebarBody, INDIGO, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * T1 — OTJ progress in bar: the top bar carries this week's off-the-job
 * hours as a mini progress bar with a "Log time" shortcut — the learner's
 * most important running metric, visible even while deep in an Atlas chat.
 */
export function OtjProgressBar() {
  return (
    <div className="h-screen w-full flex flex-col" style={{ background: "#f5f4f1" }}>
      <div className="flex items-center justify-between flex-shrink-0" style={{ height: 36, padding: "0 14px", background: "#fbfaf8", borderBottom: `1px solid ${BORDER}` }}>
        <button className="flex items-center" style={{ gap: 6, color: T2, fontSize: 12.5, fontWeight: 600 }}>
          <ArrowLeft size={13} /> Back to Multiverse
        </button>
        <div className="flex items-center" style={{ gap: 10 }}>
          <span style={{ fontSize: 11.5, color: T2 }}>OTJ this week</span>
          <div style={{ width: 110, height: 5, borderRadius: 3, background: "#e5e3de", overflow: "hidden" }}>
            <div style={{ width: "23%", height: "100%", background: INDIGO, borderRadius: 3 }} />
          </div>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: T1 }}>1h 30m / 6h 30m</span>
          <button style={{ fontSize: 11.5, fontWeight: 600, color: INDIGO, marginLeft: 4 }}>Log time →</button>
        </div>
      </div>
      <div className="flex-1 flex" style={{ minHeight: 0 }}>
        <div className="flex flex-col flex-shrink-0" style={{ width: 264, borderRight: `1px solid ${BORDER}`, background: "#faf9f7" }}>
          <div style={{ padding: "16px 16px 0 16px" }}>
            <div className="flex items-baseline" style={{ gap: 8 }}>
              <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
            </div>
          </div>
          <SidebarBody />
        </div>
        <ChatArea />
      </div>
    </div>
  );
}
