import { BrandRow, ChatMessage, Composer, PanelShell, CHAT_NAME, T1, T2 } from "./_shared";

/**
 * D — Inline breadcrumb treatment.
 * Brand row is collapsed: "Ask Atlas" becomes a smaller prefix
 * on the SAME row as the chat name, separated by a "/" or ">".
 * Signals hierarchy (Atlas › this chat) and saves vertical space.
 * Trade-off: brand identity is quieter.
 */
export function ChatHdrInline() {
  return (
    <PanelShell>
      {/* Merged single row: icon + Atlas prefix + separator + chat name + buttons */}
      <div className="flex items-center flex-shrink-0" style={{ padding: "10px 10px 0 10px", gap: 6 }}>
        {/* Atlas mark */}
        <div className="flex items-center justify-center flex-shrink-0"
          style={{ width: 28, height: 27, borderRadius: 8, background: "#fff", transform: "rotate(-3.88deg)",
            boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
          <span style={{ fontSize: 13 }}>〰️</span>
        </div>
        {/* Breadcrumb */}
        <div className="flex items-center min-w-0 flex-1" style={{ gap: 4, overflow: "hidden" }}>
          <span className="font-medium flex-shrink-0" style={{ fontSize: 13, color: T2 }}>Atlas</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, color: T2 }}>
            <path d="M4 2.5l3.5 3.5L4 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <button
            className="flex items-center gap-0-5 min-w-0 text-left rounded-md hover:bg-[#f0efec] transition-colors"
            style={{ padding: "1px 3px", margin: "-1px -3px", overflow: "hidden" }}
          >
            <span className="font-semibold truncate" style={{ fontSize: 13.5, color: T1, letterSpacing: "0.1px" }}>
              {CHAT_NAME}
            </span>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: T2 }}>
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        {/* Compact buttons */}
        <div className="flex items-center flex-shrink-0" style={{ gap: 3 }}>
          {[
            { label: "New chat", path: "M11 2H5a1 1 0 00-1 1v8l3-2h4a1 1 0 001-1V3a1 1 0 00-1-1z" },
            { label: "More", path: "M4 8a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2z" },
            { label: "Close", path: "M4 4l8 8M12 4l-8 8" },
          ].map(({ label, path }) => (
            <button key={label} aria-label={label}
              className="flex items-center justify-center rounded-md hover:bg-[#f0efec]"
              style={{ width: 28, height: 28, border: "1px solid #e4e3e0", background: "#fff", color: T1 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d={path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
      {/* Spacer under header */}
      <div style={{ height: 16 }} />
      <ChatMessage />
      <Composer />
    </PanelShell>
  );
}
