import { FsShell, Logo, SearchBox, RecentsList, SidebarFooter, MainArea, T1, BORDER } from "./_fs";
import { PenSquare } from "lucide-react";

/**
 * D — Neutral grey fill: button keeps the same shape and size but
 * uses a muted grey background with dark text — matches the surface
 * tone of the sidebar rather than demanding attention with indigo.
 */
export function NcNeutral() {
  return (
    <FsShell
      sidebar={
        <>
          <div className="flex flex-col flex-1 min-h-0">
            <Logo />
            <div style={{ padding: "0 8px 8px" }}>
              <button
                className="flex items-center justify-center w-full rounded-lg"
                style={{
                  height: 32,
                  background: "#e4e3df",
                  color: T1,
                  fontSize: 12.5, fontWeight: 600, gap: 6,
                  border: "none",
                }}
              >
                <PenSquare size={13} strokeWidth={2} />
                New chat
              </button>
            </div>
            <SearchBox />
            <RecentsList />
          </div>
          <SidebarFooter />
        </>
      }
      main={<MainArea />}
    />
  );
}
