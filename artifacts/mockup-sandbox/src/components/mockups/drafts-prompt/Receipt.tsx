import { X, Clock, FileText, CheckCircle2 } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  action: "hsl(233 92% 63%)",
  brand50: "hsl(228 100% 98%)",
  cardBorder: "#e4e3f6",
};

export function Receipt() {
  const entries = [
    { title: "Shadowing a senior analyst", duration: "1 hr" },
    { title: "SQL practice", duration: "1 hr 30 min" },
    { title: "Team lunch & learn", duration: "45 min" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="w-[368px]">
        <div
          className="relative overflow-hidden rounded-2xl shadow-sm"
          style={{
            border: `1px solid ${c.cardBorder}`,
            backgroundColor: "#ffffff",
          }}
        >
          {/* Header */}
          <div
            className="flex items-start justify-between p-4 pb-3"
            style={{ backgroundColor: c.brand50, borderBottom: `1px dashed ${c.cardBorder}` }}
          >
            <div className="flex items-center gap-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ backgroundColor: c.action, color: "white" }}
              >
                <CheckCircle2 size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>
                  OTJ drafts ready
                </span>
                <span className="text-xs" style={{ color: c.textSecondary }}>
                  Week of 6 July 2026
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

          {/* Receipt Body */}
          <div className="p-4">
            <p className="mb-4 text-xs" style={{ color: c.textPrimary, fontWeight: 500 }}>
              I've prepared 3 entries based on your recent activity:
            </p>
            
            <div className="flex flex-col gap-3">
              {entries.map((entry, i) => (
                <div key={i} className="flex items-start justify-between gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <FileText size={14} className="mt-0.5 shrink-0 opacity-50" style={{ color: c.textSecondary }} />
                    <span style={{ color: c.textPrimary, lineHeight: "1.4" }}>{entry.title}</span>
                  </div>
                  <span
                    className="shrink-0 text-xs font-medium"
                    style={{ color: c.textSecondary }}
                  >
                    {entry.duration}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="my-4"
              style={{ height: 1, backgroundColor: c.cardBorder }}
            />

            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-medium" style={{ color: c.textPrimary }}>
                Total time
              </span>
              <div className="flex items-center gap-1.5 font-semibold" style={{ color: c.textPrimary }}>
                <Clock size={14} style={{ color: c.action }} />
                <span>3h 15m</span>
              </div>
            </div>

            <button
              className="w-full rounded-xl py-2.5 text-sm text-white shadow-sm transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: c.action, fontWeight: 570 }}
            >
              Review & confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
