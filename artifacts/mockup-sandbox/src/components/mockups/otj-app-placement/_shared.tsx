import { Check, Clock } from "lucide-react";

export const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 38%)",
  action: "hsl(233 92% 63%)",
  lavender: "hsl(228 100% 98%)",
  badgeBg: "hsl(228 100% 94%)",
  successText: "hsl(156 68% 25%)",
  success: "hsl(156 68% 30%)",
  successBg: "hsl(162 43% 90%)",
  borderTertiary: "#dbdad6",
};

export const entries = [
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

export function OtjBadge() {
  return (
    <span
      className="rounded-full text-xs"
      style={{
        padding: "1px 8px",
        color: c.action,
        backgroundColor: c.badgeBg,
        fontWeight: 570,
        flexShrink: 0,
        lineHeight: "16px",
      }}
    >
      OTJ
    </span>
  );
}

export function CardShell({
  logged,
  children,
}: {
  logged?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full overflow-hidden rounded-lg border"
      style={{
        borderColor: logged ? c.success : c.borderTertiary,
        backgroundColor: logged ? c.successBg : c.lavender,
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.06)",
        padding: "12px 16px",
      }}
    >
      {children}
    </div>
  );
}

export function RightStatus({
  logged,
  duration,
  withOtjBadge,
}: {
  logged?: boolean;
  duration: string;
  withOtjBadge?: boolean;
}) {
  return (
    <div className="flex flex-shrink-0 items-center" style={{ gap: "4px" }}>
      {withOtjBadge && <OtjBadge />}
      {logged && (
        <>
          <Check size={16} style={{ color: c.success }} />
          <span
            className="whitespace-nowrap"
            style={{ fontSize: "13px", fontWeight: 670, color: c.successText }}
          >
            Confirmed ·
          </span>
        </>
      )}
      <span
        className="whitespace-nowrap"
        style={{
          fontSize: "13px",
          fontWeight: 670,
          color: logged ? c.successText : c.action,
        }}
      >
        {duration}
      </span>
    </div>
  );
}

export function TotalRow({ logged }: { logged?: boolean }) {
  return (
    <div
      className="flex w-full items-center border-t"
      style={{ gap: "8px", paddingTop: "8px", borderColor: c.borderTertiary }}
    >
      {logged ? (
        <Check size={16} style={{ color: c.success }} />
      ) : (
        <Clock size={16} style={{ color: c.textPrimary }} />
      )}
      <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 570 }}>
        {logged ? "Logged" : "Total"}: 2 hrs 45 min
      </span>
    </div>
  );
}

export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs uppercase"
      style={{ color: "hsl(180 1% 44%)", fontWeight: 670, letterSpacing: "0.06em" }}
    >
      {children}
    </span>
  );
}

export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="flex w-[460px] flex-col" style={{ gap: "40px" }}>{children}</div>
    </div>
  );
}
