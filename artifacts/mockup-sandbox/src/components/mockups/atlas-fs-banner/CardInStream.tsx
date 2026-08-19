import { ArrowUpRight } from "lucide-react";
import { BrandRow, Composer, PanelShell, T1, T2, BORDER } from "../atlas-chat-header/_shared";

/**
 * B — Card in the chat stream: appears as a small system card after the last
 * message, like a gentle suggestion from Atlas itself.
 */
export function CardInStream() {
  return (
    <PanelShell>
      <BrandRow />
      <div className="flex-1 overflow-hidden px-3 pt-2 flex flex-col" style={{ gap: 10 }}>
        <div className="self-end rounded-2xl px-3 py-2 max-w-[80%]" style={{ background: "#edebe8", color: T1, fontSize: 13.5 }}>
          What should I focus on this week?
        </div>
        <div style={{ color: T1, fontSize: 13.5, lineHeight: 1.5, maxWidth: "92%" }}>
          Based on your progress, I'd focus on your portfolio evidence for the Data Analysis unit — you have two KSBs that still need mapped evidence.
        </div>
        <div className="rounded-xl" style={{ border: `1px solid ${BORDER}`, padding: "10px 12px", maxWidth: "92%" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T1 }}>Get a larger workspace for longer conversations?</div>
          <button className="flex items-center rounded-md" style={{ gap: 4, marginTop: 8, border: "1px solid #4a5ff7", color: "#4a5ff7", fontSize: 12, fontWeight: 600, padding: "5px 9px", background: "#fff" }}>
            Open full screen <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
      <Composer />
    </PanelShell>
  );
}
