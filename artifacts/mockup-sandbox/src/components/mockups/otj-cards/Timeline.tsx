import React from "react";
import { Check, Clock, Calendar, ChevronRight } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  action: "#4a5ff7",
  success: "hsl(156 68% 30%)",
  borderTertiary: "#e5e7eb",
  bgSubtle: "#f9fafb",
};

const entries = [
  {
    category: "Study",
    task: "Data modelling module — independent study",
    date: "Monday, 6 July 2026",
    duration: "2 hrs",
  },
  {
    category: "Mentoring",
    task: "Mentoring session with line manager",
    date: "Tuesday, 7 July 2026",
    duration: "45 min",
  },
];

function TimelineDraft() {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="relative">
        <div className="absolute left-[11px] top-3 bottom-8 w-[2px] border-l-2 border-dashed border-gray-200"></div>
        <div className="flex flex-col gap-6">
          {entries.map((entry, i) => (
            <div key={i} className="relative flex gap-4 pl-10">
              <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-white text-gray-400">
                <div className="h-2 w-2 rounded-full bg-gray-200"></div>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.textSecondary }}>
                    {entry.date}
                  </span>
                  <span className="text-xs font-bold" style={{ color: c.textPrimary }}>
                    {entry.duration}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>
                    {entry.category}
                  </span>
                  <span className="text-sm" style={{ color: c.textSecondary }}>
                    {entry.task}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          <div className="relative flex gap-4 pl-10 pt-2">
            <div className="absolute left-0 top-3 flex h-6 w-6 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400">
              <Clock size={12} />
            </div>
            <div className="flex flex-1 flex-col rounded-lg bg-gray-50 p-3">
              <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>
                Total pending: 2 hrs 45 min
              </span>
              <p className="mt-1 text-xs" style={{ color: c.textSecondary }}>
                Reply to confirm and I'll log it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineLogged() {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="relative">
        <div className="absolute left-[11px] top-3 bottom-8 w-[2px] bg-green-100" style={{ backgroundColor: "hsl(156 68% 85%)" }}></div>
        <div className="flex flex-col gap-6">
          {entries.map((entry, i) => (
            <div key={i} className="relative flex gap-4 pl-10">
              <div 
                className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: c.success }}
              >
                <Check size={14} strokeWidth={3} />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.success }}>
                    {entry.date}
                  </span>
                  <span className="text-xs font-bold" style={{ color: c.textPrimary }}>
                    {entry.duration}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>
                    {entry.category}
                  </span>
                  <span className="text-sm" style={{ color: c.textSecondary }}>
                    {entry.task}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          <div className="relative flex gap-4 pl-10 pt-2">
            <div 
              className="absolute left-0 top-3 flex h-6 w-6 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: c.success }}
            >
              <Check size={14} strokeWidth={3} />
            </div>
            <div className="flex flex-1 flex-col rounded-lg p-3" style={{ backgroundColor: "hsl(156 68% 96%)" }}>
              <span className="text-sm font-semibold" style={{ color: c.success }}>
                Logged: 2 hrs 45 min
              </span>
              <p className="mt-1 text-xs font-medium" style={{ color: c.textPrimary }}>
                You've logged 4 hrs 15 min this week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Timeline() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col gap-12">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 pl-2">Draft</span>
          <TimelineDraft />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 pl-2">Logged</span>
          <TimelineLogged />
        </div>
      </div>
    </div>
  );
}
