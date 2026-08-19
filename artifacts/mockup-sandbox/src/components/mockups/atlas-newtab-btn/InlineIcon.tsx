import { ArrowUpRight } from "lucide-react";
import { AtlasGlyph, NavStrip, btnBase } from "./_shared";

/**
 * C — Icon inside the button: one Ask Atlas button; the small arrow at its
 * right edge is the click target for "new tab" while the rest opens the panel.
 */
export function InlineIcon() {
  return (
    <NavStrip
      note="A single button. Clicking the label area opens the side panel; the small arrow at the right edge is its own click target that opens Atlas in a new tab. No visual divider — quieter than a split button."
      askAtlas={
        <button className="flex items-center hover:bg-[#f4f3f0]" style={{ ...btnBase, gap: 4, padding: "0 8px 0 12px" }}>
          <AtlasGlyph /> Ask Atlas
          <span className="flex items-center justify-center rounded-md hover:bg-[#e7e5e0]" style={{ width: 20, height: 20, marginLeft: 2 }} aria-label="Open Atlas in a new tab">
            <ArrowUpRight size={13} color="#9b9d9d" />
          </span>
        </button>
      }
    />
  );
}
