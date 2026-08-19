import { Stage, UpRight } from "./_Frame";

// Explicit Enabled / Disabled badge pill next to the label — no ambiguity
export function BadgeStatus() {
  return (
    <Stage
      note="Badge: Enabled / Disabled label is explicit — zero ambiguity, scannable even at small size"
      off={
        <button className="flex items-center bg-white hover:bg-[#f5f3ee] transition-colors" style={{ height: 32, gap: 7, padding: "0 13px", borderRadius: 8, border: "0.5px solid #dbdad6", boxShadow: "0px 1px 4px rgba(0,0,0,0.06)", fontSize: 13, fontWeight: 600, color: "#1a1a19", whiteSpace: "nowrap" }}>
          Atlas full view
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.5px", color: "#8f918f", background: "#f0efec", borderRadius: 4, padding: "2px 6px" }}>Disabled</span>
          <UpRight size={13} color="#9b9b99" />
        </button>
      }
      on={
        <button className="flex items-center transition-colors hover:bg-[#e9ecfe]" style={{ height: 32, gap: 7, padding: "0 13px", borderRadius: 8, background: "#eef2ff", border: "0.5px solid #dfe5fd", fontSize: 13, fontWeight: 600, color: "#1a1a19", whiteSpace: "nowrap" }}>
          Atlas full view
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.5px", color: "#fff", background: "#22c07e", borderRadius: 4, padding: "2px 6px" }}>Enabled</span>
          <UpRight size={13} />
        </button>
      }
    />
  );
}
