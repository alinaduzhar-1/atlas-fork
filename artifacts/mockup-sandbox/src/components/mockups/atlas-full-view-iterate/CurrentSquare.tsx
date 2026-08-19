import { Frame, UpRight } from "./_Frame";

// Baseline: what's implemented today — white squared button, semibold label, indigo ↗
export function CurrentSquare() {
  return (
    <Frame note="Current: white square-rounded button, semibold label, indigo ↗">
      <button className="flex items-center bg-white hover:bg-[#f5f3ee] transition-colors" style={{ height: 32, gap: 6, padding: "0 14px", borderRadius: 8, border: "0.5px solid #dbdad6", boxShadow: "0px 1px 4px rgba(0,0,0,0.06)", fontSize: 13, fontWeight: 600, color: "#1a1a19", letterSpacing: "0.28px", whiteSpace: "nowrap" }}>
        Atlas full view
        <UpRight size={13} />
      </button>
    </Frame>
  );
}
