import { Stage, UpRight } from "./_Frame";

// Small status word sits below the button label like a sub-caption — keeps the main label clean
export function TrayLabel() {
  return (
    <Stage
      note="Tray label: a tiny status word sits below the button label — the main affordance stays clean"
      off={
        <button className="flex flex-col items-center justify-center bg-white hover:bg-[#f5f3ee] transition-colors" style={{ height: 36, gap: 1, padding: "0 14px", borderRadius: 8, border: "0.5px solid #dbdad6", boxShadow: "0px 1px 4px rgba(0,0,0,0.06)" }}>
          <span className="flex items-center" style={{ gap: 6, fontSize: 13, fontWeight: 600, color: "#1a1a19", whiteSpace: "nowrap" }}>
            Atlas full view <UpRight size={13} color="#9b9b99" />
          </span>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.4px", color: "#8f918f", textTransform: "uppercase" }}>Inactive</span>
        </button>
      }
      on={
        <button className="flex flex-col items-center justify-center hover:bg-[#e9ecfe] transition-colors" style={{ height: 36, gap: 1, padding: "0 14px", borderRadius: 8, background: "#eef2ff", border: "0.5px solid #dfe5fd" }}>
          <span className="flex items-center" style={{ gap: 6, fontSize: 13, fontWeight: 600, color: "#1a1a19", whiteSpace: "nowrap" }}>
            Atlas full view <UpRight size={13} />
          </span>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.4px", color: "#22c07e", textTransform: "uppercase" }}>Active</span>
        </button>
      }
    />
  );
}
