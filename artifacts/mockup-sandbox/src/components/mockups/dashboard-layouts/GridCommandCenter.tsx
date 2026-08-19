import { LayoutGrid, BellIcon, MessageSquare, Search, ChevronRight, AlertTriangle, BookOpen, Calendar, CheckSquare, TrendingDown, Bot, Send, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

function TopBar() {
  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center px-6 gap-4 flex-shrink-0">
      <div className="flex items-center gap-2 mr-4">
        <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
          <LayoutGrid size={13} className="text-white" />
        </div>
        <span className="font-semibold text-sm text-gray-900 tracking-tight">multiverse</span>
      </div>
      <nav className="flex items-center gap-1 flex-1">
        {["Home", "Learning", "Projects", "My Sessions", "Off the Job", "Portfolio"].map((item, i) => (
          <button key={item} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${i === 0 ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
            {item}
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input className="pl-8 h-8 w-48 text-sm bg-gray-50 border-gray-200" placeholder="Search..." />
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 relative">
          <BellIcon size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500">
          <MessageSquare size={16} />
        </button>
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-violet-100 text-violet-700 text-xs font-semibold">SM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

function OTJCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
            <TrendingDown size={14} className="text-orange-500" />
          </div>
          <span className="text-sm font-semibold text-gray-900">OTJ Progress</span>
        </div>
        <Badge variant="destructive" className="text-xs font-medium bg-red-50 text-red-600 border-red-100 hover:bg-red-50">Behind 16 hrs</Badge>
      </div>
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>This week</span>
          <span>1h 30m / 6h 30m</span>
        </div>
        <Progress value={23} className="h-1.5 bg-gray-100" />
      </div>
      <div className="flex gap-0 divide-x divide-gray-100">
        <div className="flex-1 pr-4">
          <p className="text-xs text-gray-400 mb-0.5">All time logged</p>
          <p className="text-xl font-bold text-gray-900">62 hrs</p>
        </div>
        <div className="flex-1 pl-4">
          <p className="text-xs text-gray-400 mb-0.5">Expected to date</p>
          <p className="text-xl font-bold text-gray-900">78 hrs</p>
        </div>
      </div>
      <button className="w-full text-xs text-blue-600 font-medium flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors">
        Log more time <ChevronRight size={12} />
      </button>
    </div>
  );
}

function AtlasCard() {
  const [msg, setMsg] = useState("");
  const suggestions = [
    "I'm 16 hrs behind — how do I catch up?",
    "Help me prepare for Apr 9 session",
    "Which task should I prioritise?",
  ];
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 flex flex-col gap-3 row-span-2">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
          <Bot size={14} className="text-white" />
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-none">Atlas</p>
          <p className="text-white/50 text-xs mt-0.5">Your AI co-pilot</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
          <span className="text-green-400 text-xs">Active</span>
        </div>
      </div>
      <div className="bg-white/5 rounded-lg p-3">
        <p className="text-white/70 text-xs leading-relaxed">Hey Sarah, here's what's on your plate today. You have 2 tasks overdue and a session on Apr 9 you may want to prepare for.</p>
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Suggested questions</p>
        {suggestions.map((s) => (
          <button key={s} className="text-left text-xs text-white/70 bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 transition-colors leading-snug">
            {s}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mt-auto">
        <Input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Ask Atlas anything..."
          className="flex-1 h-8 text-xs bg-white/10 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-white/20"
        />
        <Button size="sm" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 border-0">
          <Send size={12} className="text-white" />
        </Button>
      </div>
    </div>
  );
}

function LearningCard() {
  const items = [
    { title: "Data-Driven Decision Making", type: "Independent learning", progress: 40, color: "bg-indigo-500" },
    { title: "Data analysis: from tools to implementation", type: "Project", progress: 10, color: "bg-amber-500" },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
            <BookOpen size={14} className="text-indigo-500" />
          </div>
          <span className="text-sm font-semibold text-gray-900">Continue Learning</span>
        </div>
        <button className="text-xs text-blue-600 font-medium flex items-center gap-0.5">Your programme <ChevronRight size={12} /></button>
      </div>
      <div className="flex flex-col divide-y divide-gray-50">
        {items.map((item) => (
          <div key={item.title} className="py-2.5 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <p className="text-xs font-medium text-gray-900 leading-tight">{item.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.type}</p>
              </div>
              <span className="text-xs text-blue-500 font-medium ml-3 flex-shrink-0">In progress</span>
            </div>
            <Progress value={item.progress} className={`h-1 bg-gray-100`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SessionsCard() {
  const sessions = [
    { month: "APR", day: "9", title: "Navigating data accuracy and quality in a digital world", time: "9:30 – 12:30", type: "Group coaching", host: "Marcus Thompson" },
    { month: "APR", day: "21", title: "Delivering change in a digital world", time: "9:30 – 12:30", type: "Group coaching", host: "Maria Rosas" },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
            <Calendar size={14} className="text-purple-500" />
          </div>
          <span className="text-sm font-semibold text-gray-900">Upcoming Sessions</span>
        </div>
        <button className="text-xs text-blue-600 font-medium flex items-center gap-0.5">Your sessions <ChevronRight size={12} /></button>
      </div>
      <div className="flex flex-col gap-2">
        {sessions.map((s) => (
          <div key={s.day} className="flex gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-[9px] font-bold text-indigo-400 uppercase">{s.month}</span>
              <span className="text-sm font-bold text-indigo-700 leading-none">{s.day}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 leading-tight truncate">{s.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.time} · {s.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TasksCard() {
  const tasks = [
    { title: 'Submit your "Data analysis" project', sub: "15 min", status: "Due 9th Apr", urgent: true },
    { title: "Log your off-the-job hours", sub: "You're 16 hours behind", status: "Overdue", urgent: true },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
            <CheckSquare size={14} className="text-green-500" />
          </div>
          <span className="text-sm font-semibold text-gray-900">Tasks</span>
        </div>
        <Badge className="text-xs bg-red-50 text-red-600 border-red-100 hover:bg-red-50" variant="outline">2 overdue</Badge>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((t) => (
          <div key={t.title} className="flex items-center gap-3 p-2.5 rounded-lg bg-red-50/50 border border-red-100">
            <AlertTriangle size={14} className="text-red-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 leading-tight">{t.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{t.sub}</p>
            </div>
            <Badge className="text-xs bg-red-100 text-red-700 border-0 hover:bg-red-100 flex-shrink-0" variant="outline">{t.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GridCommandCenter() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <TopBar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-5">
            <p className="text-xs text-gray-400 font-medium">Monday, 30 March 2026</p>
            <h1 className="text-xl font-bold text-gray-900 mt-0.5">Hi Sarah</h1>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <OTJCard />
            <LearningCard />
            <AtlasCard />
            <SessionsCard />
            <TasksCard />
          </div>
        </div>
      </main>
    </div>
  );
}
