import { History, Plus, MoreVertical, X, ChevronDown } from "lucide-react";

function Btn({ children, filled, label }: { children: React.ReactNode; filled?: boolean; label: string }) {
  return (
    <button aria-label={label} className="flex items-center justify-center rounded-lg flex-shrink-0"
      style={{ width: 32, height: 32, border: filled ? "none" : "1px solid #dbdad6", background: filled ? "#4a5ff7" : "#fff", color: filled ? "#fff" : "#212223" }}>
      {children}
    </button>
  );
}

export function SubLabel() {
  return (
    <div className="w-full bg-white" style={{ fontFamily: "Inter, system-ui, sans-serif", borderBottom: "1px solid #ebeae7" }}>
      <div className="flex items-center justify-between px-3" style={{ minHeight: 56, gap: 8, paddingTop: 8, paddingBottom: 8 }}>
        <div className="flex items-center min-w-0" style={{ gap: 8 }}>
          <div className="flex items-center justify-center flex-shrink-0"
            style={{ width: 30, height: 30, borderRadius: 8.6, background: "#fff", transform: "rotate(-3.88deg)",
              boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
            <span style={{ fontSize: 14 }}>〰️</span>
          </div>
          {/* brand + chat name stacked vertically */}
          <div className="flex flex-col min-w-0" style={{ gap: 1 }}>
            <div className="flex items-center" style={{ gap: 5 }}>
              <span className="font-semibold" style={{ fontSize: 13, color: "#212223", letterSpacing: "0.24px" }}>Ask Atlas</span>
              <span className="font-medium" style={{ fontSize: 12, color: "#9b9d9d" }}>AI Guide</span>
            </div>
            <button className="flex items-center rounded hover:bg-[#f5f4f2]" style={{ gap: 4, padding: "1px 4px", margin: "-1px -4px", maxWidth: 210 }}>
              <span className="truncate font-medium" style={{ fontSize: 12.5, color: "#6f7171" }}>Help with project submission deadline</span>
              <ChevronDown size={11} color="#9b9d9d" style={{ flexShrink: 0 }} />
            </button>
          </div>
        </div>
        <div className="flex items-center flex-shrink-0" style={{ gap: 4 }}>
          <Btn label="History"><History size={15} /></Btn>
          <Btn label="New chat" filled><Plus size={16} /></Btn>
          <Btn label="More"><MoreVertical size={15} /></Btn>
          <Btn label="Close"><X size={15} /></Btn>
        </div>
      </div>
    </div>
  );
}
