import { FsShell, Logo, SearchBox, RecentsList, SidebarFooter, MainArea, INDIGO, BORDER } from "./_fs";
import { PenSquare } from "lucide-react";

/**
 * A — Ghost outline: the button keeps the same placement above search
 * but drops the fill — just a border, white background, indigo text.
 * Sits quietly at the top without competing with the conversation.
 */
export function NcGhost() {
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
                  height: 32, border: `1.5px solid ${BORDER}`,
                  background: "#fff", color: INDIGO,
                  fontSize: 12.5, fontWeight: 600, gap: 6,
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
