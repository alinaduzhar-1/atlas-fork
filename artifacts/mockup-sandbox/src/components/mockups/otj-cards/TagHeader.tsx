import { Calendar, Check } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  brandBlue: "#4a5ff7",
  lavender: "hsl(228 100% 98%)",
  lavenderDarker: "hsl(228 80% 92%)",
  success: "hsl(156 68% 30%)",
  successBg: "hsl(162 43% 90%)",
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

function DraftCard({ entry }: { entry: (typeof entries)[number] }) {
  return (
    <div
      className="w-full rounded-lg border bg-white p-4"
      style={{ borderColor: c.borderTertiary, boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.04)" }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider"
          style={{ backgroundColor: c.lavenderDarker, color: c.brandBlue, fontWeight: 670 }}
        >
          {entry.category}
        </span>
        <span
          className="rounded-full border px-2 py-0.5 text-xs"
          style={{ backgroundColor: c.lavender, borderColor: c.brandBlue, color: c.brandBlue, fontWeight: 670 }}
        >
          {entry.duration}
        </span>
      </div>
      <div
        className="mb-3 text-base leading-tight"
        style={{ color: c.textPrimary, fontWeight: 570 }}
      >
        {entry.task}
      </div>
      <div className="flex items-center gap-1.5">
        <Calendar size={14} style={{ color: c.textSecondary }} />
        <span className="text-xs" style={{ color: c.textSecondary, fontWeight: 570 }}>
          {entry.date}
        </span>
      </div>
    </div>
  );
}

function LoggedCard({ entry }: { entry: (typeof entries)[number] }) {
  return (
    <div
      className="w-full rounded-lg border bg-white p-4"
      style={{ borderColor: c.borderTertiary, boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.04)" }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider"
          style={{ backgroundColor: c.successBg, color: c.success, fontWeight: 670 }}
        >
          {entry.category}
        </span>
        <div
          className="flex items-center gap-1 rounded-full border px-2 py-0.5"
          style={{ backgroundColor: c.successBg, borderColor: c.success, color: c.success }}
        >
          <Check size={12} strokeWidth={3} />
          <span className="text-xs" style={{ fontWeight: 670 }}>
            {entry.duration}
          </span>
        </div>
      </div>
      <div
        className="mb-3 text-base leading-tight"
        style={{ color: c.textPrimary, fontWeight: 570 }}
      >
        {entry.task}
      </div>
      <div className="flex items-center gap-1.5">
        <Calendar size={14} style={{ color: c.textSecondary }} />
        <span className="text-xs" style={{ color: c.textSecondary, fontWeight: 570 }}>
          {entry.date}
        </span>
      </div>
    </div>
  );
}

export function TagHeader() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col gap-12">
        {/* Draft State */}
        <div className="flex flex-col gap-4">
          <div className="text-xs tracking-wide" style={{ color: c.textSecondary, fontWeight: 670 }}>
            DRAFT
          </div>
          
          <div className="flex flex-col gap-3">
            {entries.map((entry, i) => (
              <DraftCard key={i} entry={entry} />
            ))}
          </div>

          <div
            className="flex items-center justify-between rounded-lg p-3"
            style={{ backgroundColor: c.lavender }}
          >
            <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 570 }}>
              Ready to log
            </span>
            <span
              className="rounded-full px-2.5 py-1 text-xs"
              style={{ backgroundColor: c.brandBlue, color: "white", fontWeight: 670 }}
            >
              Total 2 hrs 45 min
            </span>
          </div>

          <p className="text-sm leading-relaxed" style={{ color: c.textPrimary }}>
            Review your Off-the-Job time above. If anything needs changing, just let me know. If
            everything looks right, simply reply and I'll log it for you and update your progress.
          </p>
        </div>

        {/* Logged State */}
        <div className="flex flex-col gap-4">
          <div className="text-xs tracking-wide" style={{ color: c.textSecondary, fontWeight: 670 }}>
            LOGGED
          </div>
          
          <div className="flex flex-col gap-3">
            {entries.map((entry, i) => (
              <LoggedCard key={i} entry={entry} />
            ))}
          </div>

          <div
            className="flex items-center justify-between rounded-lg p-3"
            style={{ backgroundColor: c.successBg }}
          >
            <span className="text-sm" style={{ color: c.success, fontWeight: 570 }}>
              Logged for the week
            </span>
            <span
              className="rounded-full px-2.5 py-1 text-xs"
              style={{ backgroundColor: c.success, color: "white", fontWeight: 670 }}
            >
              Total 2 hrs 45 min
            </span>
          </div>

          <p className="text-sm leading-relaxed" style={{ color: c.textSecondary }}>
            You've logged <span style={{ color: c.textPrimary, fontWeight: 670 }}>4 hrs 15 min</span>{" "}
            of off-the-job time this week (of your 6 hrs 30 min target).
          </p>
        </div>
      </div>
    </div>
  );
}
