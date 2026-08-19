import React from "react";
import { Clock, CheckCircle2, History, Target, CalendarDays } from "lucide-react";

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
  draftBg: "repeating-linear-gradient(45deg, rgba(254, 243, 199, 0.5), rgba(254, 243, 199, 0.5) 4px, transparent 4px, transparent 8px)",
};

const entries = [
  {
    category: "Study",
    task: "Data modelling module — independent study",
    date: "Monday, 6 July 2026",
    duration: "2 hrs",
    dayIndex: 0, // Monday
    height: "h-16",
  },
  {
    category: "Mentoring",
    task: "Mentoring session with line manager",
    date: "Tuesday, 7 July 2026",
    duration: "45 min",
    dayIndex: 1, // Tuesday
    height: "h-8",
  },
];

const days = ["M", "T", "W", "T", "F", "S", "S"];

function WeekStrip({ state }: { state: "draft" | "logged" }) {
  const existingHours = [1.5, 0, 0, 0, 0, 0, 0]; // Simulating some existing hours on Monday for the weekly total? Or just leave other days empty.
  
  return (
    <div className="flex w-full justify-between items-end gap-1 mb-4 h-24">
      {days.map((day, i) => {
        const entry = entries.find(e => e.dayIndex === i);
        return (
          <div key={i} className="flex flex-col items-center flex-1 gap-2">
            {/* The bar area */}
            <div className="w-full flex flex-col justify-end items-center h-full gap-1 rounded-sm bg-gray-50/50">
              {entry && (
                <div 
                  className={`w-full rounded-sm ${entry.height} flex flex-col items-center justify-center transition-all duration-300`}
                  style={
                    state === "draft" 
                      ? { 
                          background: c.draftBg, 
                          border: `1px dashed ${c.amberBorder}`
                        } 
                      : { 
                          backgroundColor: c.successGreenBg, 
                          border: `1px solid ${c.successGreen}` 
                        }
                  }
                >
                  <span className="text-[10px] font-medium leading-none" style={{ color: state === 'draft' ? c.amberText : c.successGreen }}>
                    {entry.duration}
                  </span>
                </div>
              )}
            </div>
            {/* Day Label */}
            <span className="text-[11px] font-semibold" style={{ color: entry ? c.textPrimary : c.textSecondary }}>
              {day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function LegendList() {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {entries.map((entry, i) => (
        <div key={i} className="flex items-start justify-between text-sm">
          <div className="flex flex-col max-w-[280px]">
            <span className="font-semibold text-xs uppercase tracking-wide" style={{ color: c.textSecondary }}>{entry.category}</span>
            <span className="font-medium text-sm leading-snug" style={{ color: c.textPrimary }}>{entry.task}</span>
          </div>
          <span className="font-semibold whitespace-nowrap" style={{ color: c.textPrimary }}>{entry.duration}</span>
        </div>
      ))}
    </div>
  );
}

function DraftGrid() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: c.textSecondary }}>
        Draft
      </span>
      <div 
        className="flex flex-col rounded-xl overflow-hidden bg-white p-5"
        style={{ 
          border: `1px solid ${c.borderLight}`,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} style={{ color: c.textPrimary }} />
            <h3 className="font-semibold text-sm" style={{ color: c.textPrimary }}>This Week's Activity</h3>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: c.amberBg, border: `1px solid ${c.amberBorder}` }}>
            <History size={12} style={{ color: c.amberText }} />
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: c.amberText }}>Unsaved Draft</span>
          </div>
        </div>
        
        <WeekStrip state="draft" />
        
        <div className="h-[1px] w-full my-4" style={{ backgroundColor: c.borderLight }} />
        
        <LegendList />
        
        <div className="flex items-center justify-between mt-5 pt-4 border-t" style={{ borderColor: c.borderLight }}>
          <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>Draft Total</span>
          <div className="flex items-center gap-1.5">
            <Clock size={16} style={{ color: c.textPrimary }} />
            <span className="text-base font-bold" style={{ color: c.textPrimary }}>2 hrs 45 min</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoggedGrid() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: c.textSecondary }}>
        Logged
      </span>
      <div 
        className="flex flex-col rounded-xl overflow-hidden bg-white p-5 relative"
        style={{ 
          border: `1px solid ${c.borderLight}`,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} style={{ color: c.textPrimary }} />
            <h3 className="font-semibold text-sm" style={{ color: c.textPrimary }}>This Week's Activity</h3>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white" style={{ border: `1px solid ${c.successGreen}` }}>
            <CheckCircle2 size={12} style={{ color: c.successGreen }} />
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: c.successGreen }}>Logged</span>
          </div>
        </div>
        
        <WeekStrip state="logged" />
        
        <div className="h-[1px] w-full my-4" style={{ backgroundColor: c.borderLight }} />
        
        <LegendList />
        
        <div className="flex flex-col mt-5 pt-4 border-t gap-3" style={{ borderColor: c.borderLight }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>Just Logged</span>
            <span className="text-sm font-bold" style={{ color: c.textPrimary }}>2 hrs 45 min</span>
          </div>
          
          <div className="flex flex-col p-3 rounded-lg" style={{ backgroundColor: c.bgLight, border: `1px solid ${c.borderLight}` }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Target size={14} style={{ color: c.textSecondary }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.textSecondary }}>Weekly Target</span>
              </div>
              <span className="text-xs font-medium" style={{ color: c.textPrimary }}>4h 15m / 6h 30m</span>
            </div>
            
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: '65%', backgroundColor: c.brandBlue }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WeekGrid() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col gap-10">
        <DraftGrid />
        <LoggedGrid />
      </div>
    </div>
  );
}