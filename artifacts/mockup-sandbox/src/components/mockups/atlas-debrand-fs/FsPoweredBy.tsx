import { FullScreenShell, T1 } from "./_shared";

/**
 * B — Powered-by footnote in the lockup: "Atlas" leads, Multiverse credit
 * shrinks to one tiny grey line directly beneath the name.
 */
export function FsPoweredBy() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex flex-col">
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", lineHeight: 1.2, color: T1 }}>Atlas</span>
          <span style={{ fontSize: 11, color: "#9b9d9d", lineHeight: 1.4 }}>powered by Multiverse</span>
        </div>
      }
    />
  );
}
