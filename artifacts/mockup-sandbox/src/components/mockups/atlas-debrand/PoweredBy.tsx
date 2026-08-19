import { ChatMessage, ChatTitle, Composer, HeaderRow, PanelShell, T1 } from "./_shared";

/**
 * B — Powered-by footnote: "Atlas" leads, the Multiverse association moves
 * into a single tiny grey line — brand credit kept, visual weight gone.
 */
export function PoweredBy() {
  return (
    <PanelShell>
      <HeaderRow>
        <div className="flex flex-col min-w-0" style={{ gap: 0 }}>
          <span className="font-semibold" style={{ fontSize: 15, letterSpacing: "0.2px", lineHeight: 1.2, color: T1 }}>Atlas</span>
          <span style={{ fontSize: 10.5, letterSpacing: "0.2px", color: "#9b9d9d", lineHeight: 1.3 }}>powered by Multiverse</span>
        </div>
      </HeaderRow>
      <ChatTitle />
      <ChatMessage />
      <Composer />
    </PanelShell>
  );
}
