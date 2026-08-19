---
name: Atlas Fast Refresh / stale bundle
description: Why edits to atlas.tsx sometimes seemed to have no effect, and the module boundaries that keep HMR working
---

# Atlas Fast Refresh must stay clean or edits silently don't apply

When a fix to `client/src/components/atlas.tsx` appears to "do nothing" (user reports the same stale UI after several attempts), suspect a broken Fast Refresh / stale bundle BEFORE assuming the code is wrong. The symptom in the browser console is `[vite] invalidate ... Could not Fast Refresh ("X" export is incompatible)` and/or `Failed to reload ... Reloading page`. When Fast Refresh fails, Vite falls back to a full page reload — which wipes the Atlas chat state and, if the reload itself fails, leaves the tab on old code.

**Two root causes, both fixed by keeping module boundaries clean:**

1. **Non-component value exports in a component file.** React Fast Refresh only works if a `.tsx` file exports *only* React components (types/interfaces are fine — they're erased). `atlas.tsx` used to `export const unitContentGuidance` and `export const ATLAS_CONVERSATION_STORAGE_KEY`; those are now in `client/src/components/atlas-constants.ts`. Keep plain value constants out of `atlas.tsx`.

2. **Circular import.** `atlas.tsx` imported `useAtlasVersion` from `navigation.tsx`, and `navigation.tsx` imported `AtlasSidebar` from `atlas.tsx` — a 2-way cycle that breaks Fast Refresh. The context now lives in `client/src/components/atlas-version-context.tsx` (holds `AtlasVersionProvider`, `useAtlasVersion`, and the `AtlasVersion/AtlasMode/PrototypeMode/PrototypeTab` types). Every consumer imports the hook/provider from there, NOT from `navigation`.

**Why:** a hidden stale bundle burned multiple turns chasing a "card shows 45 not 30" bug whose fix was actually correct — the tab just never loaded it.

**How to apply:** never add a non-component `export const/function` (data, regex, helpers) to `atlas.tsx`; put it in `atlas-constants.ts` or another plain module. Never import from `navigation` into `atlas`. After editing `atlas.tsx`, confirm the console shows `hot updated` (not `invalidate ... incompatible`); if a fix seems ineffective, have the user hard-refresh.
