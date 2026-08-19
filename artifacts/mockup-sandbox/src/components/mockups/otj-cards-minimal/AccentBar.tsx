import { Check } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  action: "hsl(233 92% 63%)",
  success: "hsl(156 68% 30%)",
  successBg: "hsl(162 43% 90%)",
  warning: "hsl(35 85% 28%)",
  warningBg: "hsl(46 96% 88%)",
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

function Card({
  entry,
  confirmed,
}: {
  entry: (typeof entries)[number];
  confirmed?: boolean;
}) {
  return (
    <div
      className="flex w-full items-start justify-between rounded-md border bg-white"
      style={{
        gap: "16px",
        padding: "12px 16px",
        borderColor: c.borderTertiary,
      }}
    >
      <div className="flex min-w-0 flex-col" style={{ gap: "2px" }}>
        <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
          {entry.task}
        </span>
        <span className="text-xs" style={{ color: c.textSecondary }}>
          {entry.category} · {entry.date} · {entry.duration}
        </span>
      </div>
      <div className="flex flex-shrink-0 items-center" style={{ paddingTop: "2px" }}>
        {confirmed ? (
          <span
            className="flex items-center rounded-full text-xs"
            style={{
              gap: "4px",
              padding: "2px 10px",
              color: c.success,
              backgroundColor: c.successBg,
              fontWeight: 670,
            }}
          >
            <Check size={12} style={{ color: c.success }} />
            Logged
          </span>
        ) : (
          <span
            className="rounded-full text-xs"
            style={{
              padding: "2px 10px",
              color: c.warning,
              backgroundColor: c.warningBg,
              fontWeight: 670,
            }}
          >
            Draft
          </span>
        )}
      </div>
    </div>
  );
}

function Section({ label, confirmed }: { label: string; confirmed?: boolean }) {
  return (
    <div className="flex flex-col" style={{ gap: "8px" }}>
      <span
        className="text-xs uppercase"
        style={{ color: c.textSecondary, fontWeight: 670, letterSpacing: "0.06em" }}
      >
        {label}
      </span>
      {entries.map((entry, i) => (
        <Card key={i} entry={entry} confirmed={confirmed} />
      ))}
      <div className="flex items-center justify-between" style={{ padding: "2px 16px 0" }}>
        <span className="text-xs" style={{ color: c.textSecondary }}>
          {confirmed ? "Logged" : "Total"}
        </span>
        <span
          className="text-sm"
          style={{ color: confirmed ? c.success : c.textPrimary, fontWeight: 670 }}
        >
          2 hrs 45 min
        </span>
      </div>
    </div>
  );
}

export function AccentBar() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col" style={{ gap: "40px" }}>
        <Section label="Draft — review before logging" />
        <Section label="Confirmed" confirmed />
      </div>
    </div>
  );
}
