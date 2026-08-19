import { Compass, Calendar, HelpCircle, Eye, Maximize2 } from "lucide-react";
import { BrandRow, Composer, PanelShell, T1, BORDER } from "../atlas-chat-header/_shared";

/**
 * C — Welcome-screen row: since the panel opens by default on the welcome
 * state, full screen is offered as the last quiet row beneath the suggestion
 * list — discoverable on every visit, zero header clutter.
 */
export function WelcomeSuggestion() {
  return (
    <PanelShell>
      <BrandRow />
      <div className="flex-1 flex flex-col justify-end" style={{ padding: "0 12px" }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: T1, lineHeight: 1.4, marginBottom: 12 }}>
          Hey Sarah, I can help you navigate your apprenticeship
        </div>
        <div className="flex flex-col" style={{ gap: 6, marginBottom: 10 }}>
          {[
            { icon: <Compass size={14} />, label: "What should I focus on next?" },
            { icon: <Calendar size={14} />, label: "Plan my next two weeks" },
            { icon: <HelpCircle size={14} />, label: "I need help with something" },
            { icon: <Eye size={14} />, label: "Show me what you can do" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center rounded-lg" style={{ gap: 8, padding: "9px 11px", border: `1px solid ${BORDER}` }}>
              <span style={{ color: "#4a5ff7" }}>{icon}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#4a5ff7", textDecoration: "underline", textUnderlineOffset: 2 }}>{label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center" style={{ gap: 6, padding: "6px 0 10px 0" }}>
          <Maximize2 size={12} style={{ color: "#6f7171" }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: "#6f7171" }}>Prefer more room? <span style={{ color: "#4a5ff7" }}>Open Atlas in full screen</span></span>
        </div>
      </div>
      <Composer />
    </PanelShell>
  );
}
