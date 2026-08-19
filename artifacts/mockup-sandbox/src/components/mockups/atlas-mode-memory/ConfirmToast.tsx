import { ArrowUpRight, ChevronDown } from "lucide-react";
import { RightCluster, Hexagon } from "../atlas-window-entry/_tb";

export function ConfirmToast() {
  return (
    <div className="min-h-screen bg-[#f5f4f1] flex flex-col relative">
      <div className="flex items-center justify-between p-2 bg-[#fbfaf9] border-b border-[#e7e5e0]">
        <div />
        <RightCluster>
          <button
            className="flex items-center gap-[4px] h-[32px] px-[12px] rounded-lg bg-white border border-[#dbdad6] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] text-[13px] font-medium text-[#1f1e1d] cursor-pointer"
            style={{ borderWidth: "0.5px" }}
          >
            <Hexagon size={16} />
            Ask Atlas
            <ChevronDown size={13} strokeWidth={2} color="#6f6d66" />
          </button>
        </RightCluster>
      </div>
      <div className="flex-1 flex items-start justify-center pt-48 px-8">
        <p className="text-[13px] text-[#6f6d66] max-w-[600px] text-center leading-relaxed">
          Option C — The first time the user picks a mode from the menu, a small toast confirms the
          choice was saved and offers an undo-style switch. After that, Ask Atlas opens the saved
          mode directly with no further prompts.
        </p>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-xl bg-[#1f1e1d] text-white pl-4 pr-2 py-2.5 shadow-[0px_8px_24px_rgba(0,0,0,0.25)]">
        <ArrowUpRight size={16} strokeWidth={1.8} color="#a5b4fc" />
        <span className="text-[13px]">
          Atlas will now always open in the <span className="font-semibold">Atlas Window</span>
        </span>
        <button className="text-[12.5px] font-semibold text-[#a5b4fc] hover:text-white px-2 py-1 rounded-md cursor-pointer">
          Use side panel instead
        </button>
      </div>
    </div>
  );
}
