import React from "react";
import { Bell, MessageSquare } from "lucide-react";

export const BORDER = "#dbdad6";
export const T1 = "#212223";
export const T2 = "#6f7171";

export const btnBase: React.CSSProperties = {
  height: 32,
  borderRadius: 8,
  background: "#fff",
  border: `0.5px solid ${BORDER}`,
  boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.06)",
  color: T1,
  fontSize: 13,
  fontWeight: 500,
};

export function AtlasGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={T1} strokeWidth="1.6" />
      <path d="M8 13c1.2 1.6 2.6 2.4 4 2.4s2.8-.8 4-2.4" stroke={T1} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.5 9.5l1.2 1.2M14.5 9.5l-1.2 1.2" stroke={T1} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconSquare({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex items-center justify-center" style={{ ...btnBase, width: 32 }}>
      {children}
    </button>
  );
}

/** Top-right nav cluster strip. `askAtlas` renders the Ask Atlas affordance under test. */
export function NavStrip({ askAtlas, note }: { askAtlas: React.ReactNode; note: string }) {
  return (
    <div className="h-screen w-full flex flex-col" style={{ background: "#f5f4f1", padding: 24 }}>
      <div className="flex items-center justify-between rounded-xl" style={{ background: "#fbfaf8", border: `1px solid ${BORDER}`, padding: "10px 16px" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: T2 }}>Home</span>
        <div className="flex items-center" style={{ gap: 8 }}>
          {askAtlas}
          <IconSquare><MessageSquare size={15} color={T1} /></IconSquare>
          <IconSquare><Bell size={15} color={T1} /></IconSquare>
          <div className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: "#4a5ff7", color: "#fff", fontSize: 12, fontWeight: 600 }}>SM</div>
        </div>
      </div>
      <div style={{ marginTop: 20, maxWidth: 520 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T1, marginBottom: 4 }}>How it works</div>
        <div style={{ fontSize: 12.5, lineHeight: 1.6, color: T2 }}>{note}</div>
      </div>
    </div>
  );
}
