import { PanelShell, MoreButton, PinGlyph, chats, useHover, TEXT_PRIMARY, TEXT_SECONDARY, HOVER_BG } from "./_shared";
import "./_group.css";

/**
 * Hypothesis: the chat name is the primary scanning anchor — let it wrap to
 * two full lines instead of truncating/marquee-scrolling, and demote the
 * preview to a single quiet line. Nothing moves on hover except the menu.
 */
export function TwoLineName() {
  const { hovered, setHovered } = useHover();
  return (
    <PanelShell>
      <div className="flex flex-col">
        {chats.map((chat) => {
          const isHovered = hovered === chat.id;
          return (
            <div
              key={chat.id}
              className="relative flex items-start rounded-lg cursor-pointer w-full"
              style={{ padding: "12px 8px", gap: 8, background: isHovered ? HOVER_BG : "#fff" }}
              onMouseEnter={() => setHovered(chat.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex flex-col flex-1 min-w-0" style={{ gap: 3 }}>
                <div className="flex items-start" style={{ gap: 6, paddingRight: 28 }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: TEXT_PRIMARY,
                      letterSpacing: "0.28px",
                      lineHeight: 1.35,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {chat.name}
                  </span>
                  {chat.pinned && (
                    <span style={{ marginTop: 2 }}>
                      <PinGlyph size={13} />
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
              <div style={{ position: "absolute", right: 8, top: 12 }}>
                <MoreButton visible={isHovered} />
              </div>
            </div>
          );
        })}
      </div>
    </PanelShell>
  );
}
