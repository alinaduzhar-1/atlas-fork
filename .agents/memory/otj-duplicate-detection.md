---
name: OTJ duplicate logging detection
description: How Atlas blocks logging an OTJ entry that exactly matches one already logged, and why the check is server-deterministic not prompt-based.
---

When a learner asks Atlas to log an OTJ entry that EXACTLY matches an
already-logged (confirmed) entry — same task (case-insensitive), same ISO date,
and same total duration (hours*60+minutes) — Atlas must NOT create a duplicate;
it warns conversationally ("You've already logged … so I haven't added it again")
and invites her to share different details if it was a separate session.

**Decision: the duplicate check is a DETERMINISTIC server guard at otj-log
parse time, not a system-prompt instruction.**
**Why:** A prompt instruction ("don't draft if it matches an already-logged
entry") caused the model to over-trigger — it flagged NON-duplicates as
duplicates (e.g. same task+duration but a DIFFERENT date) and refused to draft,
ignoring the date difference. The model's fuzzy matching is unreliable for an
exact-match rule.
**How to apply:** After parsing the `otj-log` block(s) in the chat handler,
fetch confirmed entries from storage and split parsed entries into
`duplicateEntries` (exact task+date+duration match) and `freshEntries`. Draft
only the fresh ones; if any are duplicates, prepend/replace the message with the
"already logged" warning; if ALL are duplicates, emit no `otj_log` action at all.
The system prompt should tell the model to ALWAYS draft what she asks and NOT
self-check duplicates (the platform handles it) — otherwise the model second-
guesses and produces false positives. Nothing is persisted until the learner
confirms a draft, so suppressing the draft fully prevents the duplicate.
