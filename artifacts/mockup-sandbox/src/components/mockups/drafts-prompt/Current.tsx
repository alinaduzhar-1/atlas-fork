import { X } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  action: "hsl(233 92% 63%)",
  brand50: "hsl(228 100% 98%)",
  cardBorder: "#e4e3f6",
};

export function Current() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="w-[368px]">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            padding: "16px",
            border: `1px solid ${c.cardBorder}`,
            backgroundColor: c.brand50,
          }}
        >
          <div className="flex items-start">
            <div className="flex flex-1 flex-col" style={{ gap: "4px" }}>
              <div className="flex items-center justify-between" style={{ gap: "8px" }}>
                <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
                  I've prepared your OTJ time for this week.
                </span>
                <button
                  type="button"
                  className="flex flex-shrink-0 items-center justify-center transition-opacity hover:opacity-70"
                  aria-label="Dismiss"
                >
                  <X size={16} style={{ color: c.textSecondary }} />
                </button>
              </div>
              <span className="text-xs" style={{ color: c.textPrimary, lineHeight: "1.5" }}>
                Around 3 hours 15 minutes across 3 entries. Have a look before you confirm it.
              </span>
              <div className="flex items-center" style={{ gap: "8px", marginTop: "12px" }}>
                <button
                  className="rounded-full px-4 py-1.5 text-sm text-white shadow-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: c.action, fontWeight: 570 }}
                >
                  Review drafts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
