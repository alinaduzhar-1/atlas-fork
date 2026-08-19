import React from "react";
import { TopNav, HomeBody, AtlasPanel, Callout, BG } from "./_shared";

/** Hypothesis: full screen is per-conversation — hovering a chat in the
 * history reveals a "Full screen" action, so you jump straight into that
 * conversation at full size. */
export function ChatListHoverAction() {
  return (
    <div className="h-screen w-full flex flex-col relative" style={{ background: BG }}>
      <TopNav />
      <div className="flex-1 flex" style={{ minHeight: 0 }}>
        <HomeBody />
        <AtlasPanel listHover />
      </div>
      <Callout>Hovering a recent chat reveals a per-conversation "Full screen" action</Callout>
    </div>
  );
}
