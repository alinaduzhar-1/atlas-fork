import { Plus } from "lucide-react";
import { FsShell, Logo, SearchBox, RecentsList, SidebarFooter, MainArea, INDIGO, HOVER_BG } from "./_fs";

/**
 * D — Inline row: "New chat" is the first row of the Recents list —
 * a quiet "+ New chat" list item in indigo. It reads as part of the
 * chat list itself: the next chat starts where the others live.
 */
export function NcInline() {
  return (
    <FsShell
      sidebar={
        <>
          <div className="flex flex-col flex-1 min-h-0">
            <Logo />
            <SearchBox />
            <RecentsList
              topRow={
                <button
                  className="flex items-center rounded-md text-left"
                  style={{ padding: "7px 8px", gap: 7, fontSize: 12.5, fontWeight: 600, color: INDIGO, background: "transparent" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = HOVER_BG)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span className="flex items-center justify-center rounded-full" style={{ width: 18, height: 18, background: "rgba(74,95,247,0.12)" }}>
                    <Plus size={11} strokeWidth={2.5} />
                  </span>
                  New chat
                </button>
              }
            />
          </div>
          <SidebarFooter />
        </>
      }
      main={<MainArea />}
    />
  );
}
