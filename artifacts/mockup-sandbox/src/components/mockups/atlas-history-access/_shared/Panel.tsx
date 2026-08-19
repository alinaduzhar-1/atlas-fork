import { MoreVertical, X, Plus, ArrowUp, Target, Calendar, Users, Eye } from "lucide-react";

export function IconBtn({ children, label, filled }: { children: React.ReactNode; label: string; filled?: boolean }) {
  return (
    <button
      aria-label={label}
      className="flex items-center justify-center rounded-lg flex-shrink-0"
      style={{
        width: 32, height: 32,
        border: filled ? "none" : "1px solid #dbdad6",
        background: filled ? "#4a5ff7" : "#fff",
        color: filled ? "#fff" : "#212223",
      }}
    >
      {children}
    </button>
  );
}

export function Header({ children, extraButtons }: { children?: React.ReactNode; extraButtons?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-3 flex-shrink-0" style={{ height: 56, gap: 8 }}>
      <div className="flex items-center min-w-0" style={{ gap: 8 }}>
        <div className="flex items-center justify-center flex-shrink-0"
          style={{ width: 30, height: 30, borderRadius: 8.6, background: "#fff", transform: "rotate(-3.88deg)",
            boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
          <span style={{ fontSize: 14 }}>〰️</span>
        </div>
        <span className="font-medium truncate" style={{ fontSize: 14, letterSpacing: "0.28px", color: "#212223" }}>Ask Atlas</span>
        <span className="font-medium whitespace-nowrap" style={{ fontSize: 14, letterSpacing: "0.28px", color: "#6f7171" }}>AI Guide</span>
        {children}
      </div>
      <div className="flex items-center flex-shrink-0" style={{ gap: 4 }}>
        {extraButtons}
        <IconBtn label="New chat" filled><Plus size={16} /></IconBtn>
        <IconBtn label="More options"><MoreVertical size={15} /></IconBtn>
        <IconBtn label="Close"><X size={15} /></IconBtn>
      </div>
    </div>
  );
}

const suggestions = [
  { icon: <Target size={14} />, label: "What should I focus on next?" },
  { icon: <Calendar size={14} />, label: "Plan my next two weeks" },
  { icon: <Users size={14} />, label: "I need help with something" },
  { icon: <Eye size={14} />, label: "Show me what you can do" },
];

export function Welcome({ compact }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center px-4" style={{ gap: 12, marginTop: compact ? 24 : 48 }}>
      <div className="flex items-center justify-center"
        style={{ width: 44, height: 44, borderRadius: 12, background: "#fff",
          boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
        <span style={{ fontSize: 20 }}>〰️</span>
      </div>
      <p className="text-center font-medium" style={{ fontSize: 15, color: "#212223", maxWidth: 240, lineHeight: 1.4 }}>
        Hey Sarah, I can help you navigate your apprenticeship
      </p>
      <div className="flex flex-col w-full" style={{ gap: 6, marginTop: 4 }}>
        {suggestions.map(s => (
          <button key={s.label}
            className="flex items-center w-full rounded-lg"
            style={{ gap: 8, padding: "9px 12px", border: "1px solid #ebeae7", background: "#fff", color: "#4a5ff7", fontSize: 13.5 }}>
            {s.icon}
            <span className="underline decoration-dotted underline-offset-4">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Composer({ above }: { above?: React.ReactNode }) {
  return (
    <div className="mt-auto flex flex-col px-3 pb-3 flex-shrink-0" style={{ gap: 8 }}>
      {above}
      <div className="rounded-xl" style={{ border: "1px solid #dbdad6", padding: "10px 12px" }}>
        <div style={{ fontSize: 14, color: "#9b9d9d" }}>Ask me anything...</div>
        <div className="flex items-center justify-between" style={{ marginTop: 14 }}>
          <Plus size={16} color="#6f7171" />
          <div className="flex items-center justify-center rounded-lg" style={{ width: 28, height: 28, background: "#aab5fb" }}>
            <ArrowUp size={15} color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const recentChats = [
  "Help with project submission deadline",
  "Understanding KSB requirements",
  "Off-the-job training questions",
  "Portfolio evidence guidance",
];
