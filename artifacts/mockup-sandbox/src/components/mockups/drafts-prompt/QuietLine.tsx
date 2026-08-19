import { X } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  action: "hsl(233 92% 63%)",
  brand50: "hsl(228 100% 98%)",
  cardBorder: "#e4e3f6",
};

export function QuietLine() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="w-[368px]">
        <div 
          className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors group"
          style={{ 
            border: `1px solid ${c.cardBorder}`,
            backgroundColor: c.brand50,
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
          }}
        >
          <div className="flex flex-1 items-center gap-2.5">
            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 overflow-hidden">
              <span className="text-[13px] leading-tight" style={{ color: c.textPrimary, fontWeight: 500 }}>
                Review drafted 3hr 15 min of OTJ time
              </span>
            </div>
          </div>
          
          <button
            type="button"
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-colors hover:bg-black/5"
            aria-label="Dismiss"
          >
            <X size={14} style={{ color: c.textSecondary }} />
          </button>
        </div>
      </div>
    </div>
  );
}
