import React from "react";
import { TopNav, Callout, BG, T1, T2, BORDER, INDIGO, Hexagon } from "../atlas-fullscreen-entry/_shared";

/** Hypothesis: Atlas opens from the content itself — "Ask Atlas" affordances
 * attached to specific items open the sidebar pre-seeded with that context. */
export function ContextualNudge() {
  const AskChip = ({ label }: { label: string }) => (
    <button className="flex items-center rounded-full" style={{ gap: 5, border: `1px solid #cdd3fd`, background: "#eef0fe", padding: "3px 10px", fontSize: 11.5, fontWeight: 600, color: INDIGO, flexShrink: 0 }}>
      <Hexagon size={12} /> {label}
    </button>
  );
  return (
    <div className="h-screen w-full flex flex-col relative" style={{ background: BG }}>
      <TopNav />
      <div className="flex-1" style={{ padding: "28px 40px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: T1, marginBottom: 4 }}>Good morning, Sarah</h1>
          <p style={{ fontSize: 13.5, color: T2, marginBottom: 20 }}>Week 32 of your Data Fellowship apprenticeship</p>
          <div className="grid grid-cols-3" style={{ gap: 14, marginBottom: 14 }}>
            {[
              ["OTJ hours this week", "4h 20m", "of 6h target", "Log hours"],
              ["Next deadline", "Aug 14", "Project submission", "Plan my week"],
              ["KSBs evidenced", "18 / 24", "6 remaining", "Which are missing?"],
            ].map(([t, v, s, ask]) => (
              <div key={t} className="rounded-xl" style={{ background: "#fff", border: `1px solid ${BORDER}`, padding: 16 }}>
                <div style={{ fontSize: 12, color: T2, marginBottom: 8 }}>{t}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: T1 }}>{v}</div>
                <div style={{ fontSize: 12, color: T2, margin: "2px 0 10px" }}>{s}</div>
                <AskChip label={ask as string} />
              </div>
            ))}
          </div>
          <div className="rounded-xl" style={{ background: "#fff", border: `1px solid ${BORDER}`, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T1, marginBottom: 10 }}>Up next</div>
            {["Complete unit 4 quiz — Data modelling", "Review coach feedback on project draft"].map(t => (
              <div key={t} className="flex items-center justify-between" style={{ padding: "8px 0", borderTop: `1px solid #eeede9` }}>
                <span style={{ fontSize: 13, color: T1 }}>{t}</span>
                <AskChip label="Ask Atlas" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Callout>"Ask Atlas" chips on content open the sidebar pre-seeded with that item's context</Callout>
    </div>
  );
}
