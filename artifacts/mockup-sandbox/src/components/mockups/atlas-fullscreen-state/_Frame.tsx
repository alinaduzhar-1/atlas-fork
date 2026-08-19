import type { ReactNode } from "react";

// Header stage for "full screen enabled" state exploration
function IconBtn({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: 8, background: "#fff", border: "0.5px solid #dbdad6", boxShadow: "0px 1px 4px rgba(0,0,0,0.06)", color: "#6f7171" }}>
      {children}
    </div>
  );
}

export function Frame({ children, note }: { children: ReactNode; note: string }) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4" style={{ background: "#faf9f6" }}>
      <div
        className="flex items-center justify-end rounded-xl"
        style={{ width: 450, height: 64, background: "#ffffff", border: "0.5px solid #dbdad6", padding: "0 16px", gap: 6, boxShadow: "0px 1px 4px rgba(0,0,0,0.06)" }}
      >
        {children}
        <IconBtn>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        </IconBtn>
        <IconBtn>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
        </IconBtn>
        <div className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: "#4f46e5", color: "#fff", fontSize: 11, fontWeight: 600 }}>SM</div>
      </div>
      <span style={{ fontSize: 12, color: "#6b6a66", letterSpacing: "0.2px", maxWidth: 400, textAlign: "center", lineHeight: 1.5 }}>{note}</span>
    </div>
  );
}
