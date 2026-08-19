import {
  AtlasMark,
  Caption,
  ChevronDown,
  CloseIcon,
  HeaderRow,
  MoreIcon,
  PageShell,
  PanelFrame,
  RecentChatsPopover,
  SquareButton,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  ACTIVE_BG,
  ACTIVE_BORDER,
} from "./_shared";

function ChatPill({
  label,
  active = false,
  badge,
}: {
  label: string;
  active?: boolean;
  badge?: number;
}) {
  return (
    <div
      className="flex items-center"
      style={{
        gap: 6,
        height: 32,
        padding: "0 10px",
        borderRadius: 8,
        background: active ? ACTIVE_BG : "#f7f6f3",
        border: `0.5px solid ${active ? ACTIVE_BORDER : "#e6e4df"}`,
        boxShadow: active
          ? "0px 1px 2px 0px rgba(0,0,0,0.06)"
          : "0px 1px 1px 0px rgba(0,0,0,0.02)",
      }}
    >
      <span
        className="font-medium"
        style={{
          fontSize: 13.25,
          letterSpacing: 0.27,
          lineHeight: 1.4,
          color: TEXT_PRIMARY,
          maxWidth: 170,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
      {typeof badge === "number" && (
        <span
          className="flex items-center justify-center font-semibold"
          style={{
            minWidth: 18,
            height: 18,
            padding: "0 5px",
            borderRadius: 999,
            background: "white",
            border: "0.5px solid #d8d6d1",
            color: TEXT_SECONDARY,
            fontSize: 10.5,
            lineHeight: 1,
          }}
        >
          {badge}
        </span>
      )}
      <ChevronDown />
    </div>
  );
}

export default function OptionA_FoldedNewChat() {
  return (
    <PageShell>
      <div>
        <Caption>Empty / new chat</Caption>
        <PanelFrame>
          <HeaderRow>
            <div className="flex items-center" style={{ gap: 8 }}>
              <AtlasMark />
              <ChatPill label="New Atlas chat" />
            </div>
            <div className="flex items-center" style={{ gap: 6 }}>
              <SquareButton ariaLabel="More options">
                <MoreIcon />
              </SquareButton>
              <SquareButton ariaLabel="Close">
                <CloseIcon />
              </SquareButton>
            </div>
          </HeaderRow>
        </PanelFrame>
      </div>

      <div>
        <Caption>After typing — popover open</Caption>
        <PanelFrame>
          <HeaderRow>
            <div className="flex items-center" style={{ gap: 8 }}>
              <AtlasMark />
              <ChatPill label="Catching up on OTJ hours" active badge={4} />
            </div>
            <div className="flex items-center" style={{ gap: 6 }}>
              <SquareButton ariaLabel="More options">
                <MoreIcon />
              </SquareButton>
              <SquareButton ariaLabel="Close">
                <CloseIcon />
              </SquareButton>
            </div>
          </HeaderRow>
          <RecentChatsPopover align={48} />
          <div style={{ height: 280 }} />
        </PanelFrame>
      </div>
    </PageShell>
  );
}
