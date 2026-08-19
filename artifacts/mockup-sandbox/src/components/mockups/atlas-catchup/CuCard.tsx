import { Shell, Header, Composer, T1, T2, BORDER, FS_CHAT, INDIGO } from "./_cu";
import { Monitor, ArrowRight } from "lucide-react";

/**
 * C — Pick-up card: the sidebar stays on its own state (welcome or the
 * chat the user left there), and a "Pick up where you left off" card
 * offers the full-screen chat explicitly. User stays in control of
 * which thread the sidebar shows.
 */
export function CuCard() {
  return (
    <Shell note="C — Pick-up card: sidebar keeps its own state; a card on the welcome screen offers to resume the chat started in full screen. Explicit and reversible, at the cost of one extra tap.">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-4" style={{ gap: 14 }}>
        <div className="flex items-center justify-center"
          style={{ width: 44, height: 42, borderRadius: 12, background: "#fff", transform: "rotate(-3.88deg)",
            boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)" }}>
          <span style={{ fontSize: 20 }}>〰️</span>
        </div>
        <p className="text-center" style={{ fontSize: 14, fontWeight: 500, color: T1, maxWidth: 240 }}>
          Hey Sarah, I can help you navigate your apprenticeship
        </p>
        <div className="w-full rounded-xl" style={{ border: `1px solid ${BORDER}`, padding: 12, background: "#fbfaf8" }}>
          <div className="flex items-center" style={{ gap: 6, marginBottom: 6 }}>
            <Monitor size={12} color={T2} />
            <span style={{ fontSize: 11, fontWeight: 600, color: T2, letterSpacing: "0.3px", textTransform: "uppercase" }}>Pick up where you left off</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T1, marginBottom: 2 }}>{FS_CHAT}</div>
          <div style={{ fontSize: 12, color: T2, marginBottom: 10 }}>Started in full screen · 2 min ago</div>
          <button className="flex items-center rounded-lg" style={{ gap: 6, padding: "6px 12px", background: INDIGO, color: "#fff", fontSize: 12.5, fontWeight: 600 }}>
            Resume chat <ArrowRight size={13} />
          </button>
        </div>
      </div>
      <Composer />
    </Shell>
  );
}
