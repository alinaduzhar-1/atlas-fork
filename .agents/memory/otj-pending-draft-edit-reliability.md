---
name: Editing an AI-generated pending OTJ draft (otj_log preview) reliably
description: Why editing an on-screen otj_log draft was fragile and the two-part deterministic + prompt fix
---

# Editing an AI-generated pending OTJ draft

There are TWO different draft-edit paths and they behave very differently:
- **Seed / stored drafts** (have a storage id) → edited deterministically via the `otj-draft-edit` block → `updateOtjEntry(id)` → returns `otj_drafts` + `editedEntries`. Reliable BY id, but still depends on the model emitting the block — see "stored-draft prose-only failure" below.
- **AI-generated draft previews** (the `otj_log` card shown from a "log my week" style message) are **ephemeral — never persisted, no id.** The only way to change them is for the model to RE-EMIT the corrected `otj-log` block(s). The client sends the current draft back as `pendingOtjEntries`.

**The bug:** relying on the model to re-emit ALL entries on every edit is non-deterministic. Observed failure modes when editing one of two entries ("1:1 was 30 min"):
1. Model emits only the CHANGED entry → the other entry silently dropped.
2. Model emits NO `otj-log` block, just prose ("Got it, here's the updated entry…") → server returns `action: undefined` → the revised-draft message renders with **no card** (the reported "empty revised draft"). The original card stays visible with old values, so the edit appears to do nothing.
3. Model emits both but with garbled/duplicated prose.

**Fix (two parts, both needed):**
1. **Deterministic merge safety net** in the `otj-log` parse path (server): when `pendingEntries.length > 0` AND the model emitted FEWER blocks than pending, merge the emitted (edited) entries over the full pending base, matching by normalised task name; unmatched emitted entries are appended, all untouched pending entries preserved. This fully fixes mode 1.
2. **Strengthen the PENDING-DRAFT prompt rule** with an explicit worked two-entry example and hard rules: re-emit the WHOLE draft, one block per entry including unchanged ones, same block count as entries, NEVER describe the change in prose only. This makes mode 2/3 rare.

**Why the merge can't fix mode 2:** with zero blocks there is no value to parse, so it's irrecoverable server-side — only the prompt reduces its frequency. After the fix, reliability went from ~1/3 to ~17/18 across duration/date/other-entry edits.

**How to apply / gotchas:**
- The client sends `workingHoursConfirmed: true` and `pendingOtjEntries` whenever a pending `otj_log` exists, even for a non-affirmative edit reply — the edit still routes to the server (affirmative fast-path is skipped for non-"yes" text).
- Keep the merge BEFORE the duplicate-detection block so merged entries flow through dedup/freshEntries normally.
- If you ever make AI draft previews persistent (give them ids), edits could route through the reliable `otj-draft-edit` path and this whole fragility disappears — but that's a larger change touching confirm/reset/dedup.

## Stored-draft prose-only failure (second consecutive edit)
Because outgoing chat history has all fenced blocks STRIPPED, on a 2nd+ consecutive draft edit the model sees its own earlier reply as a bare "Done — I've updated that draft for you." and imitates it — replying prose-only with NO `otj-draft-edit` block. Server then updates nothing and returns no action → user sees the claim but no card and no change.

**Fix (both parts, in server chat route):**
1. Prompt rule in the draft-edit section: history blocks are stripped; every edit (2nd, 3rd, …) MUST re-emit a fresh block; a claim without a block updates nothing.
2. Deterministic retry guard before the `otj-draft-edit` parse: if content has NO otj-* block but claims a draft update (update/change/amend/fix wording + "draft", no [[OTJ_ markers), re-call the model once appending the bad reply plus a SYSTEM CHECK user message demanding the block; if the retry contains a block, replace content and let normal parsing proceed.

**Why:** any pattern where the model must repeat a structured emission across turns will regress once its stripped history shows a precedent without it — guard server-side, don't trust the prompt alone.
