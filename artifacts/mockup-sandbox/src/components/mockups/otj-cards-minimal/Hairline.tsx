import { Check, Clock } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  action: "hsl(233 92% 63%)",
  success: "hsl(156 68% 30%)",
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

function Row({
  entry,
  confirmed,
  isLast,
}: {
  entry: (typeof entries)[number];
  confirmed?: boolean;
  isLast?: boolean;
}) {
  return (
    <div
      className="flex items-start justify-between"
      style={{
        gap: "16px",
        padding: "12px 0",
        borderBottom: isLast ? "none" : `1px solid ${c.borderTertiary}`,
      }}
    >
      <div className="flex min-w-0 flex-col" style={{ gap: "2px" }}>
        <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
          {entry.task}
        </span>
        <span className="text-xs" style={{ color: c.textSecondary }}>
          {entry.category} · {entry.date}
        </span>
      </div>
      <div className="flex flex-shrink-0 items-center" style={{ gap: "6px" }}>
        {confirmed ? (
          <Check size={14} style={{ color: c.success }} />
        ) : (
          <span
            className="rounded-full"
            style={{ width: "6px", height: "6px", backgroundColor: c.action }}
          />
        )}
        <span
          className="text-sm"
          style={{ color: confirmed ? c.success : c.textPrimary, fontWeight: 670 }}
        >
          {entry.duration}
        </span>
      </div>
    </div>
  );
}

function Section({ label, confirmed }: { label: string; confirmed?: boolean }) {
  return (
    <div className="flex flex-col">
      <span
        className="text-xs uppercase"
        style={{ color: c.textSecondary, fontWeight: 670, letterSpacing: "0.06em" }}
      >
        {label}
      </span>
      <div className="flex flex-col">
        {entries.map((entry, i) => (
          <Row key={i} entry={entry} confirmed={confirmed} isLast={i === entries.length - 1} />
        ))}
      </div>
      <div
        className="flex items-center justify-between"
        style={{ paddingTop: "10px", borderTop: `1px solid ${c.textPrimary}` }}
      >
        <span className="flex items-center text-xs" style={{ gap: "6px", color: c.textSecondary }}>
          {confirmed ? (
            <>
              <Check size={14} style={{ color: c.success }} /> Logged
            </>
          ) : (
            <>
              <Clock size={14} /> Total
            </>
          )}
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

export function Hairline() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col" style={{ gap: "40px" }}>
        <Section label="Draft — review before logging" />
        <Section label="Confirmed" confirmed />
      </div>
    </div>
  );
}
