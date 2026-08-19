import { Check, Clock, AlertTriangle } from "lucide-react";

export const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 38%)",
  textMeta: "hsl(180 1% 44%)",
  borderTertiary: "#dbdad6",
  borderSecondary: "hsl(60 2% 91%)",

  action: "hsl(233 92% 63%)",
  lavender: "hsl(228 100% 98%)",
  badgeBlueBg: "hsl(228 100% 94%)",

  successText: "hsl(156 68% 25%)",
  success: "hsl(156 68% 30%)",
  successBg: "hsl(162 43% 90%)",

  yellow50: "hsl(49 100% 92%)",
  yellow100: "hsl(49 100% 78%)",
  yellow200: "hsl(46 100% 64%)",
  yellow600: "hsl(37 58% 36%)",
  yellow700: "hsl(35 58% 28%)",
  yellow800: "hsl(34 58% 20%)",
};

export type DraftEntry = {
  task: string;
  category: string;
  date: string;
  duration: string;
};

export const drafts: DraftEntry[] = [
  {
    category: "Study",
    task: "Data modelling module — independent study",
    date: "Monday, 6 July 2026",
    duration: "2 hr",
  },
  {
    category: "Mentoring",
    task: "Mentoring session with line manager",
    date: "Tuesday, 7 July 2026",
    duration: "45 min",
  },
];

export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen justify-center bg-white" style={{ padding: "32px" }}>
      <div className="flex w-[440px] flex-col" style={{ gap: "16px" }}>
        {children}
      </div>
    </div>
  );
}

export function Heading() {
  return (
    <div className="flex flex-col" style={{ gap: "4px" }}>
      <span
        className="text-sm"
        style={{ color: c.textPrimary, fontWeight: 670 }}
      >
        You have 2 drafts ready to review
      </span>
      <span className="text-xs" style={{ color: c.textSecondary, fontWeight: 570 }}>
        Reply to confirm and I'll log them for you.
      </span>
    </div>
  );
}

export function Footer({ tint }: { tint: string }) {
  return (
    <div
      className="flex w-full items-center border-t"
      style={{ gap: "8px", paddingTop: "8px", borderColor: c.borderTertiary }}
    >
      <Clock size={16} style={{ color: tint }} />
      <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 570 }}>
        Total: 2 hr 45 min
      </span>
    </div>
  );
}

type CardTheme = {
  bg: string;
  border: string;
  durationColor: string;
  badgeBg?: string;
  badgeText?: string;
  accentBar?: string;
};

export function DraftCard({
  entry,
  theme,
  showBadge,
}: {
  entry: DraftEntry;
  theme: CardTheme;
  showBadge?: boolean;
}) {
  return (
    <div
      className="w-full overflow-hidden rounded-lg border"
      style={{
        borderColor: theme.border,
        backgroundColor: theme.bg,
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.06)",
        padding: "12px 16px",
        borderLeft: theme.accentBar
          ? `4px solid ${theme.accentBar}`
          : undefined,
      }}
    >
      <div className="flex flex-col" style={{ gap: "4px" }}>
        <div className="flex items-start justify-between" style={{ gap: "12px" }}>
          <div className="flex items-center" style={{ gap: "8px" }}>
            <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
              {entry.task}
            </span>
            {showBadge && (
              <span
                className="rounded-full text-xs"
                style={{
                  padding: "1px 8px",
                  color: theme.badgeText,
                  backgroundColor: theme.badgeBg,
                  fontWeight: 570,
                  flexShrink: 0,
                  lineHeight: "16px",
                  whiteSpace: "nowrap",
                }}
              >
                Draft
              </span>
            )}
          </div>
          <span
            className="whitespace-nowrap flex-shrink-0"
            style={{ fontSize: "13px", fontWeight: 670, color: theme.durationColor }}
          >
            {entry.duration}
          </span>
        </div>
        <span className="text-xs" style={{ color: c.textMeta, fontWeight: 570 }}>
          {entry.category} · {entry.date}
        </span>
      </div>
    </div>
  );
}

export function Stack({
  theme,
  footerTint,
  showBadge,
}: {
  theme: CardTheme;
  footerTint: string;
  showBadge?: boolean;
}) {
  return (
    <>
      <Heading />
      {drafts.map((entry, i) => (
        <DraftCard key={i} entry={entry} theme={theme} showBadge={showBadge} />
      ))}
      <Footer tint={footerTint} />
    </>
  );
}

export { Check, AlertTriangle };
