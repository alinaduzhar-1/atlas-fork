import { Check } from "lucide-react";

export const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  action: "hsl(233 92% 63%)",
  actionBg: "hsl(228 100% 96%)",
  success: "hsl(156 68% 30%)",
  successBg: "hsl(162 43% 90%)",
  warning: "hsl(35 85% 28%)",
  warningBg: "hsl(46 96% 88%)",
  borderTertiary: "#dbdad6",
};

export const entries = [
  {
    category: "Study",
    task: "Data modelling module — independent study",
    date: "Mon, 6 July",
    duration: "2 hrs",
  },
  {
    category: "Mentoring",
    task: "Mentoring session with line manager",
    date: "Tue, 7 July",
    duration: "45 min",
  },
];

export function OtjPill() {
  return (
    <span
      className="rounded-full text-xs"
      style={{
        padding: "1px 8px",
        color: c.action,
        backgroundColor: c.actionBg,
        fontWeight: 670,
        flexShrink: 0,
      }}
    >
      OTJ
    </span>
  );
}

export function StatusBadge({ confirmed, withOtj }: { confirmed?: boolean; withOtj?: boolean }) {
  if (confirmed) {
    return (
      <span
        className="flex items-center rounded-full text-xs"
        style={{
          gap: "4px",
          padding: "2px 10px",
          color: c.success,
          backgroundColor: c.successBg,
          fontWeight: 670,
        }}
      >
        <Check size={12} style={{ color: c.success }} />
        {withOtj ? "OTJ Logged" : "Logged"}
      </span>
    );
  }
  return (
    <span
      className="rounded-full text-xs"
      style={{
        padding: "2px 10px",
        color: c.warning,
        backgroundColor: c.warningBg,
        fontWeight: 670,
      }}
    >
      {withOtj ? "OTJ Draft" : "Draft"}
    </span>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs uppercase"
      style={{ color: c.textSecondary, fontWeight: 670, letterSpacing: "0.06em" }}
    >
      {children}
    </span>
  );
}

export function TotalRow({ confirmed }: { confirmed?: boolean }) {
  return (
    <div className="flex items-center justify-between" style={{ padding: "2px 16px 0" }}>
      <span className="text-xs" style={{ color: c.textSecondary }}>
        {confirmed ? "Logged" : "Total"}
      </span>
      <span
        className="text-sm"
        style={{ color: confirmed ? c.success : c.textPrimary, fontWeight: 670 }}
      >
        2 hrs 45 min
      </span>
    </div>
  );
}

export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col" style={{ gap: "40px" }}>{children}</div>
    </div>
  );
}
