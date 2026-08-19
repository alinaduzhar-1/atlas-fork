import { BrandRow, ChatMessage, Composer, PanelShell, CHAT_NAME, T1, T2 } from "./_shared";

/**
 * A — Bold headline: name is the clear visual anchor.
 * 19px semibold, tight tracking, chevron is lighter and smaller.
 * Trades compactness for strong "you are here" orientation.
 */
export function ChatHdrBold() {
  return (
    <PanelShell>
      <BrandRow />
      <div style={{ padding: "12px 12px 16px 12px" }}>
        <button
          className="flex items-start gap-1-5 min-w-0 text-left rounded-md hover:bg-[#f0efec] transition-colors w-full"
          style={{ padding: "4px 6px", margin: "-4px -6px" }}
        >
          <span
            className="font-semibold min-w-0 flex-1"
            style={{ fontSize: 18, letterSpacing: "-0.2px", lineHeight: 1.3, color: T1, wordBreak: "break-word" }}
          >
            {CHAT_NAME}
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 4, color: T2, opacity: 0.6 }}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <ChatMessage />
      <Composer />
    </PanelShell>
  );
}
