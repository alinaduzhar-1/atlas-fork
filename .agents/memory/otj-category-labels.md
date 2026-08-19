---
name: OTJ display category labels
description: How the 11 official Multiverse OTJ category labels are shown and edited on cards
---

The 11 official OTJ display categories (e.g. "Apprenticeship-related learning", "Workshop, bootcamp, or delivery or learning session") are separate from the 6 internal category values.

**Rule:** Card category text = stored `categoryLabel` IF it exactly matches one of the 11 official labels (case-insensitive); otherwise fall back to the client task-text regex matcher, then internal-category fallback.

**Why:** The label was originally derived purely from task wording, so Atlas category edits changed stored data but the card never updated — user saw "Atlas didn't update the category".

**How to apply:** Atlas edits categories via an optional `categoryLabel` field in `otj-draft-edit` / `otj-edit` blocks, validated server-side against the 11 labels and persisted through subsequent edits (update paths must copy `categoryLabel` forward like other fields). The official label list exists in both server routes and client atlas component — keep them in sync.
