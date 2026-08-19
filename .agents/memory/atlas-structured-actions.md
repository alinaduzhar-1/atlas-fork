---
name: Atlas structured agentic actions
description: How Atlas "After" mode triggers real UI/side-effects (e.g. OTJ logging) via a model-emitted fenced block parsed into an action.
---

# Atlas structured actions pattern

When Atlas needs to do more than chat (e.g. log off-the-job time), the flow is:

1. **System prompt (After only)** instructs the model to emit a fenced code block with a
   custom tag (e.g. ` ```otj-log `) containing a single JSON object, plus one short
   sentence before it and nothing after. Today's date is injected into the prompt so the
   model can resolve relative dates ("Tuesday", "yesterday").
2. **Backend** (`/api/atlas/chat`) regex-matches the block, JSON-parses it, validates/normalises
   fields, strips the block from `content`, and returns `{ content, action: { type, data } }`.
   Only do this when `prototypeMode !== 'before'`.
3. **Frontend** attaches `data.action` onto the `ChatMessage`; the After render branch shows a
   dedicated card component (`OtjLogCard`) once `!message.isStreaming`. The card does the real
   side-effect (POST) on confirm and invalidates the relevant React Query key.

**Why:** keeps the "agent does things" demo reliable without full function-calling, and keeps a
single source of truth on the server.

**How to apply:** to add a new action, pick a new fenced tag, add prompt instructions + a backend
parser branch returning a new `action.type`, add the type to `MessageAction`, and render a new
card. Source of truth for shared data lives in `MemStorage` + `/api/...` endpoints, and pages read
it via `useQuery(['/api/...'])` so confirmed actions reflect everywhere after `invalidateQueries`.

**Marker variant:** for pure "render this existing card" requests with no payload (e.g. "show me my
drafts", confirmations), a plain inline marker like `[[OTJ_SHOW_DRAFTS]]` / `[[OTJ_CONFIRMED]]` is
simpler than a fenced JSON block — server detects it, strips it from content, and returns the
existing action type so the same card component renders. Dev server does NOT reliably hot-reload
server files — restart the workflow before curl-verifying prompt/parser changes.
