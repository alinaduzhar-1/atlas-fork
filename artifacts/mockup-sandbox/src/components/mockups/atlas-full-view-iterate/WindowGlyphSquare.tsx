import { Frame } from "./_Frame";

// Hypothesis: lead with a "new window" glyph instead of trailing arrow — the icon explains the behavior before you read
export function WindowGlyphSquare() {
  return (
    <Frame note="Window glyph: leading 'opens a window' icon carries the meaning; no trailing arrow needed">
      <button className="flex items-center bg-white hover:bg-[#f5f3ee] transition-colors" style={{ height: 32, gap: 7, padding: "0 13px", borderRadius: 8, border: "0.5px solid #dbdad6", boxShadow: "0px 1px 4px rgba(0,0,0,0.06)", fontSize: 13, fontWeight: 600, color: "#1a1a19", letterSpacing: "0.28px", whiteSpace: "nowrap" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <path d="M15 3h6v6M10 14 21 3" />
        </svg>
        Atlas full view
      </button>
    </Frame>
  );
}
