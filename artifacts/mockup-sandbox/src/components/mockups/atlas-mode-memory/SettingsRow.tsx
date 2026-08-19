import { ArrowUpRight, PanelRight } from "lucide-react";
import { Hexagon } from "../atlas-window-entry/_tb";

export function SettingsRow() {
  return (
    <div className="min-h-screen bg-[#f5f4f1] flex items-start justify-center pt-16">
      <div className="w-[640px]">
        <h1 className="text-[20px] font-semibold text-[#1f1e1d] mb-4">Settings</h1>
        <div className="rounded-xl bg-white border border-[#e7e5e0] p-5" style={{ borderWidth: "0.5px" }}>
          <div className="flex items-center gap-2 mb-1">
            <Hexagon size={17} />
            <h2 className="text-[14.5px] font-semibold text-[#1f1e1d]">Atlas</h2>
          </div>
          <p className="text-[12.5px] text-[#6f6d66] mb-4">
            Choose how Atlas opens when you click Ask Atlas. Applies everywhere until you change it.
          </p>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 rounded-lg border border-[#dbdad6] px-4 py-3 cursor-pointer hover:bg-[#faf9f7]">
              <span className="flex h-[16px] w-[16px] items-center justify-center rounded-full border-2 border-[#c9c7c0]" />
              <PanelRight size={16} strokeWidth={1.8} color="#1f1e1d" />
              <span className="flex-1">
                <span className="block text-[13px] font-medium text-[#1f1e1d]">Side panel</span>
                <span className="block text-[11.5px] text-[#8a887f]">Opens beside the current page</span>
              </span>
            </label>
            <label className="flex items-center gap-3 rounded-lg border-2 border-[#4f46e5] bg-[#f6f5ff] px-4 py-3 cursor-pointer">
              <span className="flex h-[16px] w-[16px] items-center justify-center rounded-full border-2 border-[#4f46e5]">
                <span className="h-[7px] w-[7px] rounded-full bg-[#4f46e5]" />
              </span>
              <ArrowUpRight size={16} strokeWidth={1.8} color="#1f1e1d" />
              <span className="flex-1">
                <span className="block text-[13px] font-medium text-[#1f1e1d]">Atlas Window</span>
                <span className="block text-[11.5px] text-[#8a887f]">Full-screen chat with history</span>
              </span>
            </label>
          </div>
        </div>
        <p className="mt-4 text-[12px] text-[#8a887f] text-center max-w-[560px] mx-auto leading-relaxed">
          Option D — the preference lives in Settings as an explicit radio choice. Most transparent
          and conventional, but the control is far from where the choice happens.
        </p>
      </div>
    </div>
  );
}
