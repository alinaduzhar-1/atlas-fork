import { ArrowUpRight } from "lucide-react";
import { AtlasGlyph, NavStrip, btnBase } from "./_shared";

/**
 * B — Separate icon button: Ask Atlas is untouched; a sibling 32×32 square
 * button sits right beside it, matching Messages/Notifications styling.
 */
export function IconButton() {
  return (
    <NavStrip
      note="Ask Atlas stays exactly as it is. A separate square button immediately to its right — same style as Messages and Notifications — opens Atlas full screen in a new tab, with a tooltip 'Open Atlas in new tab'."
      askAtlas={
        <>
          <button className="flex items-center hover:bg-[#f4f3f0]" style={{ ...btnBase, gap: 4, padding: "0 12px" }}>
            <AtlasGlyph /> Ask Atlas
          </button>
          <button className="flex items-center justify-center hover:bg-[#f4f3f0]" style={{ ...btnBase, width: 32, marginLeft: -4 }} aria-label="Open Atlas in a new tab">
            <ArrowUpRight size={15} color="#6f7171" />
          </button>
        </>
      }
    />
  );
}
