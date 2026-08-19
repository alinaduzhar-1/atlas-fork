---
name: Atlas logged-entry editability depends on prompt list inclusion
description: Why Atlas says a logged OTJ entry "isn't listed" and offers to create a new one instead of editing it
---

Atlas can only edit a LOGGED (confirmed) OTJ entry if that entry is included in the "LOGGED OTJ ENTRIES" JSON list injected into its system prompt (server/routes.ts, /api/atlas/chat). If an entry is absent from that list, the model believes it does not exist, refuses to edit, and offers to create a brand-new entry.

**Why:** The list was capped (`.slice(0, N)`) and sorted by `createdAt`. Seeded entries (seed-1..seed-15) all share near-identical early `createdAt` timestamps, so once confirmed the oldest seeds fell outside the cap and became invisible/uneditable — even though `storage.updateOtjEntry(id, ...)` can update ANY entry by id regardless of status. The user requirement is "all entries should be editable."

**How to apply:** Keep the logged-entries prompt list large enough to include every confirmable seed (cap raised well above the seed count) and sort by activity `date` desc (fall back to `createdAt`) so the most relevant entries surface first if truncation ever happens. If you add more seeds or a real dataset, re-check this cap. Editing a logged entry uses the `otj-edit` fenced block → `otj_edited` action; drafts use `otj-draft-edit` → `otj_drafts`. Mixed states (some seeds confirmed, siblings still drafts) can make the model pick the wrong sibling — the normal flow (all drafts confirmed before editing) is reliable.
