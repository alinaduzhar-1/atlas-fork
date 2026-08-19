import { Check } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  action: "#4a5ff7",
  lavender: "hsl(228 100% 98%)",
  success: "hsl(156 68% 30%)",
  successBg: "hsl(162 43% 90%)",
  borderTertiary: "#dbdad6",
  divider: "rgba(0,0,0,0.06)",
};

const entries = [
  {
    category: "Study",
    task: "Data modelling module — independent study",
    shortDate: "Mon 6 Jul",
    duration: "2 hrs",
  },
  {
    category: "Mentoring",
    task: "Mentoring session with line manager",
    shortDate: "Tue 7 Jul",
    duration: "45 min",
  },
];

function RailEntry({ entry, state }: { entry: typeof entries[0], state: "draft" | "logged" }) {
  const isDraft = state === "draft";
  const bg = isDraft ? c.lavender : c.successBg;
  const edgeColor = isDraft ? c.action : c.success;
  const durationColor = isDraft ? c.action : c.success;

  return (
    <div 
      className="flex w-full overflow-hidden rounded-lg shadow-sm"
      style={{ backgroundColor: bg, borderLeft: `3px solid ${edgeColor}` }}
    >
      <div className="flex-1 p-3">
        <div className="text-sm leading-snug" style={{ color: c.textPrimary, fontWeight: 670 }}>
          {entry.task}
        </div>
        <div className="mt-1 text-xs" style={{ color: c.textSecondary, fontWeight: 570 }}>
          {entry.category} · {entry.shortDate}
        </div>
      </div>
      <div 
        className="flex w-[88px] shrink-0 flex-col items-center justify-center border-l"
        style={{ borderColor: c.divider }}
      >
        <div className="flex items-center gap-1.5">
          {!isDraft && <Check size={14} strokeWidth={3} style={{ color: c.success }} />}
          <span className="text-base" style={{ color: durationColor, fontWeight: 670 }}>
            {entry.duration}
          </span>
        </div>
      </div>
    </div>
  );
}

export function DurationRail() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8 font-sans">
      <div className="flex w-[440px] flex-col gap-14">
        
        {/* Draft State */}
        <div className="flex flex-col gap-4">
          <div className="text-xs uppercase tracking-wider" style={{ color: c.textSecondary, fontWeight: 670 }}>
            Draft
          </div>
          
          <div className="flex flex-col gap-2.5">
            {entries.map((entry, i) => <RailEntry key={i} entry={entry} state="draft" />)}
          </div>

          <div className="flex w-full items-center pt-3 border-t" style={{ borderColor: c.borderTertiary }}>
            <div className="flex-1 text-right pr-4">
              <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 570 }}>Total</span>
            </div>
            <div className="w-[88px] shrink-0 flex justify-center">
              <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>2 hrs 45 min</span>
            </div>
          </div>

          <p className="text-sm mt-1" style={{ color: c.textSecondary, lineHeight: 1.5 }}>
            Review your Off-the-Job time above. If anything needs changing, just let me know. If
            everything looks right, simply reply and I'll log it for you and update your progress.
          </p>
        </div>

        {/* Logged State */}
        <div className="flex flex-col gap-4">
          <div className="text-xs uppercase tracking-wider" style={{ color: c.textSecondary, fontWeight: 670 }}>
            Logged
          </div>
          
          <div className="flex flex-col gap-2.5">
            {entries.map((entry, i) => <RailEntry key={i} entry={entry} state="logged" />)}
          </div>

          <div className="flex w-full items-center pt-3 border-t" style={{ borderColor: c.borderTertiary }}>
            <div className="flex-1 text-right pr-4 flex items-center justify-end gap-1.5">
              <Check size={14} strokeWidth={3} style={{ color: c.success }} />
              <span className="text-sm" style={{ color: c.success, fontWeight: 670 }}>Logged</span>
            </div>
            <div className="w-[88px] shrink-0 flex justify-center">
              <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>2 hrs 45 min</span>
            </div>
          </div>

          <div className="mt-1 flex flex-col gap-3">
            <p className="text-sm" style={{ color: c.textSecondary, lineHeight: 1.5 }}>
              You've logged <span style={{ color: c.textPrimary, fontWeight: 670 }}>4 hrs 15 min</span> of off-the-job time this week.
            </p>
            <p className="text-sm" style={{ color: c.textSecondary, lineHeight: 1.5 }}>
              Would you like to <span className="underline cursor-pointer hover:text-gray-800">log more time</span> or <span className="underline cursor-pointer hover:text-gray-800">learn what counts as off-the-job hours</span>?
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
