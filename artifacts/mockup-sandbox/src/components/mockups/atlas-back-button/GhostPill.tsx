import { ArrowLeft } from "lucide-react";
import { BORDER, SidebarBody, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * V1 — Ghost pill in chat header: "← Back to Multiverse" sits left
 * of the chat title in the chat column header, separated by a hairline
 * divider. Sidebar is clean — just Atlas lockup.
 */
export function GhostPill() {
  return (
    <div className="h-screen w-full flex" style={{ background: "#f5f4f1" }}>
      {/* Sidebar */}
      <div className="flex flex-col flex-shrink-0" style={{ width: 264, borderRight: `1px solid ${BORDER}`, background: "#faf9f7" }}>
        <div style={{ padding: "14px 14px 0 14px" }}>
          <div className="flex items-baseline" style={{ gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
          </div>
        </div>
        <SidebarBody />
      </div>

      {/* Chat column */}
      <div className="flex-1 flex flex-col" style={{ minWidth: 0, background: "#fff" }}>
        {/* Header */}
        <div className="flex items-center" style={{ padding: "0 24px", height: 52, borderBottom: `1px solid ${BORDER}`, gap: 14, flexShrink: 0 }}>
          {/* Back pill */}
          <button
            className="flex items-center flex-shrink-0"
            style={{
              gap: 5, padding: "5px 11px 5px 7px", borderRadius: 999,
              border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.7)",
              color: "#6f7171", fontSize: 12, fontWeight: 500, letterSpacing: "0.1px",
            }}
          >
            <ArrowLeft size={12} strokeWidth={1.8} /> Back to Multiverse
          </button>

          {/* Divider */}
          <div style={{ width: 1, height: 16, background: BORDER, flexShrink: 0 }} />

          {/* Chat title */}
          <span style={{ fontSize: 15, fontWeight: 600, color: T1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
            Help with project submission deadline
          </span>

          <span style={{ color: "#9b9d9d", fontSize: 18, letterSpacing: 2, flexShrink: 0 }}>⋯</span>
        </div>

        {/* Messages */}
        <div className="flex-1 flex flex-col" style={{ padding: "28px 120px", gap: 18 }}>
          <div className="self-end rounded-2xl" style={{ background: "#edebe8", color: T1, fontSize: 14, padding: "10px 14px", maxWidth: "70%" }}>
            What should I focus on this week?
          </div>
          <div style={{ color: T1, fontSize: 14, lineHeight: 1.6, maxWidth: "85%" }}>
            Based on your progress, I'd focus on your portfolio evidence for the Data Analysis unit — you have two KSBs that still need mapped evidence. Want me to plan the week around them?
          </div>
        </div>

        {/* Input */}
        <div style={{ padding: "0 120px 28px 120px" }}>
          <div className="rounded-xl" style={{ border: `1px solid ${BORDER}`, padding: "12px 14px" }}>
            <div style={{ fontSize: 14, color: "#9b9d9d" }}>Ask me anything...</div>
            <div className="flex items-center justify-between" style={{ marginTop: 14 }}>
              <span style={{ color: "#6f7171", fontSize: 18 }}>+</span>
              <div className="flex items-center justify-center rounded-lg" style={{ width: 30, height: 30, background: "#aab4fa" }}>
                <span style={{ color: "#fff", fontSize: 15 }}>↑</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
