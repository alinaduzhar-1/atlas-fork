import { Frame, UpRight } from "./_Frame";

// Hypothesis: quietest possible — a text link, no chrome; blends into the bar until hovered
export function GhostTextLink() {
  return (
    <Frame note="Ghost link: no chrome at all — indigo text + ↗, underline on hover; lightest visual weight">
      <button className="flex items-center bg-transparent hover:underline transition-colors" style={{ height: 32, gap: 5, padding: "0 8px", fontSize: 13, fontWeight: 600, color: "#4a5ff7", letterSpacing: "0.28px", whiteSpace: "nowrap", textDecorationColor: "#4a5ff7" }}>
        Atlas full view
        <UpRight size={13} color="#4a5ff7" />
      </button>
    </Frame>
  );
}
