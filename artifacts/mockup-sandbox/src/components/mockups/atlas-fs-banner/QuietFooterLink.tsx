import { ArrowUpRight } from "lucide-react";
import { BrandRow, ChatMessage, Composer, PanelShell, T2 } from "../atlas-chat-header/_shared";

/**
 * D — Quiet link under the composer: one grey line of text with an inline
 * link — zero visual noise, always available rather than event-triggered.
 */
export function QuietFooterLink() {
  return (
    <PanelShell>
      <BrandRow />
      <ChatMessage />
      <Composer />
      <div className="flex items-center justify-center" style={{ padding: "0 12px 10px 12px", gap: 4, marginTop: -4 }}>
        <span style={{ fontSize: 11.5, color: T2 }}>Need a larger workspace?</span>
        <button className="flex items-center" style={{ gap: 2, fontSize: 11.5, fontWeight: 600, color: "#4a5ff7" }}>
          Open full screen <ArrowUpRight size={11} />
        </button>
      </div>
    </PanelShell>
  );
}
