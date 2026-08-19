import { PenSquare, ExternalLink, MoreVertical, X } from "lucide-react";

export const T1 = "#212223";
export const T2 = "#6f7171";
export const BORDER = "#dbdad6";
export const INDIGO = "#4a5ff7";

export const FS_CHAT = "KSB mapping for Data Analysis";

export function IconBtn({ children, filled = false, label }: { children: React.ReactNode; filled?: boolean; label: string }) {
  return (
    <button
      aria-label={label}
      className="flex items-center justify-center rounded-lg flex-shrink-0"
      style={{ width: 30, height: 30, border: filled ? "none" : `1px solid ${BORDER}`, background: filled ? INDIGO : "#fff", color: filled ? "#fff" : T1 }}
    >
      {children}
    </button>
  );
}

export function Header() {
  return (
    <div className="flex items-center justify-between flex-shrink-0" style={{ padding: "8px 8px 0 8px", gap: 8 }}>
      <div className="flex items-center" style={{ gap: 8 }}>
        <div className="flex items-center justify-center flex-shrink-0"
          style={{ width: 29, height: 28, borderRadius: 8, background: "#fff", transform: "rotate(-3.88deg)",
            boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
          <span style={{ fontSize: 13 }}>〰️</span>
        </div>
        <span className="font-medium" style={{ fontSize: 14, letterSpacing: "0.28px", color: T1 }}>Atlas</span>
        <span className="font-medium" style={{ fontSize: 14, letterSpacing: "0.28px", color: T2 }}>AI Guide</span>
      </div>
      <div className="flex items-center flex-shrink-0" style={{ gap: 4 }}>
        <IconBtn filled label="New chat"><PenSquare size={13} /></IconBtn>
        <IconBtn label="More options"><MoreVertical size={13} /></IconBtn>
        <IconBtn label="Close"><X size={13} /></IconBtn>
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

export function FsMessages() {
  return (
    <div className="flex-1 overflow-hidden px-3 pt-2 flex flex-col" style={{ gap: 10 }}>
      <div className="self-end rounded-2xl px-3 py-2 max-w-[80%]" style={{ background: "#edebe8", color: T1, fontSize: 13 }}>
        Which KSBs still need evidence?
      </div>
      <div style={{ color: T1, fontSize: 13, lineHeight: 1.5, maxWidth: "92%" }}>
        Two KSBs still need mapped evidence for the Data Analysis unit: K4 (data cleaning methods) and S7 (visualising results for stakeholders).
      </div>
    </div>
  );
}

export function Shell({ children, note }: { children: React.ReactNode; note: string }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start" style={{ background: "#e9e8e4", padding: 14, gap: 10 }}>
      <div className="flex flex-col w-full rounded-xl overflow-hidden relative" style={{ maxWidth: 340, background: "#fff", border: `1px solid ${BORDER}`, height: 440 }}>
        {children}
      </div>
      <div style={{ maxWidth: 340, fontSize: 11.5, color: T2, lineHeight: 1.45, textAlign: "center" }}>{note}</div>
    </div>
  );
}
