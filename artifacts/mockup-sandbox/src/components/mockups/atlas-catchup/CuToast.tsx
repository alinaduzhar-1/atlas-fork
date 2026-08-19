import { Shell, Header, Composer, T1, T2, BORDER, FS_CHAT, INDIGO } from "./_cu";

/**
 * D — Toast: the sidebar keeps whatever the user had open there; a
 * transient toast announces the full-screen chat with a Resume action.
 * Non-blocking and self-dismissing.
 */
export function CuToast() {
  return (
    <Shell note="D — Toast: sidebar state is untouched; a transient toast offers 'Resume' for the chat started in full screen. Non-blocking, but easy to miss once it fades.">
      <Header />
      <div className="flex-1 overflow-hidden px-3 pt-3 flex flex-col" style={{ gap: 10 }}>
        <div className="self-end rounded-2xl px-3 py-2 max-w-[80%]" style={{ background: "#edebe8", color: T1, fontSize: 13 }}>
          What should I focus on this week?
        </div>
        <div style={{ color: T1, fontSize: 13, lineHeight: 1.5, maxWidth: "92%" }}>
          Based on your progress, I'd focus on your portfolio evidence for the Data Analysis unit.
        </div>
      </div>
      {/* Toast */}
      <div className="flex-shrink-0" style={{ padding: "0 12px 8px" }}>
        <div className="flex items-center justify-between rounded-xl" style={{ padding: "10px 12px", background: "#212223", gap: 10 }}>
          <div className="flex flex-col" style={{ gap: 1, minWidth: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              You started "{FS_CHAT}"
            </span>
            <span style={{ fontSize: 11, color: "#b6b8b7" }}>in full screen Atlas</span>
          </div>
          <button className="rounded-lg flex-shrink-0" style={{ padding: "5px 12px", background: INDIGO, color: "#fff", fontSize: 12, fontWeight: 600 }}>
            Resume
          </button>
        </div>
      </div>
      <Composer />
    </Shell>
  );
}
