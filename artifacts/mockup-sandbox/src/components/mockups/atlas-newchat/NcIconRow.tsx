import { PenSquare } from "lucide-react";
import { FsShell, Logo, SearchBox, RecentsList, SidebarFooter, MainArea, INDIGO } from "./_fs";

/**
 * B — Icon beside search: a compact indigo icon button shares the row
 * with the search field. Saves vertical space; pairs "find a chat" and
 * "start a chat" as one action row.
 */
export function NcIconRow() {
  return (
    <FsShell
      sidebar={
        <>
          <div className="flex flex-col flex-1 min-h-0">
            <Logo />
            <SearchBox
              right={
                <button
                  aria-label="New chat"
                  className="flex items-center justify-center rounded-md flex-shrink-0"
                  style={{ width: 32, height: 32, background: INDIGO, color: "#fff" }}
                >
                  <PenSquare size={14} />
                </button>
              }
            />
            <RecentsList />
          </div>
          <SidebarFooter />
        </>
      }
      main={<MainArea />}
    />
  );
}
