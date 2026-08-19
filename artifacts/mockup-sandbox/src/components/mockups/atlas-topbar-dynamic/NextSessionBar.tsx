import { ArrowLeft, Video } from "lucide-react";
import { BORDER, ChatArea, SidebarBody, INDIGO, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * T2 — Next session countdown: the bar shows the learner's next live
 * session with a countdown and join shortcut — time-critical info that
 * would otherwise be missed while focused in Atlas.
 */
export function NextSessionBar() {
  return (
    <div className="h-screen w-full flex flex-col" style={{ background: "#f5f4f1" }}>
      <div className="flex items-center justify-between flex-shrink-0" style={{ height: 36, padding: "0 14px", background: "#fbfaf8", borderBottom: `1px solid ${BORDER}` }}>
        <button className="flex items-center" style={{ gap: 6, color: T2, fontSize: 12.5, fontWeight: 600 }}>
          <ArrowLeft size={13} /> Back to Multiverse
        </button>
        <div className="flex items-center" style={{ gap: 8 }}>
          <Video size={13} color={INDIGO} />
          <span style={{ fontSize: 11.5, color: T2 }}>Next live session:</span>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: T1 }}>Data storytelling workshop</span>
          <span className="rounded-full" style={{ fontSize: 10.5, fontWeight: 700, color: INDIGO, background: "#edecf9", padding: "2px 8px" }}>
            in 2h 15m
          </span>
          <button style={{ fontSize: 11.5, fontWeight: 600, color: INDIGO }}>View →</button>
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
