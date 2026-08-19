import { PanelShell, MoreButton, PinGlyph, chats, useHover, TEXT_PRIMARY, TEXT_SECONDARY, HOVER_BG } from "./_shared";
import "./_group.css";

/**
 * Hypothesis: truncation dots break scanning rhythm — fade the name out with a
 * gradient mask instead of "…", drop the always-on preview, and lean on day
 * group headers (Pinned / Today / This week / Earlier) for temporal context.
 * The preview appears only on hover as progressive disclosure.
 */
const groups: Array<{ label: string; day: string }> = [
  { label: "Pinned", day: "Pinned" },
  { label: "Today", day: "Today" },
  { label: "This week", day: "This week" },
  { label: "Earlier", day: "Earlier" },
];

export function FadeGroups() {
  const { hovered, setHovered } = useHover();
  return (
    <PanelShell label={null}>
      <div className="flex flex-col" style={{ gap: 10 }}>
        {groups.map((g) => (
          <div key={g.day} className="flex flex-col" style={{ gap: 2 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#9b9d9d",
                letterSpacing: "0.6px",
                textTransform: "uppercase",
                padding: "0 8px",
              }}
            >
              {g.label}
            </span>
            {chats
              .filter((c) => c.day === g.day)
              .map((chat) => {
                const isHovered = hovered === chat.id;
                return (
                  <div
                    key={chat.id}
                    className="relative flex flex-col rounded-lg cursor-pointer w-full"
                    style={{ padding: "9px 8px", gap: 3, background: isHovered ? HOVER_BG : "#fff" }}
                    onMouseEnter={() => setHovered(chat.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="flex items-center" style={{ gap: 6, paddingRight: isHovered ? 30 : 0 }}>
                      <span
                        className="flex-1 min-w-0"
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: TEXT_PRIMARY,
                          letterSpacing: "0.28px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          WebkitMaskImage: "linear-gradient(to right, black 82%, transparent 100%)",
                          maskImage: "linear-gradient(to right, black 82%, transparent 100%)",
                        }}
                      >
                        {chat.name}
                      </span>
                      {chat.pinned && <PinGlyph size={12} />}
                    </div>
                    {isHovered && (
                      <span
                        className="truncate"
                        style={{ fontSize: 12, color: TEXT_SECONDARY, letterSpacing: "0.24px" }}
                      >
                        {chat.preview}
                      </span>
                    )}
                    <div style={{ position: "absolute", right: 8, top: 8 }}>
                      <MoreButton visible={isHovered} />
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
