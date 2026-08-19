import { ArrowUpRight } from "lucide-react";
import { BrandRow, ChatMessage, Composer, CHAT_NAME, T1, T2, BORDER } from "../atlas-chat-header/_shared";

const TEXT_SECONDARY = "#6f7171";

/**
 * G — Footer link: a quiet "Open full screen" text link sits between
 * the composer and the panel's bottom edge. It's never intrusive — no
 * icon button competing in the header, no floating element obscuring
 * conversation — but it's always reachable after the user has composed
 * a reply and is about to send.
 */
export function FsFooterLink() {
  return (
    <div className="min-h-screen w-full flex justify-center items-start" style={{ background: "#e9e8e4", padding: 16 }}>
      <div
        className="flex flex-col rounded-xl overflow-hidden"
        style={{ width: 372, background: "#fff", border: `1px solid ${BORDER}`, height: 480 }}
      >
        <BrandRow />
        <div style={{ padding: "14px 11px 20px 11px" }}>
          <button
            className="flex items-center gap-1 min-w-0 text-left rounded-md hover:bg-[#f0efec]"
            style={{ padding: "2px 4px", margin: "-2px -4px" }}
          >
            <span className="font-medium" style={{ fontSize: 16, letterSpacing: "0.24px", lineHeight: 1.5, color: T1 }}>
              {CHAT_NAME}
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: T2 }}>
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <ChatMessage />
        <Composer />

        {/* Footer link */}
        <div
          className="flex-shrink-0 flex justify-center items-center"
          style={{ height: 36, borderTop: `1px solid ${BORDER}` }}
        >
          <button
            className="flex items-center gap-1 hover:underline"
            style={{ color: TEXT_SECONDARY, fontSize: 12, fontWeight: 500 }}
          >
            <ArrowUpRight size={13} strokeWidth={2} />
            Open full screen
          </button>
        </div>
      </div>
    </div>
  );
}
