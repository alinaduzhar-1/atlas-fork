import React from "react";
import { Callout, BG, T1, T2, BORDER, INDIGO, Hexagon } from "../atlas-fullscreen-entry/_shared";

function NavBar() {
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
        <div style={{ position: "relative" }}>
          <button className="flex items-center rounded-full" style={{ gap: 7, border: `1px solid ${BORDER}`, background: "#fff", padding: "6px 14px", fontSize: 13, fontWeight: 600, color: T1 }}>
            <Hexagon size={15} /> Ask Atlas
          </button>
        </div>
        <div className="rounded-full flex items-center justify-center" style={{ width: 32, height: 32, background: "#e8e6f8", color: INDIGO, fontSize: 12, fontWeight: 700 }}>SM</div>
      </div>
    </div>
  );
}

function HomeContent() {
  return (
    <div style={{ padding: "28px 32px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: T1, marginBottom: 4 }}>Good morning, Sarah</h1>
      <p style={{ fontSize: 13, color: T2, marginBottom: 16 }}>Week 32 of your Data Fellowship apprenticeship</p>
      <div className="grid grid-cols-3" style={{ gap: 12 }}>
        {[["OTJ hours this week","4h 20m","of 6h target"],["Next deadline","Aug 14","Project submission"],["KSBs evidenced","18 / 24","6 remaining"]].map(([t,v,s])=>(
          <div key={t} className="rounded-xl" style={{ background:"#fff", border:`1px solid ${BORDER}`, padding:14 }}>
            <div style={{ fontSize:11.5, color:T2, marginBottom:6 }}>{t}</div>
            <div style={{ fontSize:18, fontWeight:700, color:T1 }}>{v}</div>
            <div style={{ fontSize:11.5, color:T2, marginTop:2 }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AtlasPanelResumed() {
  const messages = [
    { type:"user", text:"When do I need to submit my project?" },
    { type:"atlas", text:"Your project submission deadline is August 14th — that's 8 days away. Based on your current progress I'd suggest blocking 3 focused sessions this week." },
    { type:"user", text:"Can you help me break that down?" },
    { type:"atlas", text:"Sure. Here's a plan: Monday — finish the data model section. Wednesday — write up the findings. Friday — final review and submit." },
  ];
  return (
    <div className="flex flex-col" style={{ width: 320, background: BG, borderLeft: `1px solid ${BORDER}` }}>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: "11px 14px", borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center" style={{ gap: 7 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: T1 }}>Atlas</span>
          <Hexagon size={15} />
          <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
        </div>
        <div className="flex items-center" style={{ gap: 8 }}>
          {/* expand icon */}
          <span title="Full screen" style={{ display:"inline-flex", padding:4, borderRadius:6, background:"#eceae4" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </span>
          <span style={{ color:T2, fontSize:16, lineHeight:1 }}>×</span>
        </div>
      </div>
      {/* Resumed conversation banner */}
      <div style={{ background:"#eef0fe", borderBottom:`1px solid #cdd3fd`, padding:"7px 14px", fontSize:11.5, color:INDIGO, fontWeight:600 }}>
        ↩ Resumed · Help with project submission deadline
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-hidden" style={{ padding:"12px 12px 0" }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.type==="user"?"justify-end":"justify-start"}`} style={{ marginBottom:8 }}>
            <div style={{
              maxWidth:"84%", padding:"8px 11px", borderRadius:10,
              background: m.type==="user" ? INDIGO : "#fff",
              border: m.type==="atlas" ? `1px solid ${BORDER}` : "none",
              fontSize:12.5, lineHeight:1.5,
              color: m.type==="user" ? "#fff" : T1,
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {/* Cursor indicating active */}
        <div style={{ display:"flex", justifyContent:"flex-start", marginBottom:8 }}>
          <div style={{ background:"#fff", border:`1px solid ${BORDER}`, borderRadius:10, padding:"8px 11px", fontSize:12.5, color:T2 }}>
            Ask a follow-up…
          </div>
        </div>
      </div>
      {/* Input */}
      <div style={{ padding:10 }}>
        <div className="rounded-xl" style={{ border:`1px solid ${BORDER}`, background:"#fff", padding:"9px 12px", fontSize:13, color:"#9b9d9d" }}>
          Continue the conversation…
        </div>
      </div>
    </div>
  );
}

/** What the user lands on after clicking the badge or the home card "Open in sidebar":
 * the sidebar opens mid-conversation with a "Resumed" banner and
 * a full-screen expand icon in the header. */
export function ResumedSidebar() {
  return (
    <div className="h-screen w-full flex flex-col relative" style={{ background: BG }}>
      <NavBar />
      <div className="flex-1 flex" style={{ minHeight: 0 }}>
        <div className="flex-1 overflow-auto"><HomeContent /></div>
        <AtlasPanelResumed />
      </div>
      <Callout>"Resumed" banner confirms which conversation was restored · expand icon escalates to full screen</Callout>
    </div>
  );
}
