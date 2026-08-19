import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  X,
  Zap,
  FileText,
  Calendar,
  Pause,
  Clock,
  Check,
  ChevronDown,
  AlertCircle,
  Edit3,
} from "lucide-react";

const draftEntries = [
  { day: "Mon", label: "Self-study: Data governance", hours: "2h" },
  { day: "Tue", label: "Module 2 exercises", hours: "1.5h" },
  { day: "Wed", label: "Project research", hours: "2.5h" },
];

const steps = [
  { label: "Scanned activity log for unlogged hours", status: "done" as const },
  { label: "Found 6h of eligible activities to log", status: "done" as const },
  { label: "Drafting OTJ entries for your review", status: "done" as const },
  { label: "Submit entries after your approval", status: "pending" as const },
];

export function AgentRefinedB() {
  const [editMode, setEditMode] = useState(false);
  const [entries, setEntries] = useState(draftEntries);
  const [approved, setApproved] = useState(false);
  const [queueExpanded, setQueueExpanded] = useState(false);

  if (approved) {
    return (
      <div className="w-full h-screen bg-white flex flex-col items-center justify-center gap-4" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div className="w-12 h-12 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
          <Check size={22} className="text-emerald-600" strokeWidth={2.5} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">6h submitted</p>
          <p className="text-xs text-gray-400 mt-1">OTJ entries logged. Now 10h behind target.</p>
        </div>
        <button
          onClick={() => setApproved(false)}
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          Reset demo
        </button>
      </div>
    );
  }

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

      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="px-4 pt-5 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle size={14} className="text-amber-500" />
            <p className="text-xs font-semibold text-amber-600">Waiting for your approval</p>
          </div>
          <h2 className="text-base font-bold text-gray-900">Catch up on OTJ hours</h2>
          <p className="text-xs text-gray-400 mt-0.5">Atlas finished drafting · 6h of eligible time found</p>
        </div>

        <div className="px-4 mb-5">
          <div className="flex gap-0">
            {steps.map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  step.status === "done" ? "bg-emerald-50 border border-emerald-200" :
                  step.status === "running" ? "bg-violet-50 border border-violet-200" :
                  "bg-gray-50 border-2 border-dashed border-gray-200"
                }`}>
                  {step.status === "done" ? (
                    <Check size={9} className="text-emerald-600" strokeWidth={2.5} />
                  ) : step.status === "running" ? (
                    <Loader2 size={9} className="text-violet-600 animate-spin" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute" />
                )}
              </div>
            ))}
          </div>
          <div className="flex relative mt-2">
            {steps.map((_, i) => i < steps.length - 1 && (
              <div key={i} className="flex-1 flex items-center justify-center">
                <div className="h-px bg-gray-200 w-full mx-2.5" />
              </div>
            ))}
          </div>
          <style>{`.steps-row { display: flex; position: relative; } .steps-row::before { content: ''; position: absolute; top: 10px; left: 10%; right: 10%; height: 1px; background: #e5e7eb; z-index: 0; }`}</style>
        </div>

        <div className="px-4 flex-1 flex flex-col gap-3">
          <div className="rounded-xl border-2 border-gray-900 overflow-hidden">
            <div className="px-3 py-2.5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div>
                <p className="text-xs font-semibold text-gray-900">Draft OTJ entries</p>
                <p className="text-[10px] text-gray-400 mt-0.5">6h total · 3 activities</p>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md transition-colors ${editMode ? "bg-violet-100 text-violet-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
              >
                <Edit3 size={10} />
                {editMode ? "Done" : "Edit"}
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {entries.map((entry, i) => (
                <div key={i} className="flex items-center px-3 py-2.5 gap-2">
                  <span className="text-[11px] font-semibold text-gray-300 w-7 flex-shrink-0">{entry.day}</span>
                  {editMode ? (
                    <input
                      className="flex-1 text-xs text-gray-700 bg-transparent border-b border-gray-200 focus:outline-none focus:border-gray-400"
                      value={entry.label}
                      onChange={(e) => {
                        const next = [...entries];
                        next[i] = { ...next[i], label: e.target.value };
                        setEntries(next);
                      }}
                    />
                  ) : (
                    <span className="flex-1 text-xs text-gray-700">{entry.label}</span>
                  )}
                  <span className="text-xs font-semibold text-gray-900 flex-shrink-0">{entry.hours}</span>
                </div>
              ))}
            </div>
            <div className="px-3 py-2 bg-gray-50 flex items-center justify-between border-t border-gray-100">
              <span className="text-[10px] text-gray-400">Total</span>
              <span className="text-xs font-bold text-gray-900">6h</span>
            </div>
          </div>

          <button
            onClick={() => setApproved(true)}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={15} />
            Approve & Submit
          </button>
          <button className="w-full border border-gray-200 text-gray-500 text-xs font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            Discard draft
          </button>

          <button
            onClick={() => setQueueExpanded(!queueExpanded)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Up next · 2 queued</span>
            <ChevronDown size={12} className={`text-gray-300 transition-transform ${queueExpanded ? "rotate-180" : ""}`} />
          </button>

          {queueExpanded && (
            <div className="flex flex-col gap-1.5 -mt-1">
              {[
                { icon: Calendar, title: "Prepare for Thursday session", time: "Wed 6pm" },
                { icon: FileText, title: "Start Project 2 outline", time: "After OTJ catch-up" },
              ].map((action, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50">
                  <div className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <action.icon size={12} className="text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-600 truncate">{action.title}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={9} className="text-gray-300" />
                      <span className="text-[10px] text-gray-400">{action.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 pb-4" />
      </div>
    </div>
  );
}
