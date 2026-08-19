import { ExternalLink, MoreVertical, X, ChevronDown, PenSquare } from "lucide-react";

export const T1 = "#212223";
export const T2 = "#6f7171";
export const BORDER = "#dbdad6";
export const HOVER = "#f0efec";

export const CHAT_NAME = "Help with project submission deadline";

export function IconBtn({ children, filled = false, label }: { children: React.ReactNode; filled?: boolean; label: string }) {
  return (
    <button
      aria-label={label}
      className="flex items-center justify-center rounded-lg flex-shrink-0"
      style={{ width: 32, height: 32, border: filled ? "none" : `1px solid ${BORDER}`, background: filled ? "#4a5ff7" : "#fff", color: filled ? "#fff" : T1 }}
    >
      {children}
    </button>
  );
}

export function BrandRow() {
  return (
    <div className="flex items-center justify-between flex-shrink-0" style={{ padding: "8px 8px 0 8px", gap: 8 }}>
      <div className="flex items-center" style={{ gap: 8 }}>
        <div className="flex items-center justify-center flex-shrink-0"
          style={{ width: 31, height: 30, borderRadius: 8.6, background: "#fff", transform: "rotate(-3.88deg)",
            boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
          <span style={{ fontSize: 14 }}>〰️</span>
        </div>
        <span className="font-medium" style={{ fontSize: 14, letterSpacing: "0.28px", color: T1 }}>Ask Atlas</span>
        <span className="font-medium" style={{ fontSize: 14, letterSpacing: "0.28px", color: T2 }}>AI Guide</span>
      </div>
      <div className="flex items-center flex-shrink-0" style={{ gap: 4 }}>
        <IconBtn filled label="New chat"><PenSquare size={14} /></IconBtn>
        <IconBtn label="Open full screen"><ExternalLink size={14} /></IconBtn>
        <IconBtn label="More options"><MoreVertical size={14} /></IconBtn>
        <IconBtn label="Close"><X size={14} /></IconBtn>
      </div>
    </div>
  );
}

export function ChatMessage() {
  return (
    <div className="flex-1 overflow-hidden px-3 pt-2 flex flex-col" style={{ gap: 10 }}>
      <div className="self-end rounded-2xl px-3 py-2 max-w-[80%]" style={{ background: "#edebe8", color: T1, fontSize: 13.5 }}>
        What should I focus on this week?
      </div>
      <div style={{ color: T1, fontSize: 13.5, lineHeight: 1.5, maxWidth: "92%" }}>
        Based on your progress, I'd focus on your portfolio evidence for the Data Analysis unit — you have two KSBs that still need mapped evidence.
      </div>
    </div>
  );
}

export function Composer() {
  return (
    <div className="px-3 pb-3 flex-shrink-0">
      <div className="rounded-xl" style={{ border: `1px solid ${BORDER}`, padding: "8px 10px" }}>
        <div style={{ fontSize: 13.5, color: "#9b9d9d" }}>Ask me anything...</div>
        <div className="flex items-center justify-between" style={{ marginTop: 10 }}>
          <span style={{ color: T2, fontSize: 18 }}>+</span>
          <div className="flex items-center justify-center rounded-lg" style={{ width: 28, height: 28, background: "#aab4fa" }}>
            <span style={{ color: "#fff", fontSize: 14 }}>↑</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PanelShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex justify-center items-start" style={{ background: "#e9e8e4", padding: 16 }}>
      <div className="flex flex-col w-full rounded-xl overflow-hidden" style={{ maxWidth: 340, background: "#fff", border: `1px solid ${BORDER}`, height: 480 }}>
        {children}
      </div>
    </div>
  );
}

export { ChevronDown };
