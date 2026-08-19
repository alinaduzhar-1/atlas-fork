export const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 38%)",
  textMeta: "hsl(180 1% 44%)",
  borderTertiary: "#dbdad6",
  action: "hsl(233 92% 63%)",
  negativeText: "hsl(0 72% 38%)",
  negativeBg: "hsl(0 86% 95%)",
  warnText: "hsl(35 58% 28%)",
  warnBg: "hsl(49 100% 92%)",
  successText: "hsl(156 68% 25%)",
  successBg: "hsl(162 43% 90%)",
  track: "hsl(60 2% 91%)",
};

export const person = {
  name: "Sarah Mitchell",
  weekLogged: "2h 45m",
  behind: "16h behind",
};

export function Avatar() {
  return (
    <div
      className="flex items-center justify-center rounded-full flex-shrink-0"
      style={{
        width: 36,
        height: 36,
        backgroundColor: "hsl(228 100% 94%)",
        color: c.action,
        fontWeight: 670,
        fontSize: 14,
      }}
    >
      SM
    </div>
  );
}

export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white" style={{ padding: 32 }}>
      <div className="w-full" style={{ maxWidth: 720 }}>{children}</div>
    </div>
  );
}
