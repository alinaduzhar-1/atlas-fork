import { Clock, Check } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  action: "#4a5ff7",
  lavender: "hsl(228 100% 98%)",
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

function DateLedDraftEntry({ entry }: { entry: (typeof entries)[number] }) {
  return (
    <div
      className="w-full overflow-hidden rounded-lg border"
      style={{
        borderColor: c.action,
        backgroundColor: c.lavender,
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.06)",
        padding: "12px 16px",
      }}
    >
      <div className="flex flex-col" style={{ gap: "4px" }}>
        <span
          className="text-[10px] uppercase tracking-wider"
          style={{ color: c.textSecondary, fontWeight: 670 }}
        >
          {entry.date}
        </span>
        <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
          {entry.task}
        </span>
      </div>
      <div
        className="flex items-center justify-between mt-3"
      >
        <span className="text-xs" style={{ color: c.textSecondary, fontWeight: 570 }}>
          {entry.category}
        </span>
        <span className="text-xs" style={{ color: c.textPrimary, fontWeight: 670 }}>
          {entry.duration}
        </span>
      </div>
    </div>
  );
}

function DateLedLoggedEntry({ entry }: { entry: (typeof entries)[number] }) {
  return (
    <div
      className="w-full overflow-hidden rounded-lg border relative"
      style={{
        borderColor: c.success,
        backgroundColor: c.successBg,
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.06)",
        padding: "12px 16px",
      }}
    >
      <div className="absolute top-3 right-4 flex items-center" style={{ gap: "4px" }}>
        <Check size={14} style={{ color: c.success }} />
        <span className="text-[11px]" style={{ color: c.success, fontWeight: 670 }}>
          Logged
        </span>
      </div>
      <div className="flex flex-col pr-16" style={{ gap: "4px" }}>
        <span
          className="text-[10px] uppercase tracking-wider"
          style={{ color: c.textSecondary, fontWeight: 670 }}
        >
          {entry.date}
        </span>
        <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
          {entry.task}
        </span>
      </div>
      <div
        className="flex items-center justify-between mt-3"
      >
        <span className="text-xs" style={{ color: c.textSecondary, fontWeight: 570 }}>
          {entry.category}
        </span>
        <span className="text-xs" style={{ color: c.textPrimary, fontWeight: 670 }}>
          {entry.duration}
        </span>
      </div>
    </div>
  );
}

export function DateLed() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col" style={{ gap: "48px" }}>
        
        {/* Draft State */}
        <div className="flex flex-col" style={{ gap: "16px" }}>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.textSecondary }}>
            Draft
          </span>
          <div className="flex flex-col" style={{ gap: "8px" }}>
            {entries.map((entry, i) => (
              <DateLedDraftEntry key={i} entry={entry} />
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

        {/* Logged State */}
        <div className="flex flex-col" style={{ gap: "12px" }}>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.textSecondary }}>
            Logged
          </span>
          <div className="flex flex-col" style={{ gap: "8px" }}>
            {entries.map((entry, i) => (
              <DateLedLoggedEntry key={i} entry={entry} />
            ))}
          </div>

          <div
            className="flex w-full items-center border-t mt-1"
            style={{ gap: "8px", paddingTop: "8px", borderColor: c.borderTertiary }}
          >
            <Check size={16} style={{ color: c.success }} />
            <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 570 }}>
              Logged: 2 hrs 45 min
            </span>
          </div>

          <p className="text-sm" style={{ color: c.textSecondary }}>
            You've logged{" "}
            <span style={{ color: c.textPrimary, fontWeight: 670 }}>4 hrs 15 min</span> of
            off-the-job time this week.
          </p>

          <p className="text-sm" style={{ color: c.textSecondary }}>
            Would you like to <span className="underline">log more time</span> or{" "}
            <span className="underline">learn what counts as off-the-job hours</span>?
          </p>
        </div>

      </div>
    </div>
  );
}
