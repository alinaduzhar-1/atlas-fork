import { Frame } from "./_Frame";

// Hypothesis: explain where Atlas went — "open in another tab" with a switch action; addresses the 'why can't I open the sidebar?' confusion directly
export function TabSwitcher() {
  return (
    <Frame note="Tab switcher: says where Atlas is and offers the jump — answers 'why is the sidebar gone?'">
      <div className="flex items-stretch overflow-hidden" style={{ height: 32, borderRadius: 999, border: "0.5px solid #dfe5fd", background: "#eef2ff" }}>
        <div className="flex items-center" style={{ gap: 6, padding: "0 12px", fontSize: 12.5, color: "#3f4046", whiteSpace: "nowrap" }}>
          <img src="/__mockup/images/atlas-icon.svg" alt="" style={{ width: 15, height: 15 }} />
          Atlas is open in another tab
        </div>
        <div style={{ width: 0.5, background: "#d5dcfb" }} />
        <button className="flex items-center bg-transparent hover:bg-[#e2e8ff] transition-colors" style={{ gap: 4, padding: "0 12px", fontSize: 12.5, fontWeight: 600, color: "#3b3fd8", whiteSpace: "nowrap" }}>
          Switch
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b3fd8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
        </button>
      </div>
    </Frame>
  );
}
