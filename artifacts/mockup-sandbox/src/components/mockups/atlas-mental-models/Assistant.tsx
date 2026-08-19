import { useState } from "react";
import {
  MessageCircle,
  Search,
  AlertCircle,
  HelpCircle,
  Send,
  MoreVertical,
  X,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Volume2,
} from "lucide-react";

const suggestions = [
  { text: "I'm 16 hours behind on OTJ, how can I catch up?", icon: AlertCircle },
  { text: "What should I focus on next in Module 2?", icon: Search },
  { text: "Help me prepare for my session on Thursday", icon: MessageCircle },
  { text: "My Project 2 deadline is Apr 9, help me get started", icon: HelpCircle },
];

export function Assistant() {
  const [input, setInput] = useState("");
  const [hasConversation, setHasConversation] = useState(false);

  return (
    <div className="w-full h-screen bg-white flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">Ask Atlas</span>
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3 relative">
              <svg viewBox="0 0 14 12" fill="none" className="w-full h-full">
                <polygon points="7,0 14,12 0,12" fill="#4a5ff7" />
              </svg>
            </div>
            <span className="text-sm text-gray-500">AI Guide</span>
          </div>
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

      <div className="flex-1 flex flex-col px-4 py-5 overflow-y-auto">
        {!hasConversation ? (
          <div className="flex flex-col mt-auto gap-6">
            <div className="flex items-center justify-center">
              <div
                className="w-12 h-12 rounded-lg bg-white flex items-center justify-center"
                style={{
                  boxShadow: "0px 4px 8px rgba(26,29,35,0.08), 0px 0px 1px rgba(144,146,145,0.56)",
                  transform: "rotate(-3.88deg)",
                }}
              >
                <div className="grid grid-cols-3 gap-[2px] w-6 h-6">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-[7px] h-[7px] bg-gray-800 ${i === 4 ? "rounded-full col-start-2 row-start-2" : ""}`}
                      style={
                        i === 0 ? { gridColumn: 1, gridRow: 1 } :
                        i === 1 ? { gridColumn: 3, gridRow: 1 } :
                        i === 2 ? { gridColumn: 1, gridRow: 3 } :
                        i === 3 ? { gridColumn: 3, gridRow: 3 } :
                        {}
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm font-medium text-gray-900">
              Hey Sarah, here's what's on your plate
            </p>

            <div className="flex flex-col gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setHasConversation(true)}
                  className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all text-left group"
                >
                  <s.icon size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">{s.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <div className="bg-indigo-500 text-white px-3 py-2 rounded-lg rounded-br-sm text-sm max-w-[80%]">
                I'm 16 hours behind on OTJ, how can I catch up?
              </div>
            </div>
            <div className="flex gap-2">
              <div
                className="w-7 h-7 rounded-md bg-white flex items-center justify-center flex-shrink-0"
                style={{
                  boxShadow: "0px 2px 4px rgba(26,29,35,0.08)",
                  transform: "rotate(-3.88deg)",
                }}
              >
                <div className="grid grid-cols-3 gap-[1px] w-4 h-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-[4px] h-[4px] bg-gray-800 ${i === 4 ? "rounded-full col-start-2 row-start-2" : ""}`}
                      style={
                        i === 0 ? { gridColumn: 1, gridRow: 1 } :
                        i === 1 ? { gridColumn: 3, gridRow: 1 } :
                        i === 2 ? { gridColumn: 1, gridRow: 3 } :
                        i === 3 ? { gridColumn: 3, gridRow: 3 } :
                        {}
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="text-sm text-gray-900 leading-relaxed">
                  <p className="mb-2">No worries, Sarah! You're 16 hours behind, but there are some easy ways to catch up:</p>
                  <p className="font-semibold mb-1">Quick wins:</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-700">
                    <li>Log your self-study time from this week (~3-4h)</li>
                    <li>Your Thursday session counts as 2h OTJ</li>
                    <li>Project 2 research can count toward OTJ hours</li>
                  </ul>
                  <p className="mt-2 text-gray-700">Would you like me to help you log these activities?</p>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <button className="hover:text-gray-600"><ThumbsUp size={14} /></button>
                  <button className="hover:text-gray-600"><ThumbsDown size={14} /></button>
                  <button className="hover:text-gray-600"><Copy size={14} /></button>
                  <button className="hover:text-gray-600"><Volume2 size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
          <button className="text-gray-400 hover:text-gray-600">
            <Paperclip size={16} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Atlas anything..."
            className="flex-1 text-sm outline-none placeholder:text-gray-400"
          />
          <button className={`p-1 rounded ${input ? "bg-indigo-500 text-white" : "text-gray-300"}`}>
            <Send size={14} />
          </button>
        </div>
        <p className="text-[11px] text-gray-400 mt-1.5 text-center">Atlas is an AI and may make mistakes</p>
      </div>

      <div className="absolute bottom-2 left-2 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-1.5">
        <span className="text-xs font-semibold text-indigo-600">ASSISTANT</span>
        <p className="text-[10px] text-indigo-500 mt-0.5">You ask, Atlas answers</p>
      </div>
    </div>
  );
}
