import { BarChart3, Clock, Target, CalendarDays, Plus, ArrowUp, X } from "lucide-react";
import { PanelShell, PanelHeader, Greeting, ACTION, PANEL_BORDER, TEXT_PRIMARY, TEXT_SECONDARY, SUGGESTIONS } from "./_shared";

const ICONS: Record<string, React.ReactNode> = {
  chart: <BarChart3 size={15} />,
  clock: <Clock size={15} />,
  target: <Target size={15} />,
  calendar: <CalendarDays size={15} />,
};

export function DraftsInInput() {
  return (
    <PanelShell>
      <PanelHeader />
      <div className="flex-1 flex flex-col justify-center">
        <Greeting />
      </div>
      <div className="flex flex-col" style={{ gap: 8, padding: "0 14px 10px" }}>
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
        <div
          style={{
            borderRadius: 14,
            border: `1px solid ${PANEL_BORDER}`,
            background: "white",
            boxShadow: "0px 1px 3px rgba(26,29,35,0.05)",
            padding: 12,
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid #d6d3f2",
              background: "hsl(228 100% 98%)",
              gap: 8,
              cursor: "pointer",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 12.5, fontWeight: 570, color: TEXT_PRIMARY, lineHeight: 1.25 }}>
              Review drafted 3hr 15 min of OTJ time
            </span>
            <span
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: 22, height: 22, borderRadius: 999, color: TEXT_SECONDARY }}
            >
              <X size={13} />
            </span>
          </div>
          <div style={{ fontSize: 14, color: "#9a9b99", paddingBottom: 24 }}>Ask me anything...</div>
          <div className="flex items-center justify-between">
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
        </div>
      </div>
    </PanelShell>
  );
}
