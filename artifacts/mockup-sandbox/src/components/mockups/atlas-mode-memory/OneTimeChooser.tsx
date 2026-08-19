import { ArrowUpRight, PanelRight } from "lucide-react";
import { Hexagon } from "../atlas-window-entry/_tb";

export function OneTimeChooser() {
  return (
    <div className="min-h-screen bg-[#f5f4f1] relative flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-[460px] rounded-2xl bg-white shadow-[0px_12px_40px_rgba(0,0,0,0.18)] p-6">
        <div className="flex items-center gap-2 mb-1">
          <Hexagon size={20} />
          <h2 className="text-[16px] font-semibold text-[#1f1e1d]">How do you want to use Atlas?</h2>
        </div>
        <p className="text-[13px] text-[#6f6d66] mb-4">
          Pick your preferred way to chat with Atlas. We'll remember it — you can change it any time
          from the Ask Atlas menu.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-start gap-2 rounded-xl border-2 border-[#4f46e5] bg-[#f6f5ff] p-4 text-left cursor-pointer">
            <PanelRight size={20} strokeWidth={1.8} color="#4f46e5" />
            <span className="text-[13.5px] font-semibold text-[#1f1e1d]">Side panel</span>
            <span className="text-[12px] text-[#6f6d66] leading-snug">
              Atlas opens beside the page you're on — great for quick questions while you work.
            </span>
          </button>
          <button className="flex flex-col items-start gap-2 rounded-xl border border-[#dbdad6] bg-white p-4 text-left hover:border-[#b9b7b0] cursor-pointer">
            <ArrowUpRight size={20} strokeWidth={1.8} color="#1f1e1d" />
            <span className="text-[13.5px] font-semibold text-[#1f1e1d]">Atlas Window</span>
            <span className="text-[12px] text-[#6f6d66] leading-snug">
              A full-screen space with your chat history — great for longer sessions.
            </span>
          </button>
        </div>
        <button className="mt-4 w-full h-[38px] rounded-lg bg-[#4f46e5] text-white text-[13.5px] font-semibold cursor-pointer">
          Continue with Side panel
        </button>
        <p className="mt-3 text-center text-[11.5px] text-[#8a887f]">
          Option B — asked once, on the first Ask Atlas click. Never shown again.
        </p>
      </div>
    </div>
  );
}
