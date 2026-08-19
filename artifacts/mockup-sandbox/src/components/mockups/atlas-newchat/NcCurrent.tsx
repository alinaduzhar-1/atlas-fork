import { FsShell, Logo, SearchBox, RecentsList, SidebarFooter, MainArea, NewChatPrimaryBtn } from "./_fs";

/** Current: full-width primary "New chat" button pinned at the sidebar footer. */
export function NcCurrent() {
  return (
    <FsShell
      sidebar={
        <>
          <div className="flex flex-col flex-1 min-h-0">
            <Logo />
            <SearchBox />
            <RecentsList />
          </div>
          <SidebarFooter newChatButton={<div style={{ padding: 10 }}><NewChatPrimaryBtn full /></div>} />
        </>
      }
      main={<MainArea />}
    />
  );
}
