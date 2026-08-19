import { FullScreenShell, INDIGO, T1, T2 } from "./_shared";

/**
 * D — Monogram avatar: a small indigo "A" tile gives Atlas a standalone
 * product identity in the sidebar — a persona mark, not a corporate logo.
 */
export function FsMonogram() {
  return (
    <FullScreenShell
      lockup={
        <div className="flex items-center" style={{ gap: 8 }}>
          <div className="flex items-center justify-center rounded-lg flex-shrink-0" style={{ width: 26, height: 26, background: INDIGO }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>A</span>
          </div>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.2px", color: T1 }}>Atlas</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: T2 }}>AI Guide</span>
        </div>
      }
    />
  );
}
