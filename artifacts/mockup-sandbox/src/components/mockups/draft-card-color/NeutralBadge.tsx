import { c, Frame, Stack } from "./_shared";

export function NeutralBadge() {
  return (
    <Frame>
      <Stack
        theme={{
          bg: "hsl(0 0% 100%)",
          border: c.borderSecondary,
          durationColor: c.textPrimary,
          badgeBg: c.yellow50,
          badgeText: c.yellow600,
        }}
        footerTint={c.textPrimary}
        showBadge
      />
    </Frame>
  );
}
