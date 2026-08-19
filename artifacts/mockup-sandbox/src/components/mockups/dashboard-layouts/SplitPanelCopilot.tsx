import { BookOpen, Calendar, CheckSquare, ChevronRight, Sparkles, AlertTriangle, TrendingDown, Send, LayoutGrid, BellIcon, Search, ChevronDown, CircleDot, Bot, Mic } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function TopBar() {
  return (
    <header className="h-13 bg-white border-b border-gray-100 flex items-center px-6 gap-4 flex-shrink-0">
      <div className="flex items-center gap-2 mr-4">
        <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
          <LayoutGrid size={13} className="text-white" />
        </div>
        <span className="font-semibold text-sm text-gray-900 tracking-tight">multiverse</span>
      </div>
      <nav className="flex items-center gap-0 flex-1">
        {["Home", "Learning", "Projects", "Sessions", "Off the Job", "Portfolio"].map((item, i) => (
          <button key={item} className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${i === 0 ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            {item}
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 relative">
          <BellIcon size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
        </button>
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-violet-100 text-violet-700 text-xs font-semibold">SM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

function LeftPane() {
  return (
    <div className="flex-1 overflow-auto py-6 px-8 flex flex-col gap-6 border-r border-gray-100">
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
          <button className="text-xs text-blue-600 flex items-center gap-0.5">Log time <ChevronRight size={11} /></button>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-2">
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>1h 30m</span><span>6h 30m target</span>
            </div>
            <Progress value={23} className="h-1.5 bg-gray-200" />
          </div>
          <div className="flex gap-0 divide-x divide-gray-200 pt-1">
            <div className="flex-1 pr-3">
              <p className="text-xs text-gray-400">All time</p>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-gray-900">62 hrs</p>
                <span className="text-xs text-red-500 font-medium">↓ Behind 16 hrs</span>
              </div>
            </div>
            <div className="flex-1 pl-3">
              <p className="text-xs text-gray-400">Expected</p>
              <p className="text-sm font-bold text-gray-900">78 hrs</p>
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
        <div className="bg-gray-50 rounded-lg overflow-hidden divide-y divide-gray-100">
          {[
            { title: "Data-Driven Decision Making", type: "Independent learning", pct: 40 },
            { title: "Data analysis: from tools to implementation", type: "Project", pct: 10 },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-2.5 px-3 py-2.5">
              <div className="w-7 h-7 rounded-md bg-indigo-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">{item.title}</p>
                <p className="text-xs text-gray-400">{item.type}</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 18 18" className="flex-shrink-0">
                <circle cx="9" cy="9" r="6" stroke="#e5e7eb" strokeWidth="2" fill="none" />
                <circle cx="9" cy="9" r="6" stroke="#4f46e5" strokeWidth="2" fill="none"
                  strokeDasharray={`${item.pct / 100 * 2 * Math.PI * 6} ${2 * Math.PI * 6}`}
                  strokeLinecap="round" transform="rotate(-90 9 9)" />
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
            <div key={s.day} className="flex gap-2.5 p-2.5 bg-gray-50 rounded-lg">
              <div className="w-9 h-9 rounded-md bg-indigo-50 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-[8px] font-bold text-indigo-400 uppercase">{s.month}</span>
                <span className="text-xs font-bold text-indigo-700 leading-none">{s.day}</span>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">{s.title}</p>
                <p className="text-xs text-gray-400">{s.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CheckSquare size={13} className="text-green-500" />
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Tasks</h2>
          </div>
          <Badge className="text-xs bg-red-50 text-red-600 border-red-100 hover:bg-red-50 px-1.5 py-0" variant="outline">2 overdue</Badge>
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { title: 'Submit "Data analysis" project', sub: "15 min · Due 9th Apr" },
            { title: "Log your off-the-job hours", sub: "16 hours behind" },
          ].map((t) => (
            <div key={t.title} className="flex items-start gap-2 p-2.5 bg-red-50 rounded-lg border border-red-100">
              <AlertTriangle size={12} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-gray-900">{t.title}</p>
                <p className="text-xs text-red-400">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RightPane() {
  const [msg, setMsg] = useState("");
  const agenda = [
    { icon: <TrendingDown size={12} className="text-orange-400" />, label: "OTJ hours", detail: "16 hrs behind target", action: "Plan catch-up", urgent: true },
    { icon: <BookOpen size={12} className="text-indigo-400" />, label: "Module 2", detail: "Continue where you left off", action: "Open module", urgent: false },
    { icon: <Calendar size={12} className="text-purple-400" />, label: "Apr 9 Session", detail: "10 days away — prep needed", action: "Prepare now", urgent: true },
    { icon: <CheckSquare size={12} className="text-red-400" />, label: "Data analysis project", detail: "Due Apr 9 · 15 min task", action: "Start task", urgent: true },
  ];
  const messages = [
    { from: "atlas", text: "Hey Sarah, here's what's on your plate. You have 2 overdue tasks and you're 16 hours behind on OTJ. Want me to help you make a plan?" },
  ];
  return (
    <div className="w-[380px] flex-shrink-0 flex flex-col bg-slate-950 overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
              <Bot size={14} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-none">Atlas</p>
              <p className="text-white/40 text-xs">AI Agent · March 30</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-medium">Active</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-b border-white/5">
        <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">Today's agenda</p>
        <div className="flex flex-col gap-1.5">
          {agenda.map((item) => (
            <div key={item.label} className={`flex items-center gap-2.5 p-2.5 rounded-lg ${item.urgent ? "bg-white/5" : "bg-transparent"}`}>
              <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-xs font-medium">{item.label}</p>
                <p className="text-white/40 text-xs">{item.detail}</p>
              </div>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex-shrink-0 whitespace-nowrap">{item.action}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-5 py-4 flex flex-col gap-3">
        {messages.map((m, i) => (
          <div key={i} className="flex gap-2.5">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bot size={12} className="text-white" />
            </div>
            <div className="flex-1 bg-white/5 rounded-xl rounded-tl-none px-3 py-2.5">
              <p className="text-white/70 text-xs leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-1.5 pl-8">
          {["Yes, help me plan my week", "I'm 16 hours behind — what do I do?", "Prep me for the Apr 9 session"].map((s) => (
            <button key={s} className="text-left text-xs text-indigo-300 hover:text-indigo-200 bg-indigo-950/50 hover:bg-indigo-950 rounded-lg px-3 py-2 transition-colors border border-indigo-800/30">{s}</button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 border-t border-white/5">
        <div className="flex gap-2 items-end">
          <Textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Ask Atlas anything..."
            className="flex-1 min-h-[36px] max-h-24 text-xs bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none focus-visible:ring-white/20 rounded-xl py-2.5"
            rows={1}
          />
          <Button size="sm" className="h-9 w-9 p-0 bg-indigo-600 hover:bg-indigo-500 border-0 flex-shrink-0 rounded-xl">
            <Send size={13} className="text-white" />
          </Button>
        </div>
        <p className="text-white/20 text-xs text-center mt-2">Atlas can make mistakes. Always verify important information.</p>
      </div>
    </div>
  );
}

export function SplitPanelCopilot() {
  return (
    <div className="h-screen flex flex-col font-sans overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftPane />
        <RightPane />
      </div>
    </div>
  );
}
