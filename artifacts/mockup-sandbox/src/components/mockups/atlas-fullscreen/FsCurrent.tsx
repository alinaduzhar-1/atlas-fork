import { BrandRow, ChatMessage, Composer, PanelShell, CHAT_NAME, T1, T2 } from "../atlas-chat-header/_shared";

/** Current: full screen is an unlabeled external-link icon button among four header buttons. */
export function FsCurrent() {
  return (
    <PanelShell>
      <BrandRow />
      <div style={{ padding: "14px 11px 20px 11px" }}>
        <button className="flex items-center gap-1 min-w-0 text-left rounded-md hover:bg-[#f0efec]" style={{ padding: "2px 4px", margin: "-2px -4px" }}>
          <span className="font-medium" style={{ fontSize: 16, letterSpacing: "0.24px", lineHeight: 1.5, color: T1 }}>{CHAT_NAME}</span>
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
