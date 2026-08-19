import { BrandRow, ChatMessage, Composer, PanelShell, ChevronDown, CHAT_NAME, T1, T2 } from "./_shared";

/** Current: 16px medium name + small chevron. Low visual weight. */
export function ChatHdrCurrent() {
  return (
    <PanelShell>
      <BrandRow />
      <div style={{ padding: "14px 11px 20px 11px" }}>
        <button
          className="flex items-center gap-1 min-w-0 text-left rounded-md hover:bg-[#f0efec] transition-colors"
          style={{ padding: "2px 4px", margin: "-2px -4px", maxWidth: "100%" }}
        >
          <span className="font-medium break-words min-w-0" style={{ fontSize: 16, letterSpacing: "0.24px", lineHeight: 1.5, color: T1 }}>
            {CHAT_NAME}
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: T2 }}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <ChatMessage />
      <Composer />
    </PanelShell>
  );
}
