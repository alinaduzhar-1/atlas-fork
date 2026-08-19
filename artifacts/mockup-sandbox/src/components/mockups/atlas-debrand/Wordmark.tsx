import { ChatMessage, ChatTitle, Composer, HeaderRow, PanelShell, T1, T2 } from "./_shared";

/**
 * A — Plain wordmark: no logo at all. "Atlas" carries the identity as pure
 * type; "AI Guide" stays as the quiet descriptor. Zero added marks on a page
 * that already shows the Multiverse logo in the nav.
 */
export function Wordmark() {
  return (
    <PanelShell>
      <HeaderRow>
        <span className="font-semibold" style={{ fontSize: 15, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
        <span className="font-medium" style={{ fontSize: 14, letterSpacing: "0.28px", color: T2 }}>AI Guide</span>
      </HeaderRow>
      <ChatTitle />
      <ChatMessage />
      <Composer />
    </PanelShell>
  );
}
