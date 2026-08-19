---
name: Atlas cross-tab sync needs the server, not localStorage
description: Why sidebar↔full-screen Atlas mirroring is server-backed (browser storage partitioning)
---

The sidebar Atlas panel runs inside the Replit preview iframe; full screen opens as a separate top-level tab. Modern browsers partition third-party-iframe storage, so localStorage/storage events (and BroadcastChannel) do NOT cross that boundary — pure client-side mirroring silently fails there while working in top-level test browsers.

**Why:** User-reported "doesn't mirror / opens as new chat" persisted even after all localStorage handoff/sync fixes were correct in isolation.

**How to apply:** Any state that must mirror between the preview iframe and a separate tab has to round-trip through the server; localStorage is only a same-partition cache/fast path. Durable rules: the full-screen page hydrates from the server FIRST (never local-first — stale local data can falsely satisfy a chat-restore URL), clients must refuse snapshots older than one already seen, and fire-and-forget saves need a per-source mutation sequence so a delayed request can't overwrite a newer snapshot. Server-held shared state is process-global and unauthenticated — fine for the single-user prototype only.
