import type { Express, Request, Response } from "express";
import "express-session";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOtjEntrySchema, insertAtlasFeedbackSchema, OTJ_CATEGORIES } from "@shared/schema";
import fs from "fs";
import path from "path";

const OTJ_DISPLAY_CATEGORIES = [
  "Applying apprenticeship learning to work",
  "Training at your work",
  "Apprenticeship assignment or project",
  "Communicating with my coach",
  "Cohort collaboration",
  "Exam revision or assessment work",
  "Multiverse Community",
  "Workshop, bootcamp, or delivery or learning session",
  "Portfolio work",
  "Apprenticeship-related learning",
  "Module learning or revision",
] as const;

function normaliseDisplayCategory(value: unknown): string | undefined {
  const text = String(value || "").trim().toLowerCase();
  if (!text) return undefined;
  return OTJ_DISPLAY_CATEGORIES.find((c) => c.toLowerCase() === text);
}

/*
 * Required, with no default: the endpoint is deployment-specific and belongs in
 * the environment, not in source. Failing fast here matches how SESSION_SECRET
 * is handled in server/index.ts. See AI-PROXY-SETUP.md for the expected value.
 */
const AZURE_OPENAI_ENDPOINT = process.env.OPENAI_API_BASE_URL;
if (!AZURE_OPENAI_ENDPOINT) {
  throw new Error("OPENAI_API_BASE_URL environment variable is required");
}
const AZURE_OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const AZURE_DEPLOYMENT_NAME = "gpt4o-2024-11-20";
const AZURE_API_VERSION = "2024-02-15-preview";

const ATLAS_SYSTEM_PROMPT_BEFORE = `You are Atlas, a basic AI chatbot on the Multiverse learning platform. You are a simple, generic assistant with NO access to any learner data whatsoever.

You can help with:
- General knowledge questions about topics like data, technology, and business
- Generic study tips and learning strategies
- Basic definitions and explanations of concepts

CRITICAL LIMITATIONS (you must follow these strictly):
- You have NO access to the learner's progress, grades, deadlines, submissions, or programme status.
- You have NO access to their curriculum, units, projects, or schedule.
- You have NO knowledge of their off-the-job hours, coaching sessions, or portfolio.
- You CANNOT see what page they are on or what they are working on.
- If asked about their personal progress, deadlines, programme status, how far behind they are, what they need to do next, or anything specific to their learning journey, you MUST politely deflect. Say something like: "I don't have access to your specific progress data. You may want to check with your coach or look at your programme dashboard for that information."
- Never make up or guess any personal data about the learner.

Keep responses brief and helpful for general questions, but always be honest about your limitations when asked personal/progress questions.`;

const ATLAS_SYSTEM_PROMPT_AFTER = `You are Atlas, an intelligent AI learning assistant for Multiverse apprenticeship programs. You have FULL ACCESS to this learner's data via the MCP (Model Context Protocol) layer. You are not a generic chatbot — you are a personalised learning partner.

## CURRENT LEARNER PROFILE
- **Name:** Sarah
- **Age:** 35
- **Role:** Data Analyst at a mid-size company
- **Programme:** DIBD (Data, Intelligence, Business & Digital)
- **Duration:** 3 months into a 15-month programme
- **Coach:** Marcus Thompson (next coaching session: 2 weeks)

## PROGRAMME STATUS & PROGRESS
- **Overall progress:** 22% complete (slightly behind expected 27%)
- **Current unit:** Unit 3 — "Data-Driven Decision Making"
- **Units completed:** Unit 1 (Foundations of Data), Unit 2 (Business Context & Stakeholders)
- **Units remaining:** Units 4-8

## OFF-THE-JOB (OTJ) TRAINING
- **Required:** 6 hours per week (total required to date: 78 hours)
- **Logged:** 62 hours
- **Behind by:** 16 hours
- **Last OTJ logged:** 3 weeks ago
- **Risk level:** AMBER — if not addressed in the next 2 weeks, will escalate to RED

### How OTJ time gets logged (automatic vs manual)
If Sarah asks what's logged automatically vs what she needs to log herself, respond using EXACTLY this structure, wording and tone (use bold headings, keep the bullet list, and keep the closing line):

**Logged automatically**

Live delivery sessions—such as workshops, taught sessions, and webinars on the Multiverse platform—are logged automatically. You don't need to do anything.

**Ready for your review**

Learning units work a little differently. When you complete a unit, I'll prepare a draft of the associated Off-the-Job time for you. Just review it, make any changes if needed, and confirm it for me to log.

**You'll need to log these yourself**

Everything else should be logged manually, including:

- Independent study (for example, reviewing materials or watching relevant videos)
- Shadowing colleagues or observing tasks
- Practising tools and techniques (such as data modelling or cleaning datasets)
- Mentoring or being mentored
- Work-based projects related to your programme
- Reading or research that supports your apprenticeship

Let me know if you'd like me to help log time, or if you'd like tips to stay on top of tracking it as you go!

## PROJECTS
- **Project 1:** "Stakeholder Data Report" — Submitted, passed (Merit)
- **Project 2:** Due in 2 weeks — NOT STARTED. Topic: must demonstrate KSBs K3 (data analysis methodologies), S3 (apply data analysis tools), B2 (professional communication)
- **Project ideas suited to her role:** Data quality audit for her team, automated reporting dashboard, customer segmentation analysis

## KSBs (Knowledge, Skills, Behaviours) STATUS
- **Achieved:** K1, K2, S1, S2, B1
- **In progress:** K3, S3, B2 (tied to Project 2)
- **Not started:** K4, K5, S4, S5, B3, B4

## KEY DATES
- **Project 2 deadline:** 2 weeks from today
- **Next progress review:** 3 weeks from today
- **Next coaching session:** 2 weeks from today
- **Programme end date:** 12 months from today

## YOUR CAPABILITIES
1. **Progress Awareness** - You can see exactly where Sarah is, what's overdue, and what's at risk.
2. **Personalised Guidance** - Tailor advice to her role (data analyst), her company context, and her specific KSB gaps.
3. **Project Scoping** - Suggest project ideas that align with her remaining KSBs AND her actual job responsibilities.
4. **Catch-up Planning** - Create specific, actionable plans to get back on track with OTJs and deadlines.
5. **Concept Teaching** - When Sarah needs to learn something for her project, teach it using Socratic questioning — ask her questions, check understanding, adapt explanations.
6. **Deadline Awareness** - Proactively reference upcoming deadlines and risk signals in your responses.

## RESPONSE STYLE
- Be warm, direct, and action-oriented. Sarah is busy and needs clear next steps.
- Use markdown formatting: headers, bullet points, bold for emphasis.
- When discussing progress, always give SPECIFIC numbers and dates.
- When suggesting projects, tie them to her ACTUAL role and remaining KSBs.
- Don't just answer questions — anticipate what she needs next.
- For complex tasks (project scoping, catch-up planning), think step-by-step and show your reasoning.

## LOGGING OFF-THE-JOB (OTJ) TIME — SPECIAL ACTION
You can help Sarah log her off-the-job training time directly in the platform (e.g. "log 2 hours of mentoring for Tuesday", "add 45 minutes of study yesterday", "record this morning's coaching session").

To create an entry you MUST have ALL THREE of these details from her. NEVER invent, assume, or guess them:
1. TASK — what she actually did (the specific off-the-job activity).
2. DATE — when she did it.
3. DURATION — how long she spent (hours and/or minutes). The duration must come EXPLICITLY from her words. NEVER infer it from the type of activity — a "1:1 with my coach", a "workshop" or a "call" has NO default length. If she has not stated how long it took, the duration is missing and you must ask.

If ANY of these three are missing from the conversation so far, do NOT emit an entry. Instead ask ONE short, friendly clarifying question for the FIRST missing detail, following this order: TASK first, then DATE, then DURATION. Ask for only one missing detail at a time, then wait for her reply. Keep asking, one question at a time, until you have all three. Do not emit the code block until task, date and duration are all known.

You must INFER the "category" yourself from the task she describes — do NOT ask her to pick a category. Choose the single best fit from exactly these values: ${OTJ_CATEGORIES.join(", ")}.

Once you have TASK, DATE and DURATION, emit one fenced code block tagged \`otj-log\` PER ACTIVITY. Do NOT ask her whether she completed the task during working hours — the platform shows guidance alongside the draft explaining that by replying to confirm, she is also confirming the time was completed during her working hours. If she described several distinct activities (e.g. "log 2 hours of study on Monday and 1 hour of mentoring yesterday"), emit one \`otj-log\` block for each, back to back. Each block contains a single JSON object with exactly these fields:
- "task": a short descriptive title for what she did.
- "category": the category you inferred, one of exactly these values: ${OTJ_CATEGORIES.join(", ")}.
- "date": the calendar date in ISO format (YYYY-MM-DD). Resolve relative references like "today", "yesterday", "Tuesday", "this morning" to an actual date relative to TODAY'S DATE given below. For a weekday name, use the most recent past occurrence of that weekday (or today if it matches).
- "hours": whole number of hours (integer, 0 if none).
- "minutes": whole number of minutes (integer 0-59, 0 if none).

Before the code block(s), write a short friendly confirmation (1-2 sentences) that OPENS with a brief upbeat interjection (e.g. "Nice!", "Great!", "Love it —"), then tells her this activity qualifies as off-the-job training and WHY it qualifies (e.g. it develops new skills relevant to her apprenticeship, it's structured learning away from her normal duties), THEN says you've drafted the entry (or entries) for her to review. Keep the "why" specific to what she described — not a generic definition. Do NOT write anything after or between the code blocks. Do NOT tell her it is already logged — she will review the draft and reply to confirm, and the platform logs it for her. Always draft what she asks for — the platform automatically detects and blocks exact duplicates of already-logged entries, so you do not need to check for duplicates yourself.

Example when a detail is missing (she said "log some study time" — no date or duration yet):
Happy to log that! Which day did you do this?

Example when only the duration is missing (she said "log a 1:1 with my coach today" — task and date known, duration NOT stated):
Nice one — how long was your 1:1 with your coach?
(Do NOT emit an \`otj-log\` block yet. Wait for her to give the duration.)

Example when you have everything:
Nice! Mentoring counts as off-the-job training since you're developing coaching skills beyond your day-to-day role. Here's a draft of your Off-the-Job time:
\`\`\`otj-log
{"task": "Mentoring session", "category": "mentoring", "date": "2026-06-30", "hours": 2, "minutes": 0}
\`\`\`

## EDITING ALREADY-LOGGED OTJ TIME — SPECIAL ACTION
Sarah can also ask you to change time that has ALREADY been logged (e.g. "actually that was 2 hours, not 1", "edit that entry to Tuesday", "change the SQL practice to 45 minutes"). Her logged entries, each with its "id", are listed under LOGGED OTJ ENTRIES below.

Rules for edits:
- Work out which logged entry she means from the list. If it is genuinely ambiguous which entry she's referring to, ask ONE short clarifying question instead of guessing.
- Never invent the new values — they must come from her message. If she says to edit an entry but doesn't say what should change, ask what she'd like to change.
- When you know the entry AND the new values, emit one fenced code block tagged \`otj-edit\` per entry being changed. Each block contains a single JSON object with exactly these fields, copying any UNCHANGED values from the entry as-is:
- "id": the id of the entry from the LOGGED OTJ ENTRIES list (never invent one).
- "task", "category", "date" (ISO YYYY-MM-DD), "hours", "minutes": the complete corrected entry, same rules as for \`otj-log\`.
- "categoryLabel" (OPTIONAL): include this ONLY when Sarah says the category is wrong or asks to change it. It must be EXACTLY one of the official Off-the-Job categories: "Applying apprenticeship learning to work", "Training at your work", "Apprenticeship assignment or project", "Communicating with my coach", "Cohort collaboration", "Exam revision or assessment work", "Multiverse Community", "Workshop, bootcamp, or delivery or learning session", "Portfolio work", "Apprenticeship-related learning", "Module learning or revision". Pick the one that best matches what she asked for. A category change alone is a valid edit — apply it and copy every other field unchanged.
- Before the block write ONE short friendly sentence saying you've updated it. Do NOT write anything after the block. The platform applies the change and shows the updated card.
- Only entries in the LOGGED OTJ ENTRIES list can be edited this way. A pending draft shown on screen is NOT logged — for draft changes, re-emit corrected \`otj-log\` blocks instead.

Example:
Done — I've updated that entry for you:
\`\`\`otj-edit
{"id": "abc-123", "task": "SQL practice session", "category": "study", "date": "2026-07-07", "hours": 0, "minutes": 45}
\`\`\`

## FIRST CHECK IF THE TASK ALREADY EXISTS — CRITICAL
Whenever Sarah names a specific task (e.g. "Team lunch & learn", "the SQL practice session"), BEFORE doing anything else check whether that task already appears in the DRAFT OTJ ENTRIES list OR the LOGGED OTJ ENTRIES list below. Match on the task description, not the id — treat close wording as the same task.
- If it matches a DRAFT entry, she wants to change or complete that draft → follow the \`otj-draft-edit\` rules. NEVER offer to create a new entry.
- If it matches a LOGGED entry, she wants to change that logged entry → follow the \`otj-edit\` rules.
- Only when the task matches NEITHER list should you treat it as brand-new time to log with \`otj-log\`.
- NEVER tell her a task "isn't listed", "isn't logged", or that it "might still be in draft form", and NEVER ask whether she wants to create a new/separate entry, when that task already appears as a draft or a logged entry. She can update drafts and logged time alike — just apply the change to the existing entry. Do not make her re-supply details the entry already has.`;

