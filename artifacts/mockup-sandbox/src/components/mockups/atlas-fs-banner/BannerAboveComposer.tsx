import { ArrowUpRight } from "lucide-react";
import { BrandRow, ChatMessage, Composer, PanelShell, T1, T2, BORDER } from "../atlas-chat-header/_shared";

/**
 * A — Banner above the composer: a soft indigo-tinted strip that sits between
 * the chat and the input. Copy + a compact "Open full screen" button.
 */
export function BannerAboveComposer() {
  return (
    <PanelShell>
      <BrandRow />
      <ChatMessage />
      <div className="mx-3 mb-2 rounded-lg flex items-center justify-between" style={{ background: "#eef0fe", border: "1px solid #d2d7fd", padding: "8px 10px", gap: 8 }}>
        <span style={{ fontSize: 12.5, color: T1, lineHeight: 1.4 }}>Get a larger workspace for longer conversations?</span>
        <button className="flex items-center flex-shrink-0 rounded-md" style={{ gap: 4, background: "#4a5ff7", color: "#fff", fontSize: 12, fontWeight: 600, padding: "5px 9px" }}>
          Open full screen <ArrowUpRight size={12} />
        </button>
      </div>
      <Composer />
    </PanelShell>
  );
}
