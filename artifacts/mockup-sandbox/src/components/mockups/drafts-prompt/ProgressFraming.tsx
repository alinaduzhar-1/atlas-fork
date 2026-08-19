import { X, ArrowRight, Clock, Target } from "lucide-react";
import React from "react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  action: "hsl(233 92% 63%)",
  brand50: "hsl(228 100% 98%)",
  cardBorder: "#e4e3f6",
  success: "hsl(152 69% 31%)",
  progressBg: "hsl(220 14% 96%)",
  progressFill: "hsl(233 92% 63%)",
  progressDraft: "hsl(233 92% 85%)",
};

export function ProgressFraming() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="w-[368px]">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            padding: "20px",
            border: `1px solid ${c.cardBorder}`,
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 20px -4px rgba(0, 0, 0, 0.05)"
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: c.brand50 }}>
                <Target size={14} style={{ color: c.action }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>
                Weekly Progress
              </span>
            </div>
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-slate-100"
              aria-label="Dismiss"
            >
              <X size={16} style={{ color: c.textSecondary }} />
            </button>
          </div>

          {/* Body */}
          <div className="mb-5">
            <p className="text-sm font-medium mb-3" style={{ color: c.textPrimary }}>
              Confirming these drafts takes you most of the way to this week's 4 hours.
            </p>

            {/* Progress Visualization */}
            <div className="mb-2 space-y-2">
              <div className="flex justify-between text-xs font-medium" style={{ color: c.textSecondary }}>
                <span>0h</span>
                <span style={{ color: c.action }}>3h 15m pending</span>
                <span>4h goal</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: c.progressBg }}>
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-in-out relative"
                  style={{ width: "81%", backgroundColor: c.progressDraft }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.4) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.4) 75%, transparent 75%, transparent)",
                      backgroundSize: "1rem 1rem",
                      animation: "progress-stripes 1s linear infinite"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div 
            className="rounded-xl p-3 mb-5"
            style={{ backgroundColor: c.brand50, border: `1px solid ${c.cardBorder}` }}
          >
            <p className="text-xs mb-2" style={{ color: c.textSecondary }}>
              I've prepared 3 entries for the week of 6 July:
            </p>
            <ul className="space-y-1.5">
              <li className="flex justify-between text-xs">
                <span style={{ color: c.textPrimary }}>Shadowing a senior analyst</span>
                <span className="font-medium" style={{ color: c.textSecondary }}>1h</span>
              </li>
              <li className="flex justify-between text-xs">
                <span style={{ color: c.textPrimary }}>SQL practice</span>
                <span className="font-medium" style={{ color: c.textSecondary }}>1h 30m</span>
              </li>
              <li className="flex justify-between text-xs">
                <span style={{ color: c.textPrimary }}>Team lunch & learn</span>
                <span className="font-medium" style={{ color: c.textSecondary }}>45m</span>
              </li>
            </ul>
          </div>

          {/* Action */}
          <button
            className="group flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm text-white shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: c.action, fontWeight: 570 }}
          >
            Review drafts
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
          
          <style>{`
            @keyframes progress-stripes {
              from { background-position: 1rem 0; }
              to { background-position: 0 0; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
