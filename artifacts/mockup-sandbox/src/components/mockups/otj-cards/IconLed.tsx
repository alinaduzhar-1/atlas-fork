import { BookOpen, Users, Sparkles, CheckCircle2, Clock } from "lucide-react";

const c = {
  blue: "#4a5ff7",
  lavender: "hsl(228 100% 98%)",
  success: "hsl(156 68% 30%)",
  successBg: "hsl(162 43% 90%)",
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  border: "#dbdad6",
};

const entries = [
  {
    category: "Study",
    task: "Data modelling module — independent study",
    date: "Mon 6 Jul 2026",
    duration: "2 hrs",
    icon: BookOpen,
  },
  {
    category: "Mentoring",
    task: "Mentoring session with line manager",
    date: "Tue 7 Jul 2026",
    duration: "45 min",
    icon: Users,
  },
];

function EntryCard({
  entry,
  isLogged,
}: {
  entry: (typeof entries)[number];
  isLogged?: boolean;
}) {
  const Icon = entry.icon;
  return (
    <div
      className="relative flex w-full overflow-hidden rounded-lg border bg-white shadow-sm"
      style={{ borderColor: c.border }}
    >
      <div
        className="absolute left-0 right-0 top-0 h-1"
        style={{ backgroundColor: isLogged ? c.success : c.blue }}
      />
      <div className="flex w-full items-start gap-3 p-4 pt-5">
        <div
          className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: isLogged ? c.successBg : c.lavender }}
        >
          <Icon size={20} style={{ color: isLogged ? c.success : c.blue }} />
          {isLogged && (
            <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-[2px]">
              <CheckCircle2
                size={14}
                style={{ color: c.success }}
                fill="white"
              />
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-[2px]">
          <span
            className="truncate text-sm"
            style={{ color: c.textPrimary, fontWeight: 670 }}
          >
            {entry.task}
          </span>
          <div
            className="flex items-center text-xs"
            style={{ color: c.textSecondary }}
          >
            <span>{entry.date}</span>
            <span className="mx-2">·</span>
            <span style={{ color: c.textPrimary, fontWeight: 670 }}>
              {entry.duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IconLed() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col gap-12">
        {/* DRAFT STATE */}
        <div className="flex flex-col gap-2">
          <span
            className="text-xs uppercase tracking-wider"
            style={{ color: c.textSecondary, fontWeight: 670 }}
          >
            Draft
          </span>
          <div className="flex flex-col gap-3">
            {entries.map((entry, i) => (
              <EntryCard key={`draft-${i}`} entry={entry} isLogged={false} />
            ))}
            <div
              className="mt-1 flex items-center justify-between border-t py-3"
              style={{ borderColor: c.border }}
            >
              <span
                className="text-sm"
                style={{ color: c.textPrimary, fontWeight: 570 }}
              >
                Total draft time
              </span>
              <span
                className="text-sm"
                style={{ color: c.textPrimary, fontWeight: 670 }}
              >
                2 hrs 45 min
              </span>
            </div>
            <div
              className="flex items-start gap-3 rounded-lg p-4"
              style={{ backgroundColor: c.lavender }}
            >
              <Sparkles
                size={20}
                style={{ color: c.blue }}
                className="mt-0.5 shrink-0"
              />
              <p
                className="text-sm leading-relaxed"
                style={{ color: c.textPrimary }}
              >
                Review your Off-the-Job time above. If anything needs changing,
                just let me know. If everything looks right, simply reply and
                I'll log it for you and update your progress.
              </p>
            </div>
          </div>
        </div>

        {/* LOGGED STATE */}
        <div className="flex flex-col gap-2">
          <span
            className="text-xs uppercase tracking-wider"
            style={{ color: c.textSecondary, fontWeight: 670 }}
          >
            Logged
          </span>
          <div className="flex flex-col gap-3">
            {entries.map((entry, i) => (
              <EntryCard key={`logged-${i}`} entry={entry} isLogged={true} />
            ))}
            <div
              className="mt-1 flex items-center justify-between border-t py-3"
              style={{ borderColor: c.border }}
            >
              <span
                className="text-sm"
                style={{ color: c.textPrimary, fontWeight: 570 }}
              >
                Total logged time
              </span>
              <span
                className="text-sm"
                style={{ color: c.textPrimary, fontWeight: 670 }}
              >
                2 hrs 45 min
              </span>
            </div>
            <div
              className="flex items-start gap-3 rounded-lg p-4"
              style={{ backgroundColor: c.successBg }}
            >
              <CheckCircle2
                size={20}
                style={{ color: c.success }}
                className="mt-0.5 shrink-0"
              />
              <div className="flex flex-col gap-1">
                <p
                  className="text-sm"
                  style={{ color: c.success, fontWeight: 670 }}
                >
                  Time successfully logged
                </p>
                <p className="text-sm" style={{ color: c.textPrimary }}>
                  You've logged{" "}
                  <span style={{ fontWeight: 670 }}>4 hrs 15 min</span> of
                  off-the-job time this week (Target: 6 hrs 30 min).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
