import {
  users,
  type User,
  type InsertUser,
  type InsertOtjEntry,
  type OtjEntry,
  type OtjSummary,
  type OtjCategory,
  type OtjStatus,
  type InsertAtlasFeedback,
  type AtlasFeedback,
} from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getOtjSummary(): Promise<OtjSummary>;
  addOtjEntry(entry: InsertOtjEntry): Promise<OtjSummary>;
  updateOtjEntry(id: string, updates: Partial<InsertOtjEntry> & { categoryLabel?: string }): Promise<OtjSummary | null>;
  confirmOtjEntry(id: string): Promise<OtjSummary>;
  resetOtjDrafts(): Promise<OtjSummary>;
  resetOtjSession(): Promise<OtjSummary>;
  deleteOtjEntry(id: string): Promise<OtjSummary>;
  addFeedback(feedback: InsertAtlasFeedback): Promise<AtlasFeedback>;
  getFeedback(): Promise<AtlasFeedback[]>;
}

// Baseline learner state for Sarah's DIBD programme (the established prototype narrative).
const OTJ_BASELINE_TOTAL_MINUTES = 62 * 60; // 62 hrs logged all-time
const OTJ_EXPECTED_TO_DATE_MINUTES = 78 * 60; // 78 hrs expected to date
const OTJ_WEEKLY_REQUIRED_MINUTES = 6 * 60 + 30; // 6 hrs 30 mins weekly target
const OTJ_BASELINE_WEEKLY_MINUTES = 90; // 1 hr 30 min logged this week
// Total programme OTJ target, derived from the baseline: 6h30/week across a
// 60-week programme (expected-to-date 78h == 12 weeks in, i.e. ~3 months).
const OTJ_PROGRAMME_TARGET_MINUTES = 390 * 60; // 390 hrs total

const OTJ_CATEGORY_LABELS: Record<OtjCategory, string> = {
  training: "Apprentice related learning",
  coaching: "Mentoring & coaching",
  shadowing: "Shadowing a colleague",
  mentoring: "Mentoring & coaching",
  study: "Apprentice related learning",
  other: "Project work",
};

function formatMinutes(totalMinutes: number): string {
  const safe = Math.max(0, Math.round(totalMinutes));
  const hours = Math.floor(safe / 60);
  const minutes = safe % 60;
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
}

// Long-form duration label used in the entries table, e.g. "1 hour 25 mins".
function formatDuration(totalMinutes: number): string {
  const safe = Math.max(0, Math.round(totalMinutes));
  const hours = Math.floor(safe / 60);
  const minutes = safe % 60;
  const hoursPart = hours > 0 ? `${hours} hour${hours === 1 ? "" : "s"}` : "";
  const minutesPart =
    minutes > 0 ? `${minutes} min${minutes === 1 ? "" : "s"}` : "";
  if (hoursPart && minutesPart) return `${hoursPart} ${minutesPart}`;
  return hoursPart || minutesPart || "0 mins";
}

// Format an ISO date (yyyy-mm-dd) as DD/MM/YYYY for the table.
function formatDateLabel(iso: string): string {
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
}

interface SeedEntry {
  task: string;
  category: OtjCategory;
  categoryLabel?: string;
  date: string;
  hours: number;
  minutes: number;
  status: OtjStatus;
  dateWarning?: string;
}

