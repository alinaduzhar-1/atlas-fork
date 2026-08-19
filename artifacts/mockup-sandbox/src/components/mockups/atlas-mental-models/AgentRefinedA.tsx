import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  ChevronRight,
  MoreHorizontal,
  X,
  Zap,
  FileText,
  Calendar,
  Pause,
  RotateCcw,
  Clock,
  Check,
} from "lucide-react";

const activePlan = {
  title: "Catch up on OTJ hours",
  urgency: "3 priorities detected · Working on most urgent",
  steps: [
    { label: "Scanned activity log for unlogged hours", status: "done" as const },
    { label: "Found 6h of eligible activities to log", status: "done" as const },
    { label: "Drafting OTJ entries for your review", status: "running" as const },
    { label: "Submit entries after your approval", status: "pending" as const },
  ],
};

const draftEntries = [
  { day: "Mon", label: "Self-study: Data governance", hours: "2h" },
  { day: "Tue", label: "Module 2 exercises", hours: "1.5h" },
  { day: "Wed", label: "Project research", hours: "2.5h" },
];

const queuedActions = [
  {
    icon: Calendar,
    title: "Prepare for Thursday session",
    time: "Wed 6pm",
  },
  {
    icon: FileText,
    title: "Start Project 2 outline",
    time: "After OTJ catch-up",
  },
];

const activityLog = [
  { time: "10:32", text: "Detected 16h OTJ shortfall" },
  { time: "10:33", text: "Cross-referenced calendar and learning logs" },
  { time: "10:34", text: "Started drafting OTJ entries for approval" },
];

export function AgentRefinedA() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="w-full h-screen bg-white flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-pulse" />
            <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
              <Zap size={11} className="text-white" />
            </div>
          </div>
          <span className="text-sm font-semibold text-gray-900">Atlas</span>
          <span className="text-[11px] bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-full font-semibold tracking-wide">AGENT</span>
        </div>
        <div className="flex items-center gap-0.5">
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            <Pause size={14} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 flex flex-col gap-3">

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between px-3 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                  <Loader2 size={12} className="text-emerald-600 animate-spin" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{activePlan.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activePlan.urgency}</p>
                </div>
              </div>
              <ChevronRight size={14} className={`text-gray-300 transition-transform flex-shrink-0 ${expanded ? "rotate-90" : ""}`} />
            </button>

            {expanded && (
              <div className="border-t border-gray-100">
                <div className="px-3 py-3 flex flex-col gap-0">
                  {activePlan.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5 py-1.5 relative">
                      {i < activePlan.steps.length - 1 && (
                        <div className="absolute left-[11px] top-7 bottom-0 w-px bg-gray-100" />
                      )}
                      {step.status === "done" ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5 z-10">
                          <Check size={10} className="text-emerald-600" strokeWidth={2.5} />
                        </div>
                      ) : step.status === "running" ? (
                        <div className="w-5 h-5 rounded-full bg-violet-50 border border-violet-200 flex items-center justify-center flex-shrink-0 mt-0.5 z-10">
                          <Loader2 size={10} className="text-violet-600 animate-spin" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-200 mt-0.5 flex-shrink-0 z-10 bg-white" />
                      )}
                      <span className={`text-xs leading-relaxed mt-0.5 ${
                        step.status === "done" ? "text-gray-400" :
                        step.status === "running" ? "text-gray-900 font-medium" :
                        "text-gray-300"
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mx-3 mb-3 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500">Draft entries for review</p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {draftEntries.map((entry) => (
                      <div key={entry.day} className="flex items-center justify-between px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-gray-400 w-7">{entry.day}</span>
                          <span className="text-xs text-gray-700">{entry.label}</span>
                        </div>
                        <span className="text-xs font-medium text-gray-500">{entry.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 flex gap-1.5">
                    <button className="flex-1 bg-gray-900 text-white text-xs font-semibold py-2 rounded-lg hover:bg-gray-800 transition-colors">
                      Approve & Submit
                    </button>
                    <button className="flex-1 border border-gray-200 text-gray-600 text-xs font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Up next</span>
              <button className="text-[11px] text-gray-400 hover:text-gray-600 font-medium">Manage</button>
            </div>
            <div className="flex flex-col gap-1.5">
              {queuedActions.map((action, i) => (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <action.icon size={14} className="text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">{action.title}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={9} className="text-gray-300" />
                      <span className="text-[10px] text-gray-400">{action.time}</span>
                    </div>
                  </div>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <MoreHorizontal size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Activity</span>
            </div>
            <div className="px-3 py-2 flex flex-col gap-1.5">
              {activityLog.map((entry, i) => (
                <div key={i} className="flex items-baseline gap-2.5">
                  <span className="text-[10px] text-gray-300 font-mono w-8 flex-shrink-0">{entry.time}</span>
                  <span className="text-xs text-gray-500">{entry.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-gray-100">
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 text-gray-600 text-xs font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            <Pause size={13} />
            Pause agent
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors">
            <CheckCircle2 size={13} />
            Approve all
          </button>
        </div>
      </div>
    </div>
  );
}
