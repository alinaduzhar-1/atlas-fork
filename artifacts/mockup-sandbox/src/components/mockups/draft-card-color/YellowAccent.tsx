import { c, Frame, Stack } from "./_shared";

export function YellowAccent() {
  return (
    <Frame>
      <Stack
        theme={{
          bg: c.yellow50,
          border: c.yellow200,
          durationColor: c.yellow700,
          accentBar: c.yellow200,
        }}
        footerTint={c.textPrimary}
      />
    </Frame>
  );
}
