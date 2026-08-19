import { BackButton, BORDER, Lockup, Shell, WelcomeBody } from "./_shared";

/**
 * N3 — Above the welcome greeting: header stays clean with just the
 * lockup; the back affordance is a ghost pill centered right above
 * the welcome content, where the eye lands first.
 */
export function AboveGreeting() {
  return (
    <Shell header={<Lockup />}>
      <WelcomeBody
        topSlot={
          <button
            className="flex items-center rounded-full"
            style={{
              gap: 6, padding: "6px 14px 6px 10px", marginBottom: 28,
              border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.7)",
              color: "#6f7171", fontSize: 12.5, fontWeight: 500,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Multiverse
          </button>
        }
      />
    </Shell>
  );
}
