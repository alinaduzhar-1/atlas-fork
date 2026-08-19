import { ArrowLeft } from "lucide-react";
import { ChatArea, BORDER, SidebarBody, T1, T2 } from "../atlas-debrand-fs/_shared";
import { useState } from "react";

/**
 * S3 — Reveal on sidebar hover: the back link is invisible by default and
 * fades in only when the user hovers the sidebar. Zero ambient noise;
 * the affordance is there exactly when you're looking for it.
 */
export function SidebarHoverReveal() {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="h-screen w-full flex" style={{ background: "#f5f4f1" }}>
      <div
        className="flex flex-col flex-shrink-0"
        style={{ width: 264, borderRight: `1px solid ${BORDER}`, background: "#faf9f7" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ padding: "16px 16px 0 16px" }}>
          <div className="flex flex-col" style={{ gap: 8 }}>
            <button
              className="flex items-center self-start transition-all"
              style={{
                gap: 4,
                color: "#9b9d9d",
                fontSize: 11.5,
                fontWeight: 500,
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateY(0)" : "translateY(-4px)",
                transition: "opacity 180ms ease, transform 180ms ease",
              }}
            >
              <ArrowLeft size={11} strokeWidth={1.8} color="#9b9d9d" />
              Back to Multiverse
            </button>
            <div className="flex items-baseline" style={{ gap: 8 }}>
              <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
            </div>
          </div>
        </div>
        <SidebarBody />
      </div>
      <ChatArea />
    </div>
  );
}
