import { Maximize2, MoreVertical, X, PenSquare } from "lucide-react";
import { ChatMessage, Composer, PanelShell, CHAT_NAME, T1, T2, BORDER } from "../atlas-chat-header/_shared";

/**
 * A — Labeled button: "Full screen" gets a text label so the affordance
 * is self-describing instead of hidden behind a tooltip.
 * Trade-off: takes horizontal space; other buttons stay icons.
 */
export function FsLabeled() {
  return (
    <PanelShell>
      <div className="flex items-center justify-between flex-shrink-0" style={{ padding: "8px 8px 0 8px", gap: 8 }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          <div className="flex items-center justify-center flex-shrink-0"
            style={{ width: 31, height: 30, borderRadius: 8.6, background: "#fff", transform: "rotate(-3.88deg)",
              boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
            <span style={{ fontSize: 14 }}>〰️</span>
          </div>
          <span className="font-medium" style={{ fontSize: 14, letterSpacing: "0.28px", color: T1 }}>Ask Atlas</span>
        </div>
        <div className="flex items-center flex-shrink-0" style={{ gap: 4 }}>
          <button className="flex items-center justify-center rounded-lg" aria-label="New chat"
            style={{ width: 32, height: 32, background: "#4a5ff7", color: "#fff" }}>
            <PenSquare size={14} />
          </button>
          <button className="flex items-center gap-1-5 rounded-lg font-medium hover:bg-[#f0efec]"
            style={{ height: 32, padding: "0 10px", border: `1px solid ${BORDER}`, background: "#fff", color: T1, fontSize: 12.5 }}>
            <Maximize2 size={13} />
            Full screen
          </button>
          <button className="flex items-center justify-center rounded-lg" aria-label="More options"
            style={{ width: 32, height: 32, border: `1px solid ${BORDER}`, background: "#fff", color: T1 }}>
            <MoreVertical size={14} />
          </button>
          <button className="flex items-center justify-center rounded-lg" aria-label="Close"
            style={{ width: 32, height: 32, border: `1px solid ${BORDER}`, background: "#fff", color: T1 }}>
            <X size={14} />
          </button>
        </div>
      </div>
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
