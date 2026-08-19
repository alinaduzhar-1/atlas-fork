import { BarChart3, Clock, Target, CalendarDays } from "lucide-react";
import { PanelShell, PanelHeader, Greeting, Composer, DraftsStrip, ACTION, SUGGESTIONS } from "./_shared";

const ICONS: Record<string, React.ReactNode> = {
  chart: <BarChart3 size={13} />,
  clock: <Clock size={13} />,
  target: <Target size={13} />,
  calendar: <CalendarDays size={13} />,
};

export function ChipCloud() {
  return (
    <PanelShell>
      <PanelHeader />
      <div className="flex-1 flex flex-col justify-center items-center">
        <Greeting align="center" />
      </div>
      <div style={{ padding: "0 14px 10px" }}>
        <DraftsStrip />
      </div>
      <div
        className="flex flex-wrap justify-center"
        style={{ gap: 8, padding: "0 16px 12px" }}
      >
        {SUGGESTIONS.map((s) => (
          <div
            key={s.label}
            className="flex items-center"
            style={{
              gap: 6,
              padding: "7px 12px",
              borderRadius: 999,
              border: `1px solid #d9d8f5`,
              background: "hsl(228 100% 98%)",
              color: ACTION,
              fontSize: 12.5,
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {ICONS[s.icon]}
            {s.label}
          </div>
        ))}
      </div>
      <div style={{ padding: "0 14px 14px" }}>
        <Composer />
      </div>
    </PanelShell>
  );
}
