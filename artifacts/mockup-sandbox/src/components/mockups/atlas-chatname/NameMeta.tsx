import { PanelShell, MoreButton, PinGlyph, chats, useHover, TEXT_PRIMARY, TEXT_SECONDARY, HOVER_BG } from "./_shared";
import "./_group.css";

/**
 * Hypothesis: the list is a chronological log — pair a single-line ellipsized
 * name with a right-aligned relative timestamp (which yields to the ⋯ menu on
 * hover), and keep a one-line preview for density. More chats fit per screen.
 */
export function NameMeta() {
  const { hovered, setHovered } = useHover();
  return (
    <PanelShell>
      <div className="flex flex-col">
        {chats.map((chat) => {
          const isHovered = hovered === chat.id;
          return (
            <div
              key={chat.id}
              className="relative flex items-center rounded-lg cursor-pointer w-full"
              style={{ padding: "9px 8px", gap: 8, background: isHovered ? HOVER_BG : "#fff" }}
              onMouseEnter={() => setHovered(chat.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex flex-col flex-1 min-w-0" style={{ gap: 2 }}>
                <div className="flex items-center" style={{ gap: 6 }}>
                  {chat.pinned && <PinGlyph size={12} />}
                  <span
                    className="flex-1 min-w-0 truncate"
                    style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY, letterSpacing: "0.28px" }}
                  >
                    {chat.name}
                  </span>
                  {isHovered ? (
                    <MoreButton visible />
                  ) : (
                    <span
                      className="flex-shrink-0"
                      style={{ fontSize: 11, color: "#9b9d9d", letterSpacing: "0.22px", fontVariantNumeric: "tabular-nums" }}
                    >
                      {chat.when}
                    </span>
                  )}
                </div>
                <span
                  className="truncate"
                  style={{ fontSize: 12, color: TEXT_SECONDARY, letterSpacing: "0.24px" }}
                >
                  {chat.preview}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </PanelShell>
  );
}
