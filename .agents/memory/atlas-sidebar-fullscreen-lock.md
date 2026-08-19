---
name: Atlas sidebar fullscreen lock
description: How the app sidebar is locked closed while full-screen Atlas is open (server heartbeat model)
---

The lock is **presence-based via the server**, not a permanent sessionStorage lock (that earlier approach was removed).

- Full-screen page (`/atlas`) POSTs `/api/atlas/fullscreen-heartbeat` every 2s and sends a `navigator.sendBeacon('/api/atlas/fullscreen-close')` on pagehide/unmount.
- App provider polls GET `/api/atlas/fullscreen-active` every 2s; active = beat within ~5.5s. While active, `atlasLockedClosed` is true: sidebar forced closed, reopen buttons hidden ("Atlas full view" header button, panel button).
- Keyed by express session id, consistent with the shared-state sync endpoints.
- "Open Multiverse" in fullscreen opens the app in a new tab with `window.open` and does NOT send the close beacon — fullscreen stays open, so the new tab loads with the sidebar collapsed.

**Why:** localStorage/sessionStorage is partitioned between the preview iframe and separate tabs, so cross-tab lock state must go through the server.
**How to apply:** any new "is fullscreen open?" logic should read `atlasLockedClosed` from the atlas-version context, not storage.
