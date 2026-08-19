import { BackButton, Lockup, Shell, WelcomeBody } from "./_shared";

/**
 * N2 — Below lockup (current): Atlas lockup on top with the back
 * button stacked underneath it in the header's left corner.
 */
export function BelowLockup() {
  return (
    <Shell
      header={
        <div className="flex flex-col items-start" style={{ gap: 6 }}>
          <Lockup />
          <BackButton />
        </div>
      }
    >
      <WelcomeBody />
    </Shell>
  );
}
