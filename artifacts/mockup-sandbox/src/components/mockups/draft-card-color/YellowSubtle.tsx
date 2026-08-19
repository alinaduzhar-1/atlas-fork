import { c, Frame, Stack } from "./_shared";

export function YellowSubtle() {
  return (
    <Frame>
      <Stack
        theme={{
          bg: "hsl(49 100% 96%)",
          border: "hsl(49 80% 88%)",
          durationColor: c.yellow700,
        }}
        footerTint={c.textPrimary}
      />
    </Frame>
  );
}
