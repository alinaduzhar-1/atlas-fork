---
name: OTJ query freshness
description: Why OTJ progress data polls instead of using the app's global cache-forever query defaults
---

The app's React Query client defaults to `staleTime: Infinity` with all refetching off — data loads once per browsing context and never refreshes. Any view open in a second context (canvas iframe, standalone Atlas tab, webview vs preview) therefore never saw OTJ time logged elsewhere.

**Why:** User requirement: OTJ progress must update everywhere each time time is logged, and the demo is often viewed in multiple contexts at once.

**How to apply:** The `/api/otj` query has per-key defaults (staleTime 0, 5s refetchInterval, refetch on focus) set in the query client module. Any new "live" data (e.g. notifications, session status) needs its own `setQueryDefaults` override — don't rely on invalidation alone reaching other tabs/iframes. Also remember the in-memory store resets on server restart, so logged time vanishing after a restart is expected, not a bug.

**Reset-on-reload race:** On page load App fires POST `/api/otj/reset-session` to restore the pristine demo baseline (16h due). Because OTJ views mount and issue their own `GET /api/otj` in parallel, that GET can resolve just after the reset's `setQueryData` and overwrite the fresh baseline with the pre-reset (elevated) logged total — reading as "logged time didn't reset on reload." Fix/keep: after the reset response, `await queryClient.cancelQueries(['/api/otj'])` BEFORE `setQueryData` + invalidate, so no in-flight stale GET can clobber the baseline.
