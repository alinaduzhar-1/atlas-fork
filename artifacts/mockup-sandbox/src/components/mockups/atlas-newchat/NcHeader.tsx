import { FsShell, Logo, SearchBox, RecentsList, SidebarFooter, MainArea, NewChatPrimaryBtn } from "./_fs";

/**
 * C — Main header: "New chat" moves out of the sidebar entirely and
 * lives top-right of the conversation header — always visible even when
 * the sidebar is collapsed or on narrow screens.
 */
export function NcHeader() {
  return (
    <FsShell
      sidebar={
        <>
          <div className="flex flex-col flex-1 min-h-0">
            <Logo />
            <SearchBox />
            <RecentsList />
          </div>
          <SidebarFooter />
        </>
      }
      main={<MainArea headerRight={<NewChatPrimaryBtn />} />}
    />
  );
}
