import React from "react";
import { AtlasGlyph, BORDER, T1, T2 } from "./_shared";

function SidebarIcon({ color = T1 }: { color?: string }) {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" /><line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

function ExpandIcon({ color = T1 }: { color?: string }) {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={T2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function IconBtn({
  active, disabled, hoverable, tooltip, children, title,
}: {
  active?: boolean; disabled?: boolean; hoverable?: boolean; tooltip?: string; children: React.ReactNode; title: string;
}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        title={title}
        disabled={disabled}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: 26, borderRadius: 7, padding: "0 6px",
          background: active ? "#eef2ff" : (!disabled && hoverable && hovered) ? "#f3f4f6" : "transparent",
          border: active ? "0.5px solid #dfe5fd" : (!disabled && hoverable && hovered) ? "0.5px solid #e5e6e8" : "0.5px solid transparent",
          opacity: disabled ? 0.3 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background .12s, border .12s",
        }}
      >
        {children}
      </button>
      {tooltip && hovered && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
          background: "#212223", color: "#fff", fontSize: 11, lineHeight: 1.45,
          padding: "7px 10px", borderRadius: 7, width: 200, textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.18)", pointerEvents: "none", zIndex: 10,
        }}>
          {tooltip}
          <div style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, background: "#212223", rotate: "45deg" }} />
        </div>
      )}
    </div>
  );
}

function ChatBubble() {
  return (
    <div style={{ padding: "14px 14px 20px", fontSize: 12.5, color: T2, lineHeight: 1.55 }}>
      Hey Sarah, I can help you navigate your apprenticeship…
      <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["What should I focus on next?", "Plan my next 2 weeks"].map(q => (
          <div key={q} style={{ fontSize: 12, color: "#4a5ff7", background: "#eef2ff", borderRadius: 8, padding: "5px 10px", border: "0.5px solid #dfe5fd" }}>{q}</div>
        ))}
      </div>
    </div>
  );
}

function Panel({
  mode, label, note,
}: {
  mode: "sidebar" | "fullscreen";
  label: string;
  note: string;
}) {
  const isSidebar = mode === "sidebar";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.7px", color: isSidebar ? "#4a5ff7" : "#22c07e", textTransform: "uppercase" }}>{label}</div>
      <div style={{ width: 360, background: "#fff", border: `0.5px solid ${BORDER}`, borderRadius: 14, boxShadow: "0 6px 20px rgba(26,29,35,0.08)", overflow: "hidden" }}>
        {/* Header */}
        <div className="flex items-center justify-between" style={{ padding: "10px 12px", borderBottom: `0.5px solid ${BORDER}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: T1 }}>
            Atlas <AtlasGlyph size={15} /> <span style={{ fontWeight: 400, color: T2 }}>AI Guide</span>
          </div>
          <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
            {/* Sidebar — active when in sidebar mode, disabled only when fullscreen is on */}
            <IconBtn title="Sidebar panel" active={isSidebar} disabled={!isSidebar} tooltip={!isSidebar ? "Atlas is running in a new tab. The sidebar is paused until you close it." : undefined}>
              {isSidebar && (
                <span style={{ position: "relative", width: 7, height: 7, flexShrink: 0, display: "inline-flex", marginRight: 4 }}>
                  <span style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#22c07e" }} />
                  <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#22c07e", opacity: 0.5 }} />
                </span>
              )}
              <SidebarIcon color={isSidebar ? "#3b3fd8" : T2} />
              <span style={{ fontSize: 11, fontWeight: 600, color: isSidebar ? "#3b3fd8" : T2, whiteSpace: "nowrap", padding: "0 2px" }}>Sidebar</span>
            </IconBtn>
            {/* Full view — always clickable in sidebar mode; active + sidebar disabled when fullscreen is on */}
            <IconBtn title="Full view" active={!isSidebar} disabled={false} hoverable={isSidebar}>
              {!isSidebar && (
                <span style={{ position: "relative", width: 7, height: 7, flexShrink: 0, display: "inline-flex", marginRight: 4 }}>
                  <span style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#22c07e" }} />
                  <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#22c07e", opacity: 0.5 }} />
                </span>
              )}
              <ExpandIcon color={!isSidebar ? "#3b3fd8" : T2} />
              <span style={{ fontSize: 11, fontWeight: 600, color: !isSidebar ? "#3b3fd8" : T2, whiteSpace: "nowrap", padding: "0 2px" }}>Full view</span>
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Sidebar and Full screen are mutually exclusive — one disables the other */
export function PanelHeaderExclusive() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center" style={{ background: "#f5f4f1", gap: 32 }}>
      <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
        <Panel
          mode="sidebar"
          label="Sidebar open (default)"
          note="Sidebar icon is active. Full screen is dimmed — clicking it closes the panel and opens the full-screen tab."
        />
        <div style={{ width: 0.5, background: BORDER, alignSelf: "stretch", marginTop: 28 }} />
        <Panel
          mode="fullscreen"
          label="Full screen on"
          note="Full screen icon glows active. Sidebar is dimmed — clicking it is blocked until the full-screen tab is closed."
        />
      </div>
    </div>
  );
}
