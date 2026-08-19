import { ArrowUpRight } from "lucide-react";
import { TopBarShell, RightCluster, Hexagon } from "./_tb";

export function SplitButton() {
  return (
    <TopBarShell note="Option B — Ask Atlas becomes a split button: the left segment opens the side panel as today, the attached ↗ segment opens the full Atlas Window. One control, two destinations — no extra items in the bar.">
      <RightCluster>
        <div
          className="flex items-stretch h-[32px] rounded-lg bg-white border border-[#dbdad6] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] overflow-hidden"
          style={{ borderWidth: "0.5px" }}
        >
          <button className="flex items-center gap-[4px] px-[12px] text-[13px] font-medium text-[#1f1e1d] hover:bg-[#f5f4f1] transition-colors cursor-pointer">
            <Hexagon size={16} />
            Ask Atlas
          </button>
          <div className="w-px bg-[#e7e5e0] my-[6px]" />
          <button
            className="flex items-center justify-center px-[8px] hover:bg-[#f5f4f1] transition-colors cursor-pointer"
            aria-label="Atlas Window"
          >
            <ArrowUpRight size={15} strokeWidth={1.8} color="#1f1e1d" />
          </button>
        </div>
      </RightCluster>
    </TopBarShell>
  );
}
