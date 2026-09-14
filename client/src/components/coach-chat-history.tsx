import { useRef, useState } from "react";

const conversations = [
  {
    id: "emma-progress",
    name: "Emma Wilson",
    initials: "EW",
    topic: "Preparing for your progress review",
    date: "Today",
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
    date: "Yesterday",
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
    date: "11 Sep",
    color: "#ece9fc",
    messages: [
      { from: "user", text: "Could we talk about making more time for learning during the week?" },
      { from: "coach", text: "Of course. Let’s start with two protected learning slots that fit around your team’s schedule." },
      { from: "user", text: "Tuesday and Thursday afternoons would work well." },
      { from: "coach", text: "That sounds good. We can check how it’s going at our next session." },
    ],
  },
];

export function CoachChatHistory({ search = "" }: { search?: string }) {
  const [selected, setSelected] = useState<(typeof conversations)[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const query = search.trim().toLowerCase();
  const matches = conversations.filter(chat =>
    `${chat.name} ${chat.topic} ${chat.messages.at(-1)?.text}`.toLowerCase().includes(query)
  );

  if (!matches.length) return null;

  return (
    <section aria-label="Coaches" data-testid="history-coaches" className="flex flex-col" style={{ gap: 8 }}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-secondary" style={{ letterSpacing: "0.24px" }}>Coaches</h3>
      </div>
      <div className="flex flex-col">
        {matches.map(chat => (
          <button
            key={chat.id}
            type="button"
            className="w-full rounded-lg text-left hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3b3fd8]"
            style={{ padding: "8px" }}
            data-testid={`coach-chat-${chat.id}`}
            onClick={() => { setSelected(chat); dialog.current?.showModal(); }}
          >
            <div className="flex items-start" style={{ gap: 8 }}>
              <span className="flex items-center justify-center flex-shrink-0 text-xs font-semibold" style={{ width: 28, height: 28, borderRadius: "50%", background: chat.color, color: "#42434a" }}>
                {chat.initials}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center" style={{ gap: 8 }}>
                  <span className="text-s font-medium text-primary truncate">{chat.name}</span>
                  <span className="text-xs text-secondary flex-shrink-0" style={{ marginLeft: "auto" }}>{chat.date}</span>
                </div>
                <div className="text-xs text-primary truncate" style={{ marginTop: 2 }}>{chat.topic}</div>
                <p className="text-xs text-secondary" style={{ marginTop: 2, lineHeight: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {chat.messages.at(-1)?.text}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <dialog ref={dialog} aria-labelledby="coach-thread-title" className="rounded-xl border-0 p-0 backdrop:bg-black/30" style={{ width: "min(480px, calc(100vw - 32px))", maxHeight: "80vh" }} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
        <div style={{ padding: 24 }}>
          <div className="flex items-start justify-between" style={{ gap: 16 }}>
            <div>
              <h2 id="coach-thread-title" className="text-m font-semibold text-primary">{selected?.name}</h2>
              <p className="text-xs text-secondary">{selected?.topic}</p>
            </div>
            <button type="button" autoFocus onClick={() => dialog.current?.close()} className="text-s text-secondary rounded-lg border px-2 py-1">Close</button>
          </div>
          <p className="text-xs text-secondary" style={{ marginTop: 16 }}>Sample conversation · Read only</p>
          <div className="flex flex-col" style={{ gap: 12, marginTop: 16 }}>
            {selected?.messages.map((message, index) => (
              <div key={index} style={{ maxWidth: "90%", alignSelf: message.from === "user" ? "flex-end" : "flex-start", background: message.from === "user" ? "#f0efff" : "#f5f5f4", borderRadius: 12, padding: 12 }}>
                <p className="text-xs font-semibold text-secondary" style={{ marginBottom: 4 }}>{message.from === "user" ? "You" : selected.name}</p>
                <p className="text-s text-primary">{message.text}</p>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </section>
  );
}