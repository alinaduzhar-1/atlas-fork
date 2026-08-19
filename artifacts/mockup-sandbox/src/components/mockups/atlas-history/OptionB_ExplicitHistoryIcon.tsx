import {
  AtlasMark,
  Caption,
  ClockIcon,
  CloseIcon,
  HeaderRow,
  MoreIcon,
  PageShell,
  PanelFrame,
  PrimaryButton,
  RecentChatsPopover,
  SquareButton,
  TEXT_PRIMARY,
} from "./_shared";

function StaticTitle({ label }: { label: string }) {
  return (
    <span
      className="font-medium"
      style={{
        fontSize: 13.25,
        letterSpacing: 0.27,
        lineHeight: 1.5,
        color: TEXT_PRIMARY,
        maxWidth: 180,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        padding: "0 4px",
      }}
    >
      {label}
    </span>
  );
}

export default function OptionB_ExplicitHistoryIcon() {
  return (
    <PageShell>
      <div>
        <Caption>Empty / new chat</Caption>
        <PanelFrame>
          <HeaderRow>
            <div className="flex items-center" style={{ gap: 8 }}>
              <AtlasMark />
              <StaticTitle label="New Atlas chat" />
            </div>
            <div className="flex items-center" style={{ gap: 6 }}>
              <SquareButton ariaLabel="View chat history">
                <ClockIcon />
              </SquareButton>
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
        <Caption>After typing — popover open under history</Caption>
        <PanelFrame>
          <HeaderRow>
            <div className="flex items-center" style={{ gap: 8 }}>
              <AtlasMark />
              <StaticTitle label="Catching up on OTJ hours" />
            </div>
            <div className="flex items-center" style={{ gap: 6 }}>
              <SquareButton ariaLabel="View chat history" active badge>
                <ClockIcon />
              </SquareButton>
              <PrimaryButton>New chat</PrimaryButton>
              <SquareButton ariaLabel="More options">
                <MoreIcon />
              </SquareButton>
              <SquareButton ariaLabel="Close">
                <CloseIcon />
              </SquareButton>
            </div>
          </HeaderRow>
          {/* Anchor popover roughly under the history icon button.
              Header right cluster sits 12px from right edge; history icon is the
              leftmost element. Width of cluster ~ 32+6+90+6+32+6+32 = 204px.
              Popover (311px) anchored at right edge of icon → use right offset. */}
          <RecentChatsPopover align={"right" as const} width={311} />
          <div style={{ height: 280 }} />
        </PanelFrame>
      </div>
    </PageShell>
  );
}
