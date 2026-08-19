import { Stage, UpRight } from "./_Frame";

// On | Off segments appended to the button — you can click to toggle directly
export function SegmentStatus() {
  return (
    <Stage
      note="Segments: On/Off is a clickable control — the user can turn it off from here without closing the tab"
      off={
        <div className="flex items-stretch overflow-hidden bg-white" style={{ height: 32, borderRadius: 8, border: "0.5px solid #dbdad6", boxShadow: "0px 1px 4px rgba(0,0,0,0.06)" }}>
          <button className="flex items-center" style={{ gap: 7, padding: "0 12px", fontSize: 13, fontWeight: 600, color: "#1a1a19", whiteSpace: "nowrap" }}>
            Atlas full view <UpRight size={13} color="#9b9b99" />
          </button>
          <div style={{ width: 0.5, background: "#dbdad6" }} />
          <button style={{ padding: "0 10px", fontSize: 12, fontWeight: 700, color: "#8f918f", background: "transparent", whiteSpace: "nowrap" }}>On</button>
          <div style={{ width: 0.5, background: "#dbdad6" }} />
          <button style={{ padding: "0 10px", fontSize: 12, fontWeight: 700, color: "#3b3fd8", background: "#eef2ff", whiteSpace: "nowrap" }}>Off</button>
        </div>
      }
      on={
        <div className="flex items-stretch overflow-hidden" style={{ height: 32, borderRadius: 8, border: "0.5px solid #dfe5fd", background: "#eef2ff" }}>
          <button className="flex items-center" style={{ gap: 7, padding: "0 12px", fontSize: 13, fontWeight: 600, color: "#1a1a19", whiteSpace: "nowrap" }}>
            Atlas full view <UpRight size={13} />
          </button>
          <div style={{ width: 0.5, background: "#dfe5fd" }} />
          <button style={{ padding: "0 10px", fontSize: 12, fontWeight: 700, color: "#22c07e", background: "rgba(34,192,126,0.10)", whiteSpace: "nowrap" }}>On</button>
          <div style={{ width: 0.5, background: "#dfe5fd" }} />
          <button style={{ padding: "0 10px", fontSize: 12, fontWeight: 700, color: "#6f7171", background: "transparent", whiteSpace: "nowrap" }}>Off</button>
        </div>
      }
    />
  );
}
