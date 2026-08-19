import { Maximize2, Pencil, Pin, Trash2 } from "lucide-react";
import { BrandRow, ChatMessage, Composer, PanelShell, CHAT_NAME, T1, T2, BORDER } from "../atlas-chat-header/_shared";

const MENU_SHADOW = "0px 8px 24px rgba(0,0,0,0.14), 0px 0px 1px rgba(0,0,0,0.12)";

/**
 * A — Chat title menu: the chat name is already a dropdown affordance.
 * "Open in full screen" lives there, next to Rename/Pin/Delete — an action
 * on THIS conversation, which matches the user's mental model ("continue
 * this chat with more room").
 */
export function ChatTitleMenu() {
  return (
    <PanelShell>
      <BrandRow />
      <div className="relative" style={{ padding: "14px 11px 20px 11px" }}>
        <button className="flex items-center gap-1 min-w-0 text-left rounded-md" style={{ padding: "2px 4px", margin: "-2px -4px", background: "#f0efec" }}>
          <span className="font-medium" style={{ fontSize: 16, letterSpacing: "0.24px", lineHeight: 1.5, color: T1 }}>{CHAT_NAME}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: T2, transform: "rotate(180deg)" }}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="absolute rounded-xl overflow-hidden" style={{ top: 46, left: 11, width: 214, background: "#fff", border: `1px solid ${BORDER}`, boxShadow: MENU_SHADOW, zIndex: 20 }}>
          {[
            { icon: <Maximize2 size={14} />, label: "Open in full screen", strong: true },
            { icon: <Pencil size={14} />, label: "Rename chat" },
            { icon: <Pin size={14} />, label: "Pin chat" },
            { icon: <Trash2 size={14} />, label: "Delete chat", danger: true },
          ].map(({ icon, label, strong, danger }) => (
            <div key={label} className="flex items-center" style={{ gap: 8, padding: "9px 12px", color: danger ? "#c93b3b" : T1, background: strong ? "#f5f4f1" : "#fff", fontSize: 13, fontWeight: 500, letterSpacing: "0.28px" }}>
              <span style={{ color: danger ? "#c93b3b" : T2 }}>{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>
      <ChatMessage />
      <Composer />
    </PanelShell>
  );
}
