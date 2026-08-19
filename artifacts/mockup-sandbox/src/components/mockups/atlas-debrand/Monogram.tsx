import { ChatMessage, ChatTitle, Composer, HeaderRow, PanelShell, T1, T2 } from "./_shared";

/**
 * D — Monogram avatar: a small rounded "A" tile gives Atlas its own identity
 * as a persona/agent — reads like a chat participant's avatar rather than a
 * corporate logo, and doubles as the avatar beside Atlas messages.
 */
export function Monogram() {
  return (
    <PanelShell>
      <HeaderRow>
        <div className="flex items-center justify-center flex-shrink-0 rounded-lg" style={{ width: 24, height: 24, background: "#4a5ff7" }}>
          <span className="font-semibold" style={{ fontSize: 13, color: "#fff" }}>A</span>
        </div>
        <span className="font-semibold" style={{ fontSize: 15, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
        <span className="font-medium" style={{ fontSize: 14, letterSpacing: "0.28px", color: T2 }}>AI Guide</span>
      </HeaderRow>
      <ChatTitle />
      <ChatMessage />
      <Composer />
    </PanelShell>
  );
}
