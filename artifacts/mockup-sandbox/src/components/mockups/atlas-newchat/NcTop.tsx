import { FsShell, Logo, SearchBox, RecentsList, SidebarFooter, MainArea, NewChatPrimaryBtn } from "./_fs";

/**
 * A — Top of sidebar: primary "New chat" sits above the search box,
 * first thing in the eye line (ChatGPT/Claude convention). The footer
 * keeps only the Multiverse attribution.
 */
export function NcTop() {
  return (
    <FsShell
      sidebar={
        <>
          <div className="flex flex-col flex-1 min-h-0">
            <Logo />
            <div style={{ padding: "0 8px 8px" }}><NewChatPrimaryBtn full /></div>
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
