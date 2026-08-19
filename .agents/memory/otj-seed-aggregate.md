---
name: OTJ seeded entries vs aggregate totals
description: Which OTJ entries move the progress/summary totals and why confirmed drafts are the exception.
---

Seeded OTJ entries (`OTJ_SEED_ENTRIES` in `server/storage.ts`) are display-only
for the "All entries" table and do NOT change the aggregate baseline (baseline +
user-logged entries). The one exception: when a learner **confirms a seeded
draft**, its minutes DO move the totals.

**Why:** A draft represents not-yet-logged time; confirming it means "this is now
logged," so it must count toward weekly/total logged hours and drop the draft
count — otherwise the progress bar wouldn't react to confirming a draft.

**How to apply:** Confirming a draft goes through `confirmOtjEntry`. For a seeded
entry it flips status to confirmed AND adds its minutes to a `confirmedSeedMinutes`
accumulator, which `buildSummary` adds to both total and weekly logged minutes.
Guard against double counting (user entries are already summed; only seeded
drafts feed the accumulator). Incomplete drafts (missing duration/description)
are gated in the UI and should never be confirmed.

**Deleting entries (via Atlas `otj-delete` block → `deleteOtjEntry`):** there are
THREE kinds of confirmed minutes and each must be undone differently, so track a
`sessionConfirmedSeedIds` set (populated by `confirmOtjEntry`) and keep the
baselines as INSTANCE fields (`baselineTotalMinutes` / `baselineWeeklyMinutes`),
not constants:
- user-logged entry → just drop it from `userEntries` (it was in `loggedFromEntries`).
- seed the learner confirmed THIS session (`sessionConfirmedSeedIds.has(id)`) →
  subtract from `confirmedSeedMinutes`.
- seed that started life `confirmed` (baseline history) → its minutes were baked
  into the 62hr baseline constant, NOT `confirmedSeedMinutes`, so subtract from
  `baselineTotalMinutes` instead. Do NOT touch weekly (historical seeds predate
  the current week).
**Why:** the old naive delete subtracted every confirmed seed from
`confirmedSeedMinutes`, which corrupted the total (baseline seeds were never in
that accumulator). `updateOtjEntry` on a seed must use the same
`sessionConfirmedSeedIds` guard, not `status === 'confirmed'`, for the same reason.
Both reset paths must clear the set and restore the baseline instance fields.
