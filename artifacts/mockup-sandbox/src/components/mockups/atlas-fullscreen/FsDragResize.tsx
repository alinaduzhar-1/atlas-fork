import { BORDER, T1, T2, CHAT_NAME } from "../atlas-chat-header/_shared";

const TEXT_SECONDARY = "#6f7171";

function MsgBubble({ text, from }: { text: string; from: "user" | "atlas" }) {
  if (from === "user") return (
    <div className="self-end rounded-2xl px-3 py-2 max-w-[80%]"
      style={{ background: "#edebe8", color: T1, fontSize: 13 }}>{text}</div>
  );
  return <div style={{ color: T1, fontSize: 13, lineHeight: 1.5 }}>{text}</div>;
}

/**
 * F — Drag-to-resize: the panel's right edge is a dedicated 6px resize
 * grip. Mid-drag (shown here) a semi-transparent "ghost" overlay fills
 * the space the panel will occupy when released, and a label reads
 * "Release to open full screen". Communicates the feature spatially —
 * the panel literally grows into the page.
 */
export function FsDragResize() {
  const panelW = 316;
  const ghostW = 90;   // extra space the ghost hints at

  return (
    <div className="min-h-screen w-full flex items-start" style={{ background: "#e9e8e4", padding: 16, gap: 0 }}>
      {/* Panel */}
      <div
        className="flex flex-col rounded-xl overflow-visible flex-shrink-0"
        style={{ width: panelW, background: "#fff", border: `1px solid ${BORDER}`, height: 480, position: "relative", zIndex: 2 }}
      >
        {/* Brand row */}
        <div className="flex items-center justify-between flex-shrink-0" style={{ padding: "8px 8px 0 8px", gap: 8 }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <div className="flex items-center justify-center flex-shrink-0"
              style={{ width: 31, height: 30, borderRadius: 8.6, background: "#fff", transform: "rotate(-3.88deg)",
                boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
              <span style={{ fontSize: 14 }}>〰️</span>
            </div>
            <span className="font-medium" style={{ fontSize: 14, letterSpacing: "0.28px", color: T1 }}>Ask Atlas</span>
          </div>
        </div>

        <div style={{ padding: "14px 11px 20px 11px" }}>
          <span className="font-medium" style={{ fontSize: 15, letterSpacing: "0.24px", lineHeight: 1.5, color: T1 }}>
            {CHAT_NAME}
          </span>
        </div>

        <div className="flex-1 flex flex-col px-3 overflow-hidden" style={{ gap: 10 }}>
          <MsgBubble from="user" text="What should I focus on this week?" />
          <MsgBubble from="atlas" text="Based on your progress, I'd focus on your portfolio evidence for the Data Analysis unit." />
        </div>

        <div className="flex-shrink-0 m-3 rounded-xl flex items-center justify-between"
          style={{ border: `1px solid ${BORDER}`, padding: "8px 10px", background: "#faf9f7" }}>
          <span style={{ fontSize: 13, color: TEXT_SECONDARY }}>Ask me anything...</span>
        </div>

        {/* Drag grip — highlighted mid-drag */}
        <div
          style={{
            position: "absolute", top: 0, right: -5, width: 10, height: "100%",
            cursor: "col-resize", zIndex: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* grip track */}
          <div style={{ width: 4, height: 48, borderRadius: 4, background: "#4a5ff7",
            boxShadow: "0 0 0 3px rgba(74,95,247,0.18)" }} />
        </div>
      </div>

      {/* Ghost overlay — shows where the panel will snap to */}
      <div
        className="flex flex-col items-center justify-center rounded-r-xl flex-shrink-0"
        style={{
          width: ghostW, height: 480, marginLeft: 0,
          background: "rgba(74,95,247,0.08)",
          border: `1.5px dashed rgba(74,95,247,0.4)`,
          borderLeft: "none",
        }}
      >
        <span style={{ fontSize: 10.5, fontWeight: 600, color: "#4a5ff7", textAlign: "center", lineHeight: 1.4, padding: "0 8px", letterSpacing: "0.2px" }}>
          Release to open<br />full screen
        </span>
      </div>
    </div>
  );
}
