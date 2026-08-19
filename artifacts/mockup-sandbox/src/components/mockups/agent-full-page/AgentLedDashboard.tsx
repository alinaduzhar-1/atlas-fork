import { useState } from "react";
import {
  Home, BookOpen, FolderOpen, Calendar, Clock, BarChart2,
  Briefcase, Settings, ExternalLink, Bell, MessageSquare,
  ChevronRight, Check, Loader2, Zap, FileText,
  CheckCircle2, AlertTriangle, TrendingDown, ChevronDown,
  Edit3, MoreHorizontal,
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
        <button className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400">
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

function AgentStatusBar() {
  return (
    <div className="flex items-center gap-3 px-6 py-3 bg-gray-950 border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-pulse" />
          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
            <Zap size={10} className="text-white" />
          </div>
        </div>
        <span className="text-xs font-semibold text-white">Atlas Agent</span>
        <span className="text-[10px] text-emerald-400">· Running</span>
      </div>
      <div className="h-3 w-px bg-white/10" />
      <span className="text-[11px] text-white/50">Working on: <span className="text-white/80 font-medium">Catch up on OTJ hours</span></span>
      <div className="ml-auto flex items-center gap-2">
        <button className="text-[11px] text-white/40 hover:text-white/60 font-medium">Pause</button>
        <button className="text-[11px] text-white/40 hover:text-white/60 font-medium">View all tasks</button>
      </div>
    </div>
  );
}

function ApprovalCard() {
  const [approved, setApproved] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [entries, setEntries] = useState([
    { day: "Mon", label: "Self-study: Data governance", hours: "2h" },
    { day: "Tue", label: "Module 2 exercises", hours: "1.5h" },
    { day: "Wed", label: "Project research", hours: "2.5h" },
  ]);

  if (approved) {
    return (
      <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <Check size={15} className="text-emerald-600" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-900">6h of OTJ time submitted</p>
          <p className="text-xs text-emerald-600 mt-0.5">Atlas is now working on preparing your Thursday session</p>
        </div>
        <button onClick={() => setApproved(false)} className="ml-auto text-xs text-emerald-400 hover:text-emerald-600">Reset</button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-gray-900 overflow-hidden">
      <div className="px-4 py-3 bg-gray-900 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-xs font-semibold text-white">Atlas needs your approval</span>
        <span className="ml-auto text-[10px] text-white/40">OTJ catch-up · 6h total</span>
      </div>

      <div className="p-4 flex gap-5">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700">Draft OTJ entries</p>
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors ${editMode ? "bg-violet-100 text-violet-700" : "text-gray-400 hover:text-gray-700"}`}
            >
              <Edit3 size={10} />{editMode ? "Done" : "Edit"}
            </button>
          </div>
          <div className="rounded-xl bg-gray-50 overflow-hidden border border-gray-100 divide-y divide-gray-100">
            {entries.map((entry, i) => (
              <div key={i} className="flex items-center px-3 py-2.5 gap-2">
                <span className="text-[11px] font-semibold text-gray-300 w-7 flex-shrink-0">{entry.day}</span>
                {editMode ? (
                  <input className="flex-1 text-xs text-gray-700 bg-transparent border-b border-gray-200 focus:outline-none" value={entry.label}
                    onChange={(e) => { const n = [...entries]; n[i] = { ...n[i], label: e.target.value }; setEntries(n); }} />
                ) : (
                  <span className="flex-1 text-xs text-gray-700">{entry.label}</span>
                )}
                <span className="text-xs font-bold text-gray-900">{entry.hours}</span>
              </div>
            ))}
            <div className="flex items-center px-3 py-2 bg-gray-50 justify-between">
              <span className="text-[10px] font-semibold text-gray-400 uppercase">Total</span>
              <span className="text-xs font-bold text-gray-900">6h</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-end" style={{ minWidth: 120 }}>
          <button
            onClick={() => setApproved(true)}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 size={13} />Approve
          </button>
          <button className="w-full border border-gray-200 text-gray-500 text-xs font-medium py-2 px-4 rounded-xl hover:bg-gray-50 transition-colors">
            Discard
          </button>
          <button className="w-full text-gray-400 text-[11px] font-medium hover:text-gray-600 transition-colors">
            Ask Atlas why
          </button>
        </div>
      </div>
    </div>
  );
}

function QueueRow() {
  const items = [
    { icon: Calendar, title: "Prepare for Thursday session", desc: "Compile pre-reading and talking points", when: "Wed 6pm", status: "queued" as const },
    { icon: FileText, title: "Start Project 2 outline", desc: "Draft structure based on the brief", when: "After OTJ task", status: "queued" as const },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Atlas queue · 2 tasks</h3>
        <button className="text-xs text-gray-400 hover:text-gray-600 font-medium flex items-center gap-0.5">Manage <ChevronRight size={11} /></button>
      </div>
      <div className="flex gap-3">
        {items.map((item, i) => (
          <div key={i} className="flex-1 flex items-start gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
              <item.icon size={13} className="text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800">{item.title}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
              <p className="text-[10px] text-gray-300 mt-1 flex items-center gap-1"><Clock size={9} />{item.when}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CollapsibleSection({ title, icon, children, badge }: {
  title: string; icon: React.ReactNode; children: React.ReactNode; badge?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        {icon}
        <span className="text-xs font-semibold text-gray-700 flex-1 text-left">{title}</span>
        {badge && <Badge className="text-[10px] bg-red-50 text-red-500 border-red-100 hover:bg-red-50 px-1.5 py-0" variant="outline">{badge}</Badge>}
        <ChevronDown size={13} className={`text-gray-300 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-gray-100 px-4 py-3">
          {children}
        </div>
      )}
    </div>
  );
}

