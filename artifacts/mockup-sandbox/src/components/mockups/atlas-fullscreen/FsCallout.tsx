import { BrandRow, ChatMessage, Composer, PanelShell, CHAT_NAME, T1, T2 } from "../atlas-chat-header/_shared";

/**
 * C — First-run callout: keep the current icon button but teach it once
 * with a dismissible tooltip-style callout pointing at it. Discoverability
 * without permanent UI cost.
 */
export function FsCallout() {
  return (
    <PanelShell>
      <div className="relative">
        <BrandRow />
        {/* Callout pointing at the full screen button (2nd from left in button group) */}
        <div className="absolute" style={{ top: 46, right: 66, zIndex: 5 }}>
          <div style={{
            position: "absolute", top: -5, right: 14, width: 10, height: 10,
            background: "#212223", transform: "rotate(45deg)", borderRadius: 2,
          }} />
          <div className="rounded-lg" style={{ background: "#212223", color: "#fff", padding: "8px 10px", width: 190, boxShadow: "0px 8px 20px rgba(0,0,0,0.25)" }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 2 }}>More room to think</div>
            <div style={{ fontSize: 11.5, lineHeight: 1.45, color: "#c9cbcb" }}>
              Open Atlas in full screen for longer conversations.
            </div>
            <div className="flex justify-end" style={{ marginTop: 6 }}>
              <button style={{ fontSize: 11, fontWeight: 600, color: "#aab4fa" }}>Got it</button>
            </div>
          </div>
        </div>
      </div>
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
    </PanelShell>
  );
}
