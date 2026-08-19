import { Clock, Check } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  textMeta: "hsl(180 1% 38%)",
  action: "#4a5ff7",
  lavender: "hsl(228 100% 98%)",
  success: "hsl(156 68% 30%)",
  successText: "hsl(156 68% 25%)",
  successBg: "hsl(162 43% 90%)",
  borderTertiary: "#dbdad6",
};

const entries = [
  {
    category: "Self-study",
    task: "Data modelling module — independent study",
    date: "Monday, 6 July 2026",
    duration: "2 hr",
  },
  {
    category: "Mentoring and coaching",
    task: "Mentoring session with line manager",
    date: "Tuesday, 7 July 2026",
    duration: "45 min",
  },
];

function EntryCard({ entry, state }: { entry: (typeof entries)[0]; state: "draft" | "logged" }) {
  const isDraft = state === "draft";
  return (
    <div
      className="w-full overflow-hidden rounded-lg border"
      style={{
        borderColor: isDraft ? c.action : c.success,
        backgroundColor: isDraft ? c.lavender : c.successBg,
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.06)",
        padding: "12px 16px",
      }}
    >
      <div className="flex flex-col" style={{ gap: "4px" }}>
        <div className="flex items-start justify-between" style={{ gap: "12px" }}>
          <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
            {entry.task}
          </span>
          <div className="flex flex-shrink-0 items-center" style={{ gap: "4px" }}>
            {state === "logged" && <Check size={14} style={{ color: c.successText }} />}
            <span
              className="text-[13px] whitespace-nowrap"
              style={{ color: isDraft ? c.action : c.successText, fontWeight: 670 }}
            >
              {entry.duration}
            </span>
          </div>
        </div>
        <span className="text-xs" style={{ color: c.textMeta, fontWeight: 570 }}>
          {entry.category} · {entry.date}
        </span>
      </div>
    </div>
  );
}

export function InlineDuration() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col" style={{ gap: "48px" }}>
        {/* DRAFT STATE */}
        <div className="flex flex-col" style={{ gap: "16px" }}>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Draft
          </span>
          <div className="flex flex-col" style={{ gap: "8px" }}>
            {entries.map((entry, i) => (
              <EntryCard key={i} entry={entry} state="draft" />
            ))}
          </div>

          <div
            className="flex w-full items-center border-t"
            style={{ gap: "8px", paddingTop: "12px", borderColor: c.borderTertiary }}
          >
            <Clock size={16} style={{ color: c.textPrimary }} />
            <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 570 }}>
              Total: 2 hr 45 min
            </span>
          </div>

          <p className="text-sm leading-relaxed" style={{ color: c.textPrimary, marginTop: "8px" }}>
            Review your Off-the-Job time above. If anything needs changing, just let me know. If
            everything looks right, simply reply and I'll log it for you and update your progress.
          </p>

          <div className="flex flex-wrap items-center" style={{ gap: "8px" }}>
            <button
              type="button"
              className="cursor-pointer rounded-md text-sm text-white"
              style={{
                backgroundColor: c.action,
                fontWeight: 570,
                padding: "6px 14px",
                border: "none",
              }}
            >
              Looks right — log it
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-md text-sm"
              style={{
                backgroundColor: "white",
                color: c.textPrimary,
                fontWeight: 570,
                padding: "6px 14px",
                border: `1px solid ${c.borderTertiary}`,
              }}
            >
              Needs changing
            </button>
          </div>
        </div>

        {/* LOGGED STATE */}
        <div className="flex flex-col" style={{ gap: "16px" }}>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Logged
          </span>
          <div className="flex flex-col" style={{ gap: "8px" }}>
            {entries.map((entry, i) => (
              <EntryCard key={i} entry={entry} state="logged" />
            ))}
          </div>

          <div
            className="flex w-full items-center border-t"
            style={{ gap: "8px", paddingTop: "12px", borderColor: c.borderTertiary }}
          >
            <Check size={16} style={{ color: c.success }} />
            <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 570 }}>
              Logged: 2 hr 45 min
            </span>
          </div>

          <p className="text-sm leading-relaxed" style={{ color: c.textSecondary, marginTop: "8px" }}>
            <span style={{ color: c.textPrimary, fontWeight: 670 }}>Great job!</span> That brings
            you to <span style={{ color: c.textPrimary, fontWeight: 670 }}>4 hr 15 min</span> of
            off-the-job time this week — you're catching up nicely.
          </p>

          <p className="text-sm leading-relaxed" style={{ color: c.textSecondary }}>
            Would you like to{" "}
            <span className="cursor-pointer underline hover:text-gray-900">log more time</span> or{" "}
            <span className="cursor-pointer underline hover:text-gray-900">
              learn what counts as off-the-job hours
            </span>
            ?
          </p>
        </div>
      </div>
    </div>
  );
}
