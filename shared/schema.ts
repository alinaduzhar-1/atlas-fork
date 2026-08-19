import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const OTJ_CATEGORIES = [
  "training",
  "coaching",
  "shadowing",
  "mentoring",
  "study",
  "other",
] as const;

export type OtjCategory = (typeof OTJ_CATEGORIES)[number];

export const OTJ_STATUSES = ["draft", "non-compliant", "confirmed"] as const;

export type OtjStatus = (typeof OTJ_STATUSES)[number];

export const insertOtjEntrySchema = z.object({
  task: z.string().min(1, "Task is required"),
  category: z.enum(OTJ_CATEGORIES),
  date: z.string().min(1, "Date is required"),
  hours: z.coerce.number().int().min(0).max(24),
  minutes: z.coerce.number().int().min(0).max(59),
});

export type InsertOtjEntry = z.infer<typeof insertOtjEntrySchema>;

export interface OtjEntry extends InsertOtjEntry {
  id: string;
  minutesTotal: number;
  hoursLabel: string;
  categoryLabel: string;
  dateLabel: string;
  dateWarning?: string;
  status: OtjStatus;
  createdAt: string;
}

export interface OtjStatusCounts {
  all: number;
  draft: number;
  nonCompliant: number;
  confirmed: number;
}

export interface OtjSummary {
  totalLoggedMinutes: number;
  expectedToDateMinutes: number;
  behindMinutes: number;
  weeklyLoggedMinutes: number;
  weeklyRequiredMinutes: number;
  weeklyPercent: number;
  totalLoggedLabel: string;
  expectedToDateLabel: string;
  behindLabel: string;
  weeklyLoggedLabel: string;
  weeklyRequiredLabel: string;
  isBehind: boolean;
  programmeTargetMinutes: number;
  progressPercent: number;
  statusCounts: OtjStatusCounts;
  entries: OtjEntry[];
}

export const insertAtlasFeedbackSchema = z
  .object({
    choice: z.string().trim().max(200).optional().default(""),
    comments: z.string().trim().max(5000).optional().default(""),
    openToContact: z.boolean().optional().default(false),
  })
  .refine((data) => data.choice.length > 0 || data.comments.length > 0, {
    message: "Feedback must include a choice or comments",
  });

export type InsertAtlasFeedback = z.infer<typeof insertAtlasFeedbackSchema>;

export interface AtlasFeedback extends InsertAtlasFeedback {
  id: string;
  submittedAt: string;
}
