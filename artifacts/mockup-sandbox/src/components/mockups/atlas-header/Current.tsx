import { History, ExternalLink, MoreVertical, X } from "lucide-react";

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      className="flex items-center justify-center rounded-lg hover:bg-[#f0efec] text-[#212223]"
      style={{ width: 32, height: 32, border: "1px solid #dbdad6", background: "#fff" }}
    >
      {children}
    </button>
  );
}

function ChatBody() {
  return (
    <div className="flex-1 px-4 pt-5 flex flex-col gap-4" style={{ fontSize: 14, lineHeight: 1.5 }}>
      <div className="self-end max-w-[80%] rounded-2xl px-3 py-2" style={{ background: "#edebe8", color: "#212223" }}>
        What should I focus on this week?
      </div>
      <div className="max-w-[92%]" style={{ color: "#212223" }}>
        Based on your progress, I'd focus on your portfolio evidence for the Data
        Analysis unit — you have two KSBs that still need mapped evidence before
        your next progress review.
      </div>
    </div>
  );
}

export function Current() {
  return (
    <div className="h-screen w-full flex flex-col bg-white" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="flex items-center justify-between px-3" style={{ height: 56, gap: 8 }}>
        <div className="flex items-center min-w-0" style={{ gap: 8 }}>
          <div className="flex items-center justify-center flex-shrink-0"
            style={{ width: 30, height: 30, borderRadius: 8.6, background: "#fff", transform: "rotate(-3.88deg)",
              boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
            <span style={{ fontSize: 14 }}>〰️</span>
          </div>
          <span className="font-medium truncate" style={{ fontSize: 14, letterSpacing: "0.28px", color: "#212223" }}>Ask Atlas</span>
          <span className="font-medium whitespace-nowrap" style={{ fontSize: 14, letterSpacing: "0.28px", color: "#6f7171" }}>AI Guide</span>
        </div>
        <div className="flex items-center flex-shrink-0" style={{ gap: 4 }}>
          <button className="font-medium text-white rounded-lg whitespace-nowrap" style={{ fontSize: 13, height: 32, padding: "0 12px", background: "#4a5ff7" }}>
            New chat
          </button>
          <IconBtn label="History"><History size={15} /></IconBtn>
          <IconBtn label="Open in new tab"><ExternalLink size={15} /></IconBtn>
          <IconBtn label="More options"><MoreVertical size={15} /></IconBtn>
          <IconBtn label="Close"><X size={15} /></IconBtn>
        </div>
      </div>
      <ChatBody />
      <div className="px-3 pb-3">
        <div className="rounded-2xl" style={{ border: "1px solid #dbdad6", padding: 8 }}>
          <div style={{ padding: 8, fontSize: 14, color: "#6f7171" }}>Ask me anything...</div>
          <div className="flex items-center justify-between" style={{ height: 32 }}>
            <span style={{ color: "#6f7171", fontSize: 18, paddingLeft: 8 }}>+</span>
            <div className="rounded-lg flex items-center justify-center" style={{ width: 28, height: 28, background: "#aab4fa" }}>
              <span style={{ color: "#fff", fontSize: 14 }}>↑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
