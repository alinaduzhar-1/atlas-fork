import { Calendar, Clock } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  action: "hsl(233 92% 63%)",
  lavender: "hsl(228 100% 98%)",
  borderTertiary: "#dbdad6",
};

const entries = [
  {
    category: "Study",
    task: "Data modelling module — independent study",
    date: "Monday, 6 July 2026",
    duration: "2 hrs",
  },
  {
    category: "Mentoring",
    task: "Mentoring session with line manager",
    date: "Tuesday, 7 July 2026",
    duration: "45 min",
  },
];

function DraftEntryCard({ entry }: { entry: (typeof entries)[number] }) {
  return (
    <div
      className="w-full overflow-hidden rounded-lg border"
      style={{
        borderColor: c.action,
        backgroundColor: c.lavender,
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex flex-col" style={{ gap: "8px", padding: "12px 16px" }}>
        <span className="truncate text-xs" style={{ color: c.textPrimary, fontWeight: 570 }}>
          {entry.category}
        </span>
        <span className="text-sm" style={{ color: c.action, fontWeight: 670 }}>
          {entry.task}
        </span>
      </div>
      <div
        className="flex items-center justify-between border-t"
        style={{ padding: "12px 16px", borderColor: c.borderTertiary }}
      >
        <div className="flex items-center" style={{ gap: "8px" }}>
          <Calendar size={16} style={{ color: c.textSecondary }} />
          <span className="text-xs" style={{ color: c.textPrimary, fontWeight: 570 }}>
            {entry.date}
          </span>
        </div>
        <span className="text-xs" style={{ color: c.textPrimary, fontWeight: 670 }}>
          {entry.duration}
        </span>
      </div>
    </div>
  );
}

export function Draft() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col" style={{ gap: "16px" }}>
        <div className="flex flex-col" style={{ gap: "8px" }}>
          {entries.map((entry, i) => (
            <DraftEntryCard key={i} entry={entry} />
          ))}
        </div>

        <div
          className="flex w-full items-center border-t"
          style={{ gap: "8px", paddingTop: "8px", borderColor: c.borderTertiary }}
        >
          <Clock size={16} style={{ color: c.textPrimary }} />
          <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 570 }}>
            Total: 2 hrs 45 min
          </span>
        </div>

        <p className="text-sm" style={{ color: c.textPrimary }}>
          Review your Off-the-Job time above. If anything needs changing, just let me know. If
          everything looks right, simply reply and I'll log it for you and update your progress.
        </p>
      </div>
    </div>
  );
}
