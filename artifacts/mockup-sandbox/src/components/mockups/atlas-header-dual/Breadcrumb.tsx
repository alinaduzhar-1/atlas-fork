import { History, Plus, MoreVertical, X, ChevronRight, ChevronDown } from "lucide-react";

function Btn({ children, filled, label }: { children: React.ReactNode; filled?: boolean; label: string }) {
  return (
    <button aria-label={label} className="flex items-center justify-center rounded-lg flex-shrink-0"
      style={{ width: 32, height: 32, border: filled ? "none" : "1px solid #dbdad6", background: filled ? "#4a5ff7" : "#fff", color: filled ? "#fff" : "#212223" }}>
      {children}
    </button>
  );
}

export function Breadcrumb() {
  return (
    <div className="w-full bg-white" style={{ fontFamily: "Inter, system-ui, sans-serif", borderBottom: "1px solid #ebeae7" }}>
      <div className="flex items-center justify-between px-3" style={{ height: 56, gap: 8 }}>
        <div className="flex items-center min-w-0" style={{ gap: 0 }}>
          <div className="flex items-center justify-center flex-shrink-0"
            style={{ width: 28, height: 28, borderRadius: 7.8, background: "#fff", transform: "rotate(-3.88deg)", marginRight: 7,
              boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
            <span style={{ fontSize: 13 }}>〰️</span>
          </div>
          {/* breadcrumb: Ask Atlas › chat name */}
          <span className="font-medium whitespace-nowrap" style={{ fontSize: 13.5, color: "#6f7171", letterSpacing: "0.24px" }}>Ask Atlas</span>
          <ChevronRight size={13} color="#c5c4c0" style={{ margin: "0 3px", flexShrink: 0 }} />
          <button className="flex items-center rounded-md hover:bg-[#f5f4f2] min-w-0" style={{ gap: 4, padding: "4px 6px", margin: "-4px -6px" }}>
            <span className="font-semibold truncate" style={{ fontSize: 13.5, color: "#212223", letterSpacing: "0.24px", maxWidth: 180 }}>
              Help with project submission deadline
            </span>
            <ChevronDown size={13} color="#9b9d9d" style={{ flexShrink: 0 }} />
          </button>
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
