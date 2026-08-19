import React from "react";
import { AtlasGlyph, BORDER, T1, T2 } from "./_shared";

const INDIGO = "#3b3fd8";
const INACTIVE = "#6f7171";
const DISABLED = "#767674";

function SidebarIcon({ color = T1, size = 13 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" /><line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}
function ExpandIcon({ color = T1, size = 13 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}
function Dot() {
  return (
    <span style={{ position: "relative", width: 7, height: 7, flexShrink: 0, display: "inline-flex" }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#22c07e" }} />
      <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#22c07e", opacity: 0.5 }} />
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.7px", color: T2, textTransform: "uppercase", marginBottom: 10 }}>{children}</div>;
}
function Note({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11.5, color: T2, maxWidth: 460, lineHeight: 1.5, marginTop: 8 }}>{children}</div>;
}

/*
 * Variant B — SHIPPED DESIGN.
 * Mirrors the in-app UnifiedAtlasControl (client/src/components/atlas.tsx):
 * - "Ask Atlas" is a borderless static label sitting outside the switcher (gap 1).
 * - Sidebar / Full view live in their own bordered, shadowed pill with a hairline divider.
 * - Active segment is indigo-tinted with a pulsing green dot; inactive text is #6f7171.
 * - When Full view is active, the Sidebar segment is disabled: #efeeeb background, #767674 icon/text.
 * - Full view uses asymmetric padding (0 14px 0 12px) to compensate for the trailing edge.
 * Variants A and C were retired during iteration (see notes at bottom of file).
 */
function VariantB({
  active = "sidebar",
}: {
  active?: "sidebar" | "fullview";
}) {
  const sidebarActive = active === "sidebar";
  const fullViewActive = active === "fullview";
  return (
    <div style={{ display: "inline-flex", alignItems: "stretch", height: 36, gap: 1, whiteSpace: "nowrap", flexShrink: 0 }}>
      {/* Ask Atlas — borderless static label */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "0 14px", fontSize: 13.5, fontWeight: 600, color: T1, letterSpacing: "0.2px", flexShrink: 0 }}>
        <AtlasGlyph size={17} /> Ask Atlas
      </div>

      {/* Bordered mode switcher */}
      <div style={{ display: "inline-flex", alignItems: "stretch", background: "#fff", border: `0.5px solid ${BORDER}`, borderRadius: 12, boxShadow: "0px 1px 4px rgba(0,0,0,0.06)", overflow: "hidden", flexShrink: 0 }}>
        {/* Sidebar segment — greyed-out (disabled) while Full view is active */}
        <button
          aria-pressed={sidebarActive}
          style={{ display: "flex", alignItems: "center", gap: 5, padding: "0 12px", background: fullViewActive ? "#efeeeb" : sidebarActive ? "#eef2ff" : "transparent", cursor: fullViewActive ? "not-allowed" : "pointer", transition: "background .12s", flexShrink: 0 }}
        >
          {sidebarActive && <Dot />}
          <SidebarIcon color={sidebarActive ? INDIGO : fullViewActive ? DISABLED : INACTIVE} size={13} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: sidebarActive ? INDIGO : fullViewActive ? DISABLED : INACTIVE, letterSpacing: "0.1px" }}>Sidebar</span>
        </button>

        {/* Divider */}
        <div style={{ width: 0.5, background: BORDER, flexShrink: 0 }} />

        {/* Full view segment — asymmetric padding compensates trailing edge */}
        <button
          aria-pressed={fullViewActive}
          style={{ display: "flex", alignItems: "center", gap: 5, padding: "0 14px 0 12px", background: fullViewActive ? "#eef2ff" : "transparent", cursor: "pointer", transition: "background .12s", flexShrink: 0 }}
        >
          {fullViewActive && <Dot />}
          <ExpandIcon color={fullViewActive ? INDIGO : INACTIVE} size={13} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: fullViewActive ? INDIGO : INACTIVE, letterSpacing: "0.1px" }}>Full view</span>
        </button>
      </div>
    </div>
  );
}

export function UnifiedAtlasControl() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center" style={{ background: "#f5f4f1", gap: 40 }}>
      <div>
        <Label>B — Shipped design (Sidebar active)</Label>
        <VariantB active="sidebar" />
        <Note>
          Final in-app design: Ask Atlas is a borderless static label outside the bordered Sidebar/Full view switcher.
          The active mode is indigo-tinted with a pulsing green dot; Full view has asymmetric padding (14px trailing / 12px leading).
        </Note>
      </div>
      <div>
        <Label>B — Shipped design (Full view active)</Label>
        <VariantB active="fullview" />
        <Note>Same control with Full view selected — the Sidebar segment is disabled (grey background, muted text) while Atlas runs in a separate tab.</Note>
      </div>
      <div>
        <Note>
          Retired explorations: Variant A (single segmented pill with Ask Atlas inside) and Variant C (pill-in-pill switcher)
          were dropped during iteration in favour of the detached borderless label above.
        </Note>
      </div>
    </div>
  );
}
