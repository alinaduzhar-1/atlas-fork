import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AtlasGlyph, NavStrip, btnBase } from "./_shared";

/**
 * D — Hover reveal: Ask Atlas looks identical to today at rest; on hover the
 * button widens slightly and a new-tab arrow slides in on the right.
 * (Hover the button in this frame to see it.)
 */
export function HoverReveal() {
  const [hover, setHover] = useState(false);
  return (
    <NavStrip
      note="At rest the button is identical to today. On hover, a small new-tab arrow slides in at the right edge; clicking it opens Atlas full screen in a new tab. Zero added chrome for everyone who never needs it. Hover the button above to preview."
      askAtlas={
        <button
          className="flex items-center"
          style={{ ...btnBase, gap: 4, padding: "0 12px", background: hover ? "#f4f3f0" : "#fff", transition: "all 150ms" }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <AtlasGlyph /> Ask Atlas
          <span
            className="flex items-center justify-center overflow-hidden"
            style={{ width: hover ? 18 : 0, opacity: hover ? 1 : 0, transition: "all 150ms", marginLeft: hover ? 2 : 0 }}
            aria-label="Open Atlas in a new tab"
          >
            <ArrowUpRight size={13} color="#6f7171" />
          </span>
        </button>
      }
    />
  );
}
