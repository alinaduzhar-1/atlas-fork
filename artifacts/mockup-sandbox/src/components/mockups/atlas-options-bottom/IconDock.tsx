import { BarChart3, Clock, Target, CalendarDays } from "lucide-react";
import { PanelShell, PanelHeader, Greeting, Composer, DraftsStrip, ACTION, PANEL_BORDER, TEXT_PRIMARY, SUGGESTIONS } from "./_shared";

const ICONS: Record<string, React.ReactNode> = {
  chart: <BarChart3 size={18} />,
  clock: <Clock size={18} />,
  target: <Target size={18} />,
  calendar: <CalendarDays size={18} />,
};

const SHORT_LABELS: Record<string, string> = {
  chart: "My progress",
  clock: "Catch up OTJ",
  target: "Scope project",
  calendar: "Plan my week",
};

export function IconDock() {
  return (
    <PanelShell>
      <PanelHeader />
      <div className="flex-1 flex flex-col justify-center items-center">
        <Greeting align="center" />
      </div>
      <div style={{ padding: "0 14px 10px" }}>
        <DraftsStrip />
      </div>
      <div className="grid grid-cols-4" style={{ gap: 8, padding: "0 14px 12px" }}>
        {SUGGESTIONS.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center text-center"
            style={{
              gap: 7,
              padding: "12px 6px",
              borderRadius: 12,
              border: `1px solid ${PANEL_BORDER}`,
              background: "white",
              cursor: "pointer",
            }}
          >
            <span style={{ color: ACTION }}>{ICONS[s.icon]}</span>
            <span style={{ fontSize: 11, fontWeight: 550, color: TEXT_PRIMARY, lineHeight: 1.25 }}>
              {SHORT_LABELS[s.icon]}
            </span>
          </div>
        ))}
      </div>
      <div style={{ padding: "0 14px 14px" }}>
        <Composer />
      </div>
    </PanelShell>
  );
}
