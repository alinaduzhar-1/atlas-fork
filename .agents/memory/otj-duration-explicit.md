---
name: OTJ duration must be explicit
description: Atlas must ask for duration before drafting an OTJ entry; never infer from activity type.
---
Rule: the OTJ logging prompt forbids inferring DURATION from the activity type (a "1:1", "workshop" or "call" has no default length). If the user hasn't stated how long, Atlas asks one clarifying question and must NOT emit an `otj-log` block yet.

**Why:** the model assumed a default length for "1:1 with coach today" and showed a draft card without asking; user required duration to be asked first.

**How to apply:** keep the explicit "never infer duration" rule + the duration-missing example in the OTJ section of the chat system prompt in server routes; if drafts appear with unstated durations again, strengthen there.
