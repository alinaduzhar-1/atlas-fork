import { ArrowLeft } from "lucide-react";
import { BORDER, SidebarBody, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * V3 — Inline with chat header: no extra chrome anywhere. The back link
 * sits in the existing chat header row, left of the chat title, separated
 * by a hairline divider. Zero added height.
 */
export function InlineHeader() {
  return (
    <div className="h-screen w-full flex" style={{ background: "#f5f4f1" }}>
      <div className="flex flex-col flex-shrink-0" style={{ width: 264, borderRight: `1px solid ${BORDER}`, background: "#faf9f7" }}>
        <div style={{ padding: "16px 16px 0 16px" }}>
          <div className="flex items-baseline" style={{ gap: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
          </div>
        </div>
        <SidebarBody />
      </div>
      <div className="flex-1 flex flex-col" style={{ minWidth: 0, background: "#fff" }}>
        {/* Existing chat header with back link folded in */}
        <div className="flex items-center justify-between" style={{ padding: "14px 24px", borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center" style={{ gap: 14 }}>
            <button className="flex items-center" style={{ gap: 5, color: "#9b9d9d", fontSize: 12, fontWeight: 500 }}>
              <ArrowLeft size={12} strokeWidth={1.8} /> Multiverse
            </button>
            <div style={{ width: 1, height: 16, background: BORDER }} />
            <span style={{ fontSize: 15, fontWeight: 600, color: T1 }}>Help with project submission deadline</span>
          </div>
          <span style={{ color: T2, fontSize: 18, letterSpacing: 2 }}>⋯</span>
        </div>
        <div className="flex-1" style={{ padding: "28px 120px" }}>
          <div className="rounded-2xl" style={{ float: "right", background: "#edebe8", color: T1, fontSize: 14, padding: "10px 14px", maxWidth: "70%" }}>
            What should I focus on this week?
          </div>
        </div>
        <div style={{ padding: "0 120px 28px 120px" }}>
          <div className="rounded-xl" style={{ border: `1px solid ${BORDER}`, padding: "12px 14px" }}>
            <div style={{ fontSize: 14, color: "#9b9d9d" }}>Ask me anything...</div>
            <div className="flex items-center justify-between" style={{ marginTop: 14 }}>
              <span style={{ color: T2, fontSize: 18 }}>+</span>
              <div className="flex items-center justify-center rounded-lg" style={{ width: 30, height: 30, background: "#aab4fa", color: "#fff" }}>↑</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
