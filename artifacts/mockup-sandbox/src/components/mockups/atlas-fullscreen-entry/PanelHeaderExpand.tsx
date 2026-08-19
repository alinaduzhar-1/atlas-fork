import React from "react";
import { TopNav, HomeBody, AtlasPanel, ExpandIcon, Callout, BG } from "./_shared";

/** Hypothesis: the expand affordance lives in the panel header itself —
 * you graduate the current panel session to full screen in one tap. */
export function PanelHeaderExpand() {
  return (
    <div className="h-screen w-full flex flex-col relative" style={{ background: BG }}>
      <TopNav />
      <div className="flex-1 flex" style={{ minHeight: 0 }}>
        <HomeBody />
        <AtlasPanel
          headerExtra={
            <span title="Open full screen" style={{ display: "inline-flex", padding: 3, borderRadius: 6, background: "#eceae4" }}>
              <ExpandIcon size={13} />
            </span>
          }
        />
      </div>
      <Callout>Expand icon in the panel header takes the current conversation full screen</Callout>
    </div>
  );
}
