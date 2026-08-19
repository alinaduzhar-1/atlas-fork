import { BarChart3, Clock, Target, CalendarDays, Plus, ArrowUp } from "lucide-react";
import { PanelShell, PanelHeader, Greeting, DraftsStrip, ACTION, PANEL_BORDER, TEXT_SECONDARY, SUGGESTIONS } from "./_shared";

const ICONS: Record<string, React.ReactNode> = {
  chart: <BarChart3 size={13} />,
  clock: <Clock size={13} />,
  target: <Target size={13} />,
  calendar: <CalendarDays size={13} />,
};

export function InComposer() {
  return (
    <PanelShell>
      <PanelHeader />
      <div className="flex-1 flex flex-col justify-center items-center">
        <Greeting align="center" />
      </div>
      <div style={{ padding: "0 14px 10px" }}>
        <DraftsStrip />
      </div>
      <div style={{ padding: "0 14px 14px" }}>
        <div
          style={{
            borderRadius: 14,
            border: `1px solid ${PANEL_BORDER}`,
            background: "white",
            boxShadow: "0px 1px 3px rgba(26,29,35,0.05)",
            padding: 12,
          }}
        >
          <div style={{ fontSize: 14, color: "#9a9b99", paddingBottom: 22 }}>Ask me anything...</div>
          <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
            <div
              className="flex items-center justify-center"
              style={{ width: 28, height: 28, borderRadius: 8, color: TEXT_SECONDARY }}
            >
              <Plus size={17} />
            </div>
            <div
              className="flex items-center justify-center"
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                background: ACTION,
                color: "white",
                boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
              }}
            >
              <ArrowUp size={16} />
            </div>
          </div>
          <div style={{ height: 1, background: "#ececea", margin: "0 -12px 10px" }} />
          <div className="flex flex-wrap" style={{ gap: 6 }}>
            {SUGGESTIONS.map((s) => (
              <div
                key={s.label}
                className="flex items-center"
                style={{
                  gap: 6,
                  padding: "6px 10px",
                  borderRadius: 8,
                  background: "#f5f4f2",
                  color: ACTION,
                  fontSize: 12,
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
        </div>
      </div>
    </PanelShell>
  );
}
