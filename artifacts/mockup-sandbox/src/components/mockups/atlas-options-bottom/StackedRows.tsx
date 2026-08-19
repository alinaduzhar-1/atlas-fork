import { BarChart3, Clock, Target, CalendarDays } from "lucide-react";
import { PanelShell, PanelHeader, Greeting, Composer, DraftsStrip, ACTION, PANEL_BORDER, SUGGESTIONS } from "./_shared";

const ICONS: Record<string, React.ReactNode> = {
  chart: <BarChart3 size={15} />,
  clock: <Clock size={15} />,
  target: <Target size={15} />,
  calendar: <CalendarDays size={15} />,
};

export function StackedRows() {
  return (
    <PanelShell>
      <PanelHeader />
      <div className="flex-1 flex flex-col justify-center">
        <Greeting />
      </div>
      <div className="flex flex-col" style={{ gap: 8, padding: "0 14px 10px" }}>
        <DraftsStrip />
        {SUGGESTIONS.map((s) => (
          <div
            key={s.label}
            className="flex items-center"
            style={{
              gap: 10,
              padding: "11px 14px",
              borderRadius: 10,
              border: `1px solid ${PANEL_BORDER}`,
              background: "white",
              color: ACTION,
              fontSize: 13.5,
              fontWeight: 500,
              cursor: "pointer",
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
