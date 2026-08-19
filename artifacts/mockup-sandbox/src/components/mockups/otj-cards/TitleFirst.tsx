import { Clock, Check } from "lucide-react";

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
        padding: "12px 16px",
      }}
    >
      <div className="flex flex-col" style={{ gap: "4px" }}>
        <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
          {entry.task}
        </span>
        <span className="text-xs" style={{ color: c.textSecondary, fontWeight: 570 }}>
          {entry.category} &middot; {entry.date} &middot;{" "}
          <span style={{ color: c.textPrimary, fontWeight: 670 }}>{entry.duration}</span>
        </span>
      </div>
    </div>
  );
}

function LoggedEntryCard({ entry }: { entry: (typeof entries)[number] }) {
  return (
    <div
      className="w-full overflow-hidden rounded-lg border"
      style={{
        borderColor: c.success,
        backgroundColor: c.successBg,
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.06)",
        padding: "12px 16px",
      }}
    >
      <div className="flex items-start justify-between" style={{ gap: "8px" }}>
        <div className="flex min-w-0 flex-col" style={{ gap: "4px" }}>
          <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
            {entry.task}
          </span>
          <span className="text-xs" style={{ color: c.textSecondary, fontWeight: 570 }}>
            {entry.category} &middot; {entry.date} &middot;{" "}
            <span style={{ color: c.textPrimary, fontWeight: 670 }}>{entry.duration}</span>
          </span>
        </div>
        <div className="flex flex-shrink-0 items-center" style={{ gap: "4px" }}>
          <Check size={16} style={{ color: c.success }} />
          <span className="text-xs" style={{ color: c.success, fontWeight: 670 }}>
            Logged
          </span>
        </div>
      </div>
    </div>
  );
}

export function TitleFirst() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col" style={{ gap: "48px" }}>
        {/* Draft Section */}
        <div>
          <h2 className="mb-4 text-xs uppercase tracking-wider" style={{ color: c.textSecondary }}>
            Draft
          </h2>
          <div className="flex flex-col" style={{ gap: "16px" }}>
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

        {/* Logged Section */}
        <div>
          <h2 className="mb-4 text-xs uppercase tracking-wider" style={{ color: c.textSecondary }}>
            Logged
          </h2>
          <div className="flex flex-col" style={{ gap: "12px" }}>
            <div className="flex flex-col" style={{ gap: "8px" }}>
              {entries.map((entry, i) => (
                <LoggedEntryCard key={i} entry={entry} />
              ))}
            </div>

            <div
              className="flex w-full items-center border-t"
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
    </div>
  );
}
