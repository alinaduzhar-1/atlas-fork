import { Check } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  action: "hsl(233 92% 63%)",
  lavender: "hsl(228 100% 98%)",
  success: "hsl(156 68% 30%)",
  successBg: "hsl(162 43% 90%)",
  borderTertiary: "#dbdad6",
};

const entries = [
  {
    category: "Study",
    task: "Data modelling module — independent study",
    date: "Mon, 6 July",
    duration: "2 hrs",
  },
  {
    category: "Mentoring",
    task: "Mentoring session with line manager",
    date: "Tue, 7 July",
    duration: "45 min",
  },
];

function Section({ label, confirmed }: { label: string; confirmed?: boolean }) {
  return (
    <div className="flex flex-col" style={{ gap: "8px" }}>
      <span
        className="text-xs uppercase"
        style={{ color: c.textSecondary, fontWeight: 670, letterSpacing: "0.06em" }}
      >
        {label}
      </span>
      <div
        className="overflow-hidden rounded-lg border"
        style={{
          borderColor: c.borderTertiary,
          backgroundColor: confirmed ? c.successBg : c.lavender,
        }}
      >
        {entries.map((entry, i) => (
          <div
            key={i}
            className="flex items-center justify-between"
            style={{
              gap: "16px",
              padding: "10px 16px",
              borderTop: i === 0 ? "none" : `1px solid ${confirmed ? "hsl(162 30% 80%)" : "hsl(228 60% 92%)"}`,
            }}
          >
            <div className="flex min-w-0 flex-col" style={{ gap: "1px" }}>
              <span className="truncate text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
                {entry.task}
              </span>
              <span className="text-xs" style={{ color: c.textSecondary }}>
                {entry.category} · {entry.date}
              </span>
            </div>
            <div className="flex flex-shrink-0 items-center" style={{ gap: "6px" }}>
              {confirmed && <Check size={14} style={{ color: c.success }} />}
              <span
                className="text-sm"
                style={{ color: confirmed ? c.success : c.textPrimary, fontWeight: 670 }}
              >
                {entry.duration}
              </span>
            </div>
          </div>
        ))}
        <div
          className="flex items-center justify-between"
          style={{
            padding: "10px 16px",
            borderTop: `1px solid ${confirmed ? "hsl(162 30% 80%)" : "hsl(228 60% 92%)"}`,
            backgroundColor: "white",
          }}
        >
          <span className="text-xs" style={{ color: c.textSecondary, fontWeight: 570 }}>
            {confirmed ? "Logged" : "Total to log"}
          </span>
          <span
            className="text-sm"
            style={{ color: confirmed ? c.success : c.textPrimary, fontWeight: 670 }}
          >
            2 hrs 45 min
          </span>
        </div>
      </div>
    </div>
  );
}

export function CompactRow() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col" style={{ gap: "40px" }}>
        <Section label="Draft — review before logging" />
        <Section label="Confirmed" confirmed />
      </div>
    </div>
  );
}
