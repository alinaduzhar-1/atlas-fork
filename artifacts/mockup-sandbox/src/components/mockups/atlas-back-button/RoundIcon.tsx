import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { BORDER, ChatArea, SidebarBody, T1, T2 } from "../atlas-debrand-fs/_shared";

/**
 * V2 — Icon-only round button: a small circular button with just the arrow,
 * top-left of the chat area. Label slides out on hover ("Back to Multiverse").
 * Minimal footprint, self-explanatory on interaction.
 */
export function RoundIcon() {
  const [hover, setHover] = useState(false);
  return (
    <div className="h-screen w-full flex" style={{ background: "#f5f4f1" }}>
      <div className="flex flex-col flex-shrink-0" style={{ width: 264, borderRight: `1px solid ${BORDER}`, background: "#faf9f7" }}>
        <div style={{ padding: "16px 16px 0 16px" }}>
          <div className="flex items-baseline" style={{ gap: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
          </div>
        </div>
        <SidebarBody />
      </div>
      <div className="flex-1 flex flex-col relative" style={{ minWidth: 0 }}>
        <button
          className="flex items-center"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            position: "absolute", top: 14, left: 16, zIndex: 10,
            height: 30, borderRadius: 999,
            padding: hover ? "0 12px 0 8px" : "0 8px",
            border: `1px solid ${BORDER}`, background: "rgba(251,250,248,0.9)",
            color: "#6f7171", fontSize: 12, fontWeight: 500,
            gap: hover ? 5 : 0, transition: "all 200ms ease", overflow: "hidden", whiteSpace: "nowrap",
          }}
          title="Back to Multiverse"
        >
          <ArrowLeft size={13} strokeWidth={1.8} />
          <span style={{ maxWidth: hover ? 140 : 0, opacity: hover ? 1 : 0, transition: "all 200ms ease" }}>
            Back to Multiverse
          </span>
        </button>
        <ChatArea />
      </div>
    </div>
  );
}
