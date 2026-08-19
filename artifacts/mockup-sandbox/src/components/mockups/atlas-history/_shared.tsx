import atlasIcon from "../../../atlas-icon.svg";

export const PAGE_BG = "#f5f4f2";
export const PANEL_BORDER = "#dbdad6";
export const TEXT_PRIMARY = "#1a1d23";
export const TEXT_SECONDARY = "#6e6f6d";
export const ACTION = "#5856ff";
export const HOVER_BG = "#f3f2f0";
export const ACTIVE_BG = "#edebe8";
export const ACTIVE_BORDER = "#9e9f9d";

export const FONT = "'Inter', system-ui, -apple-system, sans-serif";

export function AtlasMark({ size = "small" }: { size?: "small" | "default" }) {
  const dims =
    size === "default"
      ? { wrap: 33.266, h: 32, tile: 31.312, tileH: 29.951, radius: 8.605, icon: 16, iconH: 17 }
      : { wrap: 28, h: 26.934, tile: 26.356, tileH: 25.21, radius: 6.758, icon: 13.32, iconH: 14.456 };
  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{ width: dims.wrap, height: dims.h }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: dims.tile,
          height: dims.tileH,
          borderRadius: dims.radius,
          background: "white",
          boxShadow:
            "0px 3.142px 6.283px 0px rgba(26,29,35,0.08), 0px 0px 0.785px 0px rgba(144,146,145,0.56)",
          transform: "rotate(-3.88deg)",
        }}
      >
        <img src={atlasIcon} alt="Atlas" style={{ width: dims.icon, height: dims.iconH }} />
      </div>
    </div>
  );
}

export function SquareButton({
  children,
  active = false,
  ariaLabel,
  badge,
}: {
  children: React.ReactNode;
  active?: boolean;
  ariaLabel: string;
  badge?: boolean;
}) {
  return (
    <div
      aria-label={ariaLabel}
      className="flex items-center justify-center relative"
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: active ? ACTIVE_BG : "white",
        border: `0.5px solid ${active ? ACTIVE_BORDER : PANEL_BORDER}`,
        boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.06)",
        color: TEXT_PRIMARY,
      }}
    >
      {children}
      {badge && (
        <span
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            width: 7,
            height: 7,
            borderRadius: 999,
            background: ACTION,
            boxShadow: "0 0 0 1.5px white",
          }}
        />
      )}
    </div>
  );
}

export function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center font-medium"
      style={{
        height: 32,
        padding: "0 12px",
        borderRadius: 8,
        background: ACTION,
        color: "white",
        fontSize: 13,
        letterSpacing: 0.26,
        whiteSpace: "nowrap",
        boxShadow:
          "0px 1px 2px 0px rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)",
      }}
    >
      {children}
    </div>
  );
}

export function Caption({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="uppercase font-semibold"
      style={{
        color: TEXT_SECONDARY,
        fontSize: 10,
        letterSpacing: 1.4,
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}

export function PanelFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 500,
        background: "white",
        borderRadius: 12,
        border: `0.5px solid ${PANEL_BORDER}`,
        boxShadow:
          "0px 8px 24px 0px rgba(26,29,35,0.06), 0px 1px 2px 0px rgba(26,29,35,0.04)",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

export function HeaderRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-between w-full"
      style={{ gap: 8, padding: 12 }}
    >
      {children}
    </div>
  );
}

export function RecentChatsPopover({
  align = "left",
  width = 311,
}: {
  align?: "left" | "right" | number;
  width?: number;
}) {
  const chats = [
    { name: "Catching up on OTJ hours", current: true },
    { name: "Project 2 scoping ideas" },
    { name: "Module 2 reflection" },
    { name: "Pre-reading for Thursday session" },
  ];
  const positionStyle: React.CSSProperties =
    typeof align === "number"
      ? { left: align }
      : align === "right"
      ? { right: 12 }
      : { left: 12 };
  return (
    <div
      style={{
        position: "absolute",
        top: 58,
        ...positionStyle,
        width,
        padding: 4,
        borderRadius: 8,
        boxShadow:
          "0px 8px 20px 0px rgba(26,29,35,0.12), 0px 0px 1px 0px rgba(144,146,145,0.56)",
        background: "white",
        zIndex: 30,
      }}
    >
      <button
        className="flex items-center w-full cursor-default"
        style={{
          minHeight: 36,
          padding: "8px 10px",
          borderRadius: 6,
          background: "white",
          border: "none",
          gap: 8,
          color: ACTION,
          fontWeight: 600,
          fontSize: 13.5,
          letterSpacing: 0.27,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 3.5v9M3.5 8h9"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
        New chat
      </button>
      <div style={{ height: 1, background: "#ececea", margin: "4px 6px" }} />
      <div
        style={{
          padding: "6px 10px 4px",
          color: TEXT_SECONDARY,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 0.6,
          textTransform: "uppercase",
        }}
      >
        Recent chats
      </div>
      {chats.map((c, i) => (
        <div
          key={i}
          className="flex items-center w-full"
          style={{
            minHeight: 36,
            padding: "8px 10px",
            borderRadius: 6,
            background: c.current ? ACTIVE_BG : "white",
            gap: 8,
          }}
        >
          <span
            className="flex-1 font-medium truncate"
            style={{
              fontSize: 13.5,
              letterSpacing: 0.27,
              color: TEXT_PRIMARY,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {c.name}
          </span>
          {c.current && (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.5 8.25l3 3 6-6.5"
                stroke={TEXT_PRIMARY}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      ))}
      <div style={{ height: 1, background: "#ececea", margin: "4px 6px" }} />
      <div
        className="flex items-center w-full"
        style={{
          minHeight: 36,
          padding: "8px 10px",
          borderRadius: 6,
          gap: 8,
          color: TEXT_SECONDARY,
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10.5 10.5l3 3"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
        Search all chats
      </div>
    </div>
  );
}

export function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="3.5" cy="8" r="1.3" fill={TEXT_PRIMARY} />
      <circle cx="8" cy="8" r="1.3" fill={TEXT_PRIMARY} />
      <circle cx="12.5" cy="8" r="1.3" fill={TEXT_PRIMARY} />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke={TEXT_PRIMARY}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 6.5l4 4 4-4"
        stroke={TEXT_PRIMARY}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.75" stroke={TEXT_PRIMARY} strokeWidth="1.5" />
      <path
        d="M8 5v3l2 1.5"
        stroke={TEXT_PRIMARY}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: PAGE_BG,
        fontFamily: FONT,
        color: TEXT_PRIMARY,
        padding: "20px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
      }}
    >
      {children}
    </div>
  );
}
