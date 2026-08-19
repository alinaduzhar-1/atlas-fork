import { FsShell, SearchBox, RecentsList, SidebarFooter, MainArea, INDIGO, BORDER, T1, T2 } from "./_fs";
import { PenSquare } from "lucide-react";

/**
 * C — Icon only in header: no standalone button at all.
 * A small pen icon sits in the sidebar header bar to the right of
 * the Atlas wordmark — always reachable, zero vertical space cost,
 * no visual competition with the conversation.
 * (Same pattern as ChatGPT's sidebar.)
 */
export function NcIconOnly() {
  return (
    <FsShell
      sidebar={
        <>
          <div className="flex flex-col flex-1 min-h-0">
            {/* Logo row with icon-only new chat button */}
            <div className="flex items-center justify-between" style={{ padding: "10px 10px 8px", gap: 8 }}>
              <div className="flex items-center" style={{ gap: 8 }}>
                <div className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 26, height: 25, borderRadius: 7, background: "#fff", transform: "rotate(-3.88deg)",
                    boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
                  <span style={{ fontSize: 12 }}>〰️</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 500, color: T1, letterSpacing: "0.3px" }}>Atlas</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: T2, letterSpacing: "0.3px", marginLeft: -4 }}>AI Guide</span>
              </div>
              <button
                aria-label="New chat"
                className="flex items-center justify-center rounded-md flex-shrink-0"
                style={{
                  width: 28, height: 28,
                  background: "transparent", color: T2,
                  border: `1px solid transparent`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#ededea";
                  e.currentTarget.style.color = T1;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = T2;
                }}
              >
                <PenSquare size={15} strokeWidth={1.8} />
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
