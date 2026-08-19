---
name: Atlas panel ↔ full-screen shared-state sync
description: Pitfalls of the localStorage mirroring between the Atlas sidebar panel and full-screen page
---

The sidebar panel and full-screen Atlas page mirror chats via a shared localStorage blob plus storage/custom-event subscriptions. Hard-won rules:

- **Write-through skips while `isTyping`**, so a snapshot can lack the chat the user is currently in. Anything that reads shared state to open a specific chat (e.g. full-screen `?chat=<id>`) must force-write the active chat synchronously at the moment of navigation.
- **Never treat "chat missing from a snapshot" as a deletion by default.** Only reset the open conversation if that chat id was seen in a *previous* snapshot (track known ids); otherwise a late/early snapshot nukes a freshly restored chat to "New chat".
- The one-shot `atlas-fullscreen-handoff` localStorage key is a fallback only; the `?chat=` URL param restored from shared state is authoritative and must suppress the handoff (guard ref) to avoid showing the wrong conversation on double-open.

**Why:** users open full screen mid-response; the race between typing, write-through, and the new tab's hydration repeatedly produced "opens as new chat" / wrong-chat bugs.
**How to apply:** any new surface that opens/joins a chat via shared state must force-flush the active chat first and use the known-ids guard before resetting state.

## Chat deletion
Delete actions must use a dedicated handler that removes the chat from both history metadata and message storage (chatMessagesStore / sharedMessagesRef) and clears active state directly. Never route delete through handleNewChat — it re-persists and re-adds the active chat, silently undoing the deletion.
