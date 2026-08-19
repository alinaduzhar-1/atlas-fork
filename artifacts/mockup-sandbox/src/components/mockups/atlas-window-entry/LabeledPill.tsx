import { ArrowUpRight } from "lucide-react";
import { TopBarShell, RightCluster, AskAtlasButton } from "./_tb";

export function LabeledPill() {
  return (
    <TopBarShell note="Option C — A separate labeled 'Atlas Window' pill next to Ask Atlas. Most discoverable: users see the full-screen option by name, at the cost of a slightly busier bar.">
      <RightCluster>
        <div className="flex items-center gap-x-2">
          <AskAtlasButton />
          <button
            className="flex items-center gap-[5px] h-[32px] px-[12px] rounded-lg bg-white border border-[#dbdad6] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] text-[13px] font-medium text-[#1f1e1d] hover:bg-[#f5f4f1] transition-colors cursor-pointer"
            style={{ borderWidth: "0.5px" }}
          >
            <ArrowUpRight size={15} strokeWidth={1.8} color="#1f1e1d" />
            Atlas Window
          </button>
        </div>
      </RightCluster>
    </TopBarShell>
  );
}
