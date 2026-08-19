import { useState } from "react";
import {
  Bell,
  Calendar,
  Clock,
  FileText,
  AlertTriangle,
  ChevronRight,
  X,
  MoreVertical,
  BookOpen,
  CheckSquare,
  ArrowUpRight,
  Sunrise,
  Star,
  TrendingUp,
} from "lucide-react";

const timeBlocks = [
  {
    time: "Morning",
    icon: Sunrise,
    items: [
      { type: "action" as const, label: "Log yesterday's OTJ hours (est. 2h)", urgent: true, link: "/off-the-job" },
      { type: "read" as const, label: "Module 2, Unit 3: Data Governance", link: "/learning/unit/3" },
    ],
  },
  {
    time: "Afternoon",
    icon: Clock,
    items: [
      { type: "action" as const, label: "Draft Project 2 topic ideas", link: "/projects/2" },
    ],
  },
  {
    time: "Thursday",
    icon: Calendar,
    items: [
      { type: "session" as const, label: "Live session: Data Ethics (2pm)", link: "/my-sessions" },
      { type: "prep" as const, label: "Pre-read: Ethics case studies", link: "/learning/unit/4" },
    ],
  },
];

const notifications = [
  { type: "warning" as const, text: "OTJ hours: 16h behind target", time: "Now" },
  { type: "deadline" as const, text: "Project 2 due in 10 days", time: "Apr 9" },
  { type: "info" as const, text: "Guide Benn left feedback on your reflection", time: "2h ago" },
];

export function Concierge() {
  const [activeView, setActiveView] = useState<"today" | "upcoming">("today");

  return (
    <div className="w-full h-screen bg-white flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">Atlas</span>
          <span className="text-xs bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded font-medium">Concierge</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 relative">
            <Bell size={16} />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="px-4 py-3 bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-teal-100">
        <p className="text-sm text-teal-800">
          Good morning, Sarah. I've organized your day based on what matters most.
        </p>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-xs text-gray-600">1 urgent</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs text-gray-600">2 upcoming</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-gray-600">On track</span>
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-200 px-4">
        {[
          { id: "today" as const, label: "Today" },
          { id: "upcoming" as const, label: "This week" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={`py-2 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeView === tab.id
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {activeView === "today" && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              {notifications.map((n, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm ${
                    n.type === "warning"
                      ? "bg-red-50 border border-red-200"
                      : n.type === "deadline"
                      ? "bg-amber-50 border border-amber-200"
                      : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  {n.type === "warning" ? (
                    <AlertTriangle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                  ) : n.type === "deadline" ? (
                    <Calendar size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Bell size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${n.type === "warning" ? "text-red-800" : n.type === "deadline" ? "text-amber-800" : "text-blue-800"}`}>
                      {n.text}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">{n.time}</span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Your day, organized</p>
              <div className="flex flex-col gap-3">
                {timeBlocks.map((block, bi) => (
                  <div key={bi}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <block.icon size={12} className="text-gray-400" />
                      <span className="text-xs font-semibold text-gray-500">{block.time}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 ml-4">
                      {block.items.map((item, ii) => (
                        <button
                          key={ii}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-left transition-all group ${
                            "urgent" in item && item.urgent
                              ? "border-red-200 bg-red-50/50 hover:border-red-300"
                              : "border-gray-150 hover:border-gray-300"
                          }`}
                        >
                          {item.type === "action" ? (
                            <CheckSquare size={14} className={`flex-shrink-0 ${"urgent" in item && item.urgent ? "text-red-400" : "text-gray-400"}`} />
                          ) : item.type === "read" ? (
                            <BookOpen size={14} className="text-teal-400 flex-shrink-0" />
                          ) : item.type === "session" ? (
                            <Calendar size={14} className="text-indigo-400 flex-shrink-0" />
                          ) : (
                            <FileText size={14} className="text-gray-400 flex-shrink-0" />
                          )}
                          <span className="text-sm text-gray-700 flex-1">{item.label}</span>
                          <ArrowUpRight size={12} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === "upcoming" && (
          <div className="flex flex-col gap-4">
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={14} className="text-teal-500" />
                <span className="text-sm font-semibold text-gray-900">Week at a glance</span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-400">{day}</span>
                    <div className={`w-full h-8 rounded flex items-center justify-center text-[10px] font-medium ${
                      i === 0 ? "bg-teal-100 text-teal-700" :
                      i === 3 ? "bg-indigo-100 text-indigo-700" :
                      "bg-gray-50 text-gray-400"
                    }`}>
                      {i === 0 ? "OTJ" : i === 3 ? "Live" : "-"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {[
                { day: "Monday (Today)", tasks: ["Log OTJ hours", "Module 2 study"], color: "teal" },
                { day: "Tuesday", tasks: ["Project 2 brainstorm"], color: "gray" },
                { day: "Wednesday", tasks: ["Session pre-reading"], color: "gray" },
                { day: "Thursday", tasks: ["Live session 2pm", "Log session OTJ"], color: "indigo" },
                { day: "Friday", tasks: ["Weekly reflection", "Update portfolio"], color: "gray" },
              ].map((d, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-1 h-full rounded-full self-stretch ${
                    d.color === "teal" ? "bg-teal-400" :
                    d.color === "indigo" ? "bg-indigo-400" :
                    "bg-gray-200"
                  }`} />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{d.day}</p>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      {d.tasks.map((t, ti) => (
                        <span key={ti} className="text-xs text-gray-500">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-4 pb-3 pt-2 border-t border-gray-100">
        <button className="w-full flex items-center justify-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium py-2 rounded-lg transition-colors">
          <Star size={14} />
          What should I do next?
        </button>
      </div>

      <div className="absolute bottom-2 left-2 bg-teal-50 border border-teal-200 rounded-lg px-3 py-1.5">
        <span className="text-xs font-semibold text-teal-700">CONCIERGE</span>
        <p className="text-[10px] text-teal-500 mt-0.5">Atlas anticipates, you flow</p>
      </div>
    </div>
  );
}
