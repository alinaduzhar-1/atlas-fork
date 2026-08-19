import { useState } from "react";
import {
  Target,
  TrendingUp,
  Brain,
  MessageCircle,
  ChevronRight,
  X,
  MoreVertical,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Lightbulb,
} from "lucide-react";

const reflectionPrompts = [
  "What's one thing you learned this week that surprised you?",
  "How does data governance connect to your day-to-day role?",
  "What's blocking you right now, and what's one small step forward?",
];

export function Coach() {
  const [activeTab, setActiveTab] = useState<"reflect" | "goals" | "growth">("reflect");

  return (
    <div className="w-full h-screen bg-white flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">Atlas</span>
          <span className="text-xs bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded font-medium">Coach</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
            <MoreVertical size={16} />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        {[
          { id: "reflect" as const, label: "Reflect", icon: Brain },
          { id: "goals" as const, label: "Goals", icon: Target },
          { id: "growth" as const, label: "Growth", icon: TrendingUp },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-violet-500 text-violet-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {activeTab === "reflect" && (
          <div className="flex flex-col gap-4">
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-violet-500" />
                <span className="text-sm font-semibold text-violet-800">Today's reflection</span>
              </div>
              <p className="text-sm text-violet-700 leading-relaxed italic">
                "You're 16 hours behind on OTJ. Before we fix the number, let's think about why. What's been getting in the way of logging your hours?"
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Think about...</p>
              {reflectionPrompts.map((prompt, i) => (
                <button
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-lg border border-gray-200 hover:border-violet-300 hover:bg-violet-50/30 transition-all text-left"
                >
                  <Lightbulb size={14} className="text-violet-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{prompt}</span>
                </button>
              ))}
            </div>

            <div className="border border-gray-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Your journal</p>
              <textarea
                placeholder="Write your thoughts here... Atlas will respond with guiding questions."
                className="w-full h-20 text-sm text-gray-700 placeholder:text-gray-400 resize-none outline-none"
              />
              <div className="flex justify-end mt-1">
                <button className="bg-violet-500 text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-violet-600 transition-colors flex items-center gap-1">
                  <MessageCircle size={12} />
                  Share with Atlas
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "goals" && (
          <div className="flex flex-col gap-4">
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-900">This week's focus</span>
                <span className="text-xs text-gray-400">Week 12</span>
              </div>

              <div className="space-y-3">
                {[
                  { goal: "Log 6h of OTJ activities", progress: 0, target: "6h", current: "0h" },
                  { goal: "Complete Module 2, Unit 3", progress: 60, target: "100%", current: "60%" },
                  { goal: "Start Project 2 outline", progress: 0, target: "Draft", current: "Not started" },
                ].map((g, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-800">{g.goal}</span>
                      <span className="text-xs text-gray-400">{g.current}/{g.target}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-400 rounded-full transition-all"
                        style={{ width: `${g.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <button className="flex items-center gap-1 text-xs text-violet-600 font-medium hover:text-violet-700">
                  <Target size={12} />
                  Atlas: "Which of these feels most within reach today?"
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Award size={14} className="text-amber-500" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Recent wins</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  Completed Unit 2 assessment (scored 85%)
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  Logged 4h OTJ last week (up from 2h)
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  Received positive guide feedback
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "growth" && (
          <div className="flex flex-col gap-4">
            <div className="border border-gray-200 rounded-lg p-3">
              <span className="text-sm font-semibold text-gray-900">Your learning patterns</span>
              <p className="text-xs text-gray-500 mt-1">Atlas has noticed these based on your activity</p>

              <div className="mt-3 space-y-3">
                {[
                  { insight: "You learn best through practical exercises", confidence: "High", emoji: "hands-on" },
                  { insight: "Tuesdays and Thursdays are your most productive learning days", confidence: "Medium", emoji: "calendar" },
                  { insight: "You tend to delay logging OTJ until the end of the week", confidence: "High", emoji: "clock" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-lg">
                    <Brain size={14} className="text-violet-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-800">{item.insight}</p>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide">{item.confidence} confidence</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-violet-200 bg-violet-50/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-violet-500" />
                <span className="text-sm font-semibold text-violet-800">Coaching insight</span>
              </div>
              <p className="text-sm text-violet-700 leading-relaxed">
                "Since you learn best hands-on, what if you treated the OTJ logging as part of the learning itself? After each activity, take 2 minutes to log it and write one sentence about what you took away."
              </p>
              <button className="mt-2 flex items-center gap-1 text-xs text-violet-600 font-medium hover:text-violet-700">
                Try this approach
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-2 left-2 bg-violet-50 border border-violet-200 rounded-lg px-3 py-1.5">
        <span className="text-xs font-semibold text-violet-700">COACH</span>
        <p className="text-[10px] text-violet-500 mt-0.5">Atlas challenges, you grow</p>
      </div>
    </div>
  );
}
