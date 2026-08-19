import { Stage, UpRight } from "./_Frame";

// Pulsing dot — like a "live" or "recording" signal; instant colour read without any text change
export function DotStatus() {
  return (
    <Stage
      note="Dot: a pulsing green dot when on, grey when off — reads like 'live session' at a glance"
      off={
        <button className="flex items-center bg-white hover:bg-[#f5f3ee] transition-colors" style={{ height: 32, gap: 7, padding: "0 13px", borderRadius: 8, border: "0.5px solid #dbdad6", boxShadow: "0px 1px 4px rgba(0,0,0,0.06)", fontSize: 13, fontWeight: 600, color: "#1a1a19", whiteSpace: "nowrap" }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: "#d4d3cf", flexShrink: 0 }} />
          Atlas full view
          <UpRight size={13} color="#9b9b99" />
        </button>
      }
      on={
        <button className="flex items-center transition-colors hover:bg-[#e9ecfe]" style={{ height: 32, gap: 7, padding: "0 13px", borderRadius: 8, background: "#eef2ff", border: "0.5px solid #dfe5fd", fontSize: 13, fontWeight: 600, color: "#1a1a19", whiteSpace: "nowrap" }}>
          <span style={{ position: "relative", width: 7, height: 7, flexShrink: 0 }}>
            <span style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#22c07e" }} />
            <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#22c07e", opacity: 0.5 }} />
          </span>
          Atlas full view
          <UpRight size={13} />
        </button>
      }
    />
  );
}
