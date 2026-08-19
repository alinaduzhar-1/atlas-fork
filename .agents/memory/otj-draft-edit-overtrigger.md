---
name: OTJ draft-edit over-trigger
description: Why general questions got answered with "Done — I've updated that draft" and doubled latency
---
Two compounding causes made Atlas misfire draft edits on general questions (e.g. "what else can you do OTJ related?"):

1. **Prompt bias**: the drafts section told the model any reply was "almost certainly" supplying the missing field of the single incomplete draft. Fixed by adding an explicit "FIRST decide if it's a question → answer normally, no block" gate in both the drafts section and the single-incomplete-draft clause.
2. **Retry hammer false positive**: the server's SYSTEM CHECK retry fired whenever the reply contained any of updat/chang/edit + "draft" — so a capability answer like "I can update your drafts" got force-retried into emitting a real `otj-draft-edit` block (wrong edit applied + double LLM call = 2x latency). Fixed by requiring past-tense completed-claim phrasing (e.g. "I've updated", "updated that draft").

**Why:** loose keyword heuristics over model output turn legitimate conversational replies into forced side-effects.
**How to apply:** any output-sniffing guard that triggers a corrective retry must match claims of *completed* action, not mere topic keywords.
