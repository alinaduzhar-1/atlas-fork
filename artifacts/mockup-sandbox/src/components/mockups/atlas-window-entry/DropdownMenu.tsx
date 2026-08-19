import { ArrowUpRight, ChevronDown, PanelRight } from "lucide-react";
import { TopBarShell, RightCluster, Hexagon } from "./_tb";

export function DropdownMenu() {
  return (
    <TopBarShell note="Option D — Ask Atlas gains a small chevron and opens a menu with 'Open side panel' and 'Open Atlas Window'. Keeps the bar untouched; full screen is one click deeper. (Menu shown open for preview.)">
      <RightCluster>
        <div className="relative">
          <button
            className="flex items-center gap-[4px] h-[32px] px-[12px] rounded-lg bg-white border border-[#dbdad6] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] text-[13px] font-medium text-[#1f1e1d] hover:bg-[#f5f4f1] transition-colors cursor-pointer"
            style={{ borderWidth: "0.5px" }}
          >
            <Hexagon size={16} />
            Ask Atlas
            <ChevronDown size={13} strokeWidth={2} color="#6f6d66" />
          </button>
          <div
            className="absolute right-0 mt-1 w-[196px] rounded-lg bg-white border border-[#dbdad6] shadow-[0px_4px_16px_rgba(0,0,0,0.10)] py-1 z-20"
            style={{ borderWidth: "0.5px" }}
          >
            <div className="flex items-center gap-[8px] px-3 py-[7px] text-[13px] font-medium text-[#1f1e1d] hover:bg-[#f5f4f1] cursor-pointer">
              <PanelRight size={15} strokeWidth={1.8} color="#1f1e1d" />
              Open side panel
            </div>
            <div className="flex items-center gap-[8px] px-3 py-[7px] text-[13px] font-medium text-[#1f1e1d] hover:bg-[#f5f4f1] cursor-pointer">
              <ArrowUpRight size={15} strokeWidth={1.8} color="#1f1e1d" />
              Open Atlas Window
            </div>
          </div>
        </div>
      </RightCluster>
    </TopBarShell>
  );
}
