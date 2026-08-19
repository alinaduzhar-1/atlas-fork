import { History, SquarePen, MoreVertical, X, ChevronDown } from "lucide-react";

function Btn({ children, filled, label }: { children: React.ReactNode; filled?: boolean; label: string }) {
  return (
    <button aria-label={label} className="flex items-center justify-center rounded-lg flex-shrink-0"
      style={{ width: 32, height: 32, border: filled ? "none" : "1px solid #dbdad6", background: filled ? "#4a5ff7" : "transparent", color: filled ? "#fff" : "#212223" }}>
      {children}
    </button>
  );
}

/** Row 2 full-width tinted band — chat name left, history count right */
export function StackedTinted() {
  return (
    <div className="w-full bg-white" style={{ fontFamily: "Inter, system-ui, sans-serif", borderBottom: "1px solid #ebeae7" }}>
      {/* Row 1 — brand + actions */}
      <div className="flex items-center justify-between px-3" style={{ height: 44, gap: 8 }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          <div className="flex items-center justify-center flex-shrink-0"
            style={{ width: 28, height: 28, borderRadius: 7.8, background: "#fff", transform: "rotate(-3.88deg)",
              boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
            <span style={{ fontSize: 13 }}>〰️</span>
          </div>
          <span className="font-semibold" style={{ fontSize: 14, color: "#212223", letterSpacing: "0.28px" }}>Ask Atlas</span>
          <span className="font-medium" style={{ fontSize: 13, color: "#9b9d9d" }}>AI Guide</span>
        </div>
        <div className="flex items-center" style={{ gap: 4 }}>
          <Btn label="New chat" filled><SquarePen size={15} /></Btn>
          <Btn label="History"><History size={15} /></Btn>
          <Btn label="More"><MoreVertical size={15} /></Btn>
          <Btn label="Close"><X size={15} /></Btn>
        </div>
      </div>
      {/* Row 2 — full-width tinted, chat name + count */}
      <div className="flex items-center px-3"
        style={{ height: 36, background: "#fff" }}>
        <button className="flex items-center min-w-0 rounded-md hover:bg-[#f5f4f2]" style={{ gap: 5, padding: "3px 6px", margin: "-3px -6px", maxWidth: '100%' }}>
          <span className="font-medium truncate" style={{ fontSize: 13, color: "#212223" }}>Help with project submission deadline</span>
          <ChevronDown size={13} color="#9b9d9d" style={{ flexShrink: 0 }} />
        </button>
      </div>
    </div>
  );
}
