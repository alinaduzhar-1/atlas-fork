import React from "react";
import { PenSquare, Search } from "lucide-react";

export const T1 = "#212223";
export const T2 = "#6f7171";
export const BORDER = "#dbdad6";
export const HOVER_BG = "#f3f2f0";
export const INDIGO = "#4a5ff7";
export const BG = "#faf9f7";

export const CHATS = [
  { title: "Help with project submission deadline", active: true },
  { title: "KSB mapping for Data Analysis unit", active: false },
  { title: "Feedback on my portfolio draft", active: false },
  { title: "Planning my EPA preparation", active: false },
  { title: "Weekly OTJ hours summary", active: false },
  { title: "Understanding grading criteria", active: false },
];

export function Logo() {
  return (
    <div className="flex items-center" style={{ padding: "10px 10px 6px", gap: 8 }}>
      <div className="flex items-center justify-center flex-shrink-0"
        style={{ width: 26, height: 25, borderRadius: 7, background: "#fff", transform: "rotate(-3.88deg)",
          boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
        <span style={{ fontSize: 12 }}>〰️</span>
      </div>
      <span style={{ fontSize: 14, fontWeight: 500, color: T1, letterSpacing: "0.3px" }}>Atlas</span>
      <span style={{ fontSize: 14, fontWeight: 500, color: T2, letterSpacing: "0.3px", marginLeft: -4 }}>AI Guide</span>
    </div>
  );
}

export function SearchBox({ right }: { right?: React.ReactNode }) {
  return (
    <div className="flex items-center" style={{ padding: "0 8px", gap: 6 }}>
      <div className="flex items-center flex-1 rounded bg-white"
        style={{ height: 32, padding: "0 10px", gap: 6, border: `1px solid ${BORDER}`, boxShadow: "0px 1px 4px rgba(0,0,0,0.06)" }}>
        <Search size={13} color={T2} />
        <span style={{ fontSize: 12.5, color: T2, letterSpacing: "0.28px" }}>Search history</span>
      </div>
      {right}
    </div>
  );
}

export function RecentsList({ topRow }: { topRow?: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ padding: "10px 8px 0", gap: 4 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: T2, letterSpacing: "0.24px", padding: "0 4px 2px" }}>Recents</span>
      {topRow}
      {CHATS.map((c) => (
        <div key={c.title} className="rounded-md truncate"
          style={{
            padding: "7px 8px", fontSize: 12.5, color: T1, letterSpacing: "0.2px",
            background: c.active ? HOVER_BG : "transparent",
            fontWeight: c.active ? 500 : 400,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
          {c.title}
        </div>
      ))}
    </div>
  );
}

export function SidebarFooter({ newChatButton }: { newChatButton?: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-shrink-0">
      {newChatButton}
      <div style={{ height: 1, background: BORDER }} />
      <div className="flex items-center" style={{ padding: "8px 10px", gap: 8 }}>
        <span style={{ fontSize: 13, color: INDIGO }}>⬡</span>
        <div className="flex flex-col">
          <span style={{ fontSize: 10, fontWeight: 600, color: T2 }}>Atlas is powered by</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: T1 }}>Multiverse</span>
        </div>
      </div>
    </div>
  );
}

export function MainArea({ headerRight }: { headerRight?: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col" style={{ background: "#fff" }}>
      {/* Main header */}
      <div className="flex items-center justify-between flex-shrink-0" style={{ padding: "12px 20px", borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-1">
          <span style={{ fontSize: 15, fontWeight: 500, color: T1, letterSpacing: "0.24px" }}>
            Help with project submission deadline
          </span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: T2, marginLeft: 4 }}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {headerRight}
      </div>
      {/* Conversation */}
      <div className="flex-1 flex flex-col items-center overflow-hidden" style={{ padding: "24px 0" }}>
        <div className="flex flex-col w-full" style={{ maxWidth: 560, gap: 14, padding: "0 20px" }}>
          <div className="self-end rounded-2xl px-3-5 py-2" style={{ background: "#edebe8", color: T1, fontSize: 13.5, padding: "8px 14px", maxWidth: "75%" }}>
            What should I focus on this week?
          </div>
          <div style={{ color: T1, fontSize: 13.5, lineHeight: 1.6 }}>
            Based on your progress, I'd focus on your portfolio evidence for the Data Analysis unit — you have two KSBs that still need mapped evidence. Your project submission is due Friday, so prioritising those first will keep you on track.
          </div>
        </div>
      </div>
      {/* Composer */}
      <div className="flex-shrink-0 flex justify-center" style={{ padding: "0 20px 20px" }}>
        <div className="w-full rounded-xl" style={{ maxWidth: 560, border: `1px solid ${BORDER}`, padding: "12px 14px", background: BG }}>
          <div style={{ fontSize: 13, color: T2 }}>Ask me anything...</div>
          <div className="flex justify-between items-center" style={{ marginTop: 14 }}>
            <span style={{ fontSize: 15, color: T2 }}>+</span>
            <div className="rounded-lg flex items-center justify-center" style={{ width: 28, height: 28, background: "#c3cafb" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 10V2M2.5 5.5L6 2l3.5 3.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NewChatPrimaryBtn({ full }: { full?: boolean }) {
  return (
    <button className="flex items-center justify-center rounded-lg"
      style={{
        background: INDIGO, color: "#fff", fontSize: 12.5, fontWeight: 600,
        height: 32, padding: "0 12px", gap: 6, width: full ? "100%" : undefined,
      }}>
      <PenSquare size={13} />
      New chat
    </button>
  );
}

export function FsShell({ sidebar, main }: { sidebar: React.ReactNode; main: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex" style={{ background: "#e9e8e4", padding: 14 }}>
      <div className="flex w-full rounded-xl overflow-hidden" style={{ border: `1px solid ${BORDER}`, height: 570, background: "#fff" }}>
        <aside className="flex flex-col justify-between flex-shrink-0" style={{ width: 230, background: BG, borderRight: `1px solid ${BORDER}`, paddingTop: 4, paddingBottom: 0 }}>
          {sidebar}
        </aside>
        {main}
      </div>
    </div>
  );
}
