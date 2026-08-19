import { Pencil, CheckCircle2 } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  brandBlue: "#4a5ff7",
  brandBlueBg: "rgba(74, 95, 247, 0.08)",
  successGreen: "hsl(156 68% 30%)",
  borderLight: "#e5e7eb",
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

function DraftToken({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 align-baseline text-sm font-medium transition-colors"
      style={{
        color: c.brandBlue,
        backgroundColor: c.brandBlueBg,
        borderBottom: `1.5px dotted ${c.brandBlue}80`,
        cursor: "pointer",
      }}
    >
      {children}
      <Pencil size={12} style={{ opacity: 0.8 }} strokeWidth={2.5} />
    </span>
  );
}

function DraftSentence() {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="text-xs font-medium uppercase tracking-wider"
        style={{ color: c.textSecondary }}
      >
        Draft
      </span>
      <div
        className="flex flex-col gap-5 rounded-2xl p-6"
        style={{
          backgroundColor: "white",
          border: `1px solid ${c.borderLight}`,
          boxShadow: "0 4px 12px -4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="flex flex-col gap-5">
          {entries.map((entry, i) => (
            <div
              key={i}
              className="text-[15px] leading-relaxed"
              style={{ color: c.textPrimary }}
            >
              You spent <DraftToken>{entry.duration}</DraftToken> on{" "}
              <DraftToken>{entry.task}</DraftToken> ({entry.category}) on{" "}
              <DraftToken>{entry.date}</DraftToken>.
            </div>
          ))}
        </div>

        <div className="h-px w-full" style={{ backgroundColor: c.borderLight }} />

        <div className="flex flex-col gap-1.5">
          <div className="text-[15px] font-medium" style={{ color: c.textPrimary }}>
            Total: 2 hrs 45 min
          </div>
          <div className="text-[14px]" style={{ color: c.textSecondary }}>
            Reply to confirm, or tap any detail to change it.
          </div>
        </div>
      </div>
    </div>
  );
}

function LoggedSentence() {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="text-xs font-medium uppercase tracking-wider"
        style={{ color: c.textSecondary }}
      >
        Logged
      </span>
      <div
        className="flex flex-col gap-5 rounded-2xl p-6"
        style={{
          backgroundColor: "white",
          border: `1px solid ${c.borderLight}`,
          boxShadow: "0 4px 12px -4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="flex flex-col gap-5">
          {entries.map((entry, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0"
                style={{ color: c.successGreen }}
              />
              <div
                className="text-[15px] leading-relaxed"
                style={{ color: c.textPrimary }}
              >
                Logged <strong>{entry.duration}</strong> for{" "}
                <strong>{entry.task}</strong> ({entry.category}) on{" "}
                <strong>{entry.date}</strong>.
              </div>
            </div>
          ))}
        </div>

        <div className="h-px w-full" style={{ backgroundColor: c.borderLight }} />

        <div className="flex flex-col gap-1.5">
          <div
            className="text-[15px] font-semibold"
            style={{ color: c.textPrimary }}
          >
            Total time: 2 hrs 45 min
          </div>
          <div className="text-[14px]" style={{ color: c.textSecondary }}>
            Weekly progress: 4 hrs 15 min of 6 hrs 30 min
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sentence() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col gap-10">
        <DraftSentence />
        <LoggedSentence />
      </div>
    </div>
  );
}
