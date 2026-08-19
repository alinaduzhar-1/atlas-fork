import { ArrowUpRight, Check, ChevronDown, PanelRight } from "lucide-react";
import { RightCluster, Hexagon } from "../atlas-window-entry/_tb";

export function SilentRemember() {
  return (
    <div className="min-h-screen bg-[#f5f4f1] flex flex-col">
      <div className="flex items-center justify-between p-2 bg-[#fbfaf9] border-b border-[#e7e5e0]">
        <div />
        <RightCluster>
          <div className="relative">
            <button
              className="flex items-center gap-[4px] h-[32px] px-[12px] rounded-lg bg-white border border-[#dbdad6] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] text-[13px] font-medium text-[#1f1e1d] cursor-pointer"
              style={{ borderWidth: "0.5px" }}
            >
              <Hexagon size={16} />
              Ask Atlas
              <ChevronDown size={13} strokeWidth={2} color="#6f6d66" />
            </button>
            <div
              className="absolute right-0 mt-1 w-[236px] rounded-lg bg-white border border-[#dbdad6] shadow-[0px_4px_16px_rgba(0,0,0,0.10)] py-1 z-20"
              style={{ borderWidth: "0.5px" }}
            >
              <div className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a887f]">
                Opens with
              </div>
              <div className="flex items-center justify-between px-3 py-[7px] text-[13px] font-medium text-[#1f1e1d] hover:bg-[#f5f4f1] cursor-pointer">
                <span className="flex items-center gap-[8px]">
                  <PanelRight size={15} strokeWidth={1.8} />
                  Side panel
                </span>
                <Check size={15} strokeWidth={2.2} color="#4f46e5" />
              </div>
              <div className="flex items-center gap-[8px] px-3 py-[7px] text-[13px] font-medium text-[#1f1e1d] hover:bg-[#f5f4f1] cursor-pointer">
                <ArrowUpRight size={15} strokeWidth={1.8} />
                Atlas Window
              </div>
              <div className="mx-3 my-1 h-px bg-[#ecebe7]" />
              <p className="px-3 pb-2 pt-1 text-[11.5px] leading-snug text-[#8a887f]">
                Ask Atlas opens your last choice. Pick the other option here any time to switch.
              </p>
            </div>
          </div>
        </RightCluster>
      </div>
      <div className="flex-1 flex items-start justify-center pt-56 px-8">
        <p className="text-[13px] text-[#6f6d66] max-w-[600px] text-center leading-relaxed">
          Option A — No question is ever asked. Clicking Ask Atlas simply opens the mode used last
          time; the chevron menu shows which mode is the current default (check mark) and switching
          there updates the memory. Zero friction, but the rule is implicit.
        </p>
      </div>
    </div>
  );
}
