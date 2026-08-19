---
name: Log OTJ conversational confirm
description: How the Log OTJ (after-mode) draft card is confirmed — by chat reply, not a button
---

# Log OTJ conversational confirm

The Log OTJ prototype's draft card (lavender entry cards, no heading) has **no confirm button**. A guidance paragraph under the card tells Sarah to "simply reply" to log it. The `otj_log` action data is `{ entries: [...] }` (multi-entry: model emits one fenced `otj-log` block per activity; server parses all). The "Total:" footer row renders only when there is more than one entry; confirmation POSTs each entry in turn and the success card shows the combined total.

**Decision: two-tier confirmation — client regex fast-path, plus server-side model fallback.**
Exact-match affirmatives (regex) are intercepted client-side for instant logging. Anything else is sent to the chat endpoint WITH the pending draft entries (`pendingOtjEntries`); the system prompt tells the model to answer with a bare `[[OTJ_CONFIRMED]]` marker if the reply is a confirmation in any phrasing, and the SERVER then logs the entries itself and returns the `otj_logged` action + summary. **Why:** regex alone missed phrasings like "yes please log them both" — the model would then falsely claim success in plain text with nothing logged.

**Original decision: affirmative replies are intercepted client-side, not sent to the model.**
**Why:** The Figma design removed the button and made confirmation conversational; the model can't reliably perform the side-effect itself, and the draft data already lives in the pending message's action payload.
**How to apply:** In the chat send handler, if the LAST message is an atlas message with an unlogged `otj_log` action and the user's text matches the affirmative regex (`AFFIRMATIVE_REPLY_RE`), the client POSTs `/api/otj` directly from the action data, marks the message id logged (which hides the guidance paragraph), and appends a new assistant message with an `otj_logged` action that renders the green success card + weekly total + follow-up links. Non-affirmative replies flow to the model as usual (it may emit a fresh `otj-log` block, which becomes the new pending draft).

Note: the system prompt already makes the model ask "Before I draft this, can you confirm…?" BEFORE emitting the block — so the "Yes" that triggers the block emission is a different turn from the "Yes" that confirms logging.

**Deletion follows the same conversational confirm pattern.** A delete request never removes anything immediately: the model emits `otj-delete` (id only), the server looks up the full entry and returns an `otj_delete_confirm` action, the client shows the entry as a card with reply-to-confirm guidance, and only an affirmative reply (same regex fast-path) performs the real DELETE and appends the `otj_deleted` success message. The prompt also forbids guessing the closest entry when nothing matches — the model must say it couldn't find it.

**`AFFIRMATIVE_REPLY_RE` must include imperative "log" phrasings, not just "yes"-style words.** Users reviewing drafts naturally type "log time", "log them", "log", "log all" etc. — these are confirmations, not new logging requests. They MUST be in the regex (anchored `^…$` so "log 2 hours yesterday" with new details still falls through to the model as a fresh `otj-log`). **Why:** without them the reply hits the model, which reads "log time" as a brand-new logging intent and deflects with "Happy to help! What was the task you'd like to log?" instead of confirming the complete drafts. When complete drafts are confirmed this way, the client logs them, then `RemainingDraftsPanel` (via `otj_partial` action) prompts for any still-incomplete drafts — "log complete now, ask for missing details after" is the intended UX.
