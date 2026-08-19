---
name: Atlas panel header structure
description: The Atlas component has two separate "after"-mode headers that must be kept in sync
---

# Atlas panel headers

`client/src/components/atlas.tsx` renders the Atlas panel header in **two
separate code paths**, gated by `isInChatMode`:

1. **Chat-mode header** — shown once a conversation has started. Includes a
   primary "New chat" button in the right cluster.
2. **Welcome/home header** — shown before any messages (the greeting +
   suggestions state). No "New chat" button by default.

Both branches additionally fork on `prototypeMode === 'after'` vs the
`before` branch.

**Why this matters:** Any change to a header affordance (title, history
entry point, buttons) in "after" mode must be applied to BOTH headers or the
panel becomes inconsistent between the welcome state and the active-chat
state. There is also a third header inside the dedicated `showHistory`
HistoryPanel view.

**How to apply:** When editing the Atlas header, grep for the duplicated
markers (e.g. `setShowRecentChatsMenu`, `Recent chats`, `View full history`,
`button-new-chat`) — they appear in each header path and usually all need the
same edit. The recent-chats popover markup is duplicated, not shared.

## Recent-chats popover anchoring

The popover must be **left-anchored to the header container** (`left: '4px'`),
NOT right-anchored to the history-icon button. The panel is narrow (~400px
default) and the popover is 311px wide, so anchoring its right edge to the
history button overflows off the panel's left edge in chat mode (where the
history button sits far from the right edge because New chat/More/Close are to
its right). With `left: '4px'` + the popover's 4px outer pad + 8px item pad,
item text lands at 16px from the panel edge, matching the title's `p-2` inset —
so menu items align with the chat title.

**Why:** Right-anchoring looked fine only in the welcome header (history button
near the right) but broke in chat mode. Left-anchoring fixes both and gives the
title alignment the design wants.

**How to apply:** The popover's offset parent is the positioned header row. In
chat mode that's the outer `absolute ... p-2` div (already positioned); in the
welcome header you must put `relative` on the `justify-between p-2` div. The
history-button wrapper div must NOT be `relative` (the badge dot lives on the
inner `relative inline-flex` span instead).

## Consolidated header (2026-08: user-approved "One Menu" design)

The "after"-mode headers no longer show standalone History or
open-in-new-tab icon buttons. Both actions live inside the ⋯ dropdown, in
this order: **Open full screen, History, divider, Delete chat (chat mode
only), Leave feedback**. Only New chat (chat mode), ⋯, and Close stay in
the header row.

**Why:** User picked this variant from a canvas exploration to reduce
header button clutter. Keep both 'after' dropdown branches in sync.

**How to apply:** The recent-chats popover markup still exists in both
headers but is unreachable (no toggle button sets `showRecentChatsMenu`);
"History" in the menu opens the full HistoryPanel via `setShowHistory(true)`.
