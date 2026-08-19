import { BookOpen, Calendar, CheckSquare, ChevronRight, Clock, Sparkles, AlertTriangle, TrendingDown, Send, LayoutGrid, BellIcon, MessageSquare, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

function TopBar() {
  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center px-8 gap-4 flex-shrink-0">
      <div className="flex items-center gap-2 mr-6">
        <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
          <LayoutGrid size={13} className="text-white" />
        </div>
        <span className="font-semibold text-sm text-gray-900 tracking-tight">multiverse</span>
      </div>
      <nav className="flex items-center gap-0 flex-1">
        {["Home", "Learning", "Projects", "Sessions", "Portfolio"].map((item, i) => (
          <button key={item} className={`px-4 h-14 text-sm font-medium transition-colors border-b-2 ${i === 0 ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            {item}
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input className="pl-8 h-8 w-44 text-sm bg-gray-50 border-gray-200" placeholder="Search..." />
        </div>
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

function AtlasCallout({ suggestions }: { suggestions: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-indigo-50/40 px-4 py-3">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-2 text-left">
        <div className="w-5 h-5 rounded-md bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <Sparkles size={11} className="text-indigo-600" />
        </div>
        <span className="text-xs font-medium text-indigo-700">Ask Atlas about this section</span>
        <ChevronRight size={12} className={`ml-auto text-indigo-400 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
      {open && (
        <div className="mt-2 flex flex-col gap-1 pl-7">
          {suggestions.map((s) => (
            <button key={s} className="text-left text-xs text-gray-600 hover:text-indigo-700 py-1 flex items-start gap-1.5 group">
              <span className="text-indigo-300 group-hover:text-indigo-500 mt-0.5">›</span>
              <span>{s}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Section({ title, icon, children, cta, ctaLabel, suggestions }: {
  title: string; icon: React.ReactNode; children: React.ReactNode;
  cta?: string; ctaLabel?: string; suggestions: string[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        </div>
        {ctaLabel && (
          <button className="text-xs text-blue-600 font-medium flex items-center gap-0.5 hover:text-blue-700">
            {ctaLabel} <ChevronRight size={12} />
          </button>
        )}
      </div>
      {children}
      <AtlasCallout suggestions={suggestions} />
    </div>
  );
}

export function TodaysFocusFeed() {
  const [chatMsg, setChatMsg] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <TopBar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-8 py-8 flex flex-col gap-8">

          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-400 font-medium">Monday, 30 March 2026</p>
            <h1 className="text-2xl font-bold text-gray-900">Hi Sarah</h1>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 p-4 flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles size={15} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold mb-1">Atlas · Here's what's on your plate</p>
              <p className="text-white/60 text-xs leading-relaxed">You have 2 overdue tasks and you're 16 hours behind on OTJ. Your next live session is Apr 9 — just 10 days away. I'd suggest starting with the Data Analysis submission.</p>
              <div className="flex flex-col gap-1 mt-3">
                {["I'm 16 hours behind — how do I catch up?", "Which task should I tackle first?", "Help me prep for my Apr 9 session"].map((s) => (
                  <button key={s} className="text-left text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 transition-colors">{s}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          <Section
            title="OTJ Progress this week"
            icon={<TrendingDown size={14} className="text-orange-500" />}
            ctaLabel="Log more time"
            suggestions={["I'm 16 hours behind, how can I catch up?", "What activities count towards OTJ hours?", "Help me plan my OTJ hours for this week"]}
          >
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3">
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>Logged this week</span>
                  <span>1h 30m of 6h 30m</span>
                </div>
                <Progress value={23} className="h-1.5 bg-gray-200" />
              </div>
              <div className="flex gap-0 pt-1 divide-x divide-gray-200">
                <div className="flex-1 pr-4">
                  <p className="text-xs text-gray-400 mb-0.5">All time logged</p>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-bold text-gray-900">62 hrs</p>
                    <span className="text-xs text-red-500 font-medium flex items-center gap-0.5"><AlertTriangle size={10} />Behind 16 hrs</span>
                  </div>
                </div>
                <div className="flex-1 pl-4">
                  <p className="text-xs text-gray-400 mb-0.5">Expected to date</p>
                  <p className="text-base font-bold text-gray-900">78 hrs</p>
                </div>
              </div>
            </div>
          </Section>

          <div className="h-px bg-gray-100" />

          <Section
            title="Continue Learning"
            icon={<BookOpen size={14} className="text-indigo-500" />}
            ctaLabel="Your programme"
            suggestions={["What should I focus on next in Module 2?", "How does this module connect to my project?", "Give me a quick recap of Module 1"]}
          >
            <div className="bg-gray-50 rounded-xl overflow-hidden divide-y divide-gray-100">
              {[
                { title: "Data-Driven Decision Making", type: "Independent learning", progress: 40 },
                { title: "Data analysis: from tools to implementation", type: "Project", progress: 10 },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.type}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-blue-500 font-medium">In progress</span>
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="7" stroke="#e5e7eb" strokeWidth="2" fill="none" />
                      <circle cx="10" cy="10" r="7" stroke="#4f46e5" strokeWidth="2" fill="none"
                        strokeDasharray={`${item.progress / 100 * 2 * Math.PI * 7} ${2 * Math.PI * 7}`}
                        strokeLinecap="round" transform="rotate(-90 10 10)" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <div className="h-px bg-gray-100" />

          <Section
            title="Upcoming Live Sessions"
            icon={<Calendar size={14} className="text-purple-500" />}
            ctaLabel="Your sessions"
            suggestions={["Help me prepare for my session on Apr 9", "What should I have completed before the session?", "What topics will be covered?"]}
          >
            <div className="flex flex-col gap-2">
              {[
                { month: "APR", day: "9", title: "Navigating data accuracy and quality in a digital world", time: "9:30 – 12:30 · Group coaching · Marcus Thompson" },
                { month: "APR", day: "21", title: "Delivering change in a digital world", time: "9:30 – 12:30 · Group coaching · Maria Rosas" },
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
          </Section>

          <div className="h-px bg-gray-100" />

          <Section
            title="Tasks"
            icon={<CheckSquare size={14} className="text-green-500" />}
            ctaLabel="View all"
            suggestions={["Help me get started on my data analysis project", "Which task should I prioritise?", "How do I log more off-the-job hours?"]}
          >
            <div className="flex flex-col gap-2">
              {[
                { title: 'Submit your "Data analysis" project', sub: "15 min", badge: "Due 9th Apr" },
                { title: "Log your off-the-job hours", sub: "You're 16 hours behind", badge: "Overdue" },
              ].map((t) => (
                <div key={t.title} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                  <AlertTriangle size={14} className="text-red-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900">{t.title}</p>
                    <p className="text-xs text-gray-400">{t.sub}</p>
                  </div>
                  <Badge className="text-xs bg-red-100 text-red-700 border-0 hover:bg-red-100 flex-shrink-0" variant="outline">{t.badge}</Badge>
                </div>
              ))}
            </div>
          </Section>

        </div>
      </main>
    </div>
  );
}
