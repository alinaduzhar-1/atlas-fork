import { ChevronsLeft } from "lucide-react";
import { BrandRow, ChatMessage, Composer, CHAT_NAME, T1, T2, BORDER } from "../atlas-chat-header/_shared";

/**
 * B — Edge expand handle: a persistent grip on the panel's left edge
 * (shown here mid-hover) with a "chevrons-out" affordance — dragging or
 * clicking expands Atlas to full screen. Communicates spatially: the
 * panel visually "wants" to grow leftward into the page.
 */
export function FsEdge() {
  return (
    <div className="min-h-screen w-full flex justify-center items-start" style={{ background: "#e9e8e4", padding: 16 }}>
      <div className="flex items-start w-full" style={{ maxWidth: 372 }}>
        {/* Edge handle */}
        <div className="flex flex-col items-center justify-center flex-shrink-0 self-stretch" style={{ width: 28, gap: 6 }}>
          <div
            className="flex flex-col items-center justify-center rounded-l-xl cursor-pointer"
            style={{
              width: 26, height: 84,
              background: "#4a5ff7",
              boxShadow: "0px 4px 12px rgba(74,95,247,0.35)",
              color: "#fff",
              marginRight: -2,
              zIndex: 2,
            }}
            aria-label="Open full screen"
          >
            <ChevronsLeft size={16} />
            <span style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: "0.5px", writingMode: "vertical-rl", transform: "rotate(180deg)", marginTop: 4 }}>
              EXPAND
            </span>
          </div>
        </div>
        {/* Panel */}
        <div className="flex flex-col flex-1 rounded-xl overflow-hidden" style={{ background: "#fff", border: `1px solid ${BORDER}`, height: 480 }}>
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
      </div>
    </div>
  );
}
