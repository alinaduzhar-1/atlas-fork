---
name: Task merges can revert concurrent main-branch edits
description: After a project-task merge, re-verify recent main-agent edits to the same files
---

**Rule:** When a task agent's merge lands (e.g. mockup-sync or test tasks touching `client/src/components/atlas.tsx` / `navigation.tsx`), it can silently revert edits the main agent made to those same files after the task branched.

**Why:** A merged task reverted the Ask Atlas border split, WCAG disabled-state colors, and padding fixes in `UnifiedAtlasControl`; the user noticed the regression ("we changed it - I want it as it was").

**How to apply:** After any task merge notification touching files you recently edited, grep for your recent changes (distinctive values like hex colors work well) and reapply anything clobbered before continuing.
