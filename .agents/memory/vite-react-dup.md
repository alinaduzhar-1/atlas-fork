---
name: Vite duplicate-React invalid hook call
description: When adding a new client dep triggers "Invalid hook call / Cannot read properties of null (reading 'useState')"
---

After installing a new client-side dependency (e.g. react-syntax-highlighter), Vite re-optimizes its deps bundle mid-session. The stale optimized-deps cache can pull in a second copy of React, producing a runtime crash: "Invalid hook call" + "Cannot read properties of null (reading 'useState')" pointing at a component in a Vite-served chunk.

**Why:** It looks like a hook-rules violation but the hooks are fine — it's a duplicate React instance from a stale `node_modules/.vite` cache.

**How to apply:** Before hunting for conditional hooks, rule this out: `rm -rf node_modules/.vite` then restart the `Start application` workflow so Vite re-optimizes cleanly and every module resolves one React.
