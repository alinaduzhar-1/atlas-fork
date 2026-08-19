import { FullScreenShell, T1, T2 } from "./_shared";

/**
 * A — Plain wordmark: sidebar lockup is just "Atlas" + grey "AI Guide".
 * No hexagon, no extra marks anywhere on the page.
 */
export function FsWordmark() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex items-baseline" style={{ gap: 8 }}>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
        </div>
      }
    />
  );
}
