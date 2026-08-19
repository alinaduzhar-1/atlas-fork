import { BrandRow, ChatMessage, Composer, PanelShell, CHAT_NAME, T1, T2 } from "./_shared";

/**
 * C — Eyebrow label + name.
 * A small "CHAT" label sits above the name, making the two rows
 * semantically distinct (brand identity row / context row).
 * The name itself gets more weight (semibold 15px) because
 * it no longer has to share meaning with the chevron alone.
 */
export function ChatHdrLabel() {
  return (
    <PanelShell>
      <BrandRow />
      <div style={{ padding: "10px 12px 16px 12px" }}>
        <div style={{ marginBottom: 3 }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.8px", color: T2, textTransform: "uppercase" }}>
            Chat
          </span>
        </div>
        <button
          className="flex items-center gap-1 min-w-0 text-left rounded-md hover:bg-[#f0efec] transition-colors"
          style={{ padding: "2px 4px", margin: "-2px -4px", maxWidth: "100%" }}
        >
          <span
            className="font-semibold min-w-0"
            style={{ fontSize: 15, letterSpacing: "0.1px", lineHeight: 1.4, color: T1, wordBreak: "break-word" }}
          >
            {CHAT_NAME}
          </span>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: T2, opacity: 0.7 }}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <ChatMessage />
      <Composer />
    </PanelShell>
  );
}
