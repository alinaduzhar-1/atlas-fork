import { Maximize2, PenSquare, Share2, Download, Trash2 } from "lucide-react";
import { BrandRow, ChatMessage, Composer, CHAT_NAME, T1, T2, BORDER } from "../atlas-chat-header/_shared";

const MENU_SHADOW = "0px 8px 24px rgba(0,0,0,0.14), 0px 0px 1px rgba(0,0,0,0.12)";

/**
 * H — Context menu: clicking ⋯ reveals a standard menu where "Open full
 * screen" is the first item — prominent without competing in the header.
 * Familiar pattern; no permanent UI cost. Works well when the header
 * has many actions and adding another button would overcrowd it.
 */
export function FsContextMenu() {
  return (
    <div className="min-h-screen w-full flex justify-center items-start" style={{ background: "#e9e8e4", padding: 16 }}>
      <div className="relative" style={{ width: 372 }}>
        <div
          className="flex flex-col rounded-xl overflow-hidden"
          style={{ width: 372, background: "#fff", border: `1px solid ${BORDER}`, height: 480 }}
        >
          {/* Header — ⋯ button in its depressed/active state */}
          <div className="flex items-center justify-between flex-shrink-0" style={{ padding: "8px 8px 0 8px", gap: 8 }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              <div className="flex items-center justify-center flex-shrink-0"
                style={{ width: 31, height: 30, borderRadius: 8.6, background: "#fff", transform: "rotate(-3.88deg)",
                  boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
                <span style={{ fontSize: 14 }}>〰️</span>
              </div>
              <span className="font-medium" style={{ fontSize: 14, letterSpacing: "0.28px", color: T1 }}>Ask Atlas</span>
            </div>
            <div className="flex items-center flex-shrink-0" style={{ gap: 4 }}>
              {[
                { label: "New chat", icon: <PenSquare size={14} />, active: false, primary: true },
                { label: "External", icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12l10-10M12 12V2H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, active: false, primary: false },
                { label: "More", icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="3" r="1" fill="currentColor"/><circle cx="7" cy="7" r="1" fill="currentColor"/><circle cx="7" cy="11" r="1" fill="currentColor"/></svg>, active: true, primary: false },
                { label: "Close", icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, active: false, primary: false },
              ].map(({ label, icon, active, primary }) => (
                <button key={label} aria-label={label}
                  className="flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    width: 32, height: 32,
                    background: primary ? "#4a5ff7" : active ? "#f0efec" : "#fff",
                    color: primary ? "#fff" : T1,
                    border: primary ? "none" : `1px solid ${BORDER}`,
                  }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: "14px 11px 20px 11px" }}>
            <button className="flex items-center gap-1 min-w-0 text-left rounded-md hover:bg-[#f0efec]" style={{ padding: "2px 4px", margin: "-2px -4px" }}>
              <span className="font-medium" style={{ fontSize: 16, letterSpacing: "0.24px", lineHeight: 1.5, color: T1 }}>{CHAT_NAME}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: T2 }}>
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <ChatMessage />
          <Composer />
        </div>

        {/* Dropdown menu — anchored below the ⋯ button (top-right) */}
        <div
          className="absolute rounded-xl overflow-hidden"
          style={{
            top: 48, right: 8,
            width: 210,
            background: "#fff",
            border: `1px solid ${BORDER}`,
            boxShadow: MENU_SHADOW,
            zIndex: 20,
          }}
        >
          {[
            { icon: <Maximize2 size={15} />, label: "Open full screen", highlight: true },
            { icon: <Share2 size={15} />, label: "Share chat" },
            { icon: <Download size={15} />, label: "Export as PDF" },
            { icon: <PenSquare size={15} />, label: "Rename chat" },
            { icon: <Trash2 size={15} />, label: "Delete chat", danger: true },
          ].map(({ icon, label, highlight, danger }, i) => (
            <button key={label}
              className="flex items-center gap-2-5 w-full text-left"
              style={{
                padding: "9px 12px",
                fontSize: 13.5,
                fontWeight: highlight ? 600 : 400,
                color: danger ? "#c0392b" : highlight ? "#4a5ff7" : T1,
                background: highlight ? "rgba(74,95,247,0.06)" : "transparent",
                borderBottom: i < 4 ? `1px solid ${BORDER}` : "none",
                gap: 10,
              }}>
              <span style={{ color: danger ? "#c0392b" : highlight ? "#4a5ff7" : "#6f7171" }}>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
