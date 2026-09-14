import { useRef, useState } from "react";
import {
  Button,
  DotsIcon,
  EditIcon,
  BinIcon,
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "@multiverse-io/stardust-react";

/*
 * NOTHING is imported from `./atlas` here, deliberately. `atlas.tsx` imports
 * this file, so importing back would close a two-way module cycle — the exact
 * thing recorded in `.agents/memory/atlas-fast-refresh.md` as breaking React
 * Fast Refresh and making later edits appear to do nothing.
 *
 * That is why the delete confirmation and the pin glyph are local here even
 * though `atlas.tsx` exports a `DeleteChatConfirmModal` and defines a
 * `PinGlyph`. Stardust imports are fine — they are not part of the cycle.
 */

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

/** Local date label — atlas.tsx has `chatRowDateLabel` but importing it would
 *  close the module cycle. Derived from the timestamp so the label and the sort
 *  order cannot drift apart. */
function coachDateLabel(date: Date): string {
  /*
   * Compare start-of-day to start-of-day. Diffing a mid-afternoon timestamp
   * against midnight today gave less than one whole day for "yesterday" and so
   * labelled it "Today" — the first version of this had exactly that bug.
   */
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfThatDay = new Date(date);
  startOfThatDay.setHours(0, 0, 0, 0);
  const days = Math.round((startOfToday.getTime() - startOfThatDay.getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

const seedConversations = [
  {
    id: "emma-progress",
    name: "Emma Wilson",
    initials: "EW",
    topic: "Preparing for your progress review",
    timestamp: daysAgo(0),
    color: "#ece9fc",
    messages: [
      { from: "coach", text: "Hi Sarah, how are you feeling about your upcoming progress review?" },
      { from: "user", text: "Good! I’ve been collecting evidence from my data project. What should I bring?" },
      { from: "coach", text: "Bring two examples you’re proud of and we’ll map them to your KSBs together." },
    ],
  },
  {
    id: "oliver-project",
    name: "Oliver Patel",
    initials: "OP",
    topic: "Feedback on your data project",
    timestamp: daysAgo(1),
    color: "#e4f1ea",
    messages: [
      { from: "coach", text: "Thanks for sharing your project outline. You’ve picked a clear business problem." },
      { from: "user", text: "Thank you! I’m still working out how to measure the impact." },
      { from: "coach", text: "Try comparing the time spent on the process before and after your changes." },
    ],
  },
  {
    id: "emma-learning",
    name: "Emma Wilson",
    initials: "EW",
    topic: "Planning your off-the-job learning",
    timestamp: daysAgo(3),
    color: "#ece9fc",
    messages: [
      { from: "user", text: "Could we talk about making more time for learning during the week?" },
      { from: "coach", text: "Of course. Let’s start with two protected learning slots that fit around your team’s schedule." },
      { from: "user", text: "Tuesday and Thursday afternoons would work well." },
      { from: "coach", text: "That sounds good. We can check how it’s going at our next session." },
    ],
  },
];

type CoachConversation = (typeof seedConversations)[number] & { pinned?: boolean };

/** Local copy of the pin mark — `PinGlyph` in atlas.tsx is not exported, and importing
 *  from there would close the module cycle described above. */
function PinMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 2h4l-.5 4.2 2.2 2.3H8.8V14h-1.6V8.5H3.3l2.2-2.3L6 2z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The two surfaces style their own Recents rows differently, so matching
 * "the Recents" means different values in each:
 *   panel      — bg-primary at rest, bg-secondary on hover
 *   fullscreen — transparent at rest, #e7e5e0 on hover
 */
export interface CoachConversationPayload {
  id: string;
  name: string;
  topic: string;
  /** Raw turns. Each surface maps these into its own ChatMessage shape — the
   *  type lives in atlas.tsx, which cannot be imported from here. */
  messages: { from: string; text: string }[];
}

export function CoachChatHistory({
  search = "",
  variant = "panel",
  onOpenConversation,
}: {
  search?: string;
  variant?: "panel" | "fullscreen";
  /** Opens the thread in the host surface's own chat transcript. */
  onOpenConversation?: (conversation: CoachConversationPayload) => void;
}) {
  const [rows, setRows] = useState<CoachConversation[]>(seedConversations);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const confirmDialog = useRef<HTMLDialogElement>(null);

  const query = search.trim().toLowerCase();
  const matches = rows
    .filter(chat =>
      `${chat.name} ${chat.topic} ${chat.messages.at(-1)?.text}`.toLowerCase().includes(query)
    )
    /*
     * Pinned first, then most recent — the Coaches group sorts by its own
     * recency, independently of Recents. Opening a thread does NOT bump its
     * timestamp: these are read-only sample conversations, so the date shown
     * stays the date it happened.
     */
    .sort((a, b) => {
      const pinDiff = Number(!!b.pinned) - Number(!!a.pinned);
      if (pinDiff !== 0) return pinDiff;
      return b.timestamp.getTime() - a.timestamp.getTime();
    });

  const commitRename = () => {
    if (renamingId && renameValue.trim()) {
      const next = renameValue.trim();
      setRows(prev => prev.map(c => (c.id === renamingId ? { ...c, name: next } : c)));
    }
    setRenamingId(null);
    setRenameValue("");
  };

  /*
   * Opens in the host surface's transcript — the same view Atlas chats use —
   * rather than a modal. The coach's name becomes the chat title so it is
   * unmistakable whose conversation it is, since the transcript renders
   * non-user turns in Atlas's own message styling.
   */
  const openThread = (chat: CoachConversation) => {
    onOpenConversation?.({
      // `coach:` prefix so hosts can keep these out of Recents.
      id: `coach:${chat.id}`,
      name: chat.name,
      topic: chat.topic,
      messages: chat.messages,
    });
  };

  const askDelete = (id: string) => {
    setOpenMenuId(null);
    setDeleteConfirmId(id);
    confirmDialog.current?.showModal();
  };

  const confirmDelete = () => {
    if (deleteConfirmId) setRows(prev => prev.filter(c => c.id !== deleteConfirmId));
    setDeleteConfirmId(null);
    confirmDialog.current?.close();
  };

  if (!matches.length) return null;

  return (
    <section aria-label="Coaches" data-testid="history-coaches" className="flex flex-col" style={{ gap: 8 }}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-secondary" style={{ letterSpacing: "0.24px" }}>Coaches</h3>
      </div>
      <div className="flex flex-col">
        {matches.map(chat => {
          const isHovered = hoveredId === chat.id;
          const menuOpen = openMenuId === chat.id;
          const showActions = isHovered || menuOpen;
          return (
            /*
             * A <div role="button">, not a <button>: the ⋯ is itself a button,
             * and nesting interactive elements is invalid HTML and swallows the
             * inner click. The Recents rows are divs for the same reason.
             * tabIndex + Enter/Space keep keyboard access.
             */
            <div
              key={chat.id}
              role="button"
              tabIndex={0}
              onClick={() => openThread(chat)}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openThread(chat);
                }
              }}
              onMouseEnter={() => setHoveredId(chat.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative w-full rounded-lg text-left transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3b3fd8] ${
                variant === "fullscreen"
                  ? "hover:bg-[#e7e5e0]"
                  : "bg-primary hover:bg-secondary"
              }`}
              style={{ padding: "8px" }}
              data-testid={`coach-chat-${chat.id}`}
            >
              <div className="flex items-start" style={{ gap: 8 }}>
                <span className="flex items-center justify-center flex-shrink-0 text-xs font-semibold" style={{ width: 28, height: 28, borderRadius: "50%", background: chat.color, color: "#42434a" }}>
                  {chat.initials}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center" style={{ gap: 8 }}>
                    {renamingId === chat.id ? (
                      <input
                        autoFocus
                        value={renameValue}
                        onChange={e => setRenameValue(e.target.value)}
                        onClick={e => e.stopPropagation()}
                        onKeyDown={e => {
                          e.stopPropagation();
                          if (e.key === "Enter") commitRename();
                          if (e.key === "Escape") { setRenamingId(null); setRenameValue(""); }
                        }}
                        onBlur={commitRename}
                        className="text-s font-medium text-primary flex-1 min-w-0 bg-primary border border-action rounded-base px-0-5"
                        data-testid={`coach-rename-${chat.id}`}
                      />
                    ) : (
                      <>
                        <span className="text-s font-medium text-primary truncate" data-testid={`coach-name-${chat.id}`}>
                          {chat.name}
                        </span>
                        {chat.pinned && (
                          <span className="flex-shrink-0 text-secondary" data-testid={`coach-pinned-${chat.id}`}>
                            <PinMark size={12} />
                          </span>
                        )}
                        <span className="text-xs text-secondary flex-shrink-0" style={{ marginLeft: "auto" }}>{coachDateLabel(chat.timestamp)}</span>
                      </>
                    )}
                  </div>
                  <div className="text-xs text-primary truncate" style={{ marginTop: 2 }}>{chat.topic}</div>
                  <p className="text-xs text-secondary" style={{ marginTop: 2, lineHeight: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {chat.messages.at(-1)?.text}
                  </p>
                </div>
              </div>

              {/* Same absolute placement and visibility toggle the Recents rows use. */}
              {renamingId !== chat.id && (
                <div
                  className="flex-shrink-0"
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "var(--atlas-panel-bg, #ffffff)",
                    borderRadius: "8px",
                    visibility: showActions ? "visible" : "hidden",
                    opacity: showActions ? 1 : 0,
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <DropdownRoot open={menuOpen} onOpenChange={(open: boolean) => setOpenMenuId(open ? chat.id : null)}>
                    <DropdownTrigger asChild>
                      <Button
                        variant="secondary"
                        size="tiny"
                        iconPosition="center"
                        Icon={<DotsIcon size="small" className="rotate-90" />}
                        aria-label="More options"
                        data-testid={`coach-more-${chat.id}`}
                        onClick={e => e.stopPropagation()}
                      />
                    </DropdownTrigger>
                    <DropdownContent
                      align="end"
                      className="p-0 rounded-base min-w-[160px]"
                      style={{ boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.04)", border: "0.5px solid #dbdad6", zIndex: 100000 }}
                    >
                      <div className="px-0" style={{ padding: "4px 0" }}>
                        <DropdownItem
                          className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                          data-testid={`coach-pin-${chat.id}`}
                          onClick={e => {
                            e.stopPropagation();
                            setRows(prev => prev.map(c => (c.id === chat.id ? { ...c, pinned: !c.pinned } : c)));
                          }}
                        >
                          <PinMark size={16} />
                          <span className="text-s font-medium text-primary" style={{ letterSpacing: "0.28px" }}>
                            {chat.pinned ? "Unpin chat" : "Pin chat"}
                          </span>
                        </DropdownItem>
                        <DropdownItem
                          className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                          data-testid={`coach-rename-item-${chat.id}`}
                          onClick={e => {
                            e.stopPropagation();
                            setRenamingId(chat.id);
                            setRenameValue(chat.name);
                          }}
                        >
                          <EditIcon size="small" variant="primary" />
                          <span className="text-s font-medium text-primary" style={{ letterSpacing: "0.28px" }}>
                            Rename
                          </span>
                        </DropdownItem>
                        <DropdownItem
                          className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                          data-testid={`coach-delete-${chat.id}`}
                          onClick={e => {
                            e.stopPropagation();
                            askDelete(chat.id);
                          }}
                        >
                          <BinIcon size="small" variant="primary" />
                          <span className="text-s font-medium text-primary" style={{ letterSpacing: "0.28px" }}>
                            Delete
                          </span>
                        </DropdownItem>
                      </div>
                    </DropdownContent>
                  </DropdownRoot>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Local confirm rather than atlas.tsx's DeleteChatConfirmModal — see the note at the top. */}
      <dialog
        ref={confirmDialog}
        aria-labelledby="coach-delete-title"
        className="rounded-xl border-0 p-0 backdrop:bg-black/30"
        style={{ width: "min(360px, calc(100vw - 32px))" }}
        data-testid="coach-confirm-dialog"
        onClose={() => setDeleteConfirmId(null)}
      >
        <div style={{ padding: 24 }}>
          <h2 id="coach-delete-title" className="text-m font-semibold text-primary">Delete chat</h2>
          <p className="text-s text-secondary" style={{ marginTop: 8 }}>
            This removes the conversation from your history. It can’t be undone.
          </p>
          <div className="flex justify-end" style={{ gap: 8, marginTop: 20 }}>
            <Button variant="secondary" size="small" onClick={() => confirmDialog.current?.close()} data-testid="coach-confirm-cancel">
              Cancel
            </Button>
            <Button variant="negative" size="small" onClick={confirmDelete} data-testid="coach-confirm-delete">
              Delete
            </Button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
