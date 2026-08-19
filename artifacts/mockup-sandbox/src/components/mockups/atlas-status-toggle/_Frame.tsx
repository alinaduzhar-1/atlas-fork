import type { ReactNode } from "react";

function IconBtn({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: 8, background: "#fff", border: "0.5px solid #dbdad6", color: "#6f7171" }}>
      {children}
    </div>
  );
}

export function UpRight({ size = 13, color = "#4f46e5" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function Stage({ off, on, note }: { off: ReactNode; on: ReactNode; note: string }) {
  const Row = ({ label, active, children }: { label: string; active?: boolean; children: ReactNode }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <span style={{ width: 52, fontSize: 10, fontWeight: 700, letterSpacing: "0.7px", color: active ? "#22c07e" : "#8f918f", textTransform: "uppercase", textAlign: "right" }}>{label}</span>
      <div className="flex items-center justify-end rounded-xl" style={{ width: 340, height: 56, background: "#fff", border: "0.5px solid #dbdad6", padding: "0 14px", gap: 6, boxShadow: "0px 1px 4px rgba(0,0,0,0.06)" }}>
        {children}
        <IconBtn>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        </IconBtn>
        <div className="flex items-center justify-center rounded-full" style={{ width: 30, height: 30, background: "#4f46e5", color: "#fff", fontSize: 11, fontWeight: 600 }}>SM</div>
      </div>
    </div>
  );
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center" style={{ background: "#faf9f6", gap: 20 }}>
      <Row label="Off">{off}</Row>
      <Row label="On" active>{on}</Row>
      <div style={{ fontSize: 11.5, color: "#6f7171", maxWidth: 420, textAlign: "center", lineHeight: 1.55 }}>{note}</div>
    </div>
  );
}
