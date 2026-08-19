import { ArrowLeft } from "lucide-react";
import { BORDER, ChatArea, SidebarBody, T1, T2 } from "../atlas-debrand-fs/_shared";

const ITEMS: { label: string; detail: string }[] = [
  { label: "Current project", detail: "Building a data dashboard for Q4 reporting" },
  { label: "Off-the-job training", detail: "1h 30m logged this week · 5h remaining to target" },
  { label: "Next live session", detail: "Data storytelling workshop · today at 3:00 pm" },
  { label: "Portfolio progress", detail: "12 of 28 KSBs evidenced · 4 awaiting evidence" },
  { label: "Coach feedback", detail: "New feedback received on your Portfolio entry · today" },
  { label: "Programme progress", detail: "Month 2 of 18 · Day 60 of 540" },
];

const item = ITEMS[0];

/**
 * T4 — Single most-relevant status item: no arrows or counter, just the
 * one contextual piece of info the learner would find useful, surfaced
 * quietly in the chat-area bar beside Back to Multiverse.
 */
export function RotatingTicker() {
  return (
    <div className="h-screen w-full flex" style={{ background: "#f5f4f1" }}>
      {/* Sidebar — full height, no bar */}
      <div className="flex flex-col flex-shrink-0" style={{ width: 264, borderRight: `1px solid ${BORDER}`, background: "#faf9f7" }}>
        <div style={{ padding: "16px 16px 0 16px" }}>
          <div className="flex items-baseline" style={{ gap: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
          </div>
        </div>
        <SidebarBody />
      </div>

      {/* Chat column — bar only spans this */}
      <div className="flex-1 flex flex-col" style={{ minWidth: 0 }}>
        <div className="flex items-center justify-between flex-shrink-0" style={{ height: 36, padding: "4px 14px 0 14px", background: "#fbfaf8", borderBottom: `1px solid ${BORDER}` }}>
          <button className="flex items-center" style={{ gap: 6, color: T2, fontSize: 12.5, fontWeight: 600 }}>
            <ArrowLeft size={13} /> Back to Multiverse
          </button>
          <span className="flex items-center" style={{ gap: 8 }}>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: T1, whiteSpace: "nowrap" }}>{item.label}</span>
            <span style={{ fontSize: 11.5, color: "#9b9d9d" }}>·</span>
            <span style={{ fontSize: 11.5, color: T2 }}>{item.detail}</span>
          </span>
        </div>
        <ChatArea />
      </div>
    </div>
  );
}
