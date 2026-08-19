import { Calendar, Clock, Trophy, Flame, Check, ArrowRight } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  brandBlue: "#4a5ff7",
  successGreen: "hsl(156 68% 30%)",
  successGreenBg: "hsl(156 68% 95%)",
  successGreenSoft: "hsl(156 68% 98%)",
  borderLight: "#e5e7eb",
  bgLight: "#f9fafb",
  streakOrange: "#f97316",
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

function DraftState() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: c.textSecondary }}>
        Draft
      </span>
      <div 
        className="flex flex-col rounded-xl border bg-white px-5 py-4"
        style={{ borderColor: c.borderLight, boxShadow: "0 2px 4px -2px rgba(0, 0, 0, 0.02)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium" style={{ color: c.textSecondary }}>
            Ready to log?
          </span>
          <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>
            2 hrs 45 min
          </span>
        </div>
        
        <div className="flex flex-col gap-3">
          {entries.map((entry, i) => (
            <div key={i} className="flex items-start justify-between gap-3 text-sm">
              <div className="flex flex-col min-w-0">
                <span className="truncate font-medium" style={{ color: c.textPrimary }}>{entry.task}</span>
                <span className="text-xs mt-0.5" style={{ color: c.textSecondary }}>
                  {entry.category} • {entry.date}
                </span>
              </div>
              <span className="whitespace-nowrap font-medium text-xs mt-0.5" style={{ color: c.textSecondary }}>
                {entry.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoggedState() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: c.textSecondary }}>
        Logged
      </span>
      <div 
        className="flex flex-col rounded-xl overflow-hidden relative"
        style={{ 
          border: `1px solid ${c.successGreen}40`,
          background: `linear-gradient(to bottom, ${c.successGreenSoft}, #ffffff)`,
          boxShadow: `0 8px 24px -6px ${c.successGreen}20, 0 4px 12px -4px rgba(0, 0, 0, 0.05)`
        }}
      >
        {/* Confetti / celebration hints could go here, keeping it tasteful */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none" style={{
          background: `radial-gradient(circle at top right, ${c.successGreen}, transparent 70%)`
        }} />

        <div className="flex flex-col items-center text-center px-6 pt-8 pb-6 relative z-10">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm" style={{ backgroundColor: "white", color: c.successGreen }}>
            <Trophy size={24} strokeWidth={2.5} />
          </div>
          
          <h3 className="text-xl font-bold tracking-tight mb-1" style={{ color: c.textPrimary }}>
            2 hrs 45 min banked!
          </h3>
          <p className="text-sm font-medium mb-6" style={{ color: c.successGreen }}>
            Great work adding to your total.
          </p>

          {/* Milestone line */}
          <div className="w-full bg-white rounded-lg p-4 border mb-6 text-left shadow-sm" style={{ borderColor: `${c.successGreen}30` }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>Week's Target</span>
              <span className="text-sm font-bold" style={{ color: c.textPrimary }}>4h 15m <span className="font-normal" style={{ color: c.textSecondary }}>/ 6h 30m</span></span>
            </div>
            
            <div className="w-full h-2 rounded-full bg-gray-100 mb-2 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '65%', backgroundColor: c.successGreen }} />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium" style={{ color: c.textSecondary }}>65% completed</span>
              <span className="text-xs font-semibold" style={{ color: c.successGreen }}>Best week this month!</span>
            </div>
          </div>

          {/* Small confirmed rows */}
          <div className="w-full flex flex-col gap-2 mb-5">
            {entries.map((entry, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 rounded-md bg-white/60 border border-white/80">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center bg-white border" style={{ borderColor: c.successGreen }}>
                    <Check size={10} style={{ color: c.successGreen }} strokeWidth={3} />
                  </div>
                  <span className="text-xs font-medium truncate" style={{ color: c.textPrimary }}>{entry.task}</span>
                </div>
                <span className="text-xs font-semibold whitespace-nowrap ml-2" style={{ color: c.textSecondary }}>{entry.duration}</span>
              </div>
            ))}
          </div>

          {/* Streak hint */}
          <div className="flex items-center gap-1.5 mt-auto pt-4 border-t w-full justify-center" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
            <Flame size={14} style={{ color: c.streakOrange }} />
            <span className="text-xs font-semibold" style={{ color: c.textPrimary }}>3 weeks logging on time</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Milestone() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col gap-10">
        <DraftState />
        <LoggedState />
      </div>
    </div>
  );
}
