import { BrandRow, ChatMessage, Composer, PanelShell, CHAT_NAME, T1, T2, BORDER } from "./_shared";

/**
 * B — Name as a chip/pill.
 * The chat name lives in a rounded pill with a subtle border + shadow.
 * Hypothesis: wrapping the name in a chip makes it unmistakably interactive
 * (switchable), and visually separates context from content.
 */
export function ChatHdrChip() {
  return (
    <PanelShell>
      <BrandRow />
      <div style={{ padding: "12px 10px 16px 10px" }}>
        <button
          className="flex items-center gap-1-5 text-left"
          style={{
            padding: "5px 10px 5px 8px",
            borderRadius: 20,
            border: `1px solid ${BORDER}`,
            background: "#faf9f7",
            boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
            maxWidth: "100%",
          }}
        >
          <span
            className="font-medium truncate"
            style={{ fontSize: 13.5, letterSpacing: "0.2px", color: T1, maxWidth: 220 }}
          >
            {CHAT_NAME}
          </span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: T2 }}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <ChatMessage />
      <Composer />
    </PanelShell>
  );
}
