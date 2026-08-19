import { ArrowUpRight } from "lucide-react";
import { Frame } from "./_Frame";

// Hypothesis: de-emphasize into a quiet underlined link, matching the "Open Multiverse" link language
export function QuietTextLink() {
  return (
    <Frame note="Quiet link: matches 'Open Multiverse' language, lowest visual weight">
      <button
        className="flex items-center transition-colors hover:text-[#1a1a19]"
        style={{ gap: 4, color: "#6b6a66", fontSize: 13, fontWeight: 500, letterSpacing: "0.2px", textDecoration: "underline", textUnderlineOffset: 2 }}
      >
        Atlas full view
        <ArrowUpRight size={14} />
      </button>
    </Frame>
  );
}
