import { ArrowUpRight } from "lucide-react";
import { AtlasGlyph, BORDER, NavStrip, btnBase } from "./_shared";

/**
 * A — Split button: Ask Atlas keeps its shape, with a slim attached segment
 * on the right that opens Atlas in a new tab. One control, two targets.
 */
export function SplitButton() {
  return (
    <NavStrip
      note="The main segment opens the side panel exactly as today. The narrow right segment (divided by a hairline) opens Atlas full screen in a new tab. Hovering each half highlights only that half."
      askAtlas={
        <div className="flex items-stretch" style={{ ...btnBase, padding: 0, overflow: "hidden" }}>
          <button className="flex items-center hover:bg-[#f4f3f0]" style={{ gap: 4, padding: "0 10px 0 12px", fontSize: 13, fontWeight: 500 }}>
            <AtlasGlyph /> Ask Atlas
          </button>
          <div style={{ width: 1, background: BORDER }} />
          <button className="flex items-center justify-center hover:bg-[#f4f3f0]" style={{ width: 28 }} aria-label="Open Atlas in a new tab">
            <ArrowUpRight size={14} color="#6f7171" />
          </button>
        </div>
      }
    />
  );
}
