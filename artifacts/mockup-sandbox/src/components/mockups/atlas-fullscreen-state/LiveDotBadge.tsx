import { Frame } from "./_Frame";

// Hypothesis: "live" status language — green pulsing dot + explicit ON label, like a meeting in progress
export function LiveDotBadge() {
  return (
    <Frame note="Live dot: reads as an ongoing session — dot pulses; label says the mode explicitly">
      <button className="flex items-center bg-white hover:bg-[#f5f3ee] transition-colors" style={{ height: 32, gap: 8, padding: "0 14px", borderRadius: 999, border: "0.5px solid #dbdad6", boxShadow: "0px 1px 4px rgba(0,0,0,0.06)", fontSize: 13, fontWeight: 600, color: "#1a1a19", letterSpacing: "0.28px", whiteSpace: "nowrap" }}>
        <span style={{ position: "relative", width: 8, height: 8 }}>
          <span style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#22c07e" }} />
          <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#22c07e", opacity: 0.5 }} />
        </span>
        Full screen on
        <span style={{ fontSize: 12, fontWeight: 500, color: "#6f7171" }}>· go to tab</span>
      </button>
    </Frame>
  );
}
