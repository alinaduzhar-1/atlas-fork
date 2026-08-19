import { useState } from "react";
import { Search, MoreHorizontal, Pin } from "lucide-react";
import "./_group.css";

export const TEXT_PRIMARY = "#212223";
export const TEXT_SECONDARY = "#6f7171";
export const HOVER_BG = "#f3f2f0";
export const BORDER = "#dbdad6";

export type Chat = {
  id: string;
  name: string;
  preview: string;
  when: string; // relative time label
  day: "Pinned" | "Today" | "This week" | "Earlier";
  pinned?: boolean;
};

export const chats: Chat[] = [
  { id: "c1", name: "Help with project submission deadline", preview: "Your current project submission deadline is Friday, 20th December…", when: "2h", day: "Pinned", pinned: true },
  { id: "c2", name: "Understanding KSB requirements", preview: "KSBs stands for Knowledge, Skills, and Behaviours - these are the core…", when: "5h", day: "Today" },
  { id: "c3", name: "Off-the-job training questions", preview: "Off-the-job training is learning that takes place outside of your normal…", when: "1d", day: "Today" },
  { id: "c4", name: "Portfolio evidence guidance and examples for my data module", preview: "Your portfolio should contain evidence that demonstrates your…", when: "2d", day: "This week" },
  { id: "c5", name: "End-point assessment preparation", preview: "The End-Point Assessment (EPA) is your final assessment to…", when: "3d", day: "This week" },
  { id: "c6", name: "Career development advice", preview: "Great to hear you're thinking about your longer-term career…", when: "5d", day: "This week" },
  { id: "c7", name: "Time management strategies for balancing work and study", preview: "Balancing apprenticeship study with your day job is a common…", when: "1w", day: "Earlier" },
  { id: "c8", name: "Preparing for my coach check-in", preview: "Your next coach check-in is a great opportunity to reflect on…", when: "2w", day: "Earlier" },
];

export function PinGlyph({ size = 14 }: { size?: number }) {
  return <Pin size={size} color={TEXT_SECONDARY} style={{ flexShrink: 0 }} />;
}

export function MoreButton({ visible }: { visible: boolean }) {
  return (
    <button
      aria-label="More options"
      className="flex items-center justify-center rounded-md flex-shrink-0"
      style={{
        width: 24,
        height: 24,
        border: `1px solid ${BORDER}`,
        background: "#fff",
        visibility: visible ? "visible" : "hidden",
        opacity: visible ? 1 : 0,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <MoreHorizontal size={14} color={TEXT_PRIMARY} />
    </button>
  );
}

export function PanelShell({ children, label = "Recents" }: { children: React.ReactNode; label?: string | null }) {
  return (
    <div className="min-h-screen w-full flex justify-center" style={{ background: "#e9e8e4", padding: 16 }}>
      <div
        className="flex flex-col w-full rounded-xl"
        style={{ maxWidth: 344, background: "#fff", border: `1px solid ${BORDER}`, padding: 12, gap: 12 }}
      >
        <div
          className="flex items-center rounded-lg"
          style={{ gap: 8, padding: "8px 10px", border: `1px solid ${BORDER}` }}
        >
          <Search size={14} color={TEXT_SECONDARY} />
          <span style={{ fontSize: 13, color: "#9b9d9d", letterSpacing: "0.26px" }}>Search history</span>
        </div>
        <div className="flex flex-col" style={{ gap: 8 }}>
          {label && (
            <span style={{ fontSize: 12, fontWeight: 600, color: TEXT_SECONDARY, letterSpacing: "0.24px" }}>
              {label}
            </span>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export function useHover() {
  const [hovered, setHovered] = useState<string | null>(null);
  return { hovered, setHovered };
}
