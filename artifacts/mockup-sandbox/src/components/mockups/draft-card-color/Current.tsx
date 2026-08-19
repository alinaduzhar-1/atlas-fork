import { c, Frame, Stack } from "./_shared";

export function Current() {
  return (
    <Frame>
      <Stack
        theme={{
          bg: c.lavender,
          border: c.borderSecondary,
          durationColor: c.action,
        }}
        footerTint={c.textPrimary}
      />
    </Frame>
  );
}