// Authored history for Sarah's programme so the "All entries" table is populated.
// These are display-only records (they do NOT change the aggregate baseline above,
// which mirrors the home dashboard). Dates sit within her ~3 months on programme.
const OTJ_SEED_ENTRIES: SeedEntry[] = [
  { task: "Shadowing a colleague", category: "shadowing", date: "2026-06-30", hours: 1, minutes: 0, status: "draft" },
  { task: "SQL practice session", category: "study", date: "2026-06-27", hours: 1, minutes: 30, status: "draft" },
  { task: "Team lunch & learn", category: "training", date: "", hours: 0, minutes: 45, status: "draft" },
  { task: "Writing up session notes", category: "other", date: "2026-06-18", hours: 1, minutes: 25, status: "non-compliant", dateWarning: "After end date" },
  { task: "1:1 with manager", category: "coaching", date: "2026-06-16", hours: 1, minutes: 30, status: "confirmed" },
  { task: "Self reflection, writing up session notes", category: "other", date: "2026-06-12", hours: 4, minutes: 20, status: "confirmed" },
  { task: "Writing up session notes", category: "other", date: "2026-06-09", hours: 3, minutes: 25, status: "confirmed" },
  { task: "SQL fundamentals workshop", category: "training", date: "2026-06-05", hours: 2, minutes: 0, status: "confirmed" },
  { task: "Data visualisation self study", category: "study", date: "2026-06-02", hours: 1, minutes: 45, status: "confirmed" },
  { task: "Mentoring session with coach", category: "mentoring", date: "2026-05-28", hours: 1, minutes: 0, status: "confirmed" },
  { task: "Python for analysts course", category: "training", date: "2026-05-22", hours: 3, minutes: 0, status: "confirmed" },
  { task: "Reviewing project brief", category: "other", date: "2026-05-15", hours: 2, minutes: 30, status: "confirmed" },
  { task: "Statistics refresher reading", category: "study", date: "2026-05-08", hours: 1, minutes: 15, status: "confirmed" },
  { task: "Shadowing the analytics team", category: "shadowing", date: "2026-04-30", hours: 2, minutes: 0, status: "confirmed" },
  { task: "Onboarding & tooling setup", category: "training", date: "2026-04-22", hours: 2, minutes: 0, status: "confirmed" },
];

function enrichEntry(
  entry: {
    task: string;
    category: OtjCategory;
    categoryLabel?: string;
    date: string;
    hours: number;
    minutes: number;
    status: OtjStatus;
    dateWarning?: string;
  },
  id: string,
  createdAt: string,
): OtjEntry {
  const minutesTotal = entry.hours * 60 + entry.minutes;
  return {
    task: entry.task,
    category: entry.category,
    categoryLabel: entry.categoryLabel ?? OTJ_CATEGORY_LABELS[entry.category],
    date: entry.date,
    dateLabel: formatDateLabel(entry.date),
    dateWarning: entry.dateWarning,
    hours: entry.hours,
    minutes: entry.minutes,
    minutesTotal,
    hoursLabel: formatDuration(minutesTotal),
    status: entry.status,
    id,
    createdAt,
  };
}