export function AgentLedDashboard() {
  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <TopBar />
      <AgentStatusBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftNav />
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-5">

          <div>
            <p className="text-xs text-gray-400 mb-0.5">Monday, 30 March 2026</p>
            <h1 className="text-lg font-bold text-gray-900">Hi Sarah — Atlas is working on 3 things</h1>
            <p className="text-xs text-gray-400 mt-1">Review what it's done and approve before it submits on your behalf.</p>
          </div>

          <ApprovalCard />

          <QueueRow />

          <div className="h-px bg-gray-100" />

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Your dashboard</p>
            <div className="flex flex-col gap-2">

              <CollapsibleSection
                title="OTJ Progress this week"
                icon={<TrendingDown size={13} className="text-orange-500" />}
                badge="Behind 16h"
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                      <span>This week</span><span>1h 30m / 6h 30m</span>
                    </div>
                    <Progress value={23} className="h-1.5 bg-gray-200" />
                  </div>
                  <div className="flex divide-x divide-gray-100">
                    <div className="flex-1 pr-4">
                      <p className="text-[10px] text-gray-400">All time</p>
                      <p className="text-sm font-bold text-gray-900">62 hrs <span className="text-xs text-red-500 font-normal">↓ behind</span></p>
                    </div>
                    <div className="flex-1 pl-4">
                      <p className="text-[10px] text-gray-400">Expected</p>
                      <p className="text-sm font-bold text-gray-900">78 hrs</p>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Continue Learning"
                icon={<BookOpen size={13} className="text-indigo-500" />}
              >
                <div className="flex flex-col gap-2">
                  {[
                    { title: "Data-Driven Decision Making", type: "Independent learning", pct: 40 },
                    { title: "Data analysis: from tools to implementation", type: "Project", pct: 10 },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900">{item.title}</p>
                        <p className="text-[10px] text-gray-400">{item.type}</p>
                      </div>
                      <Progress value={item.pct} className="w-20 h-1 bg-gray-100" />
                    </div>
                  ))}
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Upcoming Sessions"
                icon={<Calendar size={13} className="text-purple-500" />}
              >
                <div className="flex flex-col gap-2">
                  {[
                    { month: "APR", day: "9", title: "Navigating data accuracy and quality in a digital world", time: "9:30 – 12:30" },
                    { month: "APR", day: "21", title: "Delivering change in a digital world", time: "9:30 – 12:30" },
                  ].map((s) => (
                    <div key={s.day} className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-[8px] font-bold text-indigo-400 uppercase">{s.month}</span>
                        <span className="text-xs font-bold text-indigo-700 leading-none">{s.day}</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-900">{s.title}</p>
                        <p className="text-[10px] text-gray-400">{s.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Tasks"
                icon={<CheckCircle2 size={13} className="text-green-500" />}
                badge="2 overdue"
              >
                <div className="flex flex-col gap-2">
                  {[
                    { title: 'Submit "Data analysis" project', sub: "15 min · Due 9th Apr" },
                    { title: "Log your off-the-job hours", sub: "Atlas is handling this — pending approval" },
                  ].map((t, i) => (
                    <div key={t.title} className="flex items-start gap-2">
                      {i === 1 ? <Loader2 size={12} className="text-violet-400 animate-spin flex-shrink-0 mt-0.5" /> : <AlertTriangle size={12} className="text-red-400 flex-shrink-0 mt-0.5" />}
                      <div>
                        <p className="text-xs font-medium text-gray-900">{t.title}</p>
                        <p className="text-[10px] text-gray-400">{t.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
