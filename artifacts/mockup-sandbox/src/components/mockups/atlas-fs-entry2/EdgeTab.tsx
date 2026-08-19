import { ChevronsLeft } from "lucide-react";
import { BrandRow, ChatMessage, Composer, CHAT_NAME, T1, T2, BORDER } from "../atlas-chat-header/_shared";

/**
 * D — Persistent edge tab: a slim pill riding the panel's left border,
 * always visible at mid-height. One click grows the chat to full screen.
 * Mirrors the collapse/expand handles users know from IDE side panels.
 */
export function EdgeTab() {
  return (
    <div className="min-h-screen w-full flex justify-center items-start" style={{ background: "#e9e8e4", padding: 16 }}>
      <div className="relative" style={{ width: 372 }}>
        <div className="flex flex-col rounded-xl overflow-hidden" style={{ width: 340, marginLeft: 32, background: "#fff", border: `1px solid ${BORDER}`, height: 480 }}>
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
        </div>
        {/* Edge tab riding the panel border, vertically centered */}
        <div className="absolute flex flex-col items-center rounded-l-xl" style={{ left: 12, top: 190, background: "#fff", border: `1px solid ${BORDER}`, borderRight: "none", padding: "10px 5px", boxShadow: "-2px 2px 8px rgba(0,0,0,0.07)" }}>
          <ChevronsLeft size={15} style={{ color: "#4a5ff7" }} />
          <span style={{ writingMode: "vertical-rl", fontSize: 11, fontWeight: 600, color: T2, marginTop: 6, letterSpacing: "0.4px" }}>Full screen</span>
        </div>
      </div>
    </div>
  );
}
