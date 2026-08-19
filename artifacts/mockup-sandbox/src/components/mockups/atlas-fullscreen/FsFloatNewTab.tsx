import { BrandRow, ChatMessage, Composer, PanelShell, CHAT_NAME, T1, T2 } from "../atlas-chat-header/_shared";

/**
 * E (iterated) — Floating FAB → opens in a new tab.
 * The FAB uses a "new tab" icon (external-link arrow into a tab) instead
 * of a plain maximize glyph, and a tooltip reads "Open in new tab" so
 * the behaviour is unambiguous before the user clicks.
 */
export function FsFloatNewTab() {
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

      {/* Chat area */}
      <div className="flex-1 relative overflow-hidden px-3 flex flex-col" style={{ gap: 10 }}>
        <div className="self-end rounded-2xl px-3 py-2 max-w-[80%]"
          style={{ background: "#edebe8", color: T1, fontSize: 13.5 }}>
          What should I focus on this week?
        </div>
        <div style={{ color: T1, fontSize: 13.5, lineHeight: 1.5, maxWidth: "92%" }}>
          Based on your progress, I'd focus on your portfolio evidence for the Data Analysis unit — you have two KSBs that still need mapped evidence.
        </div>

        {/* FAB + tooltip (shown in hover state) */}
        <div className="absolute" style={{ bottom: 10, right: 4 }}>
          {/* Tooltip above the FAB */}
          <div style={{ position: "absolute", bottom: "calc(100% + 8px)", right: 0, whiteSpace: "nowrap" }}>
            {/* tooltip body */}
            <div className="rounded-lg flex items-center gap-1-5"
              style={{
                background: "#212223",
                color: "#fff",
                fontSize: 11.5,
                fontWeight: 500,
                padding: "5px 9px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                gap: 6,
              }}>
              {/* new-tab icon in tooltip */}
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <rect x="0.5" y="3.5" width="7" height="7" rx="1.5" stroke="#fff" strokeWidth="1.1"/>
                <path d="M4 0.5h6.5v6.5" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Open in new tab
            </div>
            {/* arrow */}
            <div style={{
              position: "absolute", bottom: -4, right: 12,
              width: 8, height: 8,
              background: "#212223",
              transform: "rotate(45deg)",
              borderRadius: 1,
            }} />
          </div>

          {/* FAB */}
          <button
            aria-label="Open in new tab"
            className="flex items-center justify-center rounded-full"
            style={{
              width: 36, height: 36,
              background: "#4a5ff7",
              color: "#fff",
              boxShadow: "0 4px 14px rgba(74,95,247,0.45)",
            }}
          >
            {/* New-tab icon: external-link arrow inside a tab outline */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="5" width="10" height="10" rx="2" stroke="white" strokeWidth="1.4"/>
              <path d="M7 1h8v8" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 1L8 8" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      <Composer />
    </PanelShell>
  );
}
