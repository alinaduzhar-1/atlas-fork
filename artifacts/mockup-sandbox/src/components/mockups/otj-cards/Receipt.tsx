import { Calendar, CheckCircle2, Clock, Check, History } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  brandBlue: "#4a5ff7",
  successGreen: "hsl(156 68% 30%)",
  successGreenBg: "hsl(156 68% 95%)",
  borderLight: "#e5e7eb",
  amberText: "#92400e",
  amberBg: "#fef3c7",
  amberBorder: "#fcd34d",
  bgLight: "#f9fafb",
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

function LineItem({ entry }: { entry: (typeof entries)[number] }) {
  return (
    <div className="flex flex-col py-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.textSecondary }}>
            {entry.category}
          </span>
          <span className="text-sm font-medium leading-snug" style={{ color: c.textPrimary }}>
            {entry.task}
          </span>
        </div>
        <span className="text-sm font-semibold whitespace-nowrap" style={{ color: c.textPrimary }}>
          {entry.duration}
        </span>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <Calendar size={14} style={{ color: c.textSecondary }} />
        <span className="text-xs" style={{ color: c.textSecondary }}>
          {entry.date}
        </span>
      </div>
    </div>
  );
}

function DraftReceipt() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: c.textSecondary }}>
        Draft
      </span>
      <div 
        className="flex flex-col rounded-xl overflow-hidden bg-white"
        style={{ 
          border: `2px dashed ${c.borderLight}`,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: c.borderLight, backgroundColor: c.bgLight }}>
          <h3 className="font-semibold text-sm" style={{ color: c.textPrimary }}>Off-the-Job Time</h3>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: c.amberBg, border: `1px solid ${c.amberBorder}` }}>
            <History size={12} style={{ color: c.amberText }} />
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: c.amberText }}>Awaiting Confirmation</span>
          </div>
        </div>
        
        <div className="flex flex-col px-5 divide-y" style={{ borderColor: c.borderLight }}>
          {entries.map((entry, i) => (
            <LineItem key={i} entry={entry} />
          ))}
        </div>

        <div className="px-5 py-4" style={{ backgroundColor: c.bgLight, borderTop: `1px solid ${c.borderLight}` }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>Total Time</span>
            <div className="flex items-center gap-1.5">
              <Clock size={16} style={{ color: c.textPrimary }} />
              <span className="text-base font-bold" style={{ color: c.textPrimary }}>2 hrs 45 min</span>
            </div>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: c.textSecondary }}>
            Review your time above. If everything looks right, reply to confirm and I'll log it for you.
          </p>
        </div>
      </div>
    </div>
  );
}

function LoggedReceipt() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: c.textSecondary }}>
        Logged
      </span>
      <div 
        className="flex flex-col rounded-xl overflow-hidden bg-white"
        style={{ 
          border: `1px solid ${c.borderLight}`,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
        }}
      >
        <div className="flex items-center justify-between px-5 py-4" style={{ backgroundColor: c.successGreenBg, borderBottom: `1px solid ${c.successGreen}30` }}>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} style={{ color: c.successGreen }} />
            <h3 className="font-semibold text-sm" style={{ color: c.successGreen }}>Successfully Logged</h3>
          </div>
          <span className="text-xs font-medium" style={{ color: c.successGreen }}>Off-the-Job Time</span>
        </div>
        
        <div className="flex flex-col px-5 divide-y" style={{ borderColor: c.borderLight }}>
          {entries.map((entry, i) => (
            <LineItem key={i} entry={entry} />
          ))}
        </div>

        <div className="px-5 py-4" style={{ backgroundColor: c.bgLight, borderTop: `1px solid ${c.borderLight}` }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>Logged Time</span>
            <div className="flex items-center gap-1.5">
              <Check size={16} style={{ color: c.successGreen }} />
              <span className="text-base font-bold" style={{ color: c.textPrimary }}>2 hrs 45 min</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-white border" style={{ borderColor: c.borderLight }}>
            <span className="text-xs font-medium" style={{ color: c.textSecondary }}>Weekly Progress</span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: c.textPrimary }}>You've logged 4 hrs 15 min this week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Receipt() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col gap-10">
        <DraftReceipt />
        <LoggedReceipt />
      </div>
    </div>
  );
}
