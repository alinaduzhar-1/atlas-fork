import { useState } from "react";
import {
  Home, BookOpen, FolderOpen, Calendar, Clock, BarChart2,
  Briefcase, Settings, Heart, ExternalLink, Bell, MessageSquare,
  ChevronRight, Check, Loader2, Zap, FileText, X, Pause,
  MoreHorizontal, Edit3, CheckCircle2, AlertTriangle, TrendingDown,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: BookOpen, label: "Learning" },
  { icon: FolderOpen, label: "Projects" },
  { icon: Calendar, label: "My Sessions" },
  { icon: Clock, label: "Off the Job" },
  { icon: BarChart2, label: "Progress Reviews" },
  { icon: Briefcase, label: "Portfolio" },
  { icon: Settings, label: "Settings" },
  { icon: Heart, label: "Community" },
];

const activePlan = {
  title: "Catch up on OTJ hours",
  urgency: "Started 4 min ago",
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

const queue = [
  { icon: Calendar, title: "Prepare for Thursday session", time: "Wed 6pm" },
  { icon: FileText, title: "Start Project 2 outline", time: "After OTJ task" },
];

const log = [
  { time: "10:34", text: "Started drafting OTJ entries for approval" },
  { time: "10:33", text: "Cross-referenced calendar and learning logs" },
  { time: "10:32", text: "Detected 16h OTJ shortfall from dashboard" },
];

function LeftNav() {
  return (
    <nav className="w-[56px] flex-shrink-0 bg-white border-r border-gray-100 flex flex-col items-center py-4 gap-1">
      <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center mb-3">
        <Zap size={14} className="text-white" />
      </div>
      {navItems.map((item) => (
        <button
          key={item.label}
          title={item.label}
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${item.active ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"}`}
        >
          <item.icon size={17} />
        </button>
      ))}
      <div className="mt-auto">
        <button title="Community" className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700">
          <ExternalLink size={15} />
        </button>
      </div>
    </nav>
  );
}

function TopBar() {
  return (
    <header className="h-12 bg-white border-b border-gray-100 flex items-center px-5 gap-3 flex-shrink-0">
      <span className="text-sm font-semibold text-gray-900 tracking-tight">multiverse</span>
      <div className="flex-1" />
      <div className="flex items-center gap-1">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 relative">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400">
          <MessageSquare size={15} />
        </button>
        <Avatar className="w-7 h-7 ml-1">
          <AvatarFallback className="bg-violet-100 text-violet-700 text-[10px] font-bold">SM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

function MainContent() {
  return (
    <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-6">
      <div>
        <p className="text-xs text-gray-400 mb-0.5">Monday, 30 March 2026</p>
        <h1 className="text-lg font-bold text-gray-900">Hi Sarah</h1>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingDown size={13} className="text-orange-500" />
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">OTJ Progress this week</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-violet-50 rounded-full border border-violet-100">
              <Loader2 size={10} className="text-violet-600 animate-spin" />
              <span className="text-[10px] font-semibold text-violet-700">Atlas working</span>
            </div>
            <button className="text-xs text-blue-600 flex items-center gap-0.5">Log time <ChevronRight size={11} /></button>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-violet-100 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: 'inset 0 0 0 1.5px rgba(139,92,246,0.15)' }} />
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>This week</span><span>1h 30m / 6h 30m</span>
              </div>
              <Progress value={23} className="h-1.5 bg-gray-200" />
            </div>
            <div className="flex divide-x divide-gray-200">
              <div className="flex-1 pr-4">
                <p className="text-xs text-gray-400">All time logged</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-sm font-bold text-gray-900">62 hrs</p>
                  <span className="text-xs text-red-500 font-medium flex items-center gap-0.5"><AlertTriangle size={10} />Behind 16 hrs</span>
                </div>
              </div>
              <div className="flex-1 pl-4">
                <p className="text-xs text-gray-400">Expected to date</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">78 hrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BookOpen size={13} className="text-indigo-500" />
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Continue Learning</h2>
          </div>
          <button className="text-xs text-blue-600 flex items-center gap-0.5">Programme <ChevronRight size={11} /></button>
        </div>
        <div className="bg-gray-50 rounded-xl overflow-hidden divide-y divide-gray-100">
          {[
            { title: "Data-Driven Decision Making", type: "Independent learning", pct: 40 },
            { title: "Data analysis: from tools to implementation", type: "Project", pct: 10 },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">{item.title}</p>
                <p className="text-xs text-gray-400">{item.type}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" className="flex-shrink-0">
                <circle cx="10" cy="10" r="7" stroke="#e5e7eb" strokeWidth="2" fill="none" />
                <circle cx="10" cy="10" r="7" stroke="#4f46e5" strokeWidth="2" fill="none"
                  strokeDasharray={`${item.pct / 100 * 2 * Math.PI * 7} ${2 * Math.PI * 7}`}
                  strokeLinecap="round" transform="rotate(-90 10 10)" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-purple-500" />
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Upcoming Sessions</h2>
          </div>
          <button className="text-xs text-blue-600 flex items-center gap-0.5">All sessions <ChevronRight size={11} /></button>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { month: "APR", day: "9", title: "Navigating data accuracy and quality in a digital world", time: "9:30 – 12:30 · Group coaching" },
            { month: "APR", day: "21", title: "Delivering change in a digital world", time: "9:30 – 12:30 · Group coaching" },
          ].map((s) => (
            <div key={s.day} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-[9px] font-bold text-indigo-400 uppercase">{s.month}</span>
                <span className="text-sm font-bold text-indigo-700 leading-none">{s.day}</span>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">{s.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-green-500" />
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Tasks</h2>
          </div>
          <Badge className="text-[10px] bg-red-50 text-red-600 border-red-100 hover:bg-red-50 px-1.5 py-0" variant="outline">2 overdue</Badge>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { title: 'Submit "Data analysis" project', sub: "15 min · Due 9th Apr" },
            { title: "Log your off-the-job hours", sub: "16 hours behind — Atlas is working on this" },
          ].map((t, i) => (
            <div key={t.title} className={`flex items-start gap-2.5 p-3 rounded-xl border ${i === 1 ? "bg-violet-50 border-violet-100" : "bg-red-50 border-red-100"}`}>
              {i === 1 ? <Loader2 size={13} className="text-violet-500 flex-shrink-0 mt-0.5 animate-spin" /> : <AlertTriangle size={13} className="text-red-400 flex-shrink-0 mt-0.5" />}
              <div>
                <p className="text-xs font-medium text-gray-900">{t.title}</p>
                <p className={`text-xs mt-0.5 ${i === 1 ? "text-violet-600" : "text-red-400"}`}>{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgentPanel() {
  const [showDraft, setShowDraft] = useState(true);
  const [approved, setApproved] = useState(false);

  return (
    <div className="w-[300px] flex-shrink-0 bg-gray-950 flex flex-col border-l border-gray-900">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-pulse" />
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <Zap size={11} className="text-white" />
            </div>
          </div>
          <span className="text-sm font-semibold text-white">Atlas</span>
          <span className="text-[10px] bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded-full font-semibold tracking-wide border border-violet-500/20">AGENT</span>
        </div>
        <div className="flex items-center gap-0.5">
          <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 transition-colors"><Pause size={13} /></button>
          <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 transition-colors"><X size={13} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="px-4 pt-4 pb-3 border-b border-white/5">
          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-2">Active task</p>
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Loader2 size={10} className="text-emerald-400 animate-spin" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">{activePlan.title}</p>
              <p className="text-[10px] text-white/40 mt-0.5">{activePlan.urgency}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-0">
            {activePlan.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-2 py-1 relative">
                {i < activePlan.steps.length - 1 && (
                  <div className="absolute left-[9px] top-5 bottom-0 w-px bg-white/5" />
                )}
                {step.status === "done" ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 z-10">
                    <Check size={9} className="text-emerald-400" strokeWidth={2.5} />
                  </div>
                ) : step.status === "running" ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 z-10">
                    <Loader2 size={9} className="text-violet-400 animate-spin" />
                  </div>
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full border border-dashed border-white/10 mt-0.5 flex-shrink-0 z-10" />
                )}
                <span className={`text-[11px] leading-relaxed mt-0.5 ${
                  step.status === "done" ? "text-white/30" :
                  step.status === "running" ? "text-white/80 font-medium" :
                  "text-white/20"
                }`}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {!approved && (
          <div className="mx-3 my-3 rounded-xl overflow-hidden border border-amber-500/20">
            <button
              onClick={() => setShowDraft(!showDraft)}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-amber-500/5 hover:bg-amber-500/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[11px] font-semibold text-amber-300">Approval needed</span>
              </div>
              <ChevronRight size={12} className={`text-amber-500/50 transition-transform ${showDraft ? "rotate-90" : ""}`} />
            </button>
            {showDraft && (
              <div className="border-t border-amber-500/10">
                <div className="divide-y divide-white/5">
                  {draftEntries.map((entry) => (
                    <div key={entry.day} className="flex items-center justify-between px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-white/30 w-6">{entry.day}</span>
                        <span className="text-[11px] text-white/60">{entry.label}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-white/50">{entry.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2 flex gap-1.5">
                  <button
                    onClick={() => setApproved(true)}
                    className="flex-1 bg-white text-gray-900 text-[11px] font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Approve & Submit
                  </button>
                  <button className="flex-1 border border-white/10 text-white/50 text-[11px] font-medium py-2 rounded-lg hover:bg-white/5 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {approved && (
          <div className="mx-3 my-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-3 flex items-center gap-2">
            <Check size={13} className="text-emerald-400" />
            <div>
              <p className="text-[11px] font-semibold text-emerald-300">6h submitted</p>
              <p className="text-[10px] text-emerald-500/70">OTJ entries logged successfully</p>
            </div>
          </div>
        )}

        <div className="px-4 pb-3 border-b border-white/5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">Up next</p>
            <button className="text-[10px] text-white/30 hover:text-white/60 font-medium">Manage</button>
          </div>
          <div className="flex flex-col gap-1.5">
            {queue.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0">
                  <item.icon size={12} className="text-white/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-white/50 truncate">{item.title}</p>
                  <p className="text-[10px] text-white/25">{item.time}</p>
                </div>
                <button className="text-white/20 hover:text-white/40"><MoreHorizontal size={12} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 py-3">
          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-2">Activity</p>
          <div className="flex flex-col gap-1.5">
            {log.map((entry, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="text-[10px] text-white/20 font-mono w-8 flex-shrink-0">{entry.time}</span>
                <span className="text-[11px] text-white/40">{entry.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-3 py-3 border-t border-white/5 flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 border border-white/10 text-white/50 text-[11px] font-medium py-2 rounded-xl hover:bg-white/5 transition-colors">
          <Pause size={11} />Pause
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 text-white text-[11px] font-semibold py-2 rounded-xl transition-colors">
          <Zap size={11} />New task
        </button>
      </div>
    </div>
  );
}

export function AgentSidebar() {
  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftNav />
        <MainContent />
        <AgentPanel />
      </div>
    </div>
  );
}
