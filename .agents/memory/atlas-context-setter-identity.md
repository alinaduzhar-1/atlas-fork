---
name: Atlas context setter identity
description: Unstable context setter identities silently undo programmatic sidebar state changes
---

Functions exposed by the Atlas version context (setAtlasVisible, toggleAtlas, lockAtlasClosed) must be wrapped in useCallback with stable deps.

**Why:** NavigationLayout has a "force sidebar open in after-mode" effect that lists `setAtlasVisible` in its deps. When the setter was recreated every provider render, any programmatic collapse re-rendered the provider → new setter identity → effect re-ran → sidebar instantly reopened. The symptom is "my state change does nothing", which looks like stale HMR but isn't.

**How to apply:** Any new function added to AtlasVersionContext must be useCallback-stable; any consumer effect that auto-opens the sidebar should only depend on values that genuinely signal "reopen" (route/mode changes), never on function identities.
