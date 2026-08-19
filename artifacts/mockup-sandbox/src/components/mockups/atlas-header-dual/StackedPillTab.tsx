import { History, Plus, MoreVertical, X, ChevronDown } from "lucide-react";

function Btn({ children, filled, label }: { children: React.ReactNode; filled?: boolean; label: string }) {
  return (
    <button aria-label={label} className="flex items-center justify-center rounded-lg flex-shrink-0"
      style={{ width: 32, height: 32, border: filled ? "none" : "1px solid #dbdad6", background: filled ? "#4a5ff7" : "#fff", color: filled ? "#fff" : "#212223" }}>
      {children}
    </button>
  );
}

/** Row 2 chat name styled as a pill/tab — clearly interactive, hints at switchability */
export function StackedPillTab() {
  return (
    <div className="w-full bg-white" style={{ fontFamily: "Inter, system-ui, sans-serif", borderBottom: "1px solid #ebeae7" }}>
      {/* Row 1 — brand */}
      <div className="flex items-center justify-between px-3" style={{ height: 44, gap: 8 }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          <div className="flex items-center justify-center flex-shrink-0"
            style={{ width: 28, height: 28, borderRadius: 7.8, background: "#fff", transform: "rotate(-3.88deg)",
              boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
            <span style={{ fontSize: 13 }}>〰️</span>
          </div>
          <span className="font-semibold" style={{ fontSize: 14, color: "#212223", letterSpacing: "0.28px" }}>Ask Atlas</span>
          <span className="font-medium" style={{ fontSize: 13, color: "#9b9d9d", letterSpacing: "0.24px" }}>AI Guide</span>
        </div>
        <div className="flex items-center" style={{ gap: 4 }}>
          <Btn label="History"><History size={15} /></Btn>
          <Btn label="New chat" filled><Plus size={16} /></Btn>
          <Btn label="More"><MoreVertical size={15} /></Btn>
          <Btn label="Close"><X size={15} /></Btn>
        </div>
      </div>
      {/* Row 2 — chat name as pill tab */}
      <div className="flex items-center px-3" style={{ height: 36, borderTop: "1px solid #f0efec", gap: 6 }}>
        {/* active tab */}
        <button className="flex items-center rounded-full"
          style={{ gap: 5, padding: "4px 10px", background: "#212223", color: "#fff", maxWidth: 240 }}>
          <span className="font-medium truncate" style={{ fontSize: 12.5 }}>Help with project submission deadline</span>
          <ChevronDown size={12} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0 }} />
        </button>
        {/* ghost "new tab" hint */}
        <button className="flex items-center justify-center rounded-full flex-shrink-0"
          style={{ width: 24, height: 24, border: "1.5px dashed #dbdad6", color: "#9b9d9d" }}>
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}
