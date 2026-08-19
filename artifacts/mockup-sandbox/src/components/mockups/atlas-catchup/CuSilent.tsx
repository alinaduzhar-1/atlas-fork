import { Shell, Header, Composer, FsMessages, FS_CHAT, T1, T2, BORDER } from "./_cu";
import { ChevronDown } from "lucide-react";

/**
 * A — Silent sync: the sidebar simply follows the latest activity.
 * Reopening it shows the chat started in full screen, already active,
 * with its name in the chat-mode header. No banner, no interruption —
 * the history dropdown is the only affordance if the user wants their
 * earlier sidebar chat back.
 */
export function CuSilent() {
  return (
    <Shell note="A — Silent sync: sidebar reopens straight into the chat last touched in full screen. Zero friction, but the switch is implicit — users may wonder where their earlier sidebar chat went.">
      <Header />
      <div className="flex items-center flex-shrink-0" style={{ padding: "10px 12px 0", gap: 4 }}>
        <span className="font-semibold" style={{ fontSize: 13.5, color: T1 }}>{FS_CHAT}</span>
        <ChevronDown size={14} color={T2} />
      </div>
      <FsMessages />
      <Composer />
    </Shell>
  );
}
