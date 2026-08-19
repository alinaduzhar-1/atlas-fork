import { ArrowUpRight, X } from "lucide-react";
import { BrandRow, ChatMessage, Composer, PanelShell, T1, BORDER } from "../atlas-chat-header/_shared";

/**
 * C — Floating pill: hovers over the top of the chat area like a toast,
 * dismissible, doesn't take layout space from messages or composer.
 */
export function FloatingPill() {
  return (
    <PanelShell>
      <BrandRow />
      <div className="relative flex-1 flex flex-col" style={{ minHeight: 0 }}>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center rounded-full" style={{ top: 8, zIndex: 5, gap: 8, background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0px 4px 12px rgba(0,0,0,0.10)", padding: "6px 6px 6px 12px", width: "max-content", maxWidth: "94%" }}>
          <span style={{ fontSize: 12, color: T1, whiteSpace: "nowrap" }}>Larger workspace for longer chats?</span>
          <button className="flex items-center rounded-full" style={{ gap: 3, background: "#4a5ff7", color: "#fff", fontSize: 11.5, fontWeight: 600, padding: "4px 9px" }}>
            Open full screen <ArrowUpRight size={11} />
          </button>
          <X size={12} color="#9b9d9d" />
        </div>
        <ChatMessage />
      </div>
      <Composer />
    </PanelShell>
  );
}
