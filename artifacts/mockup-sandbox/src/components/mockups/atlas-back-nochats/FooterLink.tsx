import { BackButton, Lockup, Shell, WelcomeBody } from "./_shared";

/**
 * N4 — Quiet footer link: header holds only the lockup; the back
 * affordance sits bottom-left as a quiet persistent escape hatch,
 * out of the way of the welcome moment.
 */
export function FooterLink() {
  return (
    <Shell
      header={<Lockup />}
      footer={
        <div style={{ padding: "0 16px 10px 16px" }}>
          <BackButton />
        </div>
      }
    >
      <WelcomeBody />
    </Shell>
  );
}
