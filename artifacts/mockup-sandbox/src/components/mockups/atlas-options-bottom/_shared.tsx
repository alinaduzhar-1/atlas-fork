import { Plus, ArrowUp, MoreHorizontal, X, History } from "lucide-react";

export function DraftsStrip({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        padding: compact ? "9px 12px" : "11px 14px",
        borderRadius: 12,
        border: "1px solid #d6d3f2",
        background: "hsl(228 100% 98%)",
        boxShadow: "0 1px 3px rgba(74, 95, 247, 0.08)",
        gap: 8,
        cursor: "pointer",
      }}
    >
      <span style={{ fontSize: compact ? 12.5 : 13, fontWeight: 570, color: "#1a1d23", lineHeight: 1.25 }}>
        Review drafted 3hr 15 min of OTJ time
      </span>
      <span
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: 24, height: 24, borderRadius: 999, color: "#6e6f6d" }}
      >
        <X size={14} />
      </span>
    </div>
  );
}
import atlasIcon from "../../../atlas-icon.svg";

export const PAGE_BG = "#f5f4f2";
export const PANEL_BORDER = "#dbdad6";
export const TEXT_PRIMARY = "#1a1d23";
export const TEXT_SECONDARY = "#6e6f6d";
export const ACTION = "#5856ff";
export const FONT = "'Inter', system-ui, -apple-system, sans-serif";

export function AtlasMark({ size = 33 }: { size?: number }) {
  const tile = size * 0.94;
  return (
    <div className="flex items-center justify-center flex-shrink-0" style={{ width: size, height: size * 0.96 }}>
      <div
        className="flex items-center justify-center"
        style={{
          width: tile,
          height: tile * 0.956,
          borderRadius: size * 0.26,
          background: "white",
          boxShadow: "0px 3.142px 6.283px 0px rgba(26,29,35,0.08), 0px 0px 0.785px 0px rgba(144,146,145,0.56)",
          transform: "rotate(-3.88deg)",
        }}
      >
        <img src={atlasIcon} alt="Atlas" style={{ width: size * 0.48, height: size * 0.52 }} />
      </div>
    </div>
  );
}

function SquareBtn({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        background: "white",
        border: `0.5px solid ${PANEL_BORDER}`,
        boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.06)",
        color: TEXT_PRIMARY,
      }}
    >
      {children}
    </div>
  );
}

export function PanelHeader() {
  return (
    <div className="flex items-center justify-between" style={{ padding: "12px 14px" }}>
      <div className="flex items-center" style={{ gap: 8 }}>
        <span style={{ fontSize: 15, fontWeight: 650, color: TEXT_PRIMARY }}>Ask Atlas</span>
        <AtlasMark size={22} />
        <span style={{ fontSize: 13, color: TEXT_SECONDARY, fontWeight: 500 }}>AI Guide</span>
      </div>
      <div className="flex items-center" style={{ gap: 6 }}>
        <SquareBtn><History size={14} /></SquareBtn>
        <SquareBtn><MoreHorizontal size={14} /></SquareBtn>
        <SquareBtn><X size={14} /></SquareBtn>
      </div>
    </div>
  );
}

export function Greeting({ align = "left" }: { align?: "left" | "center" }) {
  return (
    <div
      className="flex flex-col"
      style={{
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
        gap: 14,
        padding: "0 20px",
      }}
    >
      <AtlasMark size={44} />
      <div
        style={{
          fontSize: 17,
          fontWeight: 600,
          color: TEXT_PRIMARY,
          lineHeight: 1.35,
          maxWidth: 260,
        }}
      >
        Hey Sarah, I can help you navigate your apprenticeship
      </div>
    </div>
  );
}

export function Composer({ children }: { children?: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 14,
        border: `1px solid ${PANEL_BORDER}`,
        background: "white",
        boxShadow: "0px 1px 3px rgba(26,29,35,0.05)",
        padding: 12,
      }}
    >
      <div style={{ fontSize: 14, color: "#9a9b99", paddingBottom: 26 }}>Ask me anything...</div>
      {children}
      <div className="flex items-center justify-between">
        <div
          className="flex items-center justify-center"
          style={{ width: 28, height: 28, borderRadius: 8, color: TEXT_SECONDARY }}
        >
          <Plus size={17} />
        </div>
        <div
          className="flex items-center justify-center"
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            background: ACTION,
            color: "white",
            boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
          }}
        >
          <ArrowUp size={16} />
        </div>
      </div>
    </div>
  );
}

export function PanelShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: PAGE_BG, fontFamily: FONT, padding: "24px 16px" }}
    >
      <div
        className="flex flex-col"
        style={{
          width: 400,
          height: 620,
          background: "white",
          borderRadius: 14,
          border: `0.5px solid ${PANEL_BORDER}`,
          boxShadow: "0px 8px 24px 0px rgba(26,29,35,0.06), 0px 1px 2px 0px rgba(26,29,35,0.04)",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export const SUGGESTIONS = [
  { label: "How far behind am I?", icon: "chart" },
  { label: "Help me catch up on OTJ hours", icon: "clock" },
  { label: "Scope my project", icon: "target" },
  { label: "Plan my week", icon: "calendar" },
] as const;