const STATUS_ORDER: Record<OtjStatus, number> = {
  draft: 0,
  "non-compliant": 1,
  confirmed: 2,
};

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;
  // Authored history for the entries table (does not move the aggregate baseline).
  private seededEntries: OtjEntry[];
  // Entries logged by the learner during the session (these DO move the aggregate).
  private userEntries: OtjEntry[];
  // Minutes from seeded drafts the learner has confirmed this session (these
  // also move the aggregate, since a confirmed draft becomes logged time).
  private confirmedSeedMinutes = 0;
  // Ids of seeded drafts confirmed this session — used to distinguish them from
  // seeds that started life "confirmed" (baseline history) when editing/deleting.
  private sessionConfirmedSeedIds = new Set<string>();
  // All-time and weekly baselines. Instance fields (not constants) so that
  // removing a historical logged entry can reduce the recorded totals.
  private baselineTotalMinutes = OTJ_BASELINE_TOTAL_MINUTES;
  private baselineWeeklyMinutes = OTJ_BASELINE_WEEKLY_MINUTES;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    const baseTime = new Date("2026-04-01T09:00:00.000Z").getTime();
    this.seededEntries = OTJ_SEED_ENTRIES.map((seed, index) =>
      enrichEntry(
        seed,
        `seed-${index + 1}`,
        new Date(baseTime + index * 60000).toISOString(),
      ),
    );
    this.userEntries = [];
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  private buildSummary(): OtjSummary {
    const loggedFromEntries = this.userEntries.reduce(
      (sum, entry) => sum + entry.minutesTotal,
      0,
    );
    const totalLoggedMinutes =
      this.baselineTotalMinutes + loggedFromEntries + this.confirmedSeedMinutes;
    const weeklyLoggedMinutes =
      this.baselineWeeklyMinutes + loggedFromEntries + this.confirmedSeedMinutes;
    const behindMinutes = Math.max(
      0,
      OTJ_EXPECTED_TO_DATE_MINUTES - totalLoggedMinutes,
    );
    const weeklyPercent = Math.min(
      100,
      Math.round((weeklyLoggedMinutes / OTJ_WEEKLY_REQUIRED_MINUTES) * 100),
    );
    const progressPercent = Math.min(
      100,
      Math.round((totalLoggedMinutes / OTJ_PROGRAMME_TARGET_MINUTES) * 100),
    );

    const entries = [...this.seededEntries, ...this.userEntries].sort((a, b) => {
      const statusDiff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      if (statusDiff !== 0) return statusDiff;
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return b.createdAt.localeCompare(a.createdAt);
    });

    const statusCounts = {
      all: entries.length,
      draft: entries.filter((e) => e.status === "draft").length,
      nonCompliant: entries.filter((e) => e.status === "non-compliant").length,
      confirmed: entries.filter((e) => e.status === "confirmed").length,
    };

    return {
      totalLoggedMinutes,
      expectedToDateMinutes: OTJ_EXPECTED_TO_DATE_MINUTES,
      behindMinutes,
      weeklyLoggedMinutes,
      weeklyRequiredMinutes: OTJ_WEEKLY_REQUIRED_MINUTES,
      weeklyPercent,
      totalLoggedLabel: formatMinutes(totalLoggedMinutes),
      expectedToDateLabel: formatMinutes(OTJ_EXPECTED_TO_DATE_MINUTES),
      behindLabel: formatMinutes(behindMinutes),
      weeklyLoggedLabel: formatMinutes(weeklyLoggedMinutes),
      weeklyRequiredLabel: formatMinutes(OTJ_WEEKLY_REQUIRED_MINUTES),
      isBehind: behindMinutes > 0,
      programmeTargetMinutes: OTJ_PROGRAMME_TARGET_MINUTES,
      progressPercent,
      statusCounts,
      entries,
    };
  }

  async getOtjSummary(): Promise<OtjSummary> {
    return this.buildSummary();
  }

  async addOtjEntry(entry: InsertOtjEntry): Promise<OtjSummary> {
    const otjEntry = enrichEntry(
      { ...entry, status: "confirmed" },
      randomUUID(),
      new Date().toISOString(),
    );
    this.userEntries.push(otjEntry);
    return this.buildSummary();
  }

  async updateOtjEntry(
    id: string,
    updates: Partial<InsertOtjEntry> & { categoryLabel?: string },
  ): Promise<OtjSummary | null> {
    const userIndex = this.userEntries.findIndex((e) => e.id === id);
    if (userIndex !== -1) {
      const existing = this.userEntries[userIndex];
      this.userEntries[userIndex] = enrichEntry(
        {
          task: updates.task ?? existing.task,
          category: (updates.category ?? existing.category) as OtjCategory,
          categoryLabel: updates.categoryLabel ?? existing.categoryLabel,
          date: updates.date ?? existing.date,
          hours: updates.hours ?? existing.hours,
          minutes: updates.minutes ?? existing.minutes,
          status: existing.status,
        },
        existing.id,
        existing.createdAt,
      );
      return this.buildSummary();
    }

    const seedIndex = this.seededEntries.findIndex((e) => e.id === id);
    if (seedIndex !== -1) {
      const existing = this.seededEntries[seedIndex];
      const previousMinutes = existing.minutesTotal;
      const updated = enrichEntry(
        {
          task: updates.task ?? existing.task,
          category: (updates.category ?? existing.category) as OtjCategory,
          categoryLabel: updates.categoryLabel ?? existing.categoryLabel,
          date: updates.date ?? existing.date,
          hours: updates.hours ?? existing.hours,
          minutes: updates.minutes ?? existing.minutes,
          status: existing.status,
          dateWarning: existing.dateWarning,
        },
        existing.id,
        existing.createdAt,
      );
      this.seededEntries[seedIndex] = updated;
      if (this.sessionConfirmedSeedIds.has(existing.id)) {
        this.confirmedSeedMinutes = Math.max(
          0,
          this.confirmedSeedMinutes - previousMinutes + updated.minutesTotal,
        );
      }
      return this.buildSummary();
    }

    return null;
  }

  async confirmOtjEntry(id: string): Promise<OtjSummary> {
    const userEntry = this.userEntries.find((e) => e.id === id);
    if (userEntry) {
      userEntry.status = "confirmed";
      return this.buildSummary();
    }
    const seedEntry = this.seededEntries.find((e) => e.id === id);
    if (seedEntry && seedEntry.status !== "confirmed") {
      seedEntry.status = "confirmed";
      this.confirmedSeedMinutes += seedEntry.minutesTotal;
      this.sessionConfirmedSeedIds.add(seedEntry.id);
    }
    return this.buildSummary();
  }

  async resetOtjSession(): Promise<OtjSummary> {
    const baseTime = new Date("2026-04-01T09:00:00.000Z").getTime();
    this.seededEntries = OTJ_SEED_ENTRIES.map((seed, index) =>
      enrichEntry(
        seed,
        `seed-${index + 1}`,
        new Date(baseTime + index * 60000).toISOString(),
      ),
    );
    this.userEntries = [];
    this.confirmedSeedMinutes = 0;
    this.sessionConfirmedSeedIds = new Set<string>();
    this.baselineTotalMinutes = OTJ_BASELINE_TOTAL_MINUTES;
    this.baselineWeeklyMinutes = OTJ_BASELINE_WEEKLY_MINUTES;
    return this.buildSummary();
  }

  async resetOtjDrafts(): Promise<OtjSummary> {
    const baseTime = new Date("2026-04-01T09:00:00.000Z").getTime();
    OTJ_SEED_ENTRIES.forEach((seed, index) => {
      if (seed.status !== "draft") return;
      const id = `seed-${index + 1}`;
      const existingIndex = this.seededEntries.findIndex((e) => e.id === id);
      const restored = enrichEntry(
        seed,
        id,
        new Date(baseTime + index * 60000).toISOString(),
      );
      if (existingIndex !== -1) {
        const existing = this.seededEntries[existingIndex];
        if (this.sessionConfirmedSeedIds.has(id)) {
          this.confirmedSeedMinutes = Math.max(
            0,
            this.confirmedSeedMinutes - existing.minutesTotal,
          );
          this.sessionConfirmedSeedIds.delete(id);
        }
        this.seededEntries[existingIndex] = restored;
      } else {
        this.seededEntries.push(restored);
      }
    });
    return this.buildSummary();
  }

  async deleteOtjEntry(id: string): Promise<OtjSummary> {
    this.userEntries = this.userEntries.filter((e) => e.id !== id);
    const seedEntry = this.seededEntries.find((e) => e.id === id);
    if (seedEntry) {
      if (this.sessionConfirmedSeedIds.has(id)) {
        // A draft the learner confirmed this session — undo its aggregate.
        this.confirmedSeedMinutes = Math.max(
          0,
          this.confirmedSeedMinutes - seedEntry.minutesTotal,
        );
        this.sessionConfirmedSeedIds.delete(id);
      } else if (seedEntry.status === "confirmed") {
        // Historical logged time baked into the all-time baseline — removing it
        // should reduce the recorded total and progress.
        this.baselineTotalMinutes = Math.max(
          0,
          this.baselineTotalMinutes - seedEntry.minutesTotal,
        );
      }
    }
    this.seededEntries = this.seededEntries.filter((e) => e.id !== id);
    return this.buildSummary();
  }

  private feedbackEntries: AtlasFeedback[] = [];

  async addFeedback(feedback: InsertAtlasFeedback): Promise<AtlasFeedback> {
    const entry: AtlasFeedback = {
      ...feedback,
      id: randomUUID(),
      submittedAt: new Date().toISOString(),
    };
    this.feedbackEntries.push(entry);
    return entry;
  }

  async getFeedback(): Promise<AtlasFeedback[]> {
    return [...this.feedbackEntries].sort((a, b) =>
      b.submittedAt.localeCompare(a.submittedAt),
    );
  }
}

export const storage = new MemStorage();
