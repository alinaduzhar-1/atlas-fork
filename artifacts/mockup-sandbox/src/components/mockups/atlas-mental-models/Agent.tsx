import { useState } from "react";
import {
  Play,
  CheckCircle2,
  Clock,
  Loader2,
  ChevronRight,
  MoreVertical,
  X,
  Zap,
  FileText,
  Calendar,
  AlertTriangle,
  Pause,
  RotateCcw,
} from "lucide-react";

const activePlan = {
  title: "Catch up on OTJ hours",
  status: "running" as const,
  steps: [
    { label: "Scanned your activity log for unlogged hours", status: "done" as const },
    { label: "Found 6h of eligible activities to log", status: "done" as const },
    { label: "Drafting OTJ entries for your review", status: "running" as const },
    { label: "Submit entries after your approval", status: "pending" as const },
  ],
};

const queuedActions = [
  {
    icon: Calendar,
    title: "Prepare for Thursday session",
    description: "Will compile pre-reading and talking points",
    time: "Scheduled: Wed 6pm",
  },
  {
    icon: FileText,
    title: "Start Project 2 outline",
    description: "Will draft structure based on the brief",
    time: "After OTJ catch-up",
  },
];

export function Agent() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="w-full h-screen bg-white flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-semibold text-gray-900">Atlas</span>
          <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">Agent</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
            <Pause size={16} />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <AlertTriangle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">3 priorities detected</p>
                <p className="text-xs text-amber-600 mt-0.5">I've identified actions to take and started working on the most urgent one.</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Loader2 size={12} className="text-emerald-600 animate-spin" />
                </div>
                <span className="text-sm font-semibold text-gray-900">{activePlan.title}</span>
              </div>
              <ChevronRight size={14} className={`text-gray-400 transition-transform ${expanded ? "rotate-90" : ""}`} />
            </button>

            {expanded && (
              <div className="px-3 py-2 border-t border-gray-100">
                <div className="flex flex-col gap-1">
                  {activePlan.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5 py-1.5">
                      {step.status === "done" ? (
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      ) : step.status === "running" ? (
                        <Loader2 size={16} className="text-indigo-500 animate-spin mt-0.5 flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${step.status === "done" ? "text-gray-500 line-through" : step.status === "running" ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Draft OTJ entries ready for review:</p>
                  <div className="bg-gray-50 rounded-md p-2.5 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Mon - Self-study: Data governance</span>
                      <span className="text-gray-400">2h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Tue - Module 2 exercises</span>
                      <span className="text-gray-400">1.5h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Wed - Project research</span>
                      <span className="text-gray-400">2.5h</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="flex-1 bg-indigo-500 text-white text-xs font-medium py-1.5 rounded hover:bg-indigo-600 transition-colors">
                      Approve & Submit
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 text-xs font-medium py-1.5 rounded hover:bg-gray-50 transition-colors">
                      Edit entries
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Queued Actions</span>
              <button className="text-xs text-indigo-500 hover:text-indigo-600 font-medium">Edit queue</button>
            </div>
            <div className="flex flex-col gap-2">
              {queuedActions.map((action, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2.5 border border-gray-150 rounded-lg hover:border-gray-300 transition-colors">
                  <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <action.icon size={16} className="text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{action.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={10} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400">{action.time}</span>
                    </div>
                  </div>
                  <button className="text-gray-300 hover:text-gray-500 mt-1">
                    <MoreVertical size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Activity Log</p>
            <div className="flex flex-col gap-2 text-xs text-gray-500">
              <div className="flex items-start gap-2">
                <span className="text-gray-300 whitespace-nowrap">10:32</span>
                <span>Detected 16h OTJ shortfall from dashboard data</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-300 whitespace-nowrap">10:33</span>
                <span>Cross-referenced calendar and learning logs</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-300 whitespace-nowrap">10:34</span>
                <span>Started drafting OTJ entries for approval</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-gray-100">
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 rounded-lg transition-colors">
            <RotateCcw size={14} />
            Undo last
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-2 rounded-lg transition-colors">
            <Zap size={14} />
            New task
          </button>
        </div>
      </div>

      <div className="absolute bottom-2 left-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
        <span className="text-xs font-semibold text-amber-700">AGENT</span>
        <p className="text-[10px] text-amber-600 mt-0.5">Atlas acts, you approve</p>
      </div>
    </div>
  );
}
