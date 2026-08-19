import React from "react";
import { TopNav, HomeBody, ExpandIcon, Callout, BG, T1, BORDER, Hexagon } from "./_shared";

/** Hypothesis: full-screen Atlas is a first-class destination in the global nav —
 * always one click away, regardless of whether the panel is open. */
export function TopNavButton() {
  return (
    <div className="h-screen w-full flex flex-col relative" style={{ background: BG }}>
      <TopNav
        rightExtra={
          <button
            className="flex items-center rounded-full"
            style={{ gap: 7, border: `1px solid ${BORDER}`, background: "#fff", padding: "6px 14px", fontSize: 13, fontWeight: 600, color: T1 }}
          >
            <Hexagon size={15} />
            Atlas
            <ExpandIcon size={12} color={T1} />
          </button>
        }
      />
      <HomeBody />
      <Callout>Persistent "Atlas ⌝" pill in the top nav opens full screen from anywhere</Callout>
    </div>
  );
}
