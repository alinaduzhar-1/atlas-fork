import type { ReactNode } from "react";

// Shared presentation frame: renders the button as it appears in the app's top bar
export function Frame({ children, note }: { children: ReactNode; note: string }) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4" style={{ background: "#faf9f6" }}>
      <div
        className="flex items-center justify-end gap-2 rounded-xl"
        style={{ width: 400, height: 64, background: "#ffffff", border: "0.5px solid #dbdad6", padding: "0 16px", boxShadow: "0px 1px 4px rgba(0,0,0,0.06)" }}
      >
        {children}
        <div className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: "#4f46e5", color: "#fff", fontSize: 11, fontWeight: 600 }}>SM</div>
      </div>
      <span style={{ fontSize: 12, color: "#6b6a66", letterSpacing: "0.2px" }}>{note}</span>
    </div>
  );
}
