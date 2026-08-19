import { History, Plus, MoreVertical, X, ChevronDown } from "lucide-react";

function Btn({ children, filled, label }: { children: React.ReactNode; filled?: boolean; label: string }) {
  return (
    <button aria-label={label} className="flex items-center justify-center rounded-lg flex-shrink-0"
      style={{ width: 32, height: 32, border: filled ? "none" : "1px solid #dbdad6", background: filled ? "#4a5ff7" : "#fff", color: filled ? "#fff" : "#212223" }}>
      {children}
    </button>
  );
}

export function TwoRow() {
  return (
    <div className="w-full bg-white" style={{ fontFamily: "Inter, system-ui, sans-serif", borderBottom: "1px solid #ebeae7" }}>
      {/* Row 1: brand + all actions */}
      <div className="flex items-center justify-between px-3" style={{ height: 48, gap: 8 }}>
        <div className="flex items-center" style={{ gap: 7 }}>
          <div className="flex items-center justify-center flex-shrink-0"
            style={{ width: 28, height: 28, borderRadius: 7.8, background: "#fff", transform: "rotate(-3.88deg)",
              boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
            <span style={{ fontSize: 13 }}>〰️</span>
          </div>
          <span className="font-semibold" style={{ fontSize: 14, color: "#212223", letterSpacing: "0.28px" }}>Ask Atlas</span>
          <span className="inline-flex items-center rounded-full font-medium" style={{ fontSize: 10.5, color: "#6f7171", background: "#f0efec", padding: "2px 7px", letterSpacing: "0.2px" }}>AI Guide</span>
        </div>
        <div className="flex items-center flex-shrink-0" style={{ gap: 4 }}>
          <Btn label="History"><History size={15} /></Btn>
          <Btn label="New chat" filled><Plus size={16} /></Btn>
          <Btn label="More"><MoreVertical size={15} /></Btn>
          <Btn label="Close"><X size={15} /></Btn>
        </div>
      </div>
      {/* Row 2: chat name — full width, subtle bg */}
      <div className="flex items-center px-3" style={{ height: 34, background: "#faf9f7", borderTop: "1px solid #f0efec" }}>
        <button className="flex items-center min-w-0 rounded-md hover:bg-[#f0efec]" style={{ gap: 5, padding: "3px 6px", margin: "-3px -6px" }}>
          <span className="font-medium truncate" style={{ fontSize: 13, color: "#4d5051", maxWidth: 290 }}>Help with project submission deadline</span>
          <ChevronDown size={13} color="#9b9d9d" style={{ flexShrink: 0 }} />
        </button>
      </div>
    </div>
  );
}
