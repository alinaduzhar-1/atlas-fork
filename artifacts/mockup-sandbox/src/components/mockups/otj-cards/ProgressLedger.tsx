import React from "react";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";

const c = {
  brand: "#4a5ff7",
  brandLight: "rgba(74, 95, 247, 0.1)",
  success: "hsl(156 68% 30%)",
  successLight: "hsla(156, 68%, 30%, 0.1)",
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  border: "#e5e7eb",
  bg: "#ffffff",
  bgAlt: "#f9fafb",
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

function LedgerTable() {
  return (
    <div className="w-full">
      <div className="flex flex-col border-b border-gray-100">
        {entries.map((entry, idx) => (
          <div
            key={idx}
            className="flex items-start justify-between py-3 border-t border-gray-100 text-sm"
          >
            <div className="flex flex-col gap-1 pr-4">
              <span className="font-semibold" style={{ color: c.textPrimary }}>
                {entry.task}
              </span>
              <span className="text-xs" style={{ color: c.textSecondary }}>
                {entry.category}
              </span>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0 text-right">
              <span className="font-semibold whitespace-nowrap" style={{ color: c.textPrimary }}>
                {entry.duration}
              </span>
              <span className="text-xs whitespace-nowrap" style={{ color: c.textSecondary }}>
                {entry.date}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between py-3">
        <span className="font-semibold text-sm" style={{ color: c.textPrimary }}>
          Total to log
        </span>
        <span className="font-bold text-sm" style={{ color: c.textPrimary }}>
          2 hrs 45 min
        </span>
      </div>
    </div>
  );
}

function DraftCard() {
  return (
    <div className="w-full rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: c.border }}>
      {/* Status Band */}
      <div className="p-4 flex flex-col gap-3 border-b" style={{ backgroundColor: c.brandLight, borderColor: c.brandLight }}>
        <div className="flex items-center gap-2">
          <AlertCircle size={18} style={{ color: c.brand }} />
          <span className="font-semibold text-sm" style={{ color: c.brand }}>
            Awaiting your confirmation
          </span>
        </div>
        <p className="text-sm leading-snug" style={{ color: c.textPrimary }}>
          Reply to confirm and I'll log <strong>2 hrs 45 min</strong> towards your weekly progress.
        </p>
      </div>

      {/* Ledger */}
      <div className="px-4 py-1" style={{ backgroundColor: c.bg }}>
        <LedgerTable />
      </div>
    </div>
  );
}

function LoggedCard() {
  return (
    <div className="w-full rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: c.border }}>
      {/* Status Band */}
      <div className="p-4 flex flex-col gap-4 border-b" style={{ backgroundColor: c.successLight, borderColor: c.successLight }}>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} style={{ color: c.success }} />
          <span className="font-semibold text-sm" style={{ color: c.success }}>
            Logged — progress updated
          </span>
        </div>

        {/* Progress Integration */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span style={{ color: c.textPrimary }}>
              <strong>4 hrs 15 min</strong> logged this week
            </span>
            <span style={{ color: c.textSecondary }}>Target: 6 hrs 30 min</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden flex">
            {/* Previous progress: 1.5 hr / 6.5 hr = ~23% */}
            <div className="h-full bg-gray-400" style={{ width: "23%" }} />
            {/* New progress: 2.75 hr / 6.5 hr = ~42% */}
            <div className="h-full" style={{ width: "42%", backgroundColor: c.success }} />
          </div>
        </div>
      </div>

      {/* Ledger */}
      <div className="px-4 py-1" style={{ backgroundColor: c.bg }}>
        <LedgerTable />
      </div>
    </div>
  );
}

export function ProgressLedger() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8">
      <div className="w-[440px] flex flex-col gap-12 font-sans">
        
        {/* Draft Section */}
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: c.textSecondary }}>
            Draft
          </span>
          <DraftCard />
        </div>

        {/* Logged Section */}
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: c.textSecondary }}>
            Logged
          </span>
          <LoggedCard />
        </div>

      </div>
    </div>
  );
}
