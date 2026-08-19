import { ArrowLeft } from "lucide-react";
import { BORDER, ChatArea, SidebarBody, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * D — Credit in the top bar: with the "Back to Multiverse" bar now in place,
 * the powered-by line moves to its right edge — one branded strip carries
 * both navigation and attribution, freeing the sidebar footer entirely.
 */
export function TopBarCredit() {
  return (
    <div className="h-screen w-full flex flex-col" style={{ background: "#f5f4f1" }}>
      <div className="flex items-center justify-between flex-shrink-0" style={{ height: 36, padding: "0 14px", background: "#fbfaf8", borderBottom: `1px solid ${BORDER}` }}>
        <button className="flex items-center" style={{ gap: 6, color: T2, fontSize: 12.5, fontWeight: 600 }}>
          <ArrowLeft size={13} /> Back to Multiverse
        </button>
        <span style={{ fontSize: 11.5, color: "#8a8c8c", letterSpacing: "0.2px" }}>Atlas is powered by Multiverse</span>
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
          <div className="mt-auto" style={{ padding: "12px 16px" }} />
        </div>
        <ChatArea />
      </div>
    </div>
  );
}