export async function registerRoutes(app: Express): Promise<Server> {
  // Shared Atlas chat state, mirrored between the sidebar panel and the
  // full-screen Atlas page. localStorage can't be used across the embedded
  // preview iframe and a separate tab (browser storage partitioning), so the
  // server holds the latest snapshot in memory.
  // Snapshots are keyed by session ID so each user (session) only ever sees
  // their own chats. Requests without a valid session are rejected.
  interface AtlasSharedSnapshot {
    state: unknown;
    version: number;
    sourceId: string;
    updatedAt: number;
  }
  const atlasSharedStates = new Map<string, AtlasSharedSnapshot>();
  const ATLAS_SNAPSHOT_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 1 week
  const pruneAtlasSnapshots = () => {
    const cutoff = Date.now() - ATLAS_SNAPSHOT_TTL_MS;
    atlasSharedStates.forEach((snap, key) => {
      if (snap.updatedAt < cutoff) atlasSharedStates.delete(key);
    });
  };

  // Persisted to disk so snapshots survive server restarts (deploys, crashes,
  // workflow restarts). Held in memory for fast reads and written through to a
  // JSON file on every update.
  const ATLAS_SHARED_STATE_FILE = path.join(process.cwd(), ".data", "atlas-shared-state.json");

  // Highest mutation sequence seen per client source, so a delayed/reordered
  // PUT from the same tab can never overwrite a newer snapshot it already sent.
  const atlasSharedSeqBySource: Record<string, number> = {};

  // Full shared-state contract (mirrors SharedAtlasState in
  // client/src/lib/atlas-sync.ts): chats is an array of chat metadata objects
  // and messages maps chat ids to arrays of well-formed messages.
  const isValidSharedChatMeta = (c: unknown): boolean => {
    const chat = c as { id?: unknown; name?: unknown; timestamp?: unknown } | null;
    return (
      !!chat &&
      typeof chat === "object" &&
      typeof chat.id === "string" &&
      typeof chat.name === "string" &&
      typeof chat.timestamp === "string"
    );
  };
  const isValidSharedMessage = (m: unknown): boolean => {
    const msg = m as { id?: unknown; type?: unknown; content?: unknown; timestamp?: unknown } | null;
    return (
      !!msg &&
      typeof msg === "object" &&
      typeof msg.id === "string" &&
      (msg.type === "user" || msg.type === "atlas") &&
      typeof msg.content === "string" &&
      typeof msg.timestamp === "string"
    );
  };
  const isValidSharedAtlasState = (s: unknown): boolean => {
    const state = s as { chats?: unknown; messages?: unknown } | null;
    if (!state || typeof state !== "object") return false;
    if (!Array.isArray(state.chats) || !state.chats.every(isValidSharedChatMeta)) return false;
    if (typeof state.messages !== "object" || state.messages === null || Array.isArray(state.messages)) return false;
    return Object.values(state.messages as Record<string, unknown>).every(
      (msgs) => Array.isArray(msgs) && msgs.every(isValidSharedMessage),
    );
  };

  try {
    const raw = fs.readFileSync(ATLAS_SHARED_STATE_FILE, "utf-8");
    const saved = JSON.parse(raw) as
      | { snapshots?: unknown; seqBySource?: unknown }
      | null;
    if (saved && saved.snapshots && typeof saved.snapshots === "object" && !Array.isArray(saved.snapshots)) {
      for (const [sessionId, snapRaw] of Object.entries(saved.snapshots as Record<string, unknown>)) {
        const snap = snapRaw as
          | { state?: unknown; version?: unknown; sourceId?: unknown; updatedAt?: unknown }
          | null;
        // Only accept snapshots matching the same contract the PUT endpoint
        // enforces; malformed entries are discarded rather than served.
        if (
          snap &&
          typeof snap === "object" &&
          isValidSharedAtlasState(snap.state) &&
          typeof snap.version === "number" &&
          Number.isFinite(snap.version) &&
          snap.version >= 0
        ) {
          atlasSharedStates.set(sessionId, {
            state: snap.state,
            version: Math.floor(snap.version),
            sourceId: typeof snap.sourceId === "string" ? snap.sourceId : "",
            updatedAt:
              typeof snap.updatedAt === "number" && Number.isFinite(snap.updatedAt)
                ? snap.updatedAt
                : Date.now(),
          });
        }
      }
    }
    if (saved && saved.seqBySource && typeof saved.seqBySource === "object" && !Array.isArray(saved.seqBySource)) {
      for (const [src, seq] of Object.entries(saved.seqBySource as Record<string, unknown>)) {
        if (typeof seq === "number" && Number.isFinite(seq)) atlasSharedSeqBySource[src] = seq;
      }
    }
    pruneAtlasSnapshots();
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code !== "ENOENT") {
      console.error("Failed to load persisted Atlas shared state:", err);
    }
  }

  function persistAtlasSharedState() {
    try {
      fs.mkdirSync(path.dirname(ATLAS_SHARED_STATE_FILE), { recursive: true });
      const tmpFile = `${ATLAS_SHARED_STATE_FILE}.tmp`;
      fs.writeFileSync(
        tmpFile,
        JSON.stringify({
          snapshots: Object.fromEntries(atlasSharedStates),
          seqBySource: atlasSharedSeqBySource,
        }),
      );
      fs.renameSync(tmpFile, ATLAS_SHARED_STATE_FILE);
    } catch (err) {
      console.error("Failed to persist Atlas shared state:", err);
    }
  }

  // Default seed: the history always starts with 10 historic chats, each with
  // a full conversation, until real usage overwrites the snapshot.
  const buildDefaultAtlasSharedState = () => {
    const daysAgo = (n: number, hour = 10) => {
      const d = new Date();
      d.setDate(d.getDate() - n);
      d.setHours(hour, 15, 0, 0);
      return d.toISOString();
    };
    const chat = (id: string, name: string, ts: string, question: string, answer: string) => ({
      meta: { id, name, timestamp: ts },
      msgs: [
        { id: `${id}-u1`, type: "user", content: question, timestamp: ts },
        { id: `${id}-a1`, type: "atlas", content: answer, timestamp: ts },
      ],
    });
    const seeds = [
      chat("demo-1", "Help with project submission deadline", daysAgo(0),
        "When is my project submission deadline?",
        "Your current project submission deadline is **Friday, 20th December 2025**. You have 8 days remaining to submit your work.\n\nWould you like me to help you with:\n- Reviewing the submission requirements\n- Creating a timeline to complete remaining tasks\n- Understanding the grading criteria"),
      chat("demo-2", "Understanding KSB requirements", daysAgo(0, 9),
        "Can you explain what KSBs are?",
        "**KSBs** stands for **Knowledge, Skills, and Behaviours** - these are the core competencies you need to demonstrate throughout your apprenticeship.\n\n**Knowledge** - The theoretical understanding you need\n**Skills** - The practical abilities you develop\n**Behaviours** - The professional attitudes and approaches you demonstrate\n\nEach apprenticeship standard defines specific KSBs that you must evidence in your portfolio and during your End-Point Assessment."),
      chat("demo-3", "Off-the-job training questions", daysAgo(1),
        "What counts as off-the-job training?",
        "Off-the-job training is learning that takes place outside of your normal day-to-day work duties. It must:\n\n1. Be directly relevant to your apprenticeship standard\n2. Teach new knowledge, skills and behaviours\n3. Take place during your paid working hours\n\n**Examples include:**\n- Attending workshops or training sessions\n- Online learning and courses\n- Shadowing colleagues in different departments\n- Working on projects specifically for learning\n- Mentoring or coaching sessions"),
      chat("demo-4", "Portfolio evidence guidance", daysAgo(2),
        "What evidence do I need for my portfolio?",
        "Your portfolio should contain evidence that demonstrates your competence across all the KSBs in your apprenticeship standard. Good evidence includes:\n\n- **Work samples** - Documents, presentations, or outputs you've created\n- **Reflective accounts** - Your written reflections on what you learned\n- **Witness statements** - Testimonials from managers or colleagues\n- **Observation records** - Notes from when you were observed completing tasks\n- **Certificates** - Any qualifications or training completed\n\nAim for 2-3 pieces of evidence per KSB, ensuring variety in evidence types."),
      chat("demo-5", "End-point assessment preparation", daysAgo(3),
        "How should I prepare for the End-Point Assessment?",
        "The End-Point Assessment (EPA) is your final assessment to demonstrate occupational competence. Here's how to prepare:\n\n**1. Know your assessment methods**\nReview what assessments you'll face - this could include professional discussions, projects, presentations, or tests.\n\n**2. Review your portfolio**\nEnsure all evidence is complete and well-organised.\n\n**3. Practice explaining your work**\nBe ready to discuss your experiences and learning in detail.\n\n**4. Revise key knowledge areas**\nRefresh your understanding of theoretical concepts.\n\n**5. Mock assessments**\nWork with your coach to practice under exam conditions."),
      chat("demo-6", "Career development advice", daysAgo(7),
        "How can I develop my career after the apprenticeship?",
        "Great to hear you're thinking about your career development! Here are some suggestions:\n\n**1. Map your progression route**\nMany apprentices move into senior analyst or specialist roles - look at where your KSBs transfer.\n\n**2. Build your professional network**\nAttend industry meetups and connect with colleagues in roles you aspire to.\n\n**3. Keep learning**\nConsider follow-on qualifications once you complete your programme.\n\n**4. Talk to your line manager**\nShare your ambitions early so opportunities can be shaped around them."),
      chat("demo-7", "Time management strategies", daysAgo(8),
        "I'm struggling to balance work tasks and apprenticeship study. Any tips?",
        "Balancing both is one of the most common challenges apprentices face. Here's what works well:\n\n**1. Block your OTJ time**\nAgree fixed weekly slots with your manager and treat them like meetings.\n\n**2. Use small pockets of time**\n20-minute focused bursts are great for reflections and portfolio notes.\n\n**3. Plan backwards from deadlines**\nBreak each submission into weekly milestones.\n\n**4. Flag overload early**\nIf work demands squeeze your study time, raise it with your coach before it becomes a gap."),
      chat("demo-8", "Preparing for my coach check-in", daysAgo(9),
        "What should I prepare for my next coach check-in?",
        "Good preparation makes check-ins far more useful. Bring:\n\n- **Progress updates** - What you've completed since last time\n- **Your OTJ log** - Make sure it's up to date\n- **Questions or blockers** - Anything slowing you down\n- **Portfolio drafts** - Evidence you'd like feedback on\n\nIt also helps to jot down one thing that went well and one thing you found difficult - it gives the conversation focus."),
      chat("demo-9", "Understanding functional skills", daysAgo(10),
        "Do I need to complete functional skills qualifications?",
        "It depends on your prior qualifications:\n\n- If you already have **GCSE grade 4/C or above** in English and maths (or equivalent), you're usually exempt.\n- If not, you'll need to achieve **Level 2 Functional Skills** in English and maths before your End-Point Assessment.\n\nYour coach can confirm your status from your initial assessment. If you do need them, start early - they must be passed before gateway."),
      chat("demo-10", "Feedback on my presentation skills", daysAgo(12),
        "How can I improve my presentations for the workplace project?",
        "Strong presentations come from structure and rehearsal:\n\n**1. Start with the headline**\nLead with your key finding or recommendation, then support it.\n\n**2. One idea per slide**\nKeep slides visual; put detail in your speaker notes.\n\n**3. Rehearse out loud**\nThree run-throughs is usually the sweet spot.\n\n**4. Prepare for questions**\nList the five questions you'd least like to be asked and draft answers.\n\nWould you like me to review your slide outline?"),
    ];
    return {
      chats: seeds.map(s => s.meta),
      messages: Object.fromEntries(seeds.map(s => [s.meta.id, s.msgs])),
    };
  };

  const requireSession = (req: Request, res: Response): string | null => {
    const sessionId = req.session?.id;
    if (!sessionId) {
      res.status(401).json({ error: "A valid session is required" });
      return null;
    }
    return sessionId;
  };

  app.get("/api/atlas/shared-state", (req, res) => {
    const sessionId = requireSession(req, res);
    if (!sessionId) return;
    let snap = atlasSharedStates.get(sessionId);
    if (!snap) {
      // First read for this session: seed the default chat history.
      snap = {
        state: buildDefaultAtlasSharedState(),
        version: 1,
        sourceId: "server-seed",
        updatedAt: Date.now(),
      };
      atlasSharedStates.set(sessionId, snap);
      persistAtlasSharedState();
    }
    res.json({ state: snap.state, version: snap.version, sourceId: snap.sourceId });
  });

  app.put("/api/atlas/shared-state", (req, res) => {
    const sessionId = requireSession(req, res);
    if (!sessionId) return;
    const { state, sourceId, seq } = req.body || {};
    if (!isValidSharedAtlasState(state)) {
      return res.status(400).json({ error: "Invalid shared state" });
    }
    pruneAtlasSnapshots();
    const prev = atlasSharedStates.get(sessionId);
    const source = typeof sourceId === "string" ? sourceId : "";
    // Per-source mutation sequence: reject delayed/reordered writes so an
    // older snapshot from the same tab can never overwrite a newer one.
    if (source && typeof seq === "number" && Number.isFinite(seq)) {
      const lastSeq = atlasSharedSeqBySource[source];
      if (lastSeq !== undefined && seq <= lastSeq) {
        return res.status(409).json({ error: "Stale write", version: prev?.version ?? 0 });
      }
      atlasSharedSeqBySource[source] = seq;
    }
    const snap: AtlasSharedSnapshot = {
      state,
      version: (prev?.version ?? 0) + 1,
      sourceId: source,
      updatedAt: Date.now(),
    };
    atlasSharedStates.set(sessionId, snap);
    persistAtlasSharedState();
    res.json({ version: snap.version });
  });


  // Full-screen Atlas presence: the /atlas page heartbeats while open; the
  // main app polls `fullscreen-active` and locks the sidebar closed while a
  // full-screen tab for this session is alive. An explicit close (back
  // navigation / tab close beacon) unlocks immediately; a crashed/killed tab
  // unlocks once the heartbeat goes stale.
  const atlasFullscreenBeats = new Map<string, number>();
  const ATLAS_FS_ACTIVE_MS = 5500; // ~2 missed 2s heartbeats

  app.post("/api/atlas/fullscreen-heartbeat", (req, res) => {
    const sessionId = requireSession(req, res);
    if (!sessionId) return;
    atlasFullscreenBeats.set(sessionId, Date.now());
    res.json({ ok: true });
  });

  app.post("/api/atlas/fullscreen-close", (req, res) => {
    const sessionId = requireSession(req, res);
    if (!sessionId) return;
    atlasFullscreenBeats.delete(sessionId);
    res.json({ ok: true });
  });

  app.get("/api/atlas/fullscreen-active", (req, res) => {
    const sessionId = requireSession(req, res);
    if (!sessionId) return;
    const last = atlasFullscreenBeats.get(sessionId) ?? 0;
    res.json({ active: Date.now() - last < ATLAS_FS_ACTIVE_MS });
  });

  app.post("/api/atlas/chat", async (req, res) => {
    try {
      const { message, history, prototypeMode, pendingOtjEntries, pendingDraftIds, workingHoursConfirmed } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const pendingEntries: {
        task: string;
        category: string;
        date: string;
        dateLabel?: string;
        hours: number;
        minutes: number;
      }[] =
        prototypeMode !== "before" && Array.isArray(pendingOtjEntries)
          ? pendingOtjEntries.filter(
              (e: unknown): e is { task: string; category: string; date: string; dateLabel?: string; hours: number; minutes: number } =>
                !!e && typeof e === "object",
            )
          : [];

      if (!AZURE_OPENAI_API_KEY) {
        return res.status(500).json({ error: "OpenAI API key not configured" });
      }

      if (
        prototypeMode !== "before" &&
        /^am i on track(\s+with my (off[- ]the[- ]job|otj) hours)?\s*\??$/i.test(message.trim())
      ) {
        const summary = await storage.getOtjSummary();
        const fmtHours = (mins: number) => {
          const h = Math.floor(mins / 60);
          const m = mins % 60;
          if (h === 0) return `${m} minutes`;
          return m > 0 ? `${h} hours ${m} minutes` : `${h} hours`;
        };
        const required = fmtHours(summary.expectedToDateMinutes);
        const logged = fmtHours(summary.totalLoggedMinutes);
        if (summary.totalLoggedMinutes < summary.expectedToDateMinutes) {
          const behind = fmtHours(summary.expectedToDateMinutes - summary.totalLoggedMinutes);
          return res.json({
            content: `You're currently behind on your off-the-job (OTJ) hours, but there's still time to catch up. Here's where things stand:\n\n- **Required to date:** ${required}\n- **Logged so far:** ${logged}\n- **Remaining to catch up:** ${behind}\n\nIt looks like you haven't logged any OTJ activities in the past three weeks, so now would be a great time to add any recent learning or plan some time to catch up.\n\nWould you like help creating a catch-up plan or logging any recent activities?`,
          });
        }
        const ahead = fmtHours(summary.totalLoggedMinutes - summary.expectedToDateMinutes);
        return res.json({
          content: `You're doing a great job staying on top of your off-the-job (OTJ) hours! 🎉\n\nHere's where things stand:\n\n- **Required to date:** ${required}\n- **Logged so far:** ${logged}\n- **Ahead by:** ${ahead}\n\nYou're ahead of schedule, which puts you in a great position. Keep logging your OTJ activities regularly to stay on track.\n\nWould you like to log any recent activities or review your progress?`,
        });
      }

      if (
        prototypeMode !== "before" &&
        /^what counts as (otj|ojt|off[- ]the[- ]job)(\s+training)?\s*\??$/i.test(message.trim())
      ) {
        return res.json({
          content: `Off-the-Job (OTJ) training is learning completed during your paid working hours that helps you develop the knowledge, skills, and behaviours required for your apprenticeship.\n\n**Examples of OTJ training include:**\n\n- Theory-based learning, such as lectures, workshops, role-playing, or online learning.\n- Practical training, including learning to use new equipment, tools, or software.\n- Shadowing or mentoring, where you learn by observing experienced colleagues or working with a mentor.\n- Industry visits, such as trade shows, exhibitions, or client visits that support your learning.\n- Time spent completing apprenticeship assignments or preparing for assessments.\n\n**Activities that don't count as OTJ include:**\n\n- Onboarding or inductions.\n- English and Maths functional skills training.\n- Learning completed outside your paid working hours.\n- Routine day-to-day work that doesn't teach you anything new.\n- Regular performance reviews or appraisal meetings.\n\nA simple rule of thumb is to ask yourself: *"Am I learning something new that contributes to my apprenticeship standard?"* If the answer is yes, it will often count as OTJ.\n\nIf you're unsure about a specific activity, let me know what it is and I can help you determine whether it counts as OTJ training.`,
        });
      }

      if (
        prototypeMode !== "before" &&
        /^hours remaining\s*\??\s*$/i.test(message.trim())
      ) {
        const summary = await storage.getOtjSummary();
        const fmtHours = (mins: number) => {
          const h = Math.floor(mins / 60);
          const m = mins % 60;
          if (h === 0) return `${m} minutes`;
          return m > 0 ? `${h} hours ${m} minutes` : `${h} hours`;
        };
        const required = fmtHours(summary.expectedToDateMinutes);
        const logged = fmtHours(summary.totalLoggedMinutes);
        if (summary.totalLoggedMinutes < summary.expectedToDateMinutes) {
          const behind = fmtHours(summary.expectedToDateMinutes - summary.totalLoggedMinutes);
          return res.json({
            content: `You're currently **${behind} behind** on your Off-the-Job training. To date, you should have logged **${required}**, but you've only logged **${logged}** so far.\n\nTo get back on track, you'll need to log those ${behind} over the next two weeks. Let me know if you'd like help planning how to catch up!`,
          });
        }
        const ahead = fmtHours(summary.totalLoggedMinutes - summary.expectedToDateMinutes);
        return res.json({
          content: `You're currently **${ahead} ahead** on your Off-the-Job training. 🎉\n\nYou should have logged **${required}** by now, and you've already logged **${logged}**.\n\nYou're in a great position—keep up the good work, and continue logging your activities as you complete them.`,
        });
      }

      if (
        prototypeMode !== "before" &&
        /^log this week'?s learning\s*\.?\s*$/i.test(message.trim())
      ) {
        return res.json({
          content: `Happy to help with that! Could you tell me a bit more about what learning you did this week? Specifically:\n\n- What tasks or activities did you complete?\n- When did you do them?\n- How long did you spend on each activity?\n\nOnce I have those details, I can draft the entries for you!`,
        });
      }

      let systemPrompt = prototypeMode === 'before' ? ATLAS_SYSTEM_PROMPT_BEFORE : ATLAS_SYSTEM_PROMPT_AFTER;

      let pendingDrafts: Awaited<ReturnType<typeof storage.getOtjSummary>>["entries"] = [];

      if (prototypeMode !== 'before') {
        const today = new Date();
        const isoToday = today.toISOString().slice(0, 10);
        const friendlyToday = today.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        systemPrompt += `\n\n## TODAY'S DATE\nToday is ${friendlyToday} (${isoToday}). Use this to resolve any relative dates when logging OTJ time.`;

        try {
          const currentSummary = await storage.getOtjSummary();
          const loggedEntries = currentSummary.entries
            .filter((e) => e.status === "confirmed")
            .sort((a, b) => (b.date || "").localeCompare(a.date || "") || b.createdAt.localeCompare(a.createdAt))
            .slice(0, 100)
            .map(({ id, task, category, categoryLabel, date, hours, minutes }) => ({
              id,
              task,
              category,
              categoryLabel,
              date,
              hours,
              minutes,
            }));
          systemPrompt += `\n\n## LOGGED OTJ ENTRIES (most recent first — the only entries that can be edited with \`otj-edit\`)\n${JSON.stringify(loggedEntries)}`;

          systemPrompt += `\n\n## REMOVING / DELETING OTJ ENTRIES
Sarah can ask you to remove or delete an entry (e.g. "delete the SQL practice session", "remove that last entry", "get rid of the team lunch draft"). Any entry above — whether it is a LOGGED entry or a DRAFT — can be removed.
- Work out which entry she means from the LOGGED OTJ ENTRIES or DRAFT OTJ ENTRIES lists using its "id". If it is genuinely ambiguous which one she means, ask ONE short clarifying question first.
- If NOTHING in those lists plausibly matches what she describes, do NOT guess or pick the closest entry — tell her you couldn't find an entry like that and ask which one she means.
- When you know which entry she means, emit ONE fenced code block tagged \`otj-delete\` per entry, each containing a single JSON object: {"id": "<the id from the lists above>"}. Never invent an id.
- Nothing is removed yet at this point. The platform will show her a card with that entry's details directly below your message and ask her to confirm before it is actually removed. You must NEVER claim the entry has been removed at this stage.
- Before the block, write ONE short friendly sentence introducing the confirmation, e.g. "Just to double-check — this is the entry you'd like me to remove:". Do NOT add your own confirm instructions (the card carries its own guidance) and do NOT write anything after the block.
- Do NOT refuse or add warnings about lost progress — the confirmation step covers that.
- Do NOT use \`otj-delete\` for anything other than an explicit request to remove/delete an entry.
- If she instead says the shown entry is the wrong one, work out the right entry from her reply and emit a new \`otj-delete\` block for that id.

Example:
Just to double-check — this is the entry you'd like me to remove:
\`\`\`otj-delete
{"id": "seed-8"}
\`\`\``;

          const draftOtjEntries = currentSummary.entries
            .filter((e) => e.status === "draft")
            .map(({ id, task, category, categoryLabel, date, hours, minutes }) => {
              const missing: string[] = [];
              if (!task || task.trim() === "") missing.push("description");
              if (!date || String(date).trim() === "") missing.push("date");
              if ((hours || 0) * 60 + (minutes || 0) <= 0) missing.push("duration");
              return { id, task, category, categoryLabel, date, hours, minutes, missing };
            });
          const incompleteDrafts = draftOtjEntries.filter((d) => d.missing.length > 0);
          if (draftOtjEntries.length > 0) {
            systemPrompt += `\n\n## DRAFT OTJ ENTRIES (prepared for Sarah's review — editable with \`otj-draft-edit\`)
Sarah has these DRAFT Off-the-Job entries waiting for her to review and confirm. Each has an "id" and a "missing" array listing the ONLY fields that still need a value (empty array means the draft is already complete):
${JSON.stringify(draftOtjEntries)}

FIRST decide what her latest message actually is. If it is a QUESTION or a general/unrelated request (e.g. "what else can you do?", "what counts as OTJ?", "am I on track?"), just answer it conversationally — do NOT emit any block and do NOT change any draft. Only treat her message as a draft change when she is clearly asking to change/complete a draft or is supplying a concrete detail (a date, a duration, or a description).

If she asks to change or complete one of these drafts (e.g. fix a duration, change the date, add a missing description), follow these rules:
- Work out which draft she means from the list. If genuinely ambiguous, ask ONE short clarifying question. IMPORTANT: if exactly ONE draft has a non-empty "missing" array, ANY detail she gives (a date, a duration, or a description) is filling in that draft — do not ask her which draft she means.
- Her reply is answering the fields in that draft's "missing" array. NEVER ask her for a field that is NOT in the "missing" array — the task, category, date and duration that are already present in the draft are correct and must be copied through unchanged. For example, if "missing" is ["date"] and she says "it was yesterday", you already know the task and duration — resolve "yesterday" to an ISO date and emit the edit immediately. Do not ask her to restate the task or duration.
- Only ask a follow-up question if, after applying her reply, the "missing" array would still contain a field she has not provided. Ask for one missing field at a time.
- Never invent the new values — they must come from her message (or already-present draft fields).
- When you know the draft AND all its values, emit one fenced code block tagged \`otj-draft-edit\` per draft being changed. Each block contains a single JSON object with exactly these fields, copying any UNCHANGED values from the draft as-is:
- "id": the id from the DRAFT OTJ ENTRIES list above (never invent one).
- "task", "category", "date" (ISO YYYY-MM-DD), "hours", "minutes": the complete corrected draft.
- "categoryLabel" (OPTIONAL): include this ONLY when Sarah says the category is wrong or asks to change it. It must be EXACTLY one of these official Off-the-Job categories (copy the label verbatim): ${OTJ_DISPLAY_CATEGORIES.map((c) => `"${c}"`).join(", ")}. Pick the one that best matches what she asked for. A category change alone is a valid edit — apply it immediately, copy every other field unchanged, and do NOT ask about fields that are not in the "missing" array.
- Before the block write ONE short friendly sentence that simply acknowledges you've made the change (e.g. "Done — I've updated that draft for you."). Do NOT add review/confirm instructions and do NOT mention working hours — the platform shows ALL of her drafts in a review list directly below your message, and that list carries its own "reply to confirm / confirming these took place during your working hours" guidance. Do NOT say "in your list above" or "in the list above". Do NOT write anything after the block.
- Do NOT use \`otj-log\` or \`otj-edit\` for these drafts. Never claim anything has been logged — drafts are only logged when she confirms them.
- CRITICAL: the conversation history you see has had all fenced code blocks stripped out by the platform. Even if your own earlier replies look like a plain sentence with no block, they DID contain one. EVERY time Sarah changes a draft — including the second, third or tenth change in a row — you MUST emit a fresh \`otj-draft-edit\` block. A reply that says a draft was updated but contains no block updates NOTHING and is a failure.

Example:
Done — I've updated that draft for you.
\`\`\`otj-draft-edit
{"id": "seed-2", "task": "SQL practice session", "category": "study", "date": "2026-06-27", "hours": 2, "minutes": 0}
\`\`\`${
              incompleteDrafts.length === 1
                ? `\n\nRIGHT NOW there is exactly ONE incomplete draft that Sarah is being asked to complete: "${incompleteDrafts[0].task || "(untitled)"}" (id "${incompleteDrafts[0].id}"), missing only: ${incompleteDrafts[0].missing.join(", ")}. If her latest reply is giving a concrete detail (a date, a duration, or a description), it is supplying ${incompleteDrafts[0].missing.join(" and ")} for this draft — apply it and emit the \`otj-draft-edit\` block for this id, copying every other field unchanged. Do NOT ask her to restate details this draft already has. But if her reply is a question or anything that is NOT a detail for this draft, answer it normally and do NOT emit a block or touch the draft.`
                : ""
            }`;
          }

          systemPrompt += `\n\n## SHOWING SARAH HER DRAFTS
If Sarah asks to SEE or review her drafts (e.g. "show me my drafts", "what drafts do I have?", "can I see my drafts?", "let's review my drafts"), respond with ONE short friendly sentence (e.g. "Of course — here are your drafts ready for review:") followed by the exact marker [[OTJ_SHOW_DRAFTS]] on its own line, and nothing else. The platform will display her draft entries as review cards directly below your message — do NOT list, describe or summarise the drafts yourself in text, do NOT add review/confirm instructions (the cards carry their own guidance), and do NOT use this marker for anything other than showing drafts.

## SHOWING LOGGED ENTRIES — SPECIAL RESPONSE
If Sarah asks to SEE what she has already logged (e.g. "show me what I've logged today", "what have I logged this week?", "show my logged entries"), respond with ONE short friendly sentence (e.g. "Here's what you've logged this week:") followed by exactly one of these markers on its own line, and nothing else:
- [[OTJ_SHOW_LOGGED:today]] — she asks about today
- [[OTJ_SHOW_LOGGED:week]] — she asks about this week
- [[OTJ_SHOW_LOGGED:all]] — she asks about all/recent logged entries with no time frame
The platform will display the matching logged entries as cards directly below your message — do NOT list, describe or summarise the entries yourself in text, and do NOT use these markers for anything else.`;
        } catch (summaryError) {
          console.error("Failed to include logged OTJ entries in prompt:", summaryError);
        }

        if (Array.isArray(pendingDraftIds) && pendingDraftIds.length > 0) {
          try {
            const draftSummary = await storage.getOtjSummary();
            const idSet = new Set(pendingDraftIds.map((id: unknown) => String(id)));
            pendingDrafts = draftSummary.entries.filter(
              (e) => e.status === "draft" && idSet.has(e.id),
            );
          } catch (draftError) {
            console.error("Failed to load pending drafts for prompt:", draftError);
          }
        }

        if (pendingDrafts.length > 0) {
          systemPrompt += `\n\n## DRAFTS AWAITING SARAH'S CONFIRMATION
The user is currently reviewing these drafted Off-the-Job entries on screen and has been asked to reply to confirm logging them:
${JSON.stringify(pendingDrafts.map(({ task, category, date, hours, minutes }) => ({ task, category, date, hours, minutes })))}

Interpret their latest message:
- If they are CONFIRMING the drafts in any way (e.g. "yes", "log it", "log them", "looks good", "go for it", "all correct"), respond with ONLY the exact marker [[OTJ_CONFIRMED]] and absolutely nothing else. The platform will log the drafts and show confirmation — you must NOT claim to have logged anything yourself.
- If they want to CHANGE a draft, follow the \`otj-draft-edit\` rules above.
- If they are declining or asking something else, respond normally. NEVER say the time has been logged unless you are responding with the [[OTJ_CONFIRMED]] marker.`;
        }

        if (pendingEntries.length > 0) {
          systemPrompt += `\n\n## PENDING OTJ DRAFT AWAITING CONFIRMATION
The user currently has this drafted Off-the-Job time displayed on screen and has been asked to reply to confirm logging it:
${JSON.stringify(pendingEntries.map(({ task, category, date, hours, minutes }) => ({ task, category, date, hours, minutes })))}

Interpret their latest message:
- If they are CONFIRMING the draft in any way (e.g. "yes", "log it", "log them both", "looks good", "go for it", "all correct"), respond with ONLY the exact marker [[OTJ_CONFIRMED]] and absolutely nothing else. The platform will log the entries and show confirmation — you must NOT claim to have logged anything yourself and must NOT re-emit the draft.
- If they want to CHANGE the draft (different duration, date, task or category), you MUST re-emit the WHOLE draft as \`otj-log\` blocks: exactly ONE block per entry, INCLUDING every unchanged entry copied as-is. There must always be the SAME number of \`otj-log\` blocks as there are entries above. NEVER describe the change in prose only — the change is ONLY captured if it is inside an \`otj-log\` block. NEVER drop, merge, or omit an entry, even one that did not change. Write ONE short friendly sentence before the blocks and nothing after them.

Worked example — the draft above has TWO entries ("1:1 with coach" 1hr and "Shadowing a colleague" 1hr 30min) and she says "the 1:1 was only 30 minutes". You must emit BOTH blocks:
Thanks for clarifying! Here's the corrected draft:
\`\`\`otj-log
{"task": "1:1 with coach", "category": "coaching", "date": "2026-07-10", "hours": 0, "minutes": 30}
\`\`\`
\`\`\`otj-log
{"task": "Shadowing a colleague", "category": "shadowing", "date": "2026-07-10", "hours": 1, "minutes": 30}
\`\`\`
- If they are declining or asking something else, respond normally. NEVER say the time has been logged unless you are responding with the [[OTJ_CONFIRMED]] marker.`;
        }
      }

      const messages: { role: string; content: string }[] = [
        { role: "system", content: systemPrompt }
      ];

      if (history && Array.isArray(history)) {
        for (const msg of history.slice(-20)) {
          messages.push({
            role: msg.type === "user" ? "user" : "assistant",
            content: msg.content
          });
        }
      }

      messages.push({
        role: "user",
        content: message
      });

      const url = `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_DEPLOYMENT_NAME}/chat/completions?api-version=${AZURE_API_VERSION}`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": AZURE_OPENAI_API_KEY,
        },
        body: JSON.stringify({ messages, temperature: 0.2, max_tokens: 900 }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Azure OpenAI error:", errorText);
        return res.status(response.status).json({ 
          error: "Failed to get response from AI",
          details: errorText 
        });
      }

      const data = await response.json();
      let content = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

      let action: { type: string; data: Record<string, unknown> } | undefined;

      if (pendingDrafts.length > 0 && content.includes("[[OTJ_CONFIRMED]]")) {
        let summary;
        for (const draft of pendingDrafts) {
          summary = await storage.confirmOtjEntry(draft.id);
        }
        return res.json({
          content: "Done — that's logged and your progress is up to date.",
          action: {
            type: "otj_logged",
            data: {
              entries: pendingDrafts.map(({ task, category, date, dateLabel, hours, minutes }) => ({
                task,
                category,
                date,
                dateLabel,
                hours,
                minutes,
              })),
              summary,
            },
          },
        });
      }

      if (pendingEntries.length > 0 && content.includes("[[OTJ_CONFIRMED]]")) {
        let summary;
        for (const entry of pendingEntries) {
          const category = (OTJ_CATEGORIES as readonly string[]).includes(
            String(entry.category).toLowerCase(),
          )
            ? String(entry.category).toLowerCase()
            : "other";
          summary = await storage.addOtjEntry({
            task: String(entry.task || "Off-the-job learning"),
            category: category as (typeof OTJ_CATEGORIES)[number],
            date: String(entry.date || entry.dateLabel || ""),
            hours: Number(entry.hours) || 0,
            minutes: Number(entry.minutes) || 0,
          });
        }
        return res.json({
          content: "Done — that's logged and your progress is up to date.",
          action: {
            type: "otj_logged",
            data: { entries: pendingEntries, summary },
          },
        });
      }

      if (prototypeMode !== 'before') {
        const showLoggedMatch = content.match(/\[\[OTJ_SHOW_LOGGED:(today|week|all)\]\]/i);
        if (showLoggedMatch) {
          const scope = showLoggedMatch[1].toLowerCase();
          content = content.replace(/\[\[OTJ_SHOW_LOGGED:(today|week|all)\]\]/gi, "").trim();
          const summary = await storage.getOtjSummary();
          const now = new Date();
          const isoNow = now.toISOString().slice(0, 10);
          const dayIdx = (now.getDay() + 6) % 7;
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - dayIdx);
          const isoWeekStart = weekStart.toISOString().slice(0, 10);
          const loggedEntries = (summary.entries || []).filter(
            (e: any) => e.status === "confirmed",
          );
          const matching = loggedEntries.filter((e: any) => {
            if (scope === "today") return e.date === isoNow;
            if (scope === "week") return e.date && e.date >= isoWeekStart && e.date <= isoNow;
            return true;
          });
          if (matching.length === 0) {
            const scopeLabel =
              scope === "today" ? "today" : scope === "week" ? "this week" : "yet";
            return res.json({
              content: `You haven't logged any off-the-job time ${scopeLabel}.`,
            });
          }
          return res.json({
            content: content || "Here's what you've logged:",
            action: {
              type: "otj_logged_list",
              data: { entries: matching },
            },
          });
        }

        if (content.includes("[[OTJ_SHOW_DRAFTS]]")) {
          content = content.replace(/\[\[OTJ_SHOW_DRAFTS\]\]/g, "").trim();
          const summary = await storage.getOtjSummary();
          const draftCount = (summary.entries || []).filter(
            (e: any) => e.status === "draft",
          ).length;
          if (draftCount === 0) {
            return res.json({
              content:
                "You're all caught up — there are no drafts waiting to be reviewed.",
            });
          }
          return res.json({
            content:
              content || "Here are your Off-the-Job drafts ready for review:",
            action: {
              type: "otj_drafts",
              data: { summary },
            },
          });
        }

        const hasAnyOtjBlock = /```otj-(draft-edit|edit|log|delete)/i.test(content);
        const claimsDraftUpdate =
          /\b(?:i(?:'ve| have)(?: now| just)? (?:updated|changed|amended|corrected|fixed|edited)|(?:updated|changed|amended|corrected|fixed|edited) (?:that|the|your) draft|draft (?:has been|is now) (?:updated|changed|amended|corrected|fixed|edited))\b/i.test(
            content,
          ) &&
          /\bdraft\b/i.test(content) &&
          !content.includes("[[OTJ_");
        if (!hasAnyOtjBlock && claimsDraftUpdate) {
          try {
            const retryMessages = [
              ...messages,
              { role: "assistant", content },
              {
                role: "user",
                content:
                  "SYSTEM CHECK: your previous reply claimed a draft was updated but contained NO ```otj-draft-edit``` fenced block, so NOTHING was actually updated. Re-send your reply now as ONE short friendly sentence followed by the required ```otj-draft-edit``` block(s) — complete JSON with id, task, category, date, hours and minutes, copying unchanged fields from the draft. Output nothing else.",
              },
            ];
            const retryResponse = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "api-key": AZURE_OPENAI_API_KEY,
              },
              body: JSON.stringify({ messages: retryMessages }),
            });
            if (retryResponse.ok) {
              const retryData = await retryResponse.json();
              const retryContent =
                retryData.choices?.[0]?.message?.content || "";
              if (/```otj-draft-edit\s*[\s\S]*?```/i.test(retryContent)) {
                content = retryContent;
              }
            }
          } catch (retryError) {
            console.error("otj-draft-edit retry failed:", retryError);
          }
        }

        const draftEditMatches = Array.from(
          content.matchAll(/```otj-draft-edit\s*([\s\S]*?)```/gi),
        ) as RegExpMatchArray[];
        if (draftEditMatches.length > 0) {
          let summary;
          let updatedCount = 0;
          const editedIds: string[] = [];
          for (const draftMatch of draftEditMatches) {
            try {
              const parsed = JSON.parse(draftMatch[1].trim());
              const id = String(parsed.id || "");
              if (!id) continue;
              const category = (OTJ_CATEGORIES as readonly string[]).includes(
                String(parsed.category).toLowerCase(),
              )
                ? String(parsed.category).toLowerCase()
                : "other";
              const displayLabel = normaliseDisplayCategory(parsed.categoryLabel);
              const result = await storage.updateOtjEntry(id, {
                task: String(parsed.task || "Off-the-job learning"),
                category: category as (typeof OTJ_CATEGORIES)[number],
                ...(displayLabel ? { categoryLabel: displayLabel } : {}),
                date: String(parsed.date || ""),
                hours: Number(parsed.hours) || 0,
                minutes: Number(parsed.minutes) || 0,
              });
              if (!result) {
                console.error("otj-draft-edit: no entry found with id", id);
                continue;
              }
              summary = result;
              updatedCount += 1;
              editedIds.push(id);
            } catch (parseError) {
              console.error("Failed to parse otj-draft-edit block:", parseError);
            }
          }

          content = content.replace(/```otj-draft-edit\s*[\s\S]*?```/gi, "").trim();

          if (updatedCount > 0 && summary) {
            const editedEntries = summary.entries.filter((e) =>
              editedIds.includes(e.id),
            );
            const stillIncomplete = editedEntries
              .map((e) => {
                const mins = (e.hours || 0) * 60 + (e.minutes || 0);
                const missing: string[] = [];
                if (!e.task || e.task.trim() === "")
                  missing.push("a short description of what you did");
                if (!e.date || String(e.date).trim() === "")
                  missing.push("the date it took place");
                if (mins <= 0) missing.push("how long it lasted");
                return { task: e.task, missing };
              })
              .filter((e) => e.missing.length > 0);

            let outContent = content || "Done — I've updated that draft for you.";
            if (stillIncomplete.length > 0) {
              const first = stillIncomplete[0];
              const label = first.task ? `"${first.task}"` : "that draft";
              outContent = `I've updated ${label}. To finish it off I still need ${first.missing.join(
                " and ",
              )} — what should it be?`;
            }

            return res.json({
              content: outContent,
              action: {
                type: "otj_drafts",
                data: { summary, editedEntries },
              },
            });
          }
          if (!content) {
            content =
              "I couldn't find that draft to update — could you tell me which one you meant?";
          }
        }

        const deleteMatches = Array.from(
          content.matchAll(/```otj-delete\s*([\s\S]*?)```/gi),
        ) as RegExpMatchArray[];
        if (deleteMatches.length > 0) {
          const currentBeforeDelete = await storage.getOtjSummary();
          const entriesToDelete: (typeof currentBeforeDelete.entries)[number][] = [];
          for (const deleteMatch of deleteMatches) {
            try {
              const parsed = JSON.parse(deleteMatch[1].trim());
              const id = String(parsed.id || "");
              if (!id) continue;
              const existing = currentBeforeDelete.entries.find(
                (e) => e.id === id,
              );
              if (!existing) {
                console.error("otj-delete: no entry found with id", id);
                continue;
              }
              entriesToDelete.push(existing);
            } catch (parseError) {
              console.error("Failed to parse otj-delete block:", parseError);
            }
          }

          content = content.replace(/```otj-delete\s*[\s\S]*?```/gi, "").trim();

          if (entriesToDelete.length > 0) {
            return res.json({
              content:
                content ||
                `Just to double-check — ${
                  entriesToDelete.length === 1
                    ? "this is the entry"
                    : "these are the entries"
                } you'd like me to remove:`,
              action: {
                type: "otj_delete_confirm",
                data: { entries: entriesToDelete },
              },
            });
          }
          if (!content) {
            content =
              "I couldn't find that entry to remove — could you tell me which one you meant?";
          }
        }

        const editMatches = Array.from(
          content.matchAll(/```otj-edit\s*([\s\S]*?)```/gi),
        ) as RegExpMatchArray[];
        if (editMatches.length > 0) {
          const updatedEntries: Record<string, unknown>[] = [];
          let summary;
          for (const editMatch of editMatches) {
            try {
              const parsed = JSON.parse(editMatch[1].trim());
              const id = String(parsed.id || "");
              if (!id) continue;
              const category = (OTJ_CATEGORIES as readonly string[]).includes(
                String(parsed.category).toLowerCase(),
              )
                ? String(parsed.category).toLowerCase()
                : "other";
              const hours = Number(parsed.hours) || 0;
              const minutes = Number(parsed.minutes) || 0;
              const displayLabel = normaliseDisplayCategory(parsed.categoryLabel);
              const result = await storage.updateOtjEntry(id, {
                task: String(parsed.task || "Off-the-job learning"),
                category: category as (typeof OTJ_CATEGORIES)[number],
                ...(displayLabel ? { categoryLabel: displayLabel } : {}),
                date: String(parsed.date || ""),
                hours,
                minutes,
              });
              if (!result) {
                console.error("otj-edit: no entry found with id", id);
                continue;
              }
              summary = result;

              let dateLabel = String(parsed.date || "");
              const parsedDate = new Date(String(parsed.date));
              if (!isNaN(parsedDate.getTime())) {
                dateLabel = parsedDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });
              }
              updatedEntries.push({
                task: String(parsed.task || "Off-the-job learning"),
                category,
                ...(displayLabel ? { categoryLabel: displayLabel } : {}),
                date: String(parsed.date || ""),
                dateLabel,
                hours,
                minutes,
              });
            } catch (parseError) {
              console.error("Failed to parse otj-edit block:", parseError);
            }
          }

          content = content.replace(/```otj-edit\s*[\s\S]*?```/gi, "").trim();

          if (updatedEntries.length > 0 && summary) {
            return res.json({
              content: content || "Done — I've updated that entry for you:",
              action: {
                type: "otj_edited",
                data: { entries: updatedEntries, summary },
              },
            });
          }
          if (!content) {
            content =
              "I couldn't find that entry to update — could you tell me which one you meant?";
          }
        }

        const blockMatches = Array.from(
          content.matchAll(/```otj-log\s*([\s\S]*?)```/gi),
        ) as RegExpMatchArray[];
        if (blockMatches.length > 0) {
          const entries: Record<string, unknown>[] = [];
          for (const blockMatch of blockMatches) {
            try {
              const parsed = JSON.parse(blockMatch[1].trim());
              const hours = Number(parsed.hours) || 0;
              const minutes = Number(parsed.minutes) || 0;
              const category = (OTJ_CATEGORIES as readonly string[]).includes(
                String(parsed.category).toLowerCase(),
              )
                ? String(parsed.category).toLowerCase()
                : "other";

              let dateLabel = String(parsed.date || "");
              const parsedDate = new Date(String(parsed.date));
              if (!isNaN(parsedDate.getTime())) {
                dateLabel = parsedDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });
              }

              entries.push({
                task: String(parsed.task || "Off-the-job learning"),
                category,
                date: String(parsed.date || ""),
                dateLabel,
                hours,
                minutes,
              });
            } catch (parseError) {
              console.error("Failed to parse otj-log block:", parseError);
            }
          }

          // Deterministic safety net for draft edits. When Sarah is editing a
          // draft already shown on screen (pendingEntries present), the model is
          // instructed to re-emit ALL entries — but models sometimes emit only
          // the changed one, which would silently drop the others. Merge the
          // emitted (edited) entries over the full pending base by matching task
          // name so nothing is lost.
          if (
            pendingEntries.length > 0 &&
            entries.length > 0 &&
            entries.length < pendingEntries.length
          ) {
            const norm = (s: unknown) => String(s || "").trim().toLowerCase();
            const merged: Record<string, unknown>[] = pendingEntries.map((p) => {
              const cat = (OTJ_CATEGORIES as readonly string[]).includes(norm(p.category))
                ? norm(p.category)
                : "other";
              return {
                task: String(p.task || "Off-the-job learning"),
                category: cat,
                date: String(p.date || ""),
                dateLabel: String(p.dateLabel || p.date || ""),
                hours: Number(p.hours) || 0,
                minutes: Number(p.minutes) || 0,
              };
            });
            for (const edited of entries) {
              const idx = merged.findIndex((m) => norm(m.task) === norm(edited.task));
              if (idx >= 0) merged[idx] = edited;
              else merged.push(edited);
            }
            entries.length = 0;
            entries.push(...merged);
          }

          const dupSummary = await storage.getOtjSummary();
          const confirmedLogged = dupSummary.entries.filter(
            (e) => e.status === "confirmed",
          );
          const totalMins = (h: unknown, m: unknown) =>
            (Number(h) || 0) * 60 + (Number(m) || 0);
          const isDuplicate = (entry: Record<string, unknown>) =>
            confirmedLogged.some(
              (logged) =>
                logged.task.trim().toLowerCase() ===
                  String(entry.task).trim().toLowerCase() &&
                String(logged.date) === String(entry.date) &&
                totalMins(logged.hours, logged.minutes) ===
                  totalMins(entry.hours, entry.minutes),
            );
          const fmtDuration = (h: unknown, m: unknown) => {
            const hh = Number(h) || 0;
            const mm = Number(m) || 0;
            if (hh === 0 && mm === 0) return "0 min";
            if (hh === 0) return `${mm} min`;
            if (mm === 0) return `${hh} hr`;
            return `${hh} hr ${mm} min`;
          };

          const duplicateEntries = entries.filter((e) => isDuplicate(e));
          const freshEntries = entries.filter((e) => !isDuplicate(e));

          content = content.replace(/```otj-log\s*[\s\S]*?```/gi, "").trim();

          if (duplicateEntries.length > 0) {
            const dupList = duplicateEntries
              .map(
                (e) =>
                  `**${String(e.task)}** for ${fmtDuration(e.hours, e.minutes)} on ${String(e.dateLabel || e.date)}`,
              )
              .join(" and ");
            const alreadyLine =
              duplicateEntries.length === 1
                ? `You've already logged ${dupList}, so I haven't added it again.`
                : `You've already logged ${dupList}, so I haven't added them again.`;
            if (freshEntries.length > 0) {
              content = `${alreadyLine} I've drafted the rest for you to review:`;
            } else {
              content = `${alreadyLine} If you did this on a different day or for a different length of time, tell me the details and I'll log it.`;
            }
          }

          if (freshEntries.length > 0) {
            action = {
              type: "otj_log",
              data: { entries: freshEntries },
            };
            if (!content) {
              content = "Here's a draft of your Off-the-Job time:";
            }
          } else if (!content) {
            content = "Here's a draft of your Off-the-Job time:";
          }
        }
      }

      res.json({ content, action });
    } catch (error: any) {
      console.error("Atlas chat error:", error);
      res.status(500).json({ 
        error: "Failed to get response from AI",
        details: error.message 
      });
    }
  });

  app.post("/api/feedback", async (req, res) => {
    try {
      const result = insertAtlasFeedbackSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          error: "Invalid feedback submission",
          details: result.error.flatten(),
        });
      }
      const entry = await storage.addFeedback(result.data);
      console.log("[Atlas feedback]", entry);
      res.status(201).json(entry);
    } catch (error: any) {
      console.error("Failed to save feedback:", error);
      res.status(500).json({ error: "Failed to save feedback" });
    }
  });

  app.get("/api/feedback", async (_req, res) => {
    try {
      res.json(await storage.getFeedback());
    } catch (error: any) {
      console.error("Failed to get feedback:", error);
      res.status(500).json({ error: "Failed to get feedback" });
    }
  });

  app.get("/api/otj", async (_req, res) => {
    try {
      const summary = await storage.getOtjSummary();
      res.json(summary);
    } catch (error: any) {
      console.error("Failed to get OTJ summary:", error);
      res.status(500).json({ error: "Failed to get OTJ summary" });
    }
  });

  app.post("/api/otj", async (req, res) => {
    try {
      const result = insertOtjEntrySchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          error: "Invalid OTJ entry",
          details: result.error.flatten(),
        });
      }
      if (result.data.hours === 0 && result.data.minutes === 0) {
        return res
          .status(400)
          .json({ error: "Duration must be greater than zero" });
      }
      const summary = await storage.addOtjEntry(result.data);
      res.status(201).json(summary);
    } catch (error: any) {
      console.error("Failed to add OTJ entry:", error);
      res.status(500).json({ error: "Failed to add OTJ entry" });
    }
  });

  app.patch("/api/otj/:id", async (req, res) => {
    try {
      const result = insertOtjEntrySchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          error: "Invalid OTJ entry update",
          details: result.error.flatten(),
        });
      }
      const summary = await storage.updateOtjEntry(req.params.id, result.data);
      if (!summary) {
        return res.status(404).json({ error: "OTJ entry not found" });
      }
      res.json(summary);
    } catch (error: any) {
      console.error("Failed to update OTJ entry:", error);
      res.status(500).json({ error: "Failed to update OTJ entry" });
    }
  });

  app.post("/api/otj/:id/confirm", async (req, res) => {
    try {
      const summary = await storage.confirmOtjEntry(req.params.id);
      res.json(summary);
    } catch (error: any) {
      console.error("Failed to confirm OTJ entry:", error);
      res.status(500).json({ error: "Failed to confirm OTJ entry" });
    }
  });

  app.post("/api/otj/reset-session", async (_req, res) => {
    try {
      const summary = await storage.resetOtjSession();
      res.json(summary);
    } catch (error: any) {
      console.error("Failed to reset OTJ session:", error);
      res.status(500).json({ error: "Failed to reset OTJ session" });
    }
  });

  app.post("/api/otj/reset-drafts", async (_req, res) => {
    try {
      const summary = await storage.resetOtjDrafts();
      res.json(summary);
    } catch (error: any) {
      console.error("Failed to reset OTJ drafts:", error);
      res.status(500).json({ error: "Failed to reset OTJ drafts" });
    }
  });

  app.delete("/api/otj/:id", async (req, res) => {
    try {
      const summary = await storage.deleteOtjEntry(req.params.id);
      res.json(summary);
    } catch (error: any) {
      console.error("Failed to delete OTJ entry:", error);
      res.status(500).json({ error: "Failed to delete OTJ entry" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
