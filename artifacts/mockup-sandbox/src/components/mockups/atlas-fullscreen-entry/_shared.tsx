import React from "react";

export const T1 = "#212223";
export const T2 = "#6f7171";
export const BORDER = "#dbdad6";
export const INDIGO = "#4a5ff7";
export const BG = "#f5f4f1";

export function Hexagon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 20 17" fill="none">
      <path d="M5.2 0.8h9.6l4.6 7.7-4.6 7.7H5.2L0.6 8.5 5.2 0.8z" stroke={INDIGO} strokeWidth="1.6" fill="none" />
    </svg>
  );
}

export function ExpandIcon({ size = 14, color = T2 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

/** Multiverse global top navigation bar */
export function TopNav({ rightExtra }: { rightExtra?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between" style={{ height: 56, padding: "0 20px", background: "#fff", borderBottom: `1px solid ${BORDER}` }}>
      <div className="flex items-center" style={{ gap: 28 }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          <Hexagon size={22} />
          <span style={{ fontSize: 15, fontWeight: 700, color: T1, letterSpacing: "0.3px" }}>Multiverse</span>
        </div>
        <div className="flex items-center" style={{ gap: 20 }}>
          {["Home", "Learning", "Off-the-job", "Portfolio"].map((l, i) => (
            <span key={l} style={{ fontSize: 13.5, fontWeight: i === 0 ? 600 : 500, color: i === 0 ? T1 : T2 }}>{l}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center" style={{ gap: 12 }}>
        {rightExtra}
        <div className="rounded-full flex items-center justify-center" style={{ width: 32, height: 32, background: "#e8e6f8", color: INDIGO, fontSize: 12, fontWeight: 700 }}>SM</div>
      </div>
    </div>
  );
}

/** Simplified home dashboard content */
export function HomeBody({ topSlot }: { topSlot?: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-hidden" style={{ padding: "28px 40px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: T1, marginBottom: 4 }}>Good morning, Sarah</h1>
        <p style={{ fontSize: 13.5, color: T2, marginBottom: 20 }}>Week 32 of your Data Fellowship apprenticeship</p>
        {topSlot}
        <div className="grid grid-cols-3" style={{ gap: 14 }}>
          {[
            ["OTJ hours this week", "4h 20m", "of 6h target"],
            ["Next deadline", "Aug 14", "Project submission"],
            ["KSBs evidenced", "18 / 24", "6 remaining"],
          ].map(([t, v, s]) => (
            <div key={t} className="rounded-xl" style={{ background: "#fff", border: `1px solid ${BORDER}`, padding: 16 }}>
              <div style={{ fontSize: 12, color: T2, marginBottom: 8 }}>{t}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: T1 }}>{v}</div>
              <div style={{ fontSize: 12, color: T2, marginTop: 2 }}>{s}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl" style={{ background: "#fff", border: `1px solid ${BORDER}`, padding: 16, marginTop: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T1, marginBottom: 10 }}>Up next</div>
          {["Complete unit 4 quiz — Data modelling", "Review coach feedback on project draft", "Log this week's workshop hours"].map(t => (
            <div key={t} className="flex items-center" style={{ gap: 10, padding: "7px 0", borderTop: `1px solid #eeede9` }}>
              <div style={{ width: 14, height: 14, borderRadius: 4, border: `1.5px solid ${BORDER}` }} />
              <span style={{ fontSize: 13, color: T1 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Atlas sidebar panel (right side) in chat mode */
export function AtlasPanel({ headerExtra, listHover }: { headerExtra?: React.ReactNode; listHover?: boolean }) {
  const chats = [
    { name: "Help with project submission deadline", when: "Today", hot: true },
    { name: "Understanding KSB requirements", when: "Today" },
    { name: "Off-the-job training questions", when: "Yesterday" },
    { name: "Portfolio evidence guidance", when: "Mon" },
  ];
  return (
    <div className="flex flex-col" style={{ width: 340, background: BG, borderLeft: `1px solid ${BORDER}` }}>
      <div className="flex items-center justify-between" style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center" style={{ gap: 7 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: T1 }}>Atlas</span>
          <Hexagon size={16} />
          <span style={{ fontSize: 14, fontWeight: 500, color: T2 }}>AI Guide</span>
        </div>
        <div className="flex items-center" style={{ gap: 10 }}>
          {headerExtra}
          <span style={{ color: T2, fontSize: 16, lineHeight: 1 }}>×</span>
        </div>
      </div>
      <div style={{ padding: "12px 14px", fontSize: 11.5, fontWeight: 600, color: T2, letterSpacing: "0.5px" }}>RECENT CHATS</div>
      <div style={{ padding: "0 8px" }}>
        {chats.map((c, i) => (
          <div
            key={c.name}
            className="group flex items-center justify-between rounded-lg"
            style={{ padding: "9px 10px", background: c.hot && listHover ? "#eceae4" : "transparent" }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, color: T1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 220 }}>{c.name}</div>
              <div style={{ fontSize: 11.5, color: T2 }}>{c.when}</div>
            </div>
            {c.hot && listHover && (
              <button className="flex items-center rounded-md" style={{ gap: 5, border: `1px solid ${BORDER}`, background: "#fff", padding: "4px 8px", fontSize: 11.5, color: T1, fontWeight: 500, flexShrink: 0 }}>
                <ExpandIcon size={11} color={T1} /> Full screen
              </button>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "auto", padding: 12 }}>
        <div className="rounded-xl" style={{ border: `1px solid ${BORDER}`, background: "#fff", padding: "10px 12px", fontSize: 13, color: "#9b9d9d" }}>
          Ask me anything...
        </div>
      </div>
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", bottom: 14, left: 14, background: "#212223", color: "#fff", fontSize: 12, padding: "7px 12px", borderRadius: 8, opacity: 0.88 }}>
      {children}
    </div>
  );
}
