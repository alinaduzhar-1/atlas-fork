import { Calendar, CheckCircle2, ChevronDown, Clock, Edit2, Check, X } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  brandBlue: "#4a5ff7",
  successGreen: "hsl(156 68% 30%)",
  successGreenBg: "hsl(156 68% 95%)",
  borderLight: "#e5e7eb",
  bubbleBg: "#f3f4f6", // typical chat bubble gray
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

function EntryItem({ entry }: { entry: (typeof entries)[number] }) {
  return (
    <div className="flex flex-col gap-1 py-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.textSecondary }}>
            {entry.category}
          </span>
          <p className="text-sm font-medium leading-snug" style={{ color: c.textPrimary }}>
            {entry.task}
          </p>
        </div>
        <span className="text-sm font-semibold whitespace-nowrap" style={{ color: c.textPrimary }}>
          {entry.duration}
        </span>
      </div>
      <div className="flex items-center gap-1.5 mt-0.5">
        <Calendar size={14} style={{ color: c.textSecondary }} />
        <span className="text-xs" style={{ color: c.textSecondary }}>
          {entry.date}
        </span>
      </div>
    </div>
  );
}

function DraftAction() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: c.textSecondary }}>
        Draft
      </span>
      
      {/* Atlas Message Bubble */}
      <div className="flex flex-col gap-3">
        <div 
          className="rounded-2xl rounded-tl-sm p-4 w-full"
          style={{ backgroundColor: c.bubbleBg }}
        >
          <p className="text-sm mb-3" style={{ color: c.textPrimary }}>
            I've drafted your Off-the-Job time entries based on our chat.
          </p>
          
          <div className="flex flex-col rounded-xl overflow-hidden bg-white p-3 shadow-sm border border-black/5">
            <div className="flex flex-col divide-y" style={{ borderColor: c.borderLight }}>
              {entries.map((entry, i) => (
                <EntryItem key={i} entry={entry} />
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-3 mt-1 border-t" style={{ borderColor: c.borderLight }}>
              <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>Total</span>
              <span className="text-sm font-bold" style={{ color: c.brandBlue }}>2 hrs 45 min</span>
            </div>
          </div>
        </div>

        {/* Inline Action Buttons */}
        <div className="flex flex-wrap gap-2 pl-2">
          <button 
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-sm"
            style={{ backgroundColor: c.brandBlue }}
          >
            <Check size={16} />
            Log 2 hrs 45 min
          </button>
          
          <button 
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-white border shadow-sm hover:bg-gray-50 transition-colors"
            style={{ color: c.textPrimary, borderColor: c.borderLight }}
          >
            <Edit2 size={14} />
            Edit entries
          </button>
          
          <button 
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-white border shadow-sm hover:bg-gray-50 transition-colors"
            style={{ color: c.textSecondary, borderColor: c.borderLight }}
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}

function LoggedAction() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: c.textSecondary }}>
        Logged
      </span>
      
      {/* Compact Logged Chip/Row */}
      <div 
        className="flex flex-col rounded-xl border bg-white overflow-hidden shadow-sm"
        style={{ borderColor: c.borderLight }}
      >
        {/* Header - The compact view */}
        <div 
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
          style={{ backgroundColor: c.successGreenBg }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} style={{ color: c.successGreen }} />
            <span className="text-sm font-medium" style={{ color: c.textPrimary }}>
              2 entries logged <span style={{ color: c.textSecondary }}>· 2 hrs 45 min</span>
            </span>
          </div>
          <ChevronDown size={16} style={{ color: c.textSecondary }} className="transform rotate-180" />
        </div>

        {/* Expanded Detail Area */}
        <div className="flex flex-col p-4 pt-2">
          <div className="flex flex-col divide-y mb-4" style={{ borderColor: c.borderLight }}>
            {entries.map((entry, i) => (
              <EntryItem key={i} entry={entry} />
            ))}
          </div>

          <div className="flex flex-col gap-1.5 p-3 rounded-lg" style={{ backgroundColor: c.bubbleBg }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.textSecondary }}>Weekly Progress</span>
              <span className="text-xs font-medium" style={{ color: c.textPrimary }}>6 hrs 30 min target</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#e5e7eb" }}>
                <div className="h-full rounded-full" style={{ width: "65%", backgroundColor: c.successGreen }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: c.successGreen }}>4 hrs 15 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatActions() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col gap-12">
        <DraftAction />
        <LoggedAction />
      </div>
    </div>
  );
}
