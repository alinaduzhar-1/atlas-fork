import { FsShell, Logo, SearchBox, RecentsList, SidebarFooter, MainArea, INDIGO, HOVER_BG, T2 } from "./_fs";
import { PenSquare } from "lucide-react";

/**
 * B — Quiet text row: no button shape at all. "New chat" is a plain
 * left-aligned row item — icon + label — indistinguishable in structure
 * from the chat list rows. Starting a chat feels like opening one.
 * (Same pattern as Claude's sidebar.)
 */
export function NcTextRow() {
  return (
    <FsShell
      sidebar={
        <>
          <div className="flex flex-col flex-1 min-h-0">
            <Logo />
            <div style={{ padding: "0 8px 6px" }}>
              <button
                className="flex items-center w-full rounded-md"
                style={{
                  padding: "7px 8px", gap: 8,
                  background: "transparent", color: INDIGO,
                  fontSize: 13, fontWeight: 600,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = HOVER_BG)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <PenSquare size={14} strokeWidth={2} />
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
