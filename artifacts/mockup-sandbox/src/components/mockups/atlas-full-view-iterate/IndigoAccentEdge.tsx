import { Frame, UpRight } from "./_Frame";

// Hypothesis: brandable middle ground — white button with a left indigo accent edge; more presence than plain white without going solid
export function IndigoAccentEdge() {
  return (
    <Frame note="Accent edge: thin indigo bar on the left gives it brand presence without a full fill">
      <button className="flex items-center bg-white hover:bg-[#f8f8ff] transition-colors overflow-hidden" style={{ height: 32, gap: 6, padding: "0 13px 0 0", borderRadius: 8, border: "0.5px solid #dbdad6", boxShadow: "0px 1px 4px rgba(0,0,0,0.06)", fontSize: 13, fontWeight: 600, color: "#1a1a19", letterSpacing: "0.28px", whiteSpace: "nowrap" }}>
        <span style={{ width: 4, alignSelf: "stretch", background: "#4a5ff7", borderRadius: "8px 0 0 8px" }} />
        <span style={{ paddingLeft: 6 }}>Atlas full view</span>
        <UpRight size={13} color="#4a5ff7" />
      </button>
    </Frame>
  );
}
