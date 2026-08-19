import { Sparkles } from "lucide-react";
import { ChatMessage, ChatTitle, Composer, HeaderRow, PanelShell, T1, T2 } from "./_shared";

/**
 * C — Neutral spark glyph: keeps an icon so the row doesn't feel bare, but
 * it's a generic AI spark in brand indigo — signals "assistant", not a logo.
 */
export function SparkGlyph() {
  return (
    <PanelShell>
      <HeaderRow>
        <Sparkles size={15} style={{ color: "#4a5ff7", flexShrink: 0 }} />
        <span className="font-semibold" style={{ fontSize: 15, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
        <span className="font-medium" style={{ fontSize: 14, letterSpacing: "0.28px", color: T2 }}>AI Guide</span>
      </HeaderRow>
      <ChatTitle />
      <ChatMessage />
      <Composer />
    </PanelShell>
  );
}
