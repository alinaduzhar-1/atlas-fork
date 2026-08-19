import React from "react";
import { Callout, BG, T1, T2, BORDER, INDIGO, Hexagon } from "../atlas-fullscreen-entry/_shared";

function PortfolioNav() {
  const tabs = ["Home", "Learning", "Off-the-job", "Portfolio"];
  return (
    <div className="flex items-center justify-between" style={{ height: 56, padding: "0 20px", background: "#fff", borderBottom: `1px solid ${BORDER}` }}>
      <div className="flex items-center" style={{ gap: 28 }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          <Hexagon size={22} />
          <span style={{ fontSize: 15, fontWeight: 700, color: T1, letterSpacing: "0.3px" }}>Multiverse</span>
        </div>
        <div className="flex items-center" style={{ gap: 20 }}>
          {tabs.map((l, i) => (
            <span key={l} style={{ fontSize: 13.5, fontWeight: i === 3 ? 600 : 500, color: i === 3 ? T1 : T2 }}>{l}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center" style={{ gap: 12 }}>
        {/* Ask Atlas button with badge dot */}
        <div style={{ position: "relative" }}>
          <button
            className="flex items-center rounded-full"
            style={{ gap: 7, border: `1px solid ${BORDER}`, background: "#fff", padding: "6px 14px", fontSize: 13, fontWeight: 600, color: T1 }}
          >
            <Hexagon size={15} />
            Ask Atlas
          </button>
          {/* Unread / active conversation dot */}
          <div style={{
            position: "absolute", top: -3, right: -3,
            width: 10, height: 10, borderRadius: 5,
            background: INDIGO, border: "2px solid #fff",
          }} />
        </div>
        <div className="rounded-full flex items-center justify-center" style={{ width: 32, height: 32, background: "#e8e6f8", color: INDIGO, fontSize: 12, fontWeight: 700 }}>SM</div>
      </div>
    </div>
  );
}

function PortfolioBody() {
  const items = [
    { ksb: "K1", title: "Data architecture and data landscape", status: "Evidenced", date: "Jul 28" },
    { ksb: "K2", title: "Data lifecycle management", status: "Draft", date: "Aug 1" },
    { ksb: "S3", title: "Data analysis and synthesis", status: "Evidenced", date: "Jul 15" },
    { ksb: "B1", title: "Works independently and proactively", status: "Not started", date: "—" },
  ];
  return (
    <div className="flex-1" style={{ padding: "28px 40px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: T1, marginBottom: 4 }}>Portfolio</h1>
        <p style={{ fontSize: 13.5, color: T2, marginBottom: 20 }}>18 of 24 KSBs evidenced</p>
        <div className="rounded-xl" style={{ background: "#fff", border: `1px solid ${BORDER}`, overflow: "hidden" }}>
          <div className="grid" style={{ gridTemplateColumns: "60px 1fr 120px 100px", padding: "10px 16px", borderBottom: `1px solid ${BORDER}` }}>
            {["KSB", "Description", "Status", "Last updated"].map(h => (
              <span key={h} style={{ fontSize: 11.5, fontWeight: 600, color: T2, letterSpacing: "0.4px" }}>{h}</span>
            ))}
          </div>
          {items.map(({ ksb, title, status, date }) => (
            <div key={ksb} className="grid" style={{ gridTemplateColumns: "60px 1fr 120px 100px", padding: "13px 16px", borderBottom: `1px solid #f0efeb`, alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: INDIGO }}>{ksb}</span>
              <span style={{ fontSize: 13, color: T1 }}>{title}</span>
              <span style={{
                fontSize: 11.5, fontWeight: 600,
                color: status === "Evidenced" ? "#1a7f4b" : status === "Draft" ? "#b05a00" : T2,
              }}>{status}</span>
              <span style={{ fontSize: 12, color: T2 }}>{date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Re-entry from any non-home page: the existing "Ask Atlas" nav button
 * carries a small indigo dot when a conversation is active.
 * No new UI chrome — just a signal on what's already there. */
export function BadgeTrigger() {
  return (
    <div className="h-screen w-full flex flex-col relative" style={{ background: BG }}>
      <PortfolioNav />
      <PortfolioBody />
      <Callout>Indigo dot on "Ask Atlas" signals an active conversation — one tap resumes it in the sidebar</Callout>
    </div>
  );
}
