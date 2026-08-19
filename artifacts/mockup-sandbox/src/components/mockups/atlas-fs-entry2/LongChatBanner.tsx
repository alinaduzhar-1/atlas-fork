import { Maximize2, X } from "lucide-react";
import { BrandRow, ChatMessage, Composer, PanelShell, CHAT_NAME, T1, T2 } from "../atlas-chat-header/_shared";

/**
 * B — Contextual banner: no permanent UI at all. When the conversation
 * gets long (e.g. 6+ messages), a slim dismissible banner slides in above
 * the composer offering more room. Appears exactly when full screen is
 * most useful, invisible the rest of the time.
 */
export function LongChatBanner() {
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
      <div className="px-3 flex-shrink-0" style={{ marginBottom: 8 }}>
        <div className="flex items-center rounded-lg" style={{ gap: 8, padding: "8px 10px", background: "#eef0fe", border: "1px solid #d7dcfc" }}>
          <Maximize2 size={14} style={{ color: "#4a5ff7", flexShrink: 0 }} />
          <span style={{ fontSize: 12.5, color: T1, lineHeight: 1.4, flex: 1 }}>
            This chat is getting long — <span style={{ color: "#4a5ff7", fontWeight: 600 }}>continue in full screen</span>
          </span>
          <X size={13} style={{ color: T2, flexShrink: 0 }} />
        </div>
      </div>
      <Composer />
    </PanelShell>
  );
}
