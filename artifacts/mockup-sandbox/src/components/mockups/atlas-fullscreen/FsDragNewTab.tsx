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
 * F (iterated) — Drag to expand → opens in a new tab.
 * The ghost zone now carries a browser-tab chrome at its top edge and a
 * "Opens in a new tab" label so the user understands: dragging releases into
 * a full-screen Atlas tab while the current panel stays visible in this tab.
 */
export function FsDragNewTab() {
  const panelW = 300;
  const ghostW = 108;

  return (
    <div className="min-h-screen w-full flex flex-col items-start" style={{ background: "#e9e8e4", padding: "16px 16px 16px 16px" }}>
      {/* Small context label above */}
      <div className="flex items-center gap-2 mb-3 self-start" style={{ paddingLeft: 4 }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#4a5ff7",
          boxShadow: "0 0 0 3px rgba(74,95,247,0.18)",
        }} />
        <span style={{ fontSize: 11, fontWeight: 600, color: "#4a5ff7", letterSpacing: "0.4px" }}>
          DRAG TO EXPAND
        </span>
      </div>

      <div className="flex items-start w-full" style={{ gap: 0 }}>
        {/* === Current tab — panel stays === */}
        <div className="flex flex-col flex-shrink-0" style={{ width: panelW, position: "relative", zIndex: 2 }}>
          {/* Tab strip — "current tab" */}
          <div className="flex items-end" style={{ paddingLeft: 8, marginBottom: -1 }}>
            <div
              className="rounded-t-lg flex items-center"
              style={{
                background: "#fff",
                border: `1px solid ${BORDER}`,
                borderBottom: "none",
                padding: "5px 12px 6px",
                fontSize: 11,
                fontWeight: 600,
                color: T1,
                gap: 5,
              }}
            >
              {/* favicon dot */}
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4a5ff7" }} />
              Multiverse
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ color: "#aaa", marginLeft: 2 }}>
                <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Panel card */}
          <div
            className="flex flex-col rounded-b-xl rounded-tr-xl overflow-visible"
            style={{ background: "#fff", border: `1px solid ${BORDER}`, height: 370, position: "relative" }}
          >
            {/* Brand row */}
            <div className="flex items-center justify-between flex-shrink-0" style={{ padding: "8px 8px 0 8px", gap: 8 }}>
              <div className="flex items-center" style={{ gap: 8 }}>
                <div className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 27, height: 26, borderRadius: 7.6, background: "#fff", transform: "rotate(-3.88deg)",
                    boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
                  <span style={{ fontSize: 12 }}>〰️</span>
                </div>
                <span className="font-medium" style={{ fontSize: 13, letterSpacing: "0.28px", color: T1 }}>Ask Atlas</span>
              </div>
              <span style={{ fontSize: 10.5, color: TEXT_SECONDARY, fontWeight: 500 }}>Panel stays open</span>
            </div>

            <div style={{ padding: "10px 11px 12px 11px" }}>
              <span className="font-medium" style={{ fontSize: 14, letterSpacing: "0.24px", lineHeight: 1.5, color: T1 }}>
                {CHAT_NAME}
              </span>
            </div>

            <div className="flex-1 flex flex-col px-3 overflow-hidden" style={{ gap: 8 }}>
              <MsgBubble from="user" text="What should I focus on this week?" />
              <MsgBubble from="atlas" text="Based on your progress, I'd focus on your portfolio evidence for the Data Analysis unit." />
            </div>

            <div className="flex-shrink-0 m-2 rounded-xl flex items-center"
              style={{ border: `1px solid ${BORDER}`, padding: "6px 10px", background: "#faf9f7" }}>
              <span style={{ fontSize: 12, color: TEXT_SECONDARY }}>Ask me anything...</span>
            </div>

            {/* Resize grip — highlighted */}
            <div style={{
              position: "absolute", top: 0, right: -5, width: 10, height: "100%",
              cursor: "col-resize", zIndex: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: 4, height: 48, borderRadius: 4,
                background: "#4a5ff7",
                boxShadow: "0 0 0 3px rgba(74,95,247,0.18)",
              }} />
            </div>
          </div>
        </div>

        {/* === Ghost zone — new tab preview === */}
        <div className="flex flex-col flex-shrink-0" style={{ width: ghostW }}>
          {/* New tab pill */}
          <div className="flex items-end" style={{ paddingLeft: 6, marginBottom: -1 }}>
            <div
              className="rounded-t-lg flex items-center"
              style={{
                background: "rgba(74,95,247,0.10)",
                border: "1.5px dashed rgba(74,95,247,0.4)",
                borderBottom: "none",
                padding: "5px 10px 6px",
                fontSize: 10.5,
                fontWeight: 600,
                color: "#4a5ff7",
                gap: 4,
              }}
            >
              {/* new-tab icon */}
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <rect x="0.5" y="2.5" width="6" height="6" rx="1" stroke="#4a5ff7" strokeWidth="1.1"/>
                <path d="M3 0.5h5.5v5.5" stroke="#4a5ff7" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              New tab
            </div>
          </div>

          {/* Ghost card */}
          <div
            className="flex flex-col items-center justify-center rounded-b-xl rounded-tr-xl"
            style={{
              width: ghostW, height: 370,
              background: "rgba(74,95,247,0.07)",
              border: "1.5px dashed rgba(74,95,247,0.4)",
              borderLeft: "none",
            }}
          >
            {/* Expand arrow */}
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "rgba(74,95,247,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 8,
            }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 12L12 1M12 1H5M12 1v7" stroke="#4a5ff7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{
              fontSize: 9.5, fontWeight: 600, color: "#4a5ff7",
              textAlign: "center", lineHeight: 1.45,
              padding: "0 8px", letterSpacing: "0.2px",
            }}>
              Full screen<br />in new tab
            </span>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div style={{ marginTop: 12, paddingLeft: 4, fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.5 }}>
        Release to open Atlas full screen in a new tab —<br />this panel keeps your place in the current tab.
      </div>
    </div>
  );
}
