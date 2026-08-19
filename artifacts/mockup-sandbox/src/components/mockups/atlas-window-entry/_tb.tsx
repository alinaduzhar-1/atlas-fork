import React from "react";
import { Bell, MessageSquare } from "lucide-react";

export const INDIGO = "#4f46e5";

export function Hexagon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.86} viewBox="0 0 34 30" fill="none">
      <path
        d="M9 1h16l8 14-8 14H9L1 15 9 1Z"
        fill={INDIGO}
        stroke={INDIGO}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M11 19.5v-8l6 5 6-5v8"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

const pill =
  "flex items-center gap-[4px] h-[32px] px-[12px] rounded-lg bg-white border border-[#dbdad6] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] text-[13px] font-medium text-[#1f1e1d] hover:bg-[#f5f4f1] transition-colors cursor-pointer";
const iconBtn =
  "relative flex items-center justify-center h-[32px] w-[32px] rounded-lg bg-white border border-[#dbdad6] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] hover:bg-[#f5f4f1] transition-colors cursor-pointer";

export function IconButton({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <button className={iconBtn} aria-label={label} style={{ borderWidth: "0.5px" }}>
      {children}
    </button>
  );
}

export function AskAtlasButton({ trailing }: { trailing?: React.ReactNode }) {
  return (
    <button className={pill} style={{ borderWidth: "0.5px" }}>
      <Hexagon size={16} />
      Ask Atlas
      {trailing}
    </button>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <button className={pill} style={{ borderWidth: "0.5px" }}>
      {children}
    </button>
  );
}

export function RightCluster({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex justify-end gap-x-2 items-center">
      {children}
      <IconButton label="Messages">
        <MessageSquare size={16} strokeWidth={1.8} color="#1f1e1d" />
      </IconButton>
      <div className="relative">
        <IconButton label="Notifications">
          <Bell size={16} strokeWidth={1.8} color="#1f1e1d" />
        </IconButton>
        <div
          className="absolute flex items-center justify-center rounded-full"
          style={{ top: "-8.5px", right: "-4px", width: 16, height: 16, background: "#d6ee40", pointerEvents: "none" }}
        >
          <span className="font-semibold" style={{ fontSize: 10, lineHeight: "10px", letterSpacing: "0.2px", color: "#18250f" }}>
            2
          </span>
        </div>
      </div>
      <div
        className="flex items-center justify-center rounded-full font-semibold"
        style={{ width: 32, height: 32, background: "#312e81", color: "#fff", fontSize: 12 }}
      >
        SM
      </div>
    </div>
  );
}

export function TopBarShell({
  children,
  note,
}: {
  children: React.ReactNode;
  note: string;
}) {
  return (
    <div className="min-h-screen bg-[#f5f4f1] flex flex-col">
      <div className="flex items-center justify-between p-2 bg-[#fbfaf9] border-b border-[#e7e5e0]">
        <div />
        {children}
      </div>
      <div className="flex-1 flex items-start justify-center pt-10 px-8">
        <p className="text-[13px] text-[#6f6d66] max-w-[560px] text-center leading-relaxed">{note}</p>
      </div>
    </div>
  );
}
