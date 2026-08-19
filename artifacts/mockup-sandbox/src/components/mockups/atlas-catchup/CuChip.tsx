import { Shell, Header, Composer, FsMessages, FS_CHAT, T1, T2 } from "./_cu";
import { ChevronDown, Monitor } from "lucide-react";

/**
 * B — Continuity chip: same silent sync, but a small dismissible chip
 * sits above the conversation explaining where this chat came from.
 * Keeps context without blocking anything.
 */
export function CuChip() {
  return (
    <Shell note="B — Continuity chip: the synced chat opens with a small 'Continued from full screen' marker above the thread, so the hand-off is explained in place. Dismisses on first interaction.">
      <Header />
      <div className="flex items-center flex-shrink-0" style={{ padding: "10px 12px 0", gap: 4 }}>
        <span className="font-semibold" style={{ fontSize: 13.5, color: T1 }}>{FS_CHAT}</span>
        <ChevronDown size={14} color={T2} />
      </div>
      <div className="flex-shrink-0" style={{ padding: "8px 12px 0" }}>
        <div className="flex items-center rounded-full" style={{ gap: 6, padding: "4px 10px", background: "#eef0fe", width: "fit-content" }}>
          <Monitor size={12} color="#4a5ff7" />
          <span style={{ fontSize: 11.5, fontWeight: 600, color: "#4a5ff7" }}>Continued from full screen</span>
          <span style={{ fontSize: 12, color: "#8a93f0", marginLeft: 2, cursor: "pointer" }}>✕</span>
        </div>
      </div>
      <FsMessages />
      <Composer />
    </Shell>
  );
}
