import { Maximize2 } from "lucide-react";
import { BrandRow, ChatMessage, Composer, PanelShell, CHAT_NAME, T1, T2, BORDER } from "../atlas-chat-header/_shared";

/**
 * D — Inline hint in the conversation: when a reply gets long, Atlas
 * itself offers "Continue in full screen" as a ghost pill under the
 * message. Context-aware — appears exactly when the panel feels small.
 */
export function FsHint() {
  return (
    <PanelShell>
      <BrandRow />
      <div style={{ padding: "14px 11px 12px 11px" }}>
        <button className="flex items-center gap-1 min-w-0 text-left rounded-md hover:bg-[#f0efec]" style={{ padding: "2px 4px", margin: "-2px -4px" }}>
          <span className="font-medium" style={{ fontSize: 16, letterSpacing: "0.24px", lineHeight: 1.5, color: T1 }}>{CHAT_NAME}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: T2 }}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-hidden px-3 flex flex-col" style={{ gap: 10 }}>
        <div className="self-end rounded-2xl px-3 py-2 max-w-[80%]" style={{ background: "#edebe8", color: T1, fontSize: 13.5 }}>
          Can you break down my full 12-week plan?
        </div>
        <div style={{ color: T1, fontSize: 13.5, lineHeight: 1.5, maxWidth: "92%" }}>
          Absolutely — here's your 12-week plan. Weeks 1–3 focus on portfolio evidence for Data Analysis, weeks 4–6 on your KSB mapping, weeks 7–9 on the project write-up…
        </div>
        {/* Inline hint */}
        <button
          className="flex items-center self-start gap-1-5 rounded-full font-medium hover:bg-[#f0efec]"
          style={{ padding: "6px 12px", border: `1px dashed ${BORDER}`, background: "#faf9f7", color: "#4a5ff7", fontSize: 12.5 }}
        >
          <Maximize2 size={13} />
          Continue in full screen
        </button>
      </div>
      <Composer />
    </PanelShell>
  );
}
