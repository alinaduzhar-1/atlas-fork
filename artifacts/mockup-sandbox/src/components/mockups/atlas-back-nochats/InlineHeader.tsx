import { BackButton, BORDER, Lockup, Shell, WelcomeBody } from "./_shared";

/**
 * N1 — Inline in header: back button on the far left, hairline divider,
 * then the Atlas lockup — everything on one compact header row.
 */
export function InlineHeader() {
  return (
    <Shell
      header={
        <div className="flex items-center" style={{ gap: 12 }}>
          <BackButton />
          <div style={{ width: 1, height: 14, background: BORDER }} />
          <Lockup />
        </div>
      }
    >
      <WelcomeBody />
    </Shell>
  );
}
