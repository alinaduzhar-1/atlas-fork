import { Maximize2 } from "lucide-react";
import { BrandRow, ChatMessage, Composer, PanelShell, CHAT_NAME, T1, T2 } from "../atlas-chat-header/_shared";

/**
 * E — Floating expand button: an indigo circle FAB anchored to the
 * chat area's bottom-right. It floats above the conversation without
 * touching the header cluster or the composer, so discovery is
 * serendipitous — the user finds it while they're already reading.
 */
export function FsFloat() {
  return (
    <PanelShell>
      <BrandRow />
      <div style={{ padding: "14px 11px 20px 11px" }}>
        <button
          className="flex items-center gap-1 min-w-0 text-left rounded-md"
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

      {/* Chat area — relative so FAB can be positioned inside */}
      <div className="flex-1 relative overflow-hidden px-3 flex flex-col" style={{ gap: 10 }}>
        <div
          className="self-end rounded-2xl px-3 py-2 max-w-[80%]"
          style={{ background: "#edebe8", color: T1, fontSize: 13.5 }}
        >
          What should I focus on this week?
        </div>
        <div style={{ color: T1, fontSize: 13.5, lineHeight: 1.5, maxWidth: "92%" }}>
          Based on your progress, I'd focus on your portfolio evidence for the Data Analysis unit — you have two KSBs that still need mapped evidence.
        </div>

        {/* FAB */}
        <button
          aria-label="Open full screen"
          className="absolute flex items-center justify-center rounded-full shadow-lg"
          style={{
            bottom: 10, right: 4,
            width: 34, height: 34,
            background: "#4a5ff7",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(74,95,247,0.45)",
          }}
        >
          <Maximize2 size={15} />
        </button>
      </div>
      <Composer />
    </PanelShell>
  );
}
