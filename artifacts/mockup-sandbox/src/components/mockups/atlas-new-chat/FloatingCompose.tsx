import { PenSquare, Search } from "lucide-react";
import { BORDER, INDIGO, T1, T2 } from "../atlas-debrand-fs/_shared";

const RECENTS = [
  { label: "Help with project submission deadline", active: true },
  { label: "Weekly OTJ planning", active: false },
  { label: "Portfolio evidence for Data Analysis", active: false },
  { label: "Career development advice", active: false },
];

/**
 * A — Floating compose button: a circular indigo FAB fixed to the
 * bottom-right of the chat area. "New chat" is always one click away
 * without occupying any sidebar real estate.
 */
export function FloatingCompose() {
  return (
    <div className="h-screen w-full flex" style={{ background: "#f5f4f1" }}>
      {/* Sidebar — no New chat button */}
      <div className="flex flex-col flex-shrink-0" style={{ width: 264, borderRight: `1px solid ${BORDER}`, background: "#faf9f7" }}>
        <div style={{ padding: "16px 16px 12px 16px" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline" style={{ gap: 8 }}>
              <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
            </div>
          </div>
        </div>
        <div className="flex items-center rounded-lg" style={{ gap: 6, margin: "0 12px 8px 12px", padding: "7px 10px", border: `1px solid ${BORDER}`, color: "#9b9d9d", fontSize: 12.5 }}>
          <Search size={13} /> Search chats
        </div>
        <div style={{ margin: "0 12px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.5px", color: T2, textTransform: "uppercase", marginBottom: 6 }}>Recent</div>
          {RECENTS.map(({ label, active }) => (
            <div key={label} className="rounded-lg" style={{ padding: "7px 8px", fontSize: 12.5, color: T1, background: active ? "#edecf9" : "transparent", fontWeight: active ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col relative" style={{ background: "#fff" }}>
        <div className="flex items-center justify-between" style={{ padding: "14px 24px", borderBottom: `1px solid ${BORDER}` }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: T1 }}>Help with project submission deadline</span>
          <span style={{ color: T2, fontSize: 18, letterSpacing: 2 }}>⋯</span>
        </div>
        <div className="flex-1" style={{ padding: "28px 120px" }}>
          <div className="self-end rounded-2xl" style={{ float: "right", background: "#edebe8", color: T1, fontSize: 14, padding: "10px 14px", maxWidth: "70%", marginBottom: 18 }}>
            What should I focus on this week?
          </div>
        </div>
        <div style={{ padding: "0 120px 28px 120px" }}>
          <div className="rounded-xl" style={{ border: `1px solid ${BORDER}`, padding: "12px 14px" }}>
            <div style={{ fontSize: 14, color: "#9b9d9d" }}>Ask me anything...</div>
            <div className="flex items-center justify-between" style={{ marginTop: 14 }}>
              <span style={{ color: T2, fontSize: 18 }}>+</span>
              <div className="flex items-center justify-center rounded-lg" style={{ width: 30, height: 30, background: "#aab4fa" }}>
                <span style={{ color: "#fff", fontSize: 15 }}>↑</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAB */}
        <button
          className="flex items-center justify-center rounded-full shadow-lg"
          style={{
            position: "absolute",
            bottom: 100,
            right: 28,
            width: 48,
            height: 48,
            background: INDIGO,
            color: "#fff",
            border: "none",
            boxShadow: "0 4px 16px rgba(74,95,247,0.35)",
          }}
          title="New chat"
          aria-label="New chat"
        >
          <PenSquare size={20} />
        </button>
      </div>
    </div>
  );
}
