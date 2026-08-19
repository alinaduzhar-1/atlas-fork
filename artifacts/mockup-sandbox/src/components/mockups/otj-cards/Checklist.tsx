import { Check, Calendar, CheckCircle2, AlertCircle } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  brandBlue: "#4a5ff7",
  successGreen: "hsl(156 68% 30%)",
  successGreenBg: "hsl(156 68% 95%)",
  borderLight: "#e5e7eb",
  bgLight: "#f9fafb",
  blueBg: "#eff2ff",
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

function DraftChecklist() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: c.textSecondary }}>
        Draft
      </span>
      <div 
        className="flex flex-col rounded-xl overflow-hidden bg-white"
        style={{ 
          border: `1px solid ${c.borderLight}`,
          boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.05)"
        }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: c.borderLight }}>
          <h3 className="font-semibold text-sm" style={{ color: c.textPrimary }}>Review & Confirm Entries</h3>
          <p className="text-xs mt-1" style={{ color: c.textSecondary }}>Deselect any entries you don't want to log right now.</p>
        </div>
        
        <div className="flex flex-col divide-y" style={{ borderColor: c.borderLight }}>
          {entries.map((entry, i) => (
            <div key={i} className="flex gap-4 p-5 hover:bg-gray-50 transition-colors cursor-pointer">
              <div 
                className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded border-2"
                style={{ backgroundColor: c.brandBlue, borderColor: c.brandBlue }}
              >
                <Check size={14} color="white" strokeWidth={3} />
              </div>
              <div className="flex flex-col gap-1.5 flex-grow">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.brandBlue }}>
                      {entry.category}
                    </span>
                    <span className="text-sm font-medium leading-snug mt-0.5" style={{ color: c.textPrimary }}>
                      {entry.task}
                    </span>
                  </div>
                  <span className="text-sm font-semibold whitespace-nowrap ml-4" style={{ color: c.textPrimary }}>
                    {entry.duration}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <Calendar size={14} style={{ color: c.textSecondary }} />
                  <span className="text-xs" style={{ color: c.textSecondary }}>
                    {entry.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-4 flex flex-col gap-3" style={{ backgroundColor: c.blueBg, borderTop: `1px solid ${c.borderLight}` }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold" style={{ color: c.brandBlue }}>2 of 2 selected</span>
            <span className="text-base font-bold" style={{ color: c.textPrimary }}>2 hrs 45 min</span>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: c.brandBlue }} />
            <p className="text-xs leading-relaxed" style={{ color: c.textSecondary }}>
              Only selected entries will be logged to your portfolio. Reply to confirm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoggedChecklist() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: c.textSecondary }}>
        Logged
      </span>
      <div 
        className="flex flex-col rounded-xl overflow-hidden bg-white"
        style={{ 
          border: `1px solid ${c.borderLight}`,
          boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.05)"
        }}
      >
        <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: c.borderLight, backgroundColor: c.successGreenBg }}>
          <CheckCircle2 size={18} style={{ color: c.successGreen }} />
          <h3 className="font-semibold text-sm" style={{ color: c.successGreen }}>Logged successfully</h3>
        </div>
        
        <div className="flex flex-col divide-y" style={{ borderColor: c.borderLight }}>
          {entries.map((entry, i) => (
            <div key={i} className="flex gap-3 px-4 py-3 opacity-90">
              <div className="mt-1 flex-shrink-0">
                <Check size={16} style={{ color: c.successGreen }} strokeWidth={3} />
              </div>
              <div className="flex flex-col gap-0.5 flex-grow">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium leading-snug" style={{ color: c.textPrimary }}>
                    {entry.task}
                  </span>
                  <span className="text-sm font-medium whitespace-nowrap ml-4" style={{ color: c.textPrimary }}>
                    {entry.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: c.textSecondary }}>
                    {entry.category}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[11px]" style={{ color: c.textSecondary }}>
                    {entry.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 flex flex-col gap-2" style={{ backgroundColor: c.bgLight, borderTop: `1px solid ${c.borderLight}` }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>2 entries logged</span>
            <span className="text-sm font-bold" style={{ color: c.textPrimary }}>2 hrs 45 min</span>
          </div>
          <div className="w-full h-px" style={{ backgroundColor: c.borderLight }}></div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs" style={{ color: c.textSecondary }}>Weekly total</span>
            <span className="text-xs font-medium" style={{ color: c.textPrimary }}>4 hrs 15 min <span style={{ color: c.textSecondary, fontWeight: 400 }}>/ 6 hrs 30 min</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Checklist() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col gap-10">
        <DraftChecklist />
        <LoggedChecklist />
      </div>
    </div>
  );
}
