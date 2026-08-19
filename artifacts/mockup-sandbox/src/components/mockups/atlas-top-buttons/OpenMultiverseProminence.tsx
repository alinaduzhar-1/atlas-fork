// Prominence explorations for the "Open Multiverse" control in full-view Atlas.
// All variants stay within Stardust conventions: Inter-ish system sans, indigo
// action color, 0.5px #dbdad6 hairlines, 12px radii, subtle shadows.

const HeaderShell = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 12,
      height: 56,
      padding: "0 16px",
      background: "#ffffff",
      border: "0.5px solid #dbdad6",
      borderRadius: 12,
    }}
  >
    {children}
    {/* dots + avatar to mirror the real header */}
    <div
      style={{
        width: 32, height: 32, borderRadius: 10, border: "0.5px solid #dbdad6",
        display: "flex", alignItems: "center", justifyContent: "center", color: "#6f7171", fontSize: 15,
      }}
    >
      ⋮
    </div>
    <div
      style={{
        width: 32, height: 32, borderRadius: "50%", background: "#3b3fd8", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600,
      }}
    >
      SM
    </div>
  </div>
);

const Label = ({ title, note }: { title: string; note: string }) => (
  <div style={{ marginBottom: 8 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a19", letterSpacing: "0.2px" }}>{title}</div>
    <div style={{ fontSize: 12, color: "#6f7171", letterSpacing: "0.2px" }}>{note}</div>
  </div>
);

const baseText: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: "0.2px",
  whiteSpace: "nowrap",
  cursor: "pointer",
  fontFamily: "inherit",
};

export function OpenMultiverseProminence() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9f8f6", padding: 24, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: "#1a1a19", marginBottom: 16 }}>
        “Open Multiverse” — prominence options (full-view header)
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div>
          <Label title="A · Current" note="Underlined text link — quiet, reads as inline navigation" />
          <HeaderShell>
            <button style={{ ...baseText, color: "#565858", background: "none", border: "none", textDecoration: "underline", textUnderlineOffset: 2 }}>
              Open Multiverse
            </button>
          </HeaderShell>
        </div>

        <div>
          <Label title="B · Secondary button" note="Stardust secondary — bordered white pill, neutral text; +1 step of prominence" />
          <HeaderShell>
            <button
              style={{
                ...baseText,
                display: "flex", alignItems: "center", gap: 6,
                height: 32, padding: "0 12px",
                color: "#1a1a19", background: "#ffffff",
                border: "0.5px solid #dbdad6", borderRadius: 10,
                boxShadow: "0px 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <span style={{ fontSize: 12 }}>←</span>
              Open Multiverse
            </button>
          </HeaderShell>
        </div>

        <div>
          <Label title="C · Stardust text button" note="Indigo text, no bg/border — same as Stardust variant='text'; clean, on-brand" />
          <HeaderShell>
            <button
              style={{
                ...baseText,
                display: "flex", alignItems: "center", gap: 5,
                height: 32, padding: "0 4px",
                color: "#3b3fd8", background: "none",
                border: "none", fontWeight: 600,
              }}
            >
              Open Multiverse
              <span style={{ fontSize: 13 }}>→</span>
            </button>
          </HeaderShell>
        </div>

        <div>
          <Label title="C2 · Stardust text + tint pill on hover" note="Text button with subtle hover state (tint bg appears); more affordance than plain text" />
          <HeaderShell>
            <button
              style={{
                ...baseText,
                display: "flex", alignItems: "center", gap: 5,
                height: 32, padding: "0 10px",
                color: "#3b3fd8", background: "#eef2ff",
                border: "none", borderRadius: 10, fontWeight: 600,
              }}
            >
              Open Multiverse
              <span style={{ fontSize: 13 }}>→</span>
            </button>
          </HeaderShell>
        </div>

        <div>
          <Label title="C3 · Stardust outline button" note="White bg, indigo 1.5px border — standard Outline variant; clearly a button" />
          <HeaderShell>
            <button
              style={{
                ...baseText,
                display: "flex", alignItems: "center", gap: 5,
                height: 32, padding: "0 12px",
                color: "#3b3fd8", background: "#ffffff",
                border: "1.5px solid #3b3fd8", borderRadius: 10, fontWeight: 600,
              }}
            >
              Open Multiverse
              <span style={{ fontSize: 13 }}>→</span>
            </button>
          </HeaderShell>
        </div>

        <div>
          <Label title="D · Primary indigo" note="Full primary button — strongest; competes with New chat, use only if it's THE exit action" />
          <HeaderShell>
            <button
              style={{
                ...baseText,
                display: "flex", alignItems: "center", gap: 6,
                height: 32, padding: "0 14px",
                color: "#ffffff", background: "#4a5ff7",
                border: "none", borderRadius: 10, fontWeight: 600,
              }}
            >
              Open Multiverse
            </button>
          </HeaderShell>
        </div>
      </div>
      <div style={{ marginTop: 18, fontSize: 12, color: "#6f7171", maxWidth: 640, lineHeight: 1.5 }}>
        Recommendation: B or C. Both lift the control out of “plain text” without out-shouting the
        primary actions in the header. C adds a directional ← to reinforce “go back to the app”.
      </div>
    </div>
  );
}
