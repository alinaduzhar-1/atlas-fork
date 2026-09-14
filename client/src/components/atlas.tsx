import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CoachChatHistory } from "@/components/coach-chat-history";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Button,
  Badge,
  SparklesIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  DotsIcon,
  TextFileIcon,
  ArrowUpIcon,
  ChatIcon,
  SearchIcon,
  UsersIcon,
  DownloadIcon,
  Tooltip,
  CloneIcon,
  SpeakerIcon,
  LikeIcon,
  DislikeIcon,
  SyncIcon,
  CloseIcon,
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  CheckIcon,
  HistoryIcon,
  HeartIcon,
  BinIcon,
  AlertIcon,
  HelpIcon,
  CalendarIcon,
  ClockIcon,
  LightBulbIcon,
  PersonIcon,
  ChecklistIcon,
  TargetIcon,
  PeerReviewIcon,
  GroupMemberReviewIcon,
  EyeIcon,
  ExternalLinkIcon,
  ArrowUpRightIcon,
  EditIcon,
  EditWriteIcon,
  Textarea,
  TextInput,
  Checkbox,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  toasts,
} from "@multiverse-io/stardust-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { loadSharedAtlasState, saveSharedAtlasState, subscribeSharedAtlasState, fetchSharedAtlasState, type SharedAtlasState, type SharedMessage } from "@/lib/atlas-sync";
import type { OtjSummary, OtjEntry } from "@shared/schema";
import AtlasShaderWave from "./atlas-shader-wave";
import atlasIcon from "@/assets/atlas-icon.svg";
import multiverseLogomark from "@/assets/multiverse-logomark.svg";
import multiverseHexagon from "@/assets/multiverse_hexagon.svg";

const HEX_INDIGO_FILTER = "brightness(0) saturate(100%) invert(32%) sepia(98%) saturate(1752%) hue-rotate(226deg) brightness(99%) contrast(95%)";
import waveformIcon from "@/assets/waveform-icon.svg";
import { useAtlasVersion } from "./atlas-version-context";
import { ATLAS_CONVERSATION_STORAGE_KEY, ATLAS_FULLSCREEN_HANDOFF_PREFIX, unitContentGuidance } from "./atlas-constants";
import { AtlasPrivacyNotice } from "./atlas-privacy-notice";

function AtlasSquaresAvatar({ isAnimating = false, size = 24 }: { isAnimating?: boolean; size?: number }) {
  const shapeSize = size / 3;
  const far = size - shapeSize;

  const corners = [
    { x: 0, y: 0 },
    { x: far, y: 0 },
    { x: 0, y: far },
    { x: far, y: far },
  ];

  return (
    <div style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}>
      {corners.map((pos, i) => (
        <motion.div
          key={`corner-${i}`}
          animate={{
            borderRadius: isAnimating
              ? [0, shapeSize / 2, 0]
              : 0,
          }}
          transition={isAnimating ? {
            duration: 0.5,
            repeat: Infinity,
            ease: [0.25, 0.1, 0.25, 1],
            delay: i * 0.08,
            repeatDelay: 0.15,
          } : { duration: 0.15 }}
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            width: shapeSize,
            height: shapeSize,
            backgroundColor: '#232121',
          }}
        />
      ))}
      <motion.div
        animate={{
          borderRadius: isAnimating
            ? [shapeSize / 2, 0, shapeSize / 2]
            : shapeSize / 2,
        }}
        transition={isAnimating ? {
          duration: 0.5,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.1,
          repeatDelay: 0.15,
        } : { duration: 0.15 }}
        style={{
          position: 'absolute',
          left: shapeSize,
          top: shapeSize,
          width: shapeSize,
          height: shapeSize,
          backgroundColor: '#232121',
        }}
      />
    </div>
  );
}

export type SuggestionItem = { text: string; icon: string };

const defaultSuggestions: SuggestionItem[] = [
  { text: "Tell me what you can do for me", icon: "chat" },
  { text: "Search for anything", icon: "search" },
  { text: "I have an issue", icon: "alert" },
  { text: "I'm not sure what to do next", icon: "help" },
];

function SuggestionIcon({ type, color }: { type: string; color?: string }) {
  const style = color ? { color, fill: color, stroke: 'none' } : undefined;
  const variant = color ? "primary" : "action";
  switch (type) {
    case "chat":
      return <ChatIcon size="small" variant={variant} className="flex-shrink-0" style={style} />;
    case "search":
      return <SearchIcon size="small" variant={variant} className="flex-shrink-0" style={style} />;
    case "alert":
      return <AlertIcon size="small" variant={variant} className="flex-shrink-0" style={style} />;
    case "help":
      return <HelpIcon size="small" variant={variant} className="flex-shrink-0" style={style} />;
    case "calendar":
      return <CalendarIcon size="small" variant={variant} className="flex-shrink-0" style={style} />;
    case "lightbulb":
      return <LightBulbIcon size="small" variant={variant} className="flex-shrink-0" style={style} />;
    case "person":
      return <PersonIcon size="small" variant={variant} className="flex-shrink-0" style={style} />;
    case "checklist":
      return <ChecklistIcon size="small" variant={variant} className="flex-shrink-0" style={style} />;
    case "target":
      return <TargetIcon size="small" variant={variant} className="flex-shrink-0" style={style} />;
    case "review":
      return <GroupMemberReviewIcon size="small" variant={variant} className="flex-shrink-0" style={style} />;
    case "eye":
      return <EyeIcon size="small" variant={variant} className="flex-shrink-0" style={style} />;
    case "text":
    default:
      return <TextFileIcon size="small" variant={variant} className="flex-shrink-0" style={style} />;
  }
}

const defaultContentGuidance = [
  "Learning resources",
  "Project guidance",
  "Career development",
  "Platform support",
];


interface ChatMessageFile {
  id: string;
  name: string;
  preview: string | null;
  isImage: boolean;
}

interface SupportAction {
  label: string;
  icon: 'chat' | 'support';
}

interface OtjLogEntryData {
  task: string;
  category: string;
  categoryLabel?: string;
  date: string;
  dateLabel?: string;
  hours: number;
  minutes: number;
}

interface OtjLogActionData {
  entries: OtjLogEntryData[];
  fromDraftsConfirm?: boolean;
}

type MessageAction =
  | { type: 'otj_log'; data: OtjLogActionData }
  | { type: 'otj_logged'; data: OtjLogActionData & { summary: OtjSummary } }
  | { type: 'otj_edited'; data: OtjLogActionData & { summary: OtjSummary } }
  | { type: 'otj_deleted'; data: { summary: OtjSummary; deletedTasks?: string[] } }
  | { type: 'otj_delete_confirm'; data: { entries: OtjEntry[] } }
  | { type: 'otj_drafts'; data?: { summary?: OtjSummary; editedEntries?: OtjEntry[]; confirmedSnapshot?: OtjEntry[] } }
  | { type: 'otj_logged_list'; data: { entries: OtjEntry[] } }
  | { type: 'otj_partial' }
  | { type: 'otj_drafts_prompt' };

const AFFIRMATIVE_REPLY_RE =
  /^(yes|yep|yeah|yup|sure|ok|okay|confirm|confirmed|correct|perfect|great|sounds good|looks good|looks right|all good|that'?s right|that'?s correct|go ahead|log it|do it|please do|yes please|please log it|log|log time|log the time|log them|log these|log all|log now|log my time|log my hours|log the drafts|log drafts|log everything|log complete|log the complete ones|log the complete drafts|please log|please log them)[.!?\s]*$/i;

const OTJ_CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: 'training', label: 'Training' },
  { value: 'coaching', label: 'Coaching' },
  { value: 'shadowing', label: 'Shadowing' },
  { value: 'mentoring', label: 'Mentoring' },
  { value: 'study', label: 'Study' },
  { value: 'other', label: 'Other' },
];

const OTJ_DISPLAY_CATEGORY_RULES: { pattern: RegExp; label: string }[] = [
  { pattern: /portfolio/i, label: 'Portfolio work' },
  { pattern: /coach/i, label: 'Communicating with my coach' },
  { pattern: /cohort|peer|study group/i, label: 'Cohort collaboration' },
  { pattern: /community/i, label: 'Multiverse Community' },
  { pattern: /exam|assessment|end.?point|epa|mock test/i, label: 'Exam revision or assessment work' },
  { pattern: /module/i, label: 'Module learning or revision' },
  {
    pattern: /workshop|boot ?camp|delivery|learning session|lunch (&|and) learn|seminar|webinar|masterclass/i,
    label: 'Workshop, bootcamp, or delivery or learning session',
  },
  { pattern: /project|assignment|scoping/i, label: 'Apprenticeship assignment or project' },
  { pattern: /apply|applied|applying/i, label: 'Applying apprenticeship learning to work' },
  { pattern: /training|shadow|on.?the.?job/i, label: 'Training at your work' },
  { pattern: /revision|revis/i, label: 'Module learning or revision' },
];

const OTJ_DISPLAY_CATEGORY_FALLBACK: Record<string, string> = {
  training: 'Training at your work',
  coaching: 'Communicating with my coach',
  shadowing: 'Training at your work',
  mentoring: 'Communicating with my coach',
  study: 'Module learning or revision',
  other: 'Apprenticeship-related learning',
};

const OTJ_OFFICIAL_CATEGORY_LABELS = new Set(
  [
    'Applying apprenticeship learning to work',
    'Training at your work',
    'Apprenticeship assignment or project',
    'Communicating with my coach',
    'Cohort collaboration',
    'Exam revision or assessment work',
    'Multiverse Community',
    'Workshop, bootcamp, or delivery or learning session',
    'Portfolio work',
    'Apprenticeship-related learning',
    'Module learning or revision',
  ].map((label) => label.toLowerCase()),
);

function getOtjDisplayCategory(
  task?: string,
  category?: string,
  categoryLabel?: string,
): string {
  const explicit = (categoryLabel || '').trim();
  if (explicit && OTJ_OFFICIAL_CATEGORY_LABELS.has(explicit.toLowerCase())) {
    return explicit;
  }
  const text = (task || '').trim();
  if (text) {
    for (const rule of OTJ_DISPLAY_CATEGORY_RULES) {
      if (rule.pattern.test(text)) return rule.label;
    }
  }
  return (
    OTJ_DISPLAY_CATEGORY_FALLBACK[(category || '').toLowerCase()] ||
    'Apprenticeship-related learning'
  );
}

function formatDuration(hours: number, minutes: number): string {
  const h = Math.max(0, Math.floor(hours));
  const m = Math.max(0, Math.floor(minutes));
  const hrUnit = 'hr';
  if (h === 0 && m === 0) return '0 min';
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} ${hrUnit}`;
  return `${h} ${hrUnit} ${m} min`;
}

function totalOtjMinutes(entries: OtjLogEntryData[]): number {
  return entries.reduce(
    (sum, e) => sum + Math.max(0, Math.floor(e.hours || 0)) * 60 + Math.max(0, Math.floor(e.minutes || 0)),
    0,
  );
}

function OtjDraftEntryCard({ entry, logged = false }: { entry: OtjLogEntryData; logged?: boolean }) {
  const categoryLabel = getOtjDisplayCategory(entry.task, entry.category, entry.categoryLabel);
  const durationLabel = formatDuration(entry.hours || 0, entry.minutes || 0);
  const dateLabel = entry.dateLabel || entry.date || 'Today';

  return (
    <div
      className={`w-full overflow-hidden rounded-lg border transition-colors duration-500 ${
        logged ? 'border-success bg-success' : 'border-secondary bg-action-secondary-hover'
      }`}
      style={{ boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.06)', padding: '12px 16px' }}
    >
      <div className="flex flex-col" style={{ gap: '4px' }}>
        <div className="flex items-start justify-between" style={{ gap: '12px' }}>
          <div className="flex items-center" style={{ gap: '8px' }}>
            <span className="text-s font-semibold text-primary" data-testid="text-otj-task">
              {entry.task || 'Off-the-job learning'}
            </span>
          </div>
          <div className="flex items-center flex-shrink-0" style={{ gap: '4px' }}>
            {logged && (
              <>
                <CheckIcon size="small" variant="success" />
                <span
                  className="whitespace-nowrap text-[13px] font-semibold text-[hsl(156,68%,25%)]"
                  data-testid="text-otj-confirmed"
                >
                  Confirmed ·
                </span>
              </>
            )}
            <span
              className={`whitespace-nowrap text-[13px] font-semibold ${
                logged ? 'text-[hsl(156,68%,25%)]' : 'text-action'
              }`}
              data-testid="text-otj-duration"
            >
              {durationLabel}
            </span>
          </div>
        </div>
        <span
          className="text-xs font-medium text-[hsl(180,1%,38%)]"
          data-testid="text-otj-meta"
        >
          <span data-testid="text-otj-date">{dateLabel}</span> ·{' '}
          <span data-testid="text-otj-category">{categoryLabel}</span>
        </span>
      </div>
    </div>
  );
}

function OtjDraftConfirmationCard({
  data,
  showGuidance,
  onFollowUp,
}: {
  data: OtjLogActionData;
  showGuidance: boolean;
  onFollowUp?: (message: string) => void;
}) {
  const entries = data.entries || [];
  const totalMinutes = totalOtjMinutes(entries);
  const totalLabel = formatDuration(Math.floor(totalMinutes / 60), totalMinutes % 60);
  const logged = !showGuidance;

  return (
    <div className="flex flex-col" style={{ gap: '16px' }} data-testid="otj-log-card">
      <div className="flex flex-col" style={{ gap: '8px' }}>
        {entries.map((entry, index) => (
          <OtjDraftEntryCard key={index} entry={entry} logged={logged} />
        ))}
      </div>

      {entries.length > 1 && (
        <div
          className="flex items-center border-t border-tertiary w-full"
          style={{ gap: '8px', paddingTop: '8px' }}
        >
          <div className="flex items-center flex-1" style={{ gap: '8px' }}>
            {logged ? (
              <CheckIcon size="small" variant="success" />
            ) : (
              <ClockIcon size="small" variant="primary" />
            )}
            <span className="text-s font-medium text-primary">
              {logged ? 'Logged' : 'Total to confirm'}
            </span>
          </div>
          <span className="text-s font-medium text-primary" data-testid="text-otj-total">
            {totalLabel}
          </span>
        </div>
      )}

      {showGuidance && (
        <p className="text-s text-primary" style={{ marginTop: '8px' }} data-testid="text-otj-review-guidance">
          Review your Off-the-Job time above. If everything looks right, reply to confirm. By
          doing so, you're confirming that {entries.length > 1 ? 'the activities were' : 'the activity was'}{' '}
          completed during your working hours. If anything needs changing, just let me know.
        </p>
      )}

    </div>
  );
}

function OtjLoggedCard({
  data,
  summary,
  onFollowUp,
  variant = 'logged',
  showEntries = true,
  suppressDraftsNudge = false,
}: {
  data: OtjLogActionData;
  summary: OtjSummary;
  onFollowUp?: (message: string) => void;
  variant?: 'logged' | 'edited';
  showEntries?: boolean;
  suppressDraftsNudge?: boolean;
}) {
  const entries = data.entries || [];
  const totalMinutes = totalOtjMinutes(entries);
  const totalLabel = formatDuration(Math.floor(totalMinutes / 60), totalMinutes % 60);
  const weeklyLabel = summary.weeklyLoggedLabel;

  return (
    <div className="flex flex-col" style={{ gap: '12px' }}>
      {showEntries && (
      <div className="flex flex-col" style={{ gap: '8px' }} data-testid="otj-log-card-logged">
        {entries.map((entry, index) => {
          const categoryLabel = getOtjDisplayCategory(entry.task, entry.category, entry.categoryLabel);
          const durationLabel = formatDuration(entry.hours || 0, entry.minutes || 0);
          const dateLabel = entry.dateLabel || entry.date || 'Today';
          return (
            <div
              key={index}
              className="w-full overflow-hidden rounded-lg border border-success bg-success"
              style={{ boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.06)', padding: '12px 16px' }}
            >
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <div className="flex items-start justify-between" style={{ gap: '12px' }}>
                  <div className="flex items-center" style={{ gap: '8px' }}>
                    <span className="text-s font-semibold text-primary" data-testid={`text-otj-logged-task-${index}`}>
                      {entry.task || 'Off-the-job learning'}
                    </span>
                  </div>
                  <div className="flex items-center flex-shrink-0" style={{ gap: '4px' }}>
                    <CheckIcon size="small" variant="success" />
                    <span
                      className="whitespace-nowrap text-[13px] font-semibold text-[hsl(156,68%,25%)]"
                      data-testid={`text-otj-logged-confirmed-${index}`}
                    >
                      Confirmed ·
                    </span>
                    <span
                      className="whitespace-nowrap text-[13px] font-semibold text-[hsl(156,68%,25%)]"
                      data-testid={`text-otj-logged-duration-${index}`}
                    >
                      {durationLabel}
                    </span>
                  </div>
                </div>
                <span
                  className="text-xs font-medium text-[hsl(180,1%,38%)]"
                  data-testid={`text-otj-logged-meta-${index}`}
                >
                  <span data-testid={`text-otj-logged-date-${index}`}>{dateLabel}</span> ·{' '}
                  <span data-testid={`text-otj-logged-category-${index}`}>{categoryLabel}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
      )}

      {showEntries && entries.length > 1 && (
        <div
          className="flex items-center border-t border-tertiary w-full"
          style={{ gap: '8px', paddingTop: '8px' }}
        >
          <div className="flex items-center flex-1" style={{ gap: '8px' }}>
            <CheckIcon size="small" variant="success" />
            <span className="text-s font-medium text-primary">Logged</span>
          </div>
          <span className="text-s font-medium text-primary" data-testid="text-otj-logged-total">
            {totalLabel}
          </span>
        </div>
      )}

      {weeklyLabel && variant === 'logged' && (
        <p className="text-s text-primary" style={{ marginTop: '8px' }} data-testid="text-otj-weekly-logged">
          <span className="font-semibold text-primary">Great job!</span> That brings you to{' '}
          <span className="font-semibold text-primary">{weeklyLabel}</span> of off-the-job time this
          week — you're catching up nicely.
        </p>
      )}

      {suppressDraftsNudge ? (
        <PostDraftsConfirmFollowUp onFollowUp={onFollowUp} />
      ) : (
        <OtjFollowUpOptions testidPrefix="otj" />
      )}
    </div>
  );
}

function PostDraftsConfirmFollowUp({ onFollowUp }: { onFollowUp?: (message: string) => void }) {
  const { data: summary } = useQuery<OtjSummary>({ queryKey: ['/api/otj'] });
  const incomplete = (summary?.entries || []).filter(
    (e) => e.status === 'draft' && getDraftMissingFields(e).length > 0,
  );
  if (incomplete.length > 0) {
    return <RemainingDraftsPanel onFollowUp={onFollowUp} />;
  }
  return <OtjFollowUpOptions testidPrefix="otj" suppressDraftsNudge />;
}

function OtjFollowUpOptions({
  testidPrefix,
  suppressDraftsNudge = false,
}: {
  testidPrefix: string;
  suppressDraftsNudge?: boolean;
}) {
  const { prototypeTab } = useAtlasVersion();
  const { data: summary } = useQuery<OtjSummary>({ queryKey: ['/api/otj'] });

  if (prototypeTab === 'after-drafts' && !suppressDraftsNudge) {
    const draftCount = (summary?.entries || []).filter((e) => e.status === 'draft').length;
    if (draftCount > 0) {
      return (
        <div className="flex flex-col" style={{ gap: '8px' }} data-testid={`${testidPrefix}-followup-options`}>
          <span className="text-s text-primary" data-testid={`text-${testidPrefix}-drafts-waiting`}>
            You have{' '}
            <span className="font-semibold text-primary">
              {draftCount} {draftCount === 1 ? 'draft' : 'drafts'}
            </span>{' '}
            waiting for your review, would you like to have a look?
          </span>
        </div>
      );
    }
  }

  const options = [
    {
      label: 'Log more Off-the-Job time',
      testid: `text-${testidPrefix}-log-more`,
    },
    {
      label: 'Learn what counts as Off-the-Job time',
      testid: `text-${testidPrefix}-learn-more`,
    },
    {
      label: "Understand what's logged automatically and what you'll need to log yourself",
      testid: `text-${testidPrefix}-auto-vs-manual`,
    },
  ];

  return (
    <div className="flex flex-col" style={{ gap: '8px' }} data-testid={`${testidPrefix}-followup-options`}>
      <span className="text-s text-primary">I can also help you with:</span>
      <div className="flex flex-col" style={{ gap: '4px' }}>
        {options.map((option) => (
          <span key={option.testid} className="text-s text-primary" data-testid={option.testid}>
            - {option.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function formatFriendlyDate(iso: string | undefined, fallback: string): string {
  if (!iso) return fallback;
  const parsed = new Date(iso);
  if (isNaN(parsed.getTime())) return fallback;
  return parsed.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function getDraftMissingFields(entry: OtjEntry): string[] {
  const missing: string[] = [];
  if (!entry.task || entry.task.trim() === '') missing.push('description');
  if (!entry.date || entry.date.trim() === '') missing.push('date');
  if (!entry.minutesTotal || entry.minutesTotal <= 0) missing.push('duration');
  return missing;
}

function DraftReviewCard({
  entry: entryProp,
  onFollowUp,
  logged = false,
  removed = false,
}: {
  entry: OtjEntry;
  onFollowUp?: (message: string) => void;
  logged?: boolean;
  removed?: boolean;
}) {
  const { data: liveSummary } = useQuery<OtjSummary>({ queryKey: ['/api/otj'] });
  const entry =
    liveSummary?.entries.find((e) => e.id === entryProp.id) || entryProp;
  const missingFields = getDraftMissingFields(entry);
  const isIncomplete = missingFields.length > 0;
  const categoryLabel = getOtjDisplayCategory(entry.task, entry.category, entry.categoryLabel);
  const hasDate = !!(entry.date && entry.date.trim());
  const dateLabel = formatFriendlyDate(entry.date, entry.dateLabel || 'No date');
  const hasDuration = !!entry.minutesTotal;
  const durationLabel = !entry.minutesTotal
    ? 'No duration'
    : formatDuration(Math.floor(entry.minutesTotal / 60), entry.minutesTotal % 60);
  const taskLabel = entry.task && entry.task.trim() ? entry.task : 'Untitled draft';

  const fieldWord = (f: string) =>
    f === 'description' ? 'a description' : f === 'date' ? 'a date' : 'a duration';
  const missingLabel = missingFields.map(fieldWord).reduce((acc, cur, i, arr) => {
    if (i === 0) return cur;
    if (i === arr.length - 1) return `${acc} and ${cur}`;
    return `${acc}, ${cur}`;
  }, '');

  const metaParts = hasDate ? [dateLabel, categoryLabel] : [categoryLabel];

  const containerClass = removed
    ? 'w-full overflow-hidden rounded-lg border border-input bg-secondary transition-colors duration-500'
    : isIncomplete
      ? 'w-full overflow-hidden rounded-lg border border-input bg-primary'
      : logged
        ? 'w-full overflow-hidden rounded-lg border border-success bg-success transition-colors duration-500'
        : 'w-full overflow-hidden rounded-lg border border-secondary bg-action-secondary-hover transition-colors duration-500';

  return (
    <div
      className={containerClass}
      style={{ boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.06)', padding: '12px 16px' }}
      data-testid={`draft-card-${entry.id}`}
    >
      <div className="flex flex-col" style={{ gap: '4px' }}>
        <div className="flex items-start justify-between" style={{ gap: '12px' }}>
          <div className="flex items-center" style={{ gap: '8px' }}>
            <span className={`text-s font-semibold ${removed || isIncomplete ? 'text-secondary' : 'text-primary'}`}>{taskLabel}</span>
          </div>
          {!isIncomplete && (
            <div className="flex items-center flex-shrink-0" style={{ gap: '4px' }}>
              {logged && (
                <>
                  <CheckIcon size="small" variant="success" />
                  <span
                    className="whitespace-nowrap text-[13px] font-semibold text-[hsl(156,68%,25%)]"
                    data-testid={`draft-confirmed-${entry.id}`}
                  >
                    Confirmed ·
                  </span>
                </>
              )}
              <span
                className={`whitespace-nowrap text-[13px] font-semibold ${
                  logged ? 'text-[hsl(156,68%,25%)]' : removed ? 'text-secondary' : 'text-action'
                }`}
                data-testid={`draft-duration-${entry.id}`}
              >
                {durationLabel}
              </span>
            </div>
          )}
          {isIncomplete && hasDuration && (
            <span
              className="whitespace-nowrap text-[13px] font-semibold text-secondary flex-shrink-0"
              data-testid={`draft-duration-${entry.id}`}
            >
              {durationLabel}
            </span>
          )}
        </div>
        <span className="text-xs font-medium text-[hsl(180,1%,38%)]">
          {metaParts.join(' · ')}
        </span>
        {isIncomplete && !removed && (
          <div
            className="flex items-center border-t border-tertiary"
            style={{ gap: '6px', marginTop: '8px', paddingTop: '8px' }}
            data-testid={`draft-missing-hint-${entry.id}`}
          >
            <AlertIcon size="small" variant="warning" className="flex-shrink-0" />
            <span className="text-xs font-medium text-warning">
              Needs {missingLabel} before it can be logged.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function DraftsPrompt({ onDismiss, onReview, variant = 'card' }: { onDismiss?: () => void; onReview?: () => void; variant?: 'card' | 'quiet' }) {
  const { data: summary } = useQuery<OtjSummary>({ queryKey: ['/api/otj'] });
  const [, navigate] = useLocation();
  const [quietHovered, setQuietHovered] = useState(false);
  const draftEntries = summary
    ? summary.entries.filter((e) => e.status === 'draft')
    : [];
  const draftCount = draftEntries.length;
  const totalMinutes = draftEntries.reduce((sum, e) => sum + (e.minutesTotal || 0), 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;
  const longTotalLabel = formatDuration(totalHours, totalMins);

  if (!summary) return null;

  if (draftCount === 0) {
    return (
      <p className="text-s text-secondary" data-testid="text-drafts-prompt-empty">
        You're all caught up — there are no off-the-job drafts waiting to be reviewed.
      </p>
    );
  }

  if (variant === 'quiet') {
    const quietLabel = [
      totalHours > 0 ? `${totalHours}hr` : null,
      totalMins > 0 ? `${totalMins} min` : null,
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => (onReview ? onReview() : navigate('/off-the-job'))}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onReview ? onReview() : navigate('/off-the-job');
          }
        }}
        onMouseEnter={() => setQuietHovered(true)}
        onMouseLeave={() => setQuietHovered(false)}
        className="flex items-center justify-between rounded-xl cursor-pointer"
        style={{
          padding: '11px 14px',
          border: quietHovered ? '1px solid #b9b5ee' : '1px solid #d6d3f2',
          backgroundColor: quietHovered ? 'hsl(228 100% 96%)' : 'hsl(228 100% 98%)',
          gap: '8px',
          boxShadow: quietHovered
            ? '0 2px 6px rgba(74, 95, 247, 0.12)'
            : '0 1px 3px rgba(74, 95, 247, 0.08)',
          transition: 'background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease',
        }}
        data-testid="drafts-prompt-quiet"
      >
        <span className="text-primary" style={{ fontSize: '13px', fontWeight: 570, lineHeight: '1.25' }}>
          Review drafted {quietLabel} of OTJ time
        </span>
        {onDismiss && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="flex items-center justify-center flex-shrink-0 rounded-full transition-colors hover:bg-black/5"
            style={{ width: '24px', height: '24px' }}
            aria-label="Dismiss"
            data-testid="button-drafts-prompt-quiet-dismiss"
          >
            <CloseIcon size="small" variant="secondary" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-brand-50"
      style={{ padding: '16px', border: '1px solid #e4e3f6' }}
      data-testid="drafts-prompt-card"
    >
      <div className="flex items-start">
        <div className="flex flex-col flex-1" style={{ gap: '4px' }}>
          <div className="flex items-center justify-between" style={{ gap: '8px' }}>
            <span className="text-s font-semibold text-primary" data-testid="text-drafts-prompt-count">
              I've prepared your OTJ time for this week.
            </span>
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className="flex items-center justify-center flex-shrink-0 text-secondary hover:opacity-70 transition-opacity"
                aria-label="Dismiss"
                data-testid="button-drafts-prompt-dismiss"
              >
                <CloseIcon size="small" variant="secondary" />
              </button>
            )}
          </div>
          <span className="text-xs text-primary" style={{ lineHeight: '1.5' }}>
            Around {longTotalLabel} across {draftCount} {draftCount === 1 ? 'entry' : 'entries'}. Have a look before you confirm it.
          </span>
          <div className="flex items-center" style={{ gap: '8px', marginTop: '12px' }}>
            <Button
              variant="primary"
              size="small"
              onClick={() => (onReview ? onReview() : navigate('/off-the-job'))}
              data-testid="button-review-drafts"
            >
              Review drafts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OtjDeleteConfirmCard({
  entries,
  confirmed = false,
}: {
  entries: OtjEntry[];
  confirmed?: boolean;
}) {
  if (!entries || entries.length === 0) return null;
  const plural = entries.length > 1;

  return (
    <div className="flex flex-col" style={{ gap: '12px' }} data-testid="otj-delete-confirm">
      <div className="flex flex-col" style={{ gap: '8px' }}>
        {entries.map((entry) => (
          <DraftReviewCard
            key={entry.id}
            entry={entry}
            logged={!confirmed && entry.status !== 'draft'}
            removed={confirmed}
          />
        ))}
      </div>
      {confirmed ? (
        <div className="flex items-center" style={{ gap: '8px' }} data-testid="delete-confirmed-note">
          <CheckIcon size="small" variant="success" />
          <span className="text-s font-medium text-primary">
            Removed — your off-the-job total is updated.
          </span>
        </div>
      ) : (
        <span className="text-s text-primary" data-testid="text-delete-guidance">
          If {plural ? 'these are' : 'this is'} right, just reply to confirm and I'll remove{' '}
          {plural ? 'them' : 'it'}. If {plural ? "they're" : "it's"} not, tell me which entry you
          meant.
        </span>
      )}
    </div>
  );
}

function DraftsReviewList({ onFollowUp, showHeading = true, confirmed = false, snapshotEntries, initialEntries }: { onFollowUp?: (message: string) => void; showHeading?: boolean; confirmed?: boolean; snapshotEntries?: OtjEntry[]; initialEntries?: OtjEntry[] }) {
  const { data: summary } = useQuery<OtjSummary>({ queryKey: ['/api/otj'] });
  const [draftsState, setDraftsState] = useState<OtjEntry[] | null>(
    () => (initialEntries && initialEntries.length > 0 ? initialEntries : null),
  );

  useEffect(() => {
    if (summary && !confirmed) {
      const liveDrafts = summary.entries.filter((e) => e.status === 'draft');
      setDraftsState((prev) => {
        if (liveDrafts.length > 0) return liveDrafts;
        return prev && prev.length > 0 ? prev : liveDrafts;
      });
    }
  }, [summary, confirmed]);

  const drafts =
    confirmed && snapshotEntries && snapshotEntries.length > 0
      ? snapshotEntries
      : draftsState;

  if (!drafts) return null;

  if (drafts.length === 0 && !confirmed) {
    return (
      <p className="text-s text-secondary" data-testid="text-no-drafts">
        You're all caught up — there are no drafts waiting to be reviewed.
      </p>
    );
  }

  const completeDrafts = drafts.filter((d) => getDraftMissingFields(d).length === 0);
  const incompleteDrafts = drafts.filter((d) => getDraftMissingFields(d).length > 0);
  const incompleteCount = incompleteDrafts.length;
  const totalMinutes = completeDrafts.reduce((sum, d) => sum + (d.minutesTotal || 0), 0);
  const totalLabel = formatDuration(Math.floor(totalMinutes / 60), totalMinutes % 60);
  const allMinutes = drafts.reduce((sum, d) => sum + (d.minutesTotal || 0), 0);
  const allTotalLabel = formatDuration(Math.floor(allMinutes / 60), allMinutes % 60);

  if (confirmed) {
    return (
      <div className="flex flex-col" style={{ gap: '16px' }} data-testid="drafts-confirmed">
        {showHeading && (
          <span className="text-s text-primary">Here are your Off-the-Job entries ready for review:</span>
        )}

        <div className="flex flex-col" style={{ gap: '8px' }}>
          {completeDrafts.map((draft) => (
            <DraftReviewCard key={draft.id} entry={draft} logged />
          ))}
        </div>

        {completeDrafts.length > 1 && (
          <div
            className="flex items-center border-t border-tertiary w-full"
            style={{ gap: '8px', paddingTop: '8px' }}
          >
            <div className="flex items-center flex-1" style={{ gap: '8px' }}>
              <CheckIcon size="small" variant="success" />
              <span className="text-s font-medium text-primary">Logged</span>
            </div>
            <span className="text-s font-medium text-primary" data-testid="text-drafts-logged-total">
              {totalLabel}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ gap: '16px' }} data-testid="drafts-review-list">
      {showHeading && (
        <span className="text-s text-primary">Here are your Off-the-Job entries ready for review:</span>
      )}

      <div className="flex flex-col" style={{ gap: '8px' }}>
        {completeDrafts.map((draft) => (
          <DraftReviewCard key={draft.id} entry={draft} onFollowUp={onFollowUp} />
        ))}
        {incompleteDrafts.map((draft) => (
          <DraftReviewCard key={draft.id} entry={draft} onFollowUp={onFollowUp} />
        ))}
      </div>

      {drafts.length > 1 && (
        <div
          className="flex flex-col border-t border-tertiary w-full"
          style={{ gap: '4px', paddingTop: '8px' }}
        >
          <div className="flex items-center" style={{ gap: '8px' }}>
            <div className="flex items-center flex-1" style={{ gap: '8px' }}>
              <ClockIcon size="small" variant="primary" />
              <span className="text-s font-medium text-primary">Total to confirm</span>
            </div>
            <span className="text-s font-medium text-primary" data-testid="text-drafts-total">
              {allTotalLabel}
            </span>
          </div>
          {incompleteCount > 0 && (
            <span className="text-xs text-secondary" data-testid="text-drafts-ready-breakdown">
              {totalLabel} ready to log now · {incompleteCount === 1 ? 'the rest needs' : 'the rest need'} more details first
            </span>
          )}
        </div>
      )}

      <p className="text-s text-primary" style={{ marginTop: '8px' }} data-testid="text-drafts-review-guidance">
        Review your Off-the-Job time above. If everything looks right, reply to confirm. By
        doing so, you're confirming that {completeDrafts.length > 1 ? 'the activities were' : 'the activity was'}{' '}
        completed during your working hours. If anything needs changing, just let me know.
      </p>
    </div>
  );
}

function RemainingDraftsPanel({ onFollowUp }: { onFollowUp?: (message: string) => void }) {
  const { data: summary } = useQuery<OtjSummary>({ queryKey: ['/api/otj'] });
  if (!summary) return null;
  const incomplete = summary.entries.filter(
    (e) => e.status === 'draft' && getDraftMissingFields(e).length > 0,
  );
  if (incomplete.length === 0) return null;
  return (
    <div className="flex flex-col" style={{ gap: '8px' }} data-testid="drafts-remaining-panel">
      <p className="text-s text-primary" data-testid="text-drafts-remaining-guidance">
        {incomplete.length === 1
          ? 'One draft still needs a detail before it can be logged. Add it below and I\u2019ll log it too.'
          : 'These drafts still need details before they can be logged. Add them below and I\u2019ll log them too.'}
      </p>
      {incomplete.map((draft) => (
        <DraftReviewCard key={draft.id} entry={draft} onFollowUp={onFollowUp} />
      ))}
    </div>
  );
}

interface ChatMessage {
  id: string;
  type: 'user' | 'atlas';
  content: string;
  titleLarge?: string;
  titleMedium?: string;
  titleSmall?: string;
  timestamp: Date;
  files?: ChatMessageFile[];
  isStreaming?: boolean;
  supportActions?: SupportAction[];
  action?: MessageAction;
}

const SUPPORT_SIGNAL_KEYWORDS = [
  'troubleshoot',
  'struggling',
  'struggle',
  'workload',
  'overwhelmed',
  'overwhelm',
  'stressed',
  'stress',
  'burnout',
  'burnt out',
  'burned out',
  "can't cope",
  'cant cope',
  'falling behind',
  'fall behind',
  'behind on',
  'stuck',
  'need help',
  'need some help',
  'wellbeing',
  'well-being',
  'anxiety',
  'anxious',
  'too much',
  'help me',
  'i need support',
  'mental health',
  "can't keep up",
  'cant keep up',
];

function getSupportActions(messageText: string): SupportAction[] | undefined {
  const text = messageText.toLowerCase();
  const matched = SUPPORT_SIGNAL_KEYWORDS.some((keyword) => text.includes(keyword));
  if (!matched) return undefined;
  return [
    { label: 'Chat to your Guide', icon: 'chat' },
    { label: 'Support hub', icon: 'support' },
  ];
}

function CodeBlock({
  language,
  value,
  showCopy = false,
}: {
  language: string;
  value: string;
  showCopy?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; silently ignore
    }
  };

  const languageLabel =
    !language || language === "text" ? "Plain text" : language;

  return (
    <div
      className={`my-2 overflow-hidden bg-[#282c34] ${showCopy ? "rounded-lg" : "rounded-none"}`}
      style={!showCopy ? { marginLeft: "-12px", marginRight: "-12px" } : undefined}
    >
      {showCopy && (
        <div className="flex items-center justify-between border-b border-white/10 px-2 py-2">
          <span className="text-xs font-medium lowercase text-white/50">
            {languageLabel}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Code copied" : "Copy code"}
            data-testid="button-copy-code"
            className="flex items-center gap-1 text-xs font-medium text-white/60 hover:text-white transition-colors [&_svg]:fill-none [&_svg]:stroke-current [&_svg_path]:fill-none [&_svg_path]:stroke-current"
          >
            {copied ? <CheckIcon size="small" /> : <CloneIcon size="small" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: "transparent",
          padding: "16px",
          fontSize: "13px",
          lineHeight: "1.5",
          maxWidth: "100%",
          overflowX: "hidden",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
        }}
        codeTagProps={{
          style: {
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
          },
        }}
        wrapLongLines
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}

function TypewriterText({ 
  content, 
  onComplete,
  onTick,
  speed = 8
}: { 
  content: string; 
  onComplete?: () => void;
  onTick?: () => void;
  speed?: number;
}) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (isComplete) return;
    
    let currentIndex = 0;
    const totalLength = content.length;
    
    const interval = setInterval(() => {
      if (currentIndex < totalLength) {
        const charsToAdd = Math.min(3, totalLength - currentIndex);
        setDisplayedContent(content.slice(0, currentIndex + charsToAdd));
        currentIndex += charsToAdd;
        onTick?.();
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
        onTick?.();
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [content, speed, onComplete, onTick, isComplete]);
  
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({children}) => <h1 className="text-2xl font-semibold text-primary mt-4 mb-2 first:mt-0">{children}</h1>,
        h2: ({children}) => <h2 className="text-xl font-semibold text-primary mt-4 mb-2 first:mt-0">{children}</h2>,
        h3: ({children}) => <h3 className="text-l font-semibold text-primary mt-3 mb-1.5 first:mt-0">{children}</h3>,
        h4: ({children}) => <h4 className="text-m font-semibold text-primary mt-2 mb-1 first:mt-0">{children}</h4>,
        p: ({children}) => <p className="text-s text-primary mb-2 last:mb-0">{children}</p>,
        strong: ({children}) => <strong className="font-semibold text-primary">{children}</strong>,
        em: ({children}) => <em className="italic">{children}</em>,
        ul: ({children}) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
        ol: ({children}) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
        li: ({children}) => <li className="text-s text-primary">{children}</li>,
        blockquote: ({children}) => <blockquote className="border-l-2 border-action pl-2 italic text-secondary my-2">{children}</blockquote>,
        code: ({className, children}) => {
          const text = String(children ?? "");
          const match = /language-(\w+)/.exec(className || "");
          const isBlock = !!match || text.includes("\n");
          return isBlock ? (
            <CodeBlock language={match?.[1] || "text"} value={text.replace(/\n$/, "")} showCopy={true} />
          ) : (
            <code className="bg-secondary px-1 py-0.5 rounded text-s font-mono text-primary">{children}</code>
          );
        },
        pre: ({children}) => <>{children}</>,
        a: ({href, children}) => <a href={href} className="text-action underline hover:no-underline" target="_blank" rel="noopener noreferrer">{children}</a>,
        hr: () => <hr className="border-separator-primary my-3" />,
        table: ({children}) => <table className="w-full border-collapse my-2 text-s">{children}</table>,
        th: ({children}) => <th className="border border-separator-primary p-1 bg-secondary font-semibold text-left">{children}</th>,
        td: ({children}) => <td className="border border-separator-primary p-1">{children}</td>,
      }}
    >
      {displayedContent}
    </ReactMarkdown>
  );
}

function BeforeMessageContent({
  message,
  onReady,
}: {
  message: ChatMessage;
  onReady?: () => void;
}) {
  useEffect(() => {
    onReady?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.id]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({children}) => <p className="text-s text-primary mb-2 last:mb-0">{children}</p>,
        strong: ({children}) => <strong className="font-semibold text-primary">{children}</strong>,
        em: ({children}) => <em className="italic">{children}</em>,
        ul: ({children}) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
        ol: ({children}) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
        li: ({children}) => <li className="text-s text-primary">{children}</li>,
        a: ({href, children}) => <a href={href} className="text-action underline hover:no-underline" target="_blank" rel="noopener noreferrer">{children}</a>,
        code: ({className, children}) => {
          const text = String(children ?? "");
          const match = /language-(\w+)/.exec(className || "");
          const isBlock = !!match || text.includes("\n");
          return isBlock ? (
            <CodeBlock language={match?.[1] || "text"} value={text.replace(/\n$/, "")} showCopy={false} />
          ) : (
            <code className="bg-secondary px-1 py-0.5 rounded text-s font-mono text-primary">{children}</code>
          );
        },
        pre: ({children}) => <>{children}</>,
      }}
    >
      {message.content}
    </ReactMarkdown>
  );
}

const fakeAtlasResponses = [
  {
    content: "Of course! I'd be happy to help you with that. Let me know if you need any more details."
  },
  {
    content: "That's a great question. Based on your current progress, I'd suggest focusing on completing the practical exercises first before moving to the next unit."
  },
  {
    titleSmall: "Quick Tip",
    content: "Try breaking down your project into smaller milestones. This makes it easier to track progress and stay motivated throughout the process."
  },
  {
    titleMedium: "Here's what I found",
    content: "Your upcoming deadline for the project submission is next Friday. Make sure to review the rubric and reach out to your guide if you have any questions about the requirements."
  },
  {
    titleLarge: "How I Can Help You",
    content: "I'm here to support your learning journey in several ways. I can answer questions about your coursework, help you prepare for assessments, provide guidance on projects, and connect you with relevant resources.\n\nIs there a specific area you'd like to explore today?"
  },
  {
    titleLarge: "Your Learning Path",
    titleMedium: "Current Progress",
    content: "You've completed 3 out of 8 units so far, which puts you right on track. Your next milestone is the Unit 4 assessment, scheduled for next week. I recommend reviewing the key concepts from Units 2 and 3 before proceeding."
  },
  {
    content: "**1. Learning Support**\n\nI can help you understand complex topics, break down difficult concepts, and provide explanations tailored to your learning style. Just ask me about any subject you're finding challenging.\n\n**2. Project Guidance**\n\nFor your current and upcoming projects, I can offer step-by-step guidance, help you brainstorm ideas, and review your approach. Visit the project page for the best support.\n\n**3. Career Development**\n\nI can help you explore how your apprenticeship can benefit your current role and your long-term goals. If you're looking for advice on skill-building, professional behaviours, or career growth, I'll help you reflect and plan next steps.\n\n**4. Platform and Process Support**\n\nIf you ever have practical questions (e.g., navigating the platform, submitting assignments, understanding deadlines/policies), I'll provide direct, clear instructions so you can keep moving forward smoothly.\n\n**5. Professional Challenges**\n\nIf you face challenges in your job or learning—like time management, communication, or balancing work and study—I can offer practical strategies and guide you to reflect on effective solutions.\n\nHow would you like to get started? Is there a specific area you'd like support with today?"
  },
  {
    titleSmall: "Reminder",
    content: "Don't forget to submit your reflection by end of day tomorrow. You can find the submission form in your current unit dashboard."
  }
];

interface AtlasSidebarProps {
  version?: 1 | 2 | 3;
  isVisible?: boolean;
  onToggle?: () => void;
  hideContentGuidance?: boolean;
  showMessages?: boolean;
  onMessagesClose?: () => void;
  showNotifications?: boolean;
  onNotificationsClose?: () => void;
  showHistory?: boolean;
  onHistoryClose?: () => void;
  showPersonalisation?: boolean;
  onPersonalisationClose?: () => void;
  suggestions?: SuggestionItem[];
  contentGuidance?: string[];
  contentGuidanceTitle?: string;
  greeting?: string;
  topContent?: React.ReactNode;
  currentPageContext?: string;
  prototypeMode?: 'before' | 'after';
  side?: 'left' | 'right';
}

const panelVariants: Variants = {
  hidden: { 
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      mass: 1
    }
  },
  visible: { 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 35,
      mass: 0.8
    }
  }
};

const panelVariantsLeft: Variants = {
  hidden: { 
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      mass: 1
    }
  },
  visible: { 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 35,
      mass: 0.8
    }
  }
};

const floatingButtonVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 80,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 35,
      mass: 0.8
    }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 35,
      mass: 0.8
    }
  }
};

const speechBubbleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 10,
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 0.8
    }
  }
};

export function AtlasFloatingButton({ onClick, isVisible, inContainer = false, variant = 'default' }: { onClick: () => void; isVisible: boolean; inContainer?: boolean; variant?: 'default' | 'after' }) {
  
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowSpeechBubble(true);
      const timer = setTimeout(() => {
        setShowSpeechBubble(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowSpeechBubble(false);
      setIsHovered(false);
    }
  }, [isVisible]);

  const handleClick = () => {
    setShowSpeechBubble(false);
    setIsHovered(false);
    onClick();
  };

  const showBubble = showSpeechBubble || isHovered;
  const bubbleText = isHovered ? "Need help? Ask me anything" : "Here to help whenever you need!";

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={inContainer ? "absolute" : "fixed"}
      style={{ 
        right: '24px', 
        bottom: '24px', 
        zIndex: inContainer ? 50 : 2147483647,
        pointerEvents: 'auto'
      }}
    >
      {showBubble && (
        <div
          className="absolute flex items-center justify-center"
          style={{
            bottom: '60px',
            right: '0px',
            backgroundColor: '#4a5ff7',
            borderRadius: '12px',
            padding: '12px 16px',
            border: '2px solid #d2d7fd',
            boxShadow: '0px 4px 12px 0px rgba(26,29,35,0.12), 0px 0px 1px 0px rgba(144,146,145,0.56)',
            whiteSpace: 'nowrap'
          }}
          data-testid="atlas-speech-bubble"
        >
          <span className="text-s font-medium text-white">{bubbleText}</span>
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              right: '18px',
              width: '12px',
              height: '12px',
              backgroundColor: '#4a5ff7',
              transform: 'rotate(45deg)',
              borderRight: '2px solid #d2d7fd',
              borderBottom: '2px solid #d2d7fd'
            }}
          />
        </div>
      )}
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '8.605px',
          background: 'white',
          border: 'none',
          boxShadow: '0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)',
          transform: 'rotate(-3.88deg)',
          cursor: 'pointer',
          pointerEvents: 'auto',
          position: 'relative'
        }}
        data-testid="button-show-atlas"
        aria-label="Show Atlas"
      >
          <img src={atlasIcon} alt="Atlas" style={{ width: '24px', height: '26px', pointerEvents: 'none' }} />
      </button>
    </div>
  );
}

const mockMessages = [
  {
    id: 1,
    type: 'direct' as const,
    name: 'Benn Camm',
    badge: 'Guide',
    message: 'Definitely! "Getting Things Done" by David Allen is excellent.',
    time: '1 hour',
    unread: 1,
    online: true,
    avatar: 'BC'
  },
  {
    id: 2,
    type: 'channel' as const,
    name: 'Unit 1: Data Infrastructure & Cybersecurity',
    memberCount: 24,
    time: '2 hours',
    unread: 0
  }
];

interface MessagesPanelProps {
  onBack: () => void;
  onToggle?: () => void;
}

function MessagesPanel({ onBack, onToggle }: MessagesPanelProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'direct', label: 'Direct Messages' },
    { id: 'channels', label: 'Channels' },
    { id: 'saved', label: 'Saved' }
  ];

  return (
    <div className="flex flex-col h-full bg-primary">
      <div className="flex items-center justify-between p-2">
        <span className="text-m font-semibold text-primary">Messages</span>
        <div className="flex items-center" style={{ gap: '4px' }}>
          <Button
            variant="primary"
            size="small"
            iconPosition="center"
            Icon={<PlusIcon size="small" variant="white" />}
            aria-label="New message"
            data-testid="button-new-message"
          />
          <Button
            variant="secondary"
            size="small"
            iconPosition="center"
            Icon={<DotsIcon size="small" style={{ transform: 'rotate(90deg)' }} />}
            aria-label="More options"
            data-testid="button-messages-options"
          />
          <Button
            variant="secondary"
            size="small"
            iconPosition="center"
            Icon={<ChevronRightIcon size="small" />}
            aria-label="Close messages"
            data-testid="button-close-messages"
            onClick={onToggle}
          />
        </div>
      </div>

      <div className="px-2 py-3">
        <div 
          className={`flex items-center gap-0.5 h-4 px-1 rounded-base border transition-all ${
            isSearchFocused 
              ? 'border-action shadow-[0px_0px_0px_2px_#d2d7fd]' 
              : 'border-input'
          }`}
          style={{ backgroundColor: '#ffffff' }}
        >
          <SearchIcon size="small" variant="secondary" />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="flex-1 text-s text-primary bg-transparent outline-none placeholder:text-secondary"
            data-testid="input-messages-search"
          />
        </div>
      </div>

      <div className="flex gap-1 px-2 pb-2 border-b border-separator-primary flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-1.5 py-1 rounded-full text-s font-semibold transition-colors ${
              activeFilter === filter.id
                ? 'bg-[#e7eafe] text-[#3848bb]'
                : 'bg-[#f8f7f3] text-secondary hover:bg-[#f0efe9]'
            }`}
            style={{ maxHeight: '32px' }}
            data-testid={`filter-${filter.id}`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <div className="px-2 pt-2">
          <span className="text-s font-semibold text-primary">Messages</span>
        </div>

        <div className="flex flex-col px-1">
          {mockMessages.map((msg) => (
            <button
              key={msg.id}
              className="flex gap-1.5 items-start px-1 py-1.5 rounded-base hover:bg-secondary transition-colors text-left w-full"
              data-testid={`message-item-${msg.id}`}
            >
              {msg.type === 'direct' ? (
                <>
                  <div className="relative shrink-0">
                    <div 
                      className="w-3 h-3 rounded-full bg-[#e7eafe] flex items-center justify-center text-xs font-semibold text-action"
                    >
                      {msg.avatar}
                    </div>
                    {msg.online && (
                      <div 
                        className="absolute w-[6px] h-[6px] rounded-full bg-[#3cb289] border border-white"
                        style={{ bottom: '0px', right: '0px' }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.25">
                    <div className="flex items-center gap-1.5">
                      <span className="text-s font-semibold text-primary">{msg.name}</span>
                      {msg.badge && (
                        <div className="flex items-center gap-0.5">
                          <div className="w-[14px] h-[12px] flex items-center justify-center">
                            <div 
                              className="w-0 h-0"
                              style={{
                                borderLeft: '7px solid transparent',
                                borderRight: '7px solid transparent',
                                borderBottom: '12px solid #4a5ff7'
                              }}
                            />
                          </div>
                          <span className="text-s font-semibold text-secondary">{msg.badge}</span>
                        </div>
                      )}
                      <span className="ml-auto text-xs text-action">{msg.time}</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <p className="text-s text-secondary line-clamp-2 flex-1">{msg.message}</p>
                      {msg.unread > 0 && (
                        <div className="shrink-0 w-2 h-2 rounded-full bg-[#3848bb] flex items-center justify-center">
                          <span className="text-[10px] font-medium text-white">{msg.unread}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="shrink-0 p-0.5">
                    <UsersIcon size="small" variant="primary" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-s font-semibold text-primary truncate">{msg.name}</span>
                      <span className="ml-auto text-xs text-secondary shrink-0">{msg.time}</span>
                    </div>
                    <span className="text-s text-secondary">{msg.memberCount} members</span>
                  </div>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const mockNotifications = [
  {
    id: 1,
    type: 'feedback' as const,
    text: 'New feedback on',
    highlight: 'Reflect on your feedback',
    suffix: 'in Digital product design.',
    time: '30min ago',
    unread: true
  },
  {
    id: 2,
    type: 'likes' as const,
    text: 'Your post received 3 likes the activity',
    highlight: 'Add your learnings from the unit.',
    time: '3 hours ago',
    unread: true
  },
  {
    id: 3,
    type: 'comment' as const,
    name: 'Jordan Smith',
    text: 'added a comment to your project submission:',
    quote: 'Great work on your project, dude 🙌! It\'s great to see how much you\'ve improved. This...',
    time: '5 hours ago',
    unread: false
  },
  {
    id: 4,
    type: 'reminder' as const,
    text: 'Set up your learning schedule to create a rhythm for learning.',
    time: '2 days ago',
    unread: false
  },
  {
    id: 5,
    type: 'action' as const,
    text: 'Upload your',
    highlight: 'Math and English certificates.',
    time: '1 week ago',
    unread: false
  }
];

interface NotificationsPanelProps {
  onBack: () => void;
  onToggle?: () => void;
}

function NotificationsPanel({ onBack, onToggle }: NotificationsPanelProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'archived', label: 'Archived' }
  ];

  return (
    <div className="flex flex-col h-full bg-primary">
      <div className="flex items-center justify-between p-2">
        <span className="text-m font-semibold text-primary">Notifications</span>
        <div className="flex items-center" style={{ gap: '4px' }}>
          <Button
            variant="secondary"
            size="small"
            iconPosition="center"
            Icon={<DotsIcon size="small" style={{ transform: 'rotate(90deg)' }} />}
            aria-label="More options"
            data-testid="button-notifications-options"
          />
          <Button
            variant="secondary"
            size="small"
            iconPosition="center"
            Icon={<ChevronRightIcon size="small" />}
            aria-label="Close notifications"
            data-testid="button-close-notifications"
            onClick={onToggle}
          />
        </div>
      </div>

      <div className="px-1 pb-1">
        <div className="flex gap-0.5 p-0.5 bg-secondary rounded-xl">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-1 px-1.5 py-1 rounded-lg text-s font-medium transition-colors ${
                activeFilter === filter.id
                  ? 'bg-primary text-primary shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] border border-[#dbdad6]'
                  : 'text-primary hover:bg-primary/50'
              }`}
              style={{ height: '32px' }}
              data-testid={`filter-notifications-${filter.id}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-0.5 p-1 overflow-y-auto relative">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex gap-1.5 px-1.5 py-1 rounded-xl relative ${
              notification.unread ? 'bg-[#f5f7ff]' : 'bg-primary'
            }`}
            data-testid={`notification-item-${notification.id}`}
          >
            <div className="flex-1 flex flex-col gap-0.5 pr-4">
              {notification.type === 'comment' ? (
                <>
                  <p className="text-s text-primary leading-normal">
                    <span className="font-medium">{notification.name}</span>
                    <span className="font-regular"> {notification.text}</span>
                  </p>
                  <div className="border border-separator-primary rounded-lg p-1">
                    <p className="text-s text-primary">{notification.quote}</p>
                  </div>
                </>
              ) : notification.highlight ? (
                <p className={`text-s leading-normal ${notification.unread ? 'text-[#171d4c]' : 'text-primary'}`}>
                  <span className="font-regular">{notification.text} </span>
                  <span className="font-medium">{notification.highlight}</span>
                  {notification.suffix && <span className="font-regular"> {notification.suffix}</span>}
                </p>
              ) : (
                <p className="text-s text-primary font-regular leading-normal">{notification.text}</p>
              )}
              <span className={`text-xs ${notification.unread ? 'text-[#171d4c]' : 'text-secondary'}`}>
                {notification.time}
              </span>
            </div>
            <div className="absolute right-1 top-1">
              <Button
                variant="secondary"
                size="tiny"
                iconPosition="center"
                Icon={<DownloadIcon size="small" />}
                aria-label="Archive"
                data-testid={`button-archive-${notification.id}`}
              />
            </div>
          </div>
        ))}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[63px] pointer-events-none"
          style={{ 
            background: 'linear-gradient(to bottom, transparent 0%, var(--atlas-panel-bg, #ffffff) 87.5%)'
          }}
        />
      </div>

      <div className="border-t border-separator-primary p-2">
        <Button
          variant="secondary"
          size="small"
          className="w-full"
          data-testid="button-mark-all-read"
        >
          Mark all as read
        </Button>
      </div>
    </div>
  );
}

interface HistoryChatItem {
  id: string;
  name: string;
  timestamp?: Date;
  preview?: string;
  pinned?: boolean;
}

function PinGlyph({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 17v5" />
      <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
    </svg>
  );
}

interface HistoryPanelProps {
  onBack: () => void;
  onToggle?: () => void;
  onNewChat?: () => void;
  chats: HistoryChatItem[];
  currentChatId: string | null;
  currentChatName: string;
  onSelectChat?: (chatId: string, chatName: string) => void;
  onRenameChat?: (chatId: string, newName: string) => void;
  onDeleteChat?: (chatId: string) => void;
  onTogglePin?: (chatId: string) => void;
}

function chatRowDateLabel(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (d.getTime() === today.getTime()) return 'Today';
  if (d.getTime() === yesterday.getTime()) return 'Yesterday';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function getDateLabel(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const chatDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  if (chatDate.getTime() === today.getTime()) {
    return "Today";
  } else if (chatDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return chatDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).replace(/^(\w+)\s/, '$1, ');
  }
}

function groupChatsByDate(chats: HistoryChatItem[]): { label: string; chats: HistoryChatItem[] }[] {
  const groups: Map<string, HistoryChatItem[]> = new Map();
  
  chats.forEach(chat => {
    const date = chat.timestamp || new Date();
    const label = getDateLabel(date);
    if (!groups.has(label)) {
      groups.set(label, []);
    }
    groups.get(label)!.push(chat);
  });
  
  const orderedLabels = ["Today", "Yesterday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const result: { label: string; chats: HistoryChatItem[] }[] = [];
  
  orderedLabels.forEach(label => {
    if (groups.has(label)) {
      result.push({ label, chats: groups.get(label)! });
      groups.delete(label);
    }
  });
  
  groups.forEach((chatList, label) => {
    result.push({ label, chats: chatList });
  });
  
  return result;
}

function MarqueeTitle({ text, active, testId }: { text: string; active: boolean; testId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (active && containerRef.current && textRef.current) {
        const overflow = textRef.current.scrollWidth - containerRef.current.clientWidth;
        setShift(overflow > 0 ? overflow : 0);
      } else {
        setShift(0);
      }
    };
    measure();
    if (!active || !containerRef.current) return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [active, text]);

  const animate = active && shift > 0;

  return (
    <div ref={containerRef} className="flex-1 min-w-0 overflow-hidden">
      <span
        ref={textRef}
        className="text-s font-semibold text-primary"
        style={{
          letterSpacing: '0.28px',
          lineHeight: '18px',
          display: 'inline-block',
          whiteSpace: 'nowrap',
          maxWidth: animate ? 'none' : '100%',
          overflow: animate ? 'visible' : 'hidden',
          textOverflow: animate ? 'clip' : 'ellipsis',
          verticalAlign: 'bottom',
          ...(animate
            ? {
                animation: `atlas-title-marquee ${Math.max(3, shift / 25)}s linear infinite`,
                ['--marquee-shift' as string]: `-${shift}px`,
              }
            : {}),
        }}
        data-testid={testId}
      >
        {text}
      </span>
    </div>
  );
}

function HistoryPanel({ onBack, onToggle, onNewChat, chats, currentChatId, currentChatName, onSelectChat, onRenameChat, onDeleteChat, onTogglePin }: HistoryPanelProps) {
  const [searchValue, setSearchValue] = useState("");
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [renamingChatId, setRenamingChatId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [historyGroupBy, setHistoryGroupBy] = useState<'none' | 'similarity' | 'date'>('none');
  const [deleteConfirmChatId, setDeleteConfirmChatId] = useState<string | null>(null);

  const commitRename = () => {
    if (renamingChatId && renameValue.trim()) {
      onRenameChat?.(renamingChatId, renameValue.trim());
    }
    setRenamingChatId(null);
    setRenameValue("");
  };

  const allChats: HistoryChatItem[] = currentChatId 
    ? [{ id: currentChatId, name: currentChatName, timestamp: new Date(), pinned: chats.find(c => c.id === currentChatId)?.pinned }, ...chats.filter(c => c.id !== currentChatId)]
    : chats;

  const filteredChats = allChats.filter(chat => 
    chat.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const groupedChats = groupChatsByDate(filteredChats);

  return (
    <div className="flex flex-col h-full bg-primary">
      <DeleteChatConfirmModal
        open={!!deleteConfirmChatId}
        onCancel={() => setDeleteConfirmChatId(null)}
        onConfirm={() => { if (deleteConfirmChatId) onDeleteChat?.(deleteConfirmChatId); setDeleteConfirmChatId(null); }}
      />
      <style>{`@keyframes atlas-title-marquee { 0%, 15% { transform: translateX(0); } 85%, 100% { transform: translateX(var(--marquee-shift)); } }`}</style>
      <div 
        className="flex items-center justify-between flex-shrink-0"
        style={{ 
          height: '64px', 
          padding: '16px',
          background: 'linear-gradient(to bottom, var(--atlas-panel-bg, #ffffff) 79.687%, transparent)'
        }}
      >
        <div className="flex items-center flex-1" style={{ gap: '16px' }}>
          <Button
            variant="secondary"
            size="small"
            iconPosition="center"
            Icon={<ChevronLeftIcon size="small" variant="action" />}
            aria-label="Back"
            data-testid="button-history-back"
            onClick={onBack}
          />
          <span className="text-m font-medium text-primary">History</span>
        </div>
        <div className="flex items-center" style={{ gap: '4px' }}>
          <Button
            variant="secondary"
            size="small"
            iconPosition="center"
            Icon={<CloseIcon size="small" />}
            aria-label="Close"
            data-testid="button-close-history"
            onClick={onToggle}
          />
        </div>
      </div>

      <div 
        className="flex-1 overflow-y-auto"
        style={{ padding: '16px', paddingTop: '0' }}
      >
        <div className="flex flex-col" style={{ gap: '24px' }}>
            <TextInput
              id="atlas-panel-history-search"
              label="Search history"
              hideLabel
              type="search"
              size="small"
              fullWidth
              LeftIcon={<SearchIcon size="small" variant="secondary" />}
              style={{ height: "34px" }}
              placeholder="Search history"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              data-testid="input-history-search"
            />

          <CoachChatHistory search={searchValue} />

          {filteredChats.length > 0 ? (
              <div className="flex flex-col" style={{ gap: '8px' }}>
                <div className="flex items-center justify-between">
                  <span 
                    className="text-xs font-semibold text-secondary"
                    style={{ letterSpacing: '0.24px' }}
                  >
                    {historyGroupBy === 'none' && filteredChats.some(c => c.pinned) ? 'Pinned' : 'Recents'}
                  </span>
                </div>
                <div className="flex flex-col">
                  {(() => {
                  const sortedChats = [...filteredChats].sort((a, b) => {
                    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
                    return (b.timestamp?.getTime() || 0) - (a.timestamp?.getTime() || 0);
                  });
                  const renderHistoryRow = (chat: (typeof sortedChats)[number]) => {
                    const isHovered = hoveredItemId === chat.id;
                    const isCurrent = chat.id === currentChatId;
                    return (
                      <div
                        key={chat.id}
                        className={`relative flex items-center rounded-lg cursor-pointer w-full ${
                          isHovered ? 'bg-secondary' : 'bg-primary'
                        }`}
                        style={{ padding: '7px 8px 14px', gap: '8px' }}
                        onMouseEnter={() => setHoveredItemId(chat.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                        onClick={() => {
                          onSelectChat?.(chat.id, chat.name);
                          onBack();
                        }}
                        data-testid={`history-item-${chat.id}`}
                      >
                        <div className="flex flex-col flex-1 min-w-0" style={{ gap: '4px' }}>
                          <div className="flex items-center" style={{ gap: '8px' }}>
                            {renamingChatId === chat.id ? (
                              <input
                                autoFocus
                                value={renameValue}
                                onChange={(e) => setRenameValue(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') commitRename();
                                  if (e.key === 'Escape') { setRenamingChatId(null); setRenameValue(""); }
                                }}
                                onBlur={commitRename}
                                className="text-s font-semibold text-primary flex-1 min-w-0 bg-primary border border-action rounded-base px-0-5"
                                style={{ letterSpacing: '0.28px' }}
                                data-testid={`input-rename-${chat.id}`}
                              />
                            ) : (
                            <MarqueeTitle
                              text={chat.name}
                              active={isHovered || openMenuId === chat.id}
                              testId={`text-title-${chat.id}`}
                            />
                            )}
                            {renamingChatId !== chat.id && (
                              <span
                                className="flex-shrink-0 text-xs text-secondary"
                                style={{ marginLeft: 'auto', letterSpacing: '0.24px', lineHeight: '18px' }}
                                data-testid={`text-date-${chat.id}`}
                              >
                                {chat.timestamp ? chatRowDateLabel(chat.timestamp) : ''}
                              </span>
                            )}
                            {renamingChatId !== chat.id && (
                              <div
                                className="flex-shrink-0"
                                style={{
                                  position: 'absolute',
                                  right: '8px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  background: 'var(--atlas-panel-bg, #ffffff)',
                                  borderRadius: '8px',
                                  visibility: (isHovered || openMenuId === chat.id) ? 'visible' : 'hidden',
                                  opacity: (isHovered || openMenuId === chat.id) ? 1 : 0,
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <DropdownRoot open={openMenuId === chat.id} onOpenChange={(open: boolean) => setOpenMenuId(open ? chat.id : null)}>
                                  <DropdownTrigger asChild>
                                    <Button 
                                      variant="secondary" 
                                      size="tiny"
                                      iconPosition="center"
                                      Icon={<DotsIcon size="small" className="rotate-90" />}
                                      aria-label="More options"
                                      data-testid={`button-more-${chat.id}`}
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  </DropdownTrigger>
                                  <DropdownContent
                                    align="end"
                                    className="p-0 rounded-base min-w-[160px]"
                                    style={{
                                      boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.04)',
                                      border: '0.5px solid #dbdad6',
                                      zIndex: 100000
                                    }}
                                  >
                                    <div className="px-0" style={{ padding: '4px 0' }}>
                                      <DropdownItem
                                        className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                                        data-testid={`dropdown-item-pin-${chat.id}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onTogglePin?.(chat.id);
                                        }}
                                      >
                                        <PinGlyph size={16} className="text-primary" />
                                        <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>
                                          {chat.pinned ? 'Unpin chat' : 'Pin chat'}
                                        </span>
                                      </DropdownItem>
                                      <DropdownItem
                                        className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                                        data-testid={`dropdown-item-rename-${chat.id}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setRenamingChatId(chat.id);
                                          setRenameValue(chat.name);
                                        }}
                                      >
                                        <EditIcon size="small" variant="primary" />
                                        <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>
                                          Rename
                                        </span>
                                      </DropdownItem>
                                      <DropdownItem
                                        className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                                        data-testid={`dropdown-item-delete-${chat.id}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setOpenMenuId(null);
                                          setDeleteConfirmChatId(chat.id);
                                        }}
                                      >
                                        <BinIcon size="small" variant="primary" />
                                        <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>
                                          Delete
                                        </span>
                                      </DropdownItem>
                                    </div>
                                  </DropdownContent>
                                </DropdownRoot>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center" style={{ gap: '8px' }}>
                            <span
                              className="text-xs text-secondary flex-1 min-w-0"
                              style={{
                                letterSpacing: '0.24px',
                                lineHeight: '16px',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {chat.preview || 'No messages sent yet'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  };
                  const bucketFor = (t: string) => {
                    const s = t.toLowerCase();
                    if (/(portfolio|evidence|ksb)/.test(s)) return "Portfolio & evidence";
                    if (/(otj|off-the-job|hours|time)/.test(s)) return "Off-the-job training";
                    if (/(epa|assessment|grading|project|submission)/.test(s)) return "Assessment & projects";
                    if (/career/.test(s)) return "Career";
                    return "Other";
                  };
                  const dateBucketFor = (d?: Date) => {
                    if (!d) return "Older";
                    const now = new Date();
                    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    if (d >= startOfToday) return "Today";
                    if (d >= new Date(startOfToday.getTime() - 7 * 24 * 60 * 60 * 1000)) return "Previous 7 days";
                    return "Older";
                  };
                  const groups = historyGroupBy === 'similarity'
                    ? ["Portfolio & evidence", "Off-the-job training", "Assessment & projects", "Career", "Other"]
                        .map(label => ({ label: label as string | null, items: sortedChats.filter(c => bucketFor(c.name) === label) }))
                        .filter(g => g.items.length > 0)
                    : historyGroupBy === 'date'
                    ? ["Today", "Previous 7 days", "Older"]
                        .map(label => ({ label: label as string | null, items: sortedChats.filter(c => dateBucketFor(c.timestamp) === label) }))
                        .filter(g => g.items.length > 0)
                    : (() => {
                        const pinnedItems = sortedChats.filter(c => c.pinned);
                        if (pinnedItems.length === 0) return [{ label: null as string | null, items: sortedChats }];
                        const recentItems = sortedChats.filter(c => !c.pinned);
                        const gs = [{ label: null as string | null, items: pinnedItems }];
                        if (recentItems.length > 0) gs.push({ label: 'Recent' as string | null, items: recentItems });
                        return gs;
                      })();
                  return groups.map((g, gi) => (
                    <div key={g.label ?? 'all'} className="flex flex-col">
                      {g.label && (
                        <span className="text-xs font-medium text-secondary" style={{ letterSpacing: '0.24px', margin: '8px 0 4px' }}>
                          {g.label}
                        </span>
                      )}
                      {g.items.map(renderHistoryRow)}
                      {g.label && gi < groups.length - 1 && (
                        <div style={{ height: '1px', backgroundColor: '#dbdad6', margin: '8px 4px 4px' }} />
                      )}
                    </div>
                  ));
                  })()}
                </div>
              </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-s text-secondary">
                {searchValue ? 'No chats found' : 'No chat history yet'}
              </span>
              <span className="text-xs text-secondary mt-1">
                {!searchValue && 'Start a conversation to see it here'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export interface AtlasMemory {
  id: string;
  content: string;
  createdAt: string;
}

export interface PersonalisationData {
  aboutYou: string;
  jobTitle: string;
  skillsToImprove: string;
  learningStyle: string;
  biggestChallenge: string;
  atlasIdentityStyle: string;
  atlasIdentityDescription: string;
  memories: AtlasMemory[];
}

const atlasIdentityStyles = [
  { 
    value: 'minimalist', 
    label: 'Minimalist',
    description: 'Keep responses brief and to the point. Focus on essential information only, avoiding lengthy explanations unless specifically requested.'
  },
  { 
    value: 'analyst', 
    label: 'Analyst',
    description: 'Provide detailed, data-driven responses with thorough analysis. Include relevant statistics, comparisons, and structured breakdowns of complex topics.'
  },
  { 
    value: 'coach', 
    label: 'Coach',
    description: 'Take a supportive, encouraging approach. Guide through problems step-by-step, ask clarifying questions, and celebrate progress along the way.'
  },
  { 
    value: 'creative', 
    label: 'Creative',
    description: 'Think outside the box and offer innovative solutions. Use analogies, storytelling, and creative frameworks to explain concepts in memorable ways.'
  },
  { 
    value: 'custom', 
    label: 'Create your own',
    description: 'Define your own custom style for how Atlas should respond to you. Describe the tone, format, and approach you prefer.'
  },
];

const PERSONALISATION_STORAGE_KEY = 'atlas-personalisation';

const defaultMemories: AtlasMemory[] = [
  {
    id: 'mem-1',
    content: 'Prefers visual explanations with diagrams and flowcharts when learning new concepts',
    createdAt: '2025-01-15T10:30:00Z'
  },
  {
    id: 'mem-2', 
    content: 'Currently working on Q1 product roadmap and needs help with prioritisation frameworks',
    createdAt: '2025-01-16T14:20:00Z'
  },
  {
    id: 'mem-3',
    content: 'Has weekly 1:1 meetings with their manager on Thursdays at 2pm',
    createdAt: '2025-01-17T09:15:00Z'
  },
  {
    id: 'mem-4',
    content: 'Interested in transitioning to a senior PM role within the next 18 months',
    createdAt: '2025-01-18T16:45:00Z'
  },
];

const defaultPersonalisationData: PersonalisationData = {
  aboutYou: 'I am a marketing professional with 5 years of experience in digital campaigns. I recently transitioned into a product management role and am eager to develop my technical skills. I learn best through practical examples and real-world case studies.',
  jobTitle: 'Associate Product Manager',
  skillsToImprove: 'Data Analysis, Stakeholder Communication, Agile Methodologies',
  learningStyle: 'hands-on',
  biggestChallenge: 'Balancing strategic thinking with day-to-day execution while managing multiple projects',
  atlasIdentityStyle: 'coach',
  atlasIdentityDescription: 'Take a supportive, encouraging approach. Guide through problems step-by-step, ask clarifying questions, and celebrate progress along the way.',
  memories: defaultMemories,
};

function getStoredPersonalisation(): PersonalisationData {
  try {
    const stored = localStorage.getItem(PERSONALISATION_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load personalisation data:', e);
  }
  return defaultPersonalisationData;
}

function savePersonalisation(data: PersonalisationData): void {
  try {
    localStorage.setItem(PERSONALISATION_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save personalisation data:', e);
  }
}

interface PersonalisationPanelProps {
  onBack: () => void;
  onToggle?: () => void;
}

function PersonalisationPanel({ onBack, onToggle }: PersonalisationPanelProps) {
  const [formData, setFormData] = useState<PersonalisationData>(() => getStoredPersonalisation());
  const [editingMemoryId, setEditingMemoryId] = useState<string | null>(null);
  const [editingMemoryContent, setEditingMemoryContent] = useState('');

  const handleFieldChange = (field: keyof PersonalisationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    savePersonalisation(formData);
    toasts.success("Personalisation saved", "Your preferences have been updated");
    onBack();
  };

  const handleEditMemory = (memory: AtlasMemory) => {
    setEditingMemoryId(memory.id);
    setEditingMemoryContent(memory.content);
  };

  const handleSaveMemory = () => {
    if (!editingMemoryId) return;
    setFormData(prev => ({
      ...prev,
      memories: prev.memories.map(m => 
        m.id === editingMemoryId 
          ? { ...m, content: editingMemoryContent }
          : m
      )
    }));
    setEditingMemoryId(null);
    setEditingMemoryContent('');
  };

  const handleCancelEditMemory = () => {
    setEditingMemoryId(null);
    setEditingMemoryContent('');
  };

  const handleDeleteMemory = (memoryId: string) => {
    setFormData(prev => ({
      ...prev,
      memories: prev.memories.filter(m => m.id !== memoryId)
    }));
  };

  const learningStyles = [
    { value: 'video', label: 'Video tutorials' },
    { value: 'reading', label: 'Reading articles' },
    { value: 'hands-on', label: 'Hands-on practice' },
    { value: 'interactive', label: 'Interactive exercises' },
    { value: 'mentoring', label: 'One-on-one mentoring' },
  ];

  return (
    <div className="flex flex-col h-full bg-primary">
      <div 
        className="flex items-center justify-between flex-shrink-0 border-b border-separator-primary"
        style={{ padding: '16px' }}
      >
        <div className="flex items-center" style={{ gap: '8px' }}>
          <Button
            variant="secondary"
            size="small"
            iconPosition="center"
            Icon={<ChevronLeftIcon size="small" />}
            aria-label="Back"
            data-testid="button-personalisation-back"
            onClick={onBack}
          />
          <span className="text-m font-medium text-primary">Personalisation</span>
        </div>
        <Button
          variant="secondary"
          size="small"
          iconPosition="center"
          Icon={<CloseIcon size="small" />}
          aria-label="Close"
          data-testid="button-close-personalisation"
          onClick={onToggle}
        />
      </div>

      <div className="flex-1 overflow-y-auto" style={{ padding: '16px' }}>
        <div className="flex flex-col" style={{ gap: '24px' }}>
          <div className="flex flex-col" style={{ gap: '8px' }}>
            <h3 className="text-m font-medium text-primary">
              Atlas Identity
            </h3>
            <p className="text-s text-secondary">
              Define how Atlas should communicate with you
            </p>
          </div>

          <div className="flex flex-col w-full [&_.group.relative]:flex [&_.group.relative]:gap-1 [&_.group.relative]:flex-col [&_.group.relative]:w-full" style={{ gap: '16px' }}>
            <Select 
              id="atlas-identity-style" 
              label="Communication Style"
              value={formData.atlasIdentityStyle}
              onValueChange={(value) => {
                handleFieldChange('atlasIdentityStyle', value);
                const selectedStyle = atlasIdentityStyles.find(s => s.value === value);
                if (selectedStyle) {
                  handleFieldChange('atlasIdentityDescription', selectedStyle.description);
                }
              }}
              data-testid="select-atlas-identity"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a communication style" />
              </SelectTrigger>
              <SelectContent>
                {atlasIdentityStyles.map((style) => (
                  <SelectItem 
                    key={style.value} 
                    value={style.value}
                    data-testid={`select-item-identity-${style.value}`}
                  >
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              id="atlas-identity-description"
              label="Style Description"
              value={formData.atlasIdentityDescription}
              onChange={(e) => handleFieldChange('atlasIdentityDescription', e.target.value)}
              placeholder="Describe how you want Atlas to communicate with you..."
              rows={4}
              data-testid="textarea-atlas-identity-description"
            />
          </div>

          <div className="border-t border-separator-primary my-2" />

          <div className="flex flex-col" style={{ gap: '8px' }}>
            <h3 className="text-m font-medium text-primary">
              About You
            </h3>
            <p className="text-s text-secondary">
              Introduce yourself for personalised answers. This information is private and only used to instruct Atlas to be more useful to you.
            </p>
          </div>

          <div className="flex flex-col w-full [&_.group.relative]:flex [&_.group.relative]:gap-1 [&_.group.relative]:flex-col [&_.group.relative]:w-full" style={{ gap: '24px' }}>
            <Textarea
              id="about-you"
              label="What would you like Atlas to know about you to provide a better response?"
              value={formData.aboutYou}
              onChange={(e) => handleFieldChange('aboutYou', e.target.value)}
              placeholder="Share your background, experience, goals, and any context that would help Atlas understand you better..."
              rows={5}
              data-testid="textarea-about-you"
            />

            <TextInput
              id="job-title"
              label="What is your current job title?"
              value={formData.jobTitle}
              onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
              placeholder="e.g. Marketing Manager"
              data-testid="input-job-title"
            />

            <TextInput
              id="skills-to-improve"
              label="Specific Skills to Develop or Improve"
              value={formData.skillsToImprove}
              onChange={(e) => handleFieldChange('skillsToImprove', e.target.value)}
              placeholder="e.g. Data Analysis, Leadership Skills"
              data-testid="input-skills"
            />

            <Select 
              id="learning-style" 
              label="Preferred Learning Style"
              value={formData.learningStyle}
              onValueChange={(value) => handleFieldChange('learningStyle', value)}
              data-testid="select-learning-style"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a learning style" />
              </SelectTrigger>
              <SelectContent>
                {learningStyles.map((style) => (
                  <SelectItem 
                    key={style.value} 
                    value={style.value}
                    data-testid={`select-item-${style.value}`}
                  >
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <TextInput
              id="biggest-challenge"
              label="Biggest Professional Challenge"
              value={formData.biggestChallenge}
              onChange={(e) => handleFieldChange('biggestChallenge', e.target.value)}
              placeholder="e.g. Time management, Team collaboration"
              data-testid="input-challenge"
            />
          </div>

          <div className="border-t border-separator-primary my-2" />

          <div className="flex flex-col" style={{ gap: '8px' }}>
            <h3 className="text-m font-medium text-primary">
              Memories
            </h3>
            <p className="text-s text-secondary">
              Things Atlas has learned about you over time. You can edit or remove any memory.
            </p>
          </div>

          <div className="flex flex-col" style={{ gap: '12px' }}>
            {formData.memories && formData.memories.length > 0 ? (
              formData.memories.map((memory) => (
                <div 
                  key={memory.id}
                  className="border border-separator-primary rounded-md bg-secondary"
                  style={{ padding: '12px' }}
                  data-testid={`memory-item-${memory.id}`}
                >
                  {editingMemoryId === memory.id ? (
                    <div className="flex flex-col" style={{ gap: '8px' }}>
                      <textarea
                        value={editingMemoryContent}
                        onChange={(e) => setEditingMemoryContent(e.target.value)}
                        className="w-full border border-separator-primary rounded-base bg-primary text-primary text-s"
                        style={{ padding: '8px', minHeight: '60px', resize: 'vertical' }}
                        data-testid={`memory-edit-textarea-${memory.id}`}
                      />
                      <div className="flex justify-end" style={{ gap: '8px' }}>
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={handleCancelEditMemory}
                          data-testid={`memory-cancel-${memory.id}`}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          size="small"
                          onClick={handleSaveMemory}
                          data-testid={`memory-save-${memory.id}`}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between" style={{ gap: '8px' }}>
                      <p className="text-s text-primary flex-1">{memory.content}</p>
                      <div className="flex items-center flex-shrink-0" style={{ gap: '4px' }}>
                        <Button
                          variant="text"
                          size="tiny"
                          iconPosition="center"
                          Icon={<EditIcon size="small" />}
                          aria-label="Edit memory"
                          onClick={() => handleEditMemory(memory)}
                          data-testid={`memory-edit-${memory.id}`}
                        />
                        <Button
                          variant="text"
                          size="tiny"
                          iconPosition="center"
                          Icon={<BinIcon size="small" />}
                          aria-label="Delete memory"
                          onClick={() => handleDeleteMemory(memory.id)}
                          data-testid={`memory-delete-${memory.id}`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="border border-dashed border-separator-primary rounded-md bg-secondary" style={{ padding: '24px' }}>
                <p className="text-s text-secondary text-center">
                  No memories yet. Atlas will learn about you as you interact.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div 
        className="flex-shrink-0 flex items-center justify-end border-t border-separator-primary bg-primary"
        style={{ 
          padding: '16px',
          boxShadow: '0px -4px 8px 0px rgba(247, 248, 249, 1)'
        }}
      >
        <Button
          variant="primary"
          onClick={handleSave}
          data-testid="button-save-personalisation"
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export async function submitAtlasFeedback(feedback: {
  choice: string;
  comments: string;
  openToContact: boolean;
}): Promise<void> {
  try {
    await apiRequest("POST", "/api/feedback", feedback);
    toasts.success("Thanks for your feedback");
  } catch (error) {
    console.error("[Atlas feedback] failed to submit", error);
    toasts.error("Something went wrong sending your feedback. Please try again.");
    throw error;
  }
}
export function DeleteChatConfirmModal({ open, onCancel, onConfirm }: { open: boolean; onCancel: () => void; onConfirm: () => void }) {
  if (!open) return null;
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.4)', zIndex: 100001 }}
      onClick={onCancel}
      onKeyDown={(e) => { if (e.key === 'Escape') onCancel(); }}
      data-testid="overlay-delete-chat"
    >
      <div
        style={{ background: '#ffffff', borderRadius: 12, width: 520, maxWidth: 'calc(100vw - 48px)', boxShadow: '0px 8px 24px rgba(0,0,0,0.16)', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-chat-title"
      >
        <div style={{ padding: '24px 28px 8px' }}>
          <div id="delete-chat-title" style={{ fontSize: 20, fontWeight: 700, color: '#1a1a19', letterSpacing: '0.2px' }}>Delete chat?</div>
        </div>
        <div style={{ padding: '12px 28px 24px', borderBottom: '0.5px solid #dbdad6' }}>
          <div style={{ fontSize: 16, color: '#1a1a19', letterSpacing: '0.2px' }}>This will delete this chat</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '16px 20px' }}>
          <button
            style={{ height: 40, padding: '0 20px', borderRadius: 10, background: '#ffffff', border: '1px solid #dbdad6', fontSize: 15, fontWeight: 600, color: '#1a1a19', cursor: 'pointer' }}
            onClick={onCancel}
            autoFocus
            data-testid="button-cancel-delete-chat"
          >
            Cancel
          </button>
          <button
            style={{ height: 40, padding: '0 20px', borderRadius: 10, background: '#c14a35', border: 'none', fontSize: 15, fontWeight: 600, color: '#ffffff', cursor: 'pointer' }}
            onClick={onConfirm}
            data-testid="button-confirm-delete-chat"
          >
            Delete chat
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function AtlasFeedbackModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [feedbackChoice, setFeedbackChoice] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackContact, setFeedbackContact] = useState(false);

  if (!open) return null;

  const feedbackOptions = [
    "I'm enjoying Atlas",
    "I've encountered some issues",
    "I have suggestions for improvement",
    "Something else",
  ];

  const close = () => {
    setFeedbackChoice('');
    setFeedbackText('');
    setFeedbackContact(false);
    onClose();
  };

  const submit = async () => {
    try {
      await submitAtlasFeedback({
        choice: feedbackChoice,
        comments: feedbackText,
        openToContact: feedbackContact,
      });
      close();
    } catch {
      // keep the modal open so the user can retry
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 100001, backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={close}
      data-testid="atlas-feedback-modal-overlay"
    >
      <div
        className="bg-primary rounded-lg flex flex-col"
        style={{ width: '440px', maxWidth: 'calc(100vw - 32px)', maxHeight: 'calc(100vh - 64px)', boxShadow: '0px 8px 24px 0px rgba(0,0,0,0.16)' }}
        onClick={(e) => e.stopPropagation()}
        data-testid="atlas-feedback-modal"
      >
        <div className="flex items-center justify-between p-2 border-b border-separator-primary">
          <span className="text-m font-semibold text-primary">Leave feedback</span>
          <Button
            variant="secondary"
            size="small"
            iconPosition="center"
            Icon={<CloseIcon size="small" />}
            aria-label="Close"
            data-testid="button-feedback-close"
            onClick={close}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-2 flex flex-col" style={{ gap: '20px' }}>
          <p className="text-s text-primary" style={{ lineHeight: '1.5' }}>
            We're always looking to improve your experience with Atlas. If you've got feedback, we'd love to hear it. Whether it's a compliment, a suggestion, or a concern, your input is valuable.
          </p>
          <div className="flex flex-col" style={{ gap: '12px' }}>
            <span className="text-s font-semibold text-primary">What's on your mind?</span>
            <div className="flex flex-col" style={{ gap: '8px' }}>
              {feedbackOptions.map((opt) => (
                <label key={opt} className="flex items-center cursor-pointer" style={{ gap: '8px' }}>
                  <input
                    type="radio"
                    name="feedback-modal-choice"
                    value={opt}
                    checked={feedbackChoice === opt}
                    onChange={() => setFeedbackChoice(opt)}
                    className="w-3 h-3 accent-action cursor-pointer"
                    data-testid={`radio-feedback-${opt.replace(/\s+/g, '-').toLowerCase()}`}
                  />
                  <span className="text-s text-primary">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <Textarea
            id="atlas-feedback-comments"
            label="Tell us more (optional)"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Share any details you'd like us to know..."
            rows={3}
            data-testid="textarea-feedback-comments"
          />
          <label className="flex items-start cursor-pointer" style={{ gap: '8px' }}>
            <input
              type="checkbox"
              checked={feedbackContact}
              onChange={(e) => setFeedbackContact(e.target.checked)}
              className="mt-0-5 w-3 h-3 accent-action cursor-pointer"
              data-testid="checkbox-feedback-contact"
            />
            <span className="text-s font-semibold text-primary" style={{ lineHeight: '1.5' }}>
              Yes, I'm open to being contacted by the Atlas team to participate in user research
            </span>
          </label>
        </div>
        <div className="border-t border-separator-primary p-2 flex items-center justify-end" style={{ gap: '8px' }}>
          <Button variant="secondary" size="default" onClick={close} data-testid="button-feedback-cancel">
            Cancel
          </Button>
          <Button
            variant="primary"
            size="default"
            disabled={!feedbackChoice && !feedbackText.trim()}
            onClick={submit}
            data-testid="button-feedback-submit"
          >
            Submit feedback
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function AtlasSidebar({ version = 1, isVisible = true, onToggle, hideContentGuidance = false, showMessages = false, onMessagesClose, showNotifications = false, onNotificationsClose, showHistory = false, onHistoryClose, showPersonalisation = false, onPersonalisationClose, suggestions = defaultSuggestions, contentGuidance, contentGuidanceTitle, greeting, topContent, currentPageContext, prototypeMode = 'after', side = 'right' }: AtlasSidebarProps) {
  
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [panelWidth, setPanelWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [showLocalPersonalisation, setShowLocalPersonalisation] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  
  const hasValue = inputValue.trim().length > 0;
  
  const isPersonalisationVisible = showPersonalisation || showLocalPersonalisation;
  
  const handlePersonalisationClose = () => {
    setShowLocalPersonalisation(false);
    onPersonalisationClose?.();
  };
  
  const MIN_WIDTH = 300;
  const MAX_WIDTH = 600;
  
  const getAtlasUrl = () => {
    return currentPageContext ? `/atlas?context=${currentPageContext}` : '/atlas';
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startWidth = panelWidth;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = startX - moveEvent.clientX;
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + deltaX));
      setPanelWidth(newWidth);
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (version === 2) {
    return <AtlasVersion2 isVisible={isVisible} onToggle={onToggle} hideContentGuidance={hideContentGuidance} suggestions={suggestions} side={side} />;
  }

  if (version === 3) {
    return <AtlasVersion3 isVisible={isVisible} onToggle={onToggle} hideContentGuidance={hideContentGuidance} showMessages={showMessages} onMessagesClose={onMessagesClose} showNotifications={showNotifications} onNotificationsClose={onNotificationsClose} showHistory={showHistory} onHistoryClose={onHistoryClose} suggestions={suggestions} contentGuidance={contentGuidance} contentGuidanceTitle={contentGuidanceTitle} greeting={greeting} topContent={topContent} currentPageContext={currentPageContext} prototypeMode={prototypeMode} side={side} />;
  }
  
  return (
    <motion.div 
      className={`bg-primary ${side === 'left' ? 'border-r' : 'border-l'} border-separator-primary flex flex-col h-full flex-shrink-0 relative`}
      style={{ width: `${panelWidth}px` }}
      variants={side === 'left' ? panelVariantsLeft : panelVariants}
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      data-testid="atlas-sidebar"
    >
        <div
          className="absolute left-0 top-0 h-full cursor-ew-resize z-10 group"
          style={{ width: '8px', marginLeft: '-4px' }}
          onMouseDown={handleMouseDown}
          data-testid="atlas-resize-handle"
        >
          <div className="absolute left-1/2 top-0 h-full w-[2px] -ml-px bg-transparent group-hover:bg-action transition-colors" />
        </div>
      {showMessages ? (
        <MessagesPanel onBack={() => onMessagesClose?.()} onToggle={onToggle} />
      ) : showNotifications ? (
        <NotificationsPanel onBack={() => onNotificationsClose?.()} onToggle={onToggle} />
      ) : showHistory ? (
        <HistoryPanel 
          onBack={() => onHistoryClose?.()} 
          onToggle={onToggle}
          chats={[]}
          currentChatId={null}
          currentChatName="New Atlas chat"
        />
      ) : isPersonalisationVisible ? (
        <PersonalisationPanel 
          onBack={handlePersonalisationClose} 
          onToggle={onToggle}
        />
      ) : (
        <>
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center" style={{ gap: '8px' }}>
              <span
                className="font-medium text-primary whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ fontSize: '14px', letterSpacing: '0.28px', lineHeight: '1.5' }}
              >
                Atlas
              </span>
              <div className="flex items-center" style={{ gap: '4px' }}>
                <img src={multiverseLogomark} alt="" style={{ width: '14px', height: '11.9px' }} />
                <span
                  className="font-medium text-secondary whitespace-nowrap"
                  style={{ fontSize: '14px', letterSpacing: '0.28px', lineHeight: '1.5' }}
                >
                  AI Guide
                </span>
              </div>
            </div>
            <div className="flex items-center" style={{ gap: '4px' }}>
              <DropdownRoot>
                <DropdownTrigger asChild>
                  <Button
                    variant="secondary"
                    size="small"
                    iconPosition="center"
                    Icon={<DotsIcon size="small" />}
                    aria-label="More options"
                    data-testid="button-more-options"
                  />
                </DropdownTrigger>
                <DropdownContent 
                  align="end" 
                  className="p-0 rounded-base min-w-[180px]"
                  style={{
                    boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.04)',
                    border: '0.5px solid #dbdad6',
                    zIndex: 100000
                  }}
                >
                  <div className="py-1-5 px-0">
                    <DropdownItem 
                      className="group flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-[#f5f3ee]"
                      data-testid="dropdown-item-feedback"
                      onClick={() => setShowFeedbackModal(true)}
                    >
                      <HeartIcon size="small" variant="primary" className="transition-colors group-hover:[&_path]:fill-[#E1705F] group-hover:[&_path]:stroke-[#E1705F]" />
                      <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>
                        Leave feedback
                      </span>
                    </DropdownItem>
                  </div>
                </DropdownContent>
              </DropdownRoot>
              <AtlasFeedbackModal open={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />
              <Button
                variant="secondary"
                size="small"
                iconPosition="center"
                Icon={<CloseIcon size="small" />}
                aria-label="Close"
                data-testid="button-collapse-atlas"
                onClick={onToggle}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col p-2 overflow-y-auto" style={{ gap: '24px' }}>
        <div className="flex flex-col items-start mt-auto" style={{ gap: '24px' }}>
          <div 
            className="flex items-center justify-center"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '8.605px',
              background: 'white',
              boxShadow: '0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)',
              transform: 'rotate(-3.88deg)',
            }}
          >
            <img src={atlasIcon} alt="Atlas" style={{ width: '24px', height: '26px' }} />
          </div>
          
          <h3 className="text-m font-medium text-primary" data-testid="text-atlas-greeting">
            Hey Sarah, I can help you navigate your apprenticeship
          </h3>
        </div>

        <div className="flex flex-col items-start" style={{ gap: '8px' }}>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="group w-full flex cursor-pointer select-none items-center text-s font-medium leading-tight transition-all bg-primary border border-separator-primary rounded-lg hover:bg-secondary active:bg-[#e8e7e3] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] active:shadow-none text-left"
              style={{
                padding: '8px 12px'
              }}
              data-testid={`button-suggestion-${index}`}
            >
              <div className="flex items-center" style={{ gap: '8px' }}>
                <SuggestionIcon type={suggestion.icon} />
                <span className="text-action underline decoration-dashed underline-offset-4 group-hover:decoration-solid" style={{ letterSpacing: '0.28px' }}>{suggestion.text}</span>
              </div>
            </button>
          ))}
        </div>

        {!hideContentGuidance && (
          <div className="flex flex-col items-start gap-1">
            <span className="text-s font-medium text-secondary">Content guidance</span>
            {defaultContentGuidance.map((item, index) => (
              <button
                key={index}
                className="w-full p-1 text-left hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: '#f5f7ff',
                  borderRadius: '5px'
                }}
                data-testid={`button-guidance-${index}`}
              >
                <span className="text-s font-medium text-action">{item}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-2">
        <div 
          className="flex flex-col overflow-hidden transition-all"
          style={{
            backgroundColor: '#ffffff',
            border: isFocused ? ('1px solid #4a5ff7') : '1px solid #dbdad6',
            borderRadius: '16px',
            padding: '8px',
            boxShadow: isFocused ? ('0px 0px 0px 2px #d2d7fd') : 'none'
          }}
          data-testid="atlas-input-container"
        >
          <div style={{ padding: '8px' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask me anything..."
              className="w-full text-s bg-transparent outline-none"
              style={{
                color: hasValue ? '#212223' : '#6f7171'
              }}
              data-testid="input-atlas-message"
            />
          </div>
          <div className="flex items-center justify-between" style={{ height: '32px' }}>
            <Button
              variant="text"
              size="small"
              iconPosition="center"
              Icon={<PlusIcon size="small" />}
              aria-label="Add attachment"
              data-testid="button-add-attachment"
            />
            <div style={{ opacity: hasValue ? 1 : 0.64 }}>
              <Button
                variant="primary"
                size="small"
                iconPosition="center"
                Icon={<ArrowUpIcon size="small" variant="white" />}
                aria-label="Send message"
                data-testid="button-send"
              />
            </div>
          </div>
        </div>
      </div>
        </>
      )}
    </motion.div>
  );
}

const panelVariantsV2: Variants = {
  hidden: { 
    x: "calc(100% + 16px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      mass: 1
    }
  },
  visible: { 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 35,
      mass: 0.8
    }
  }
};

const panelVariantsV2Left: Variants = {
  hidden: { 
    x: "calc(-100% - 16px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      mass: 1
    }
  },
  visible: { 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 35,
      mass: 0.8
    }
  }
};


export function UnifiedAtlasControl({
  atlasLockedClosed,
  sidebarOpen,
  onSidebarClick,
  onFullViewClick,
}: {
  atlasLockedClosed: boolean;
  sidebarOpen: boolean;
  onSidebarClick: () => void;
  onFullViewClick: () => void;
}) {
  const [sbHovered, setSbHovered] = useState(false);
  const [fvHovered, setFvHovered] = useState(false);
  const sidebarActive = sidebarOpen && !atlasLockedClosed;
  const fullViewActive = atlasLockedClosed;

  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'stretch',
        height: 36, gap: 1,
        whiteSpace: 'nowrap',
        marginRight: 12,
        flexShrink: 0,
      }}
    >
      {/* Ask Atlas — static label */}
      <div
        data-testid="label-ask-atlas"
        style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '0 14px',
          fontSize: 13.5, fontWeight: 600, color: '#1a1a19',
          letterSpacing: '0.2px', flexShrink: 0,
        }}
      >
        <img src={atlasIcon} alt="Atlas" style={{ width: 17, height: 17 }} />
        Ask Atlas
      </div>

      {/* Bordered mode switcher */}
      <div style={{
        display: 'inline-flex', alignItems: 'stretch',
        background: '#ffffff',
        border: '0.5px solid #dbdad6',
        borderRadius: 12,
        boxShadow: '0px 1px 4px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
      {/* Sidebar segment — tooltip only when disabled */}
      {atlasLockedClosed ? (
        <Tooltip
          title="Atlas is running in a new tab. The sidebar is paused until you close it."
          placement="bottom"
        >
        <button
          onClick={() => { if (!atlasLockedClosed) onSidebarClick(); }}
          onMouseEnter={() => setSbHovered(true)}
          onMouseLeave={() => setSbHovered(false)}
          data-testid="button-atlas-sidebar-mode"
          aria-pressed={sidebarActive}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '0 12px',
            background: atlasLockedClosed ? '#efeeeb' : sidebarActive ? '#eef2ff' : sbHovered ? '#f5f4f1' : 'transparent',
            cursor: atlasLockedClosed ? 'not-allowed' : 'pointer',
            transition: 'background .12s',
            flexShrink: 0,
          }}
        >
          {sidebarActive && (
            <span style={{ position: 'relative', width: 7, height: 7, flexShrink: 0, display: 'inline-flex' }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: '#22c07e' }} />
              <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: 999, background: '#22c07e', opacity: 0.5 }} />
            </span>
          )}
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={sidebarActive ? '#3b3fd8' : atlasLockedClosed ? '#767674' : '#6f7171'} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <rect x="3" y="3" width="18" height="18" rx="3" /><line x1="9" y1="3" x2="9" y2="21" />
          </svg>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: sidebarActive ? '#3b3fd8' : atlasLockedClosed ? '#767674' : '#6f7171', letterSpacing: '0.1px' }}>Panel</span>
        </button>
        </Tooltip>
      ) : (
        <button
          onClick={() => { if (!atlasLockedClosed) onSidebarClick(); }}
          onMouseEnter={() => setSbHovered(true)}
          onMouseLeave={() => setSbHovered(false)}
          data-testid="button-atlas-sidebar-mode"
          aria-pressed={sidebarActive}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '0 12px',
            background: atlasLockedClosed ? '#efeeeb' : sidebarActive ? '#eef2ff' : sbHovered ? '#f5f4f1' : 'transparent',
            cursor: atlasLockedClosed ? 'not-allowed' : 'pointer',
            transition: 'background .12s',
            flexShrink: 0,
          }}
        >
          {sidebarActive && (
            <span style={{ position: 'relative', width: 7, height: 7, flexShrink: 0, display: 'inline-flex' }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: '#22c07e' }} />
              <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: 999, background: '#22c07e', opacity: 0.5 }} />
            </span>
          )}
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={sidebarActive ? '#3b3fd8' : atlasLockedClosed ? '#767674' : '#6f7171'} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <rect x="3" y="3" width="18" height="18" rx="3" /><line x1="9" y1="3" x2="9" y2="21" />
          </svg>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: sidebarActive ? '#3b3fd8' : atlasLockedClosed ? '#767674' : '#6f7171', letterSpacing: '0.1px' }}>Panel</span>
        </button>
      )}

      {/* Divider */}
      <div style={{ width: 0.5, background: '#dbdad6', flexShrink: 0 }} />

      {/* Full view segment */}
      <button
        onClick={onFullViewClick}
        onMouseEnter={() => setFvHovered(true)}
        onMouseLeave={() => setFvHovered(false)}
        data-testid="button-atlas-fullview-mode"
        aria-pressed={fullViewActive}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '0 14px 0 12px',
          background: fullViewActive ? '#eef2ff' : (fvHovered ? '#f5f4f1' : 'transparent'),
          cursor: 'pointer',
          transition: 'background .12s',
          flexShrink: 0,
        }}
      >
        {fullViewActive && (
          <span style={{ position: 'relative', width: 7, height: 7, flexShrink: 0, display: 'inline-flex' }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: '#22c07e' }} />
            <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: 999, background: '#22c07e', opacity: 0.5 }} />
          </span>
        )}
        <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={fullViewActive ? '#3b3fd8' : '#6f7171'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: fullViewActive ? '#3b3fd8' : '#6f7171', letterSpacing: '0.1px' }}>Full view</span>
      </button>
      </div>
    </div>
  );
}

function AtlasVersion2({ isVisible = true, onToggle, hideContentGuidance = false, suggestions = defaultSuggestions, side = 'right' }: { isVisible?: boolean; onToggle?: () => void; hideContentGuidance?: boolean; suggestions?: SuggestionItem[]; side?: 'left' | 'right' }) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [panelWidth, setPanelWidth] = useState(384);
  const [isResizing, setIsResizing] = useState(false);
  const [showLocalPersonalisation, setShowLocalPersonalisation] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const hasValue = inputValue.trim().length > 0;
  
  const MIN_WIDTH = 300;
  const MAX_WIDTH = 600;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startWidth = panelWidth;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = startX - moveEvent.clientX;
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + deltaX));
      setPanelWidth(newWidth);
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <motion.div 
      className="bg-primary flex flex-col flex-shrink-0 relative"
      style={{
        borderRadius: '24px',
        border: '0.5px solid #dbdad6',
        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.06)',
        margin: '16px',
        ...(side === 'left' ? { marginRight: '0' } : { marginLeft: '0' }),
        height: 'calc(100% - 32px)',
        width: `${panelWidth}px`
      }}
      variants={side === 'left' ? panelVariantsV2Left : panelVariantsV2}
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      data-testid="atlas-sidebar-v2"
    >
        <div
          className="absolute left-0 top-0 h-full cursor-ew-resize z-10 group"
          style={{ width: '8px', marginLeft: '-4px' }}
          onMouseDown={handleMouseDown}
          data-testid="atlas-resize-handle-v2"
        >
          <div className="absolute left-1/2 top-0 h-full w-[2px] -ml-px bg-transparent group-hover:bg-action transition-colors" />
        </div>
      {showLocalPersonalisation ? (
        <PersonalisationPanel 
          onBack={() => setShowLocalPersonalisation(false)} 
          onToggle={onToggle}
        />
      ) : (
        <>
      <div className="flex items-center justify-between p-2">
        <DropdownRoot>
          <DropdownTrigger asChild>
            <button 
              className="flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 group"
              data-testid="dropdown-atlas-title"
            >
              <span className="text-s font-medium text-primary">Atlas V2</span>
              <ChevronDownIcon 
                size="small" 
                className="transition-transform duration-150 group-data-[state=open]:rotate-180"
              />
            </button>
          </DropdownTrigger>
          <DropdownContent 
            align="start" 
            className="w-[280px] p-0-5 rounded-lg"
            style={{
              boxShadow: '0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)',
              zIndex: 100000,
              backgroundColor: '#ffffff'
            }}
          >
            <div className="px-1 py-0-25">
              <span className="text-s font-medium text-secondary" style={{ letterSpacing: '0.28px' }}>
                Recent chats
              </span>
            </div>
            <div className="px-1 py-1">
              <span className="text-s text-secondary" style={{ letterSpacing: '0.28px' }}>
                No recent chats
              </span>
            </div>
            <div className="mt-0-5">
              <Button
                variant="secondary"
                size="small"
                className="w-full justify-center"
                data-testid="button-view-full-history"
              >
                <HistoryIcon size="small" />
                View full history
              </Button>
            </div>
          </DropdownContent>
        </DropdownRoot>
        <div className="flex items-center" style={{ gap: '4px' }}>
          <DropdownRoot>
            <DropdownTrigger asChild>
              <Button
                variant="secondary"
                size="small"
                iconPosition="center"
                Icon={<DotsIcon size="small" />}
                aria-label="More options"
                data-testid="button-more-options"
              />
            </DropdownTrigger>
            <DropdownContent 
              align="end" 
              className="p-0 rounded-base min-w-[180px]"
              style={{
                boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.04)',
                border: '0.5px solid #dbdad6',
                zIndex: 100000
              }}
            >
              <div className="py-1-5 px-0">
                <DropdownItem 
                  className="group flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-[#f5f3ee]"
                  data-testid="dropdown-item-feedback"
                  onClick={() => setShowFeedbackModal(true)}
                >
                  <HeartIcon size="small" variant="primary" className="transition-colors group-hover:[&_path]:fill-[#E1705F] group-hover:[&_path]:stroke-[#E1705F]" />
                  <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>
                    Leave feedback
                  </span>
                </DropdownItem>
              </div>
            </DropdownContent>
          </DropdownRoot>
          <AtlasFeedbackModal open={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />
          <Button
            variant="secondary"
            size="small"
            iconPosition="center"
            Icon={<CloseIcon size="small" />}
            aria-label="Close"
            data-testid="button-collapse-atlas"
            onClick={onToggle}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3 p-2 pb-2 pt-3 overflow-y-auto justify-end">
        <div className="flex flex-col items-start">
          <h3 className="text-m font-medium text-primary mb-2" data-testid="text-atlas-greeting">
            Hey Sarah, I can help you navigate your apprenticeship
          </h3>
        </div>

        <div className="flex flex-col items-start" style={{ gap: '8px' }}>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="group w-full flex cursor-pointer select-none items-center text-s font-medium leading-tight transition-all bg-primary border border-separator-primary rounded-lg hover:bg-secondary active:bg-[#e8e7e3] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] active:shadow-none text-left"
              style={{
                padding: '8px 12px'
              }}
              data-testid={`button-suggestion-${index}`}
            >
              <div className="flex items-center" style={{ gap: '8px' }}>
                <SuggestionIcon type={suggestion.icon} />
                <span className="text-action underline decoration-dashed underline-offset-4 group-hover:decoration-solid" style={{ letterSpacing: '0.28px' }}>{suggestion.text}</span>
              </div>
            </button>
          ))}
        </div>

        {!hideContentGuidance && (
          <div className="flex flex-col items-start gap-1">
            <span className="text-s font-medium text-secondary">Content guidance</span>
            {defaultContentGuidance.map((item, index) => (
              <button
                key={index}
                className="w-full p-1 text-left hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: '#f5f7ff',
                  borderRadius: '5px'
                }}
                data-testid={`button-guidance-${index}`}
              >
                <span className="text-s font-medium text-action">{item}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-2">
        <div 
          className="flex flex-col overflow-hidden transition-all"
          style={{
            backgroundColor: '#ffffff',
            border: isFocused ? '1px solid #4a5ff7' : '1px solid #dbdad6',
            borderRadius: '15px',
            padding: '8px',
            boxShadow: isFocused ? '0px 0px 0px 2px #d2d7fd' : 'none'
          }}
          data-testid="atlas-input-container"
        >
          <div style={{ padding: '8px' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask me anything..."
              className="w-full text-s bg-transparent outline-none"
              style={{
                color: hasValue ? '#212223' : '#6f7171'
              }}
              data-testid="input-atlas-message"
            />
          </div>
          <div className="flex items-center justify-between" style={{ height: '32px' }}>
            <Button
              variant="text"
              size="small"
              iconPosition="center"
              Icon={<PlusIcon size="small" />}
              aria-label="Add attachment"
              data-testid="button-add-attachment"
            />
            <div style={{ opacity: hasValue ? 1 : 0.64 }}>
              <Button
                variant="primary"
                size="small"
                iconPosition="center"
                Icon={<ArrowUpIcon size="small" variant="white" />}
                aria-label="Send message"
                data-testid="button-send"
              />
            </div>
          </div>
        </div>
      </div>
        </>
      )}
    </motion.div>
  );
}
function AtlasVersion3({ isVisible = true, onToggle, hideContentGuidance = false, showMessages = false, onMessagesClose, showNotifications = false, onNotificationsClose, showHistory: showHistoryProp = false, onHistoryClose, suggestions = defaultSuggestions, contentGuidance, contentGuidanceTitle, greeting, topContent, currentPageContext, prototypeMode = 'after', side = 'right' }: { isVisible?: boolean; onToggle?: () => void; hideContentGuidance?: boolean; showMessages?: boolean; onMessagesClose?: () => void; showNotifications?: boolean; onNotificationsClose?: () => void; showHistory?: boolean; onHistoryClose?: () => void; suggestions?: SuggestionItem[]; contentGuidance?: string[]; contentGuidanceTitle?: string; greeting?: string; topContent?: React.ReactNode; currentPageContext?: string; prototypeMode?: 'before' | 'after'; side?: 'left' | 'right' }) {
  const { forceMoreMenuOpen, onboardingStep, isOnboardingActive, pendingMessage, clearPendingMessage, prototypeTab, setAtlasVisible } = useAtlasVersion();
  const isDraftsMode = prototypeTab === 'drafts' || prototypeTab === 'after-drafts';
  const [location] = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [panelWidth, setPanelWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [showLocalPersonalisation, setShowLocalPersonalisation] = useState(false);
  const [chatMessagesStore, setChatMessagesStore] = useState<Record<string, ChatMessage[]>>(() => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(now);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);

    return {
      "demo-1": [
        { id: "demo-1-u1", type: "user", content: "When is my project submission deadline?", timestamp: now },
        { id: "demo-1-a1", type: "atlas", content: "Your current project submission deadline is **Friday, 20th December 2025**. You have 8 days remaining to submit your work.\n\nWould you like me to help you with:\n- Reviewing the submission requirements\n- Creating a timeline to complete remaining tasks\n- Understanding the grading criteria", timestamp: now },
      ],
      "demo-2": [
        { id: "demo-2-u1", type: "user", content: "Can you explain what KSBs are?", timestamp: now },
        { id: "demo-2-a1", type: "atlas", content: "**KSBs** stands for **Knowledge, Skills, and Behaviours** - these are the core competencies you need to demonstrate throughout your apprenticeship.\n\n**Knowledge** - The theoretical understanding you need\n**Skills** - The practical abilities you develop\n**Behaviours** - The professional attitudes and approaches you demonstrate\n\nEach apprenticeship standard defines specific KSBs that you must evidence in your portfolio and during your End-Point Assessment.", timestamp: now },
      ],
      "demo-3": [
        { id: "demo-3-u1", type: "user", content: "What counts as off-the-job training?", timestamp: yesterday },
        { id: "demo-3-a1", type: "atlas", content: "Off-the-job training is learning that takes place outside of your normal day-to-day work duties. It must:\n\n1. Be directly relevant to your apprenticeship standard\n2. Teach new knowledge, skills and behaviours\n3. Take place during your paid working hours\n\n**Examples include:**\n- Attending workshops or training sessions\n- Online learning and courses\n- Shadowing colleagues in different departments\n- Working on projects specifically for learning\n- Mentoring or coaching sessions", timestamp: yesterday },
      ],
      "demo-4": [
        { id: "demo-4-u1", type: "user", content: "What evidence do I need for my portfolio?", timestamp: twoDaysAgo },
        { id: "demo-4-a1", type: "atlas", content: "Your portfolio should contain evidence that demonstrates your competence across all the KSBs in your apprenticeship standard. Good evidence includes:\n\n- **Work samples** - Documents, presentations, or outputs you've created\n- **Reflective accounts** - Your written reflections on what you learned\n- **Witness statements** - Testimonials from managers or colleagues\n- **Observation records** - Notes from when you were observed completing tasks\n- **Certificates** - Any qualifications or training completed\n\nAim for 2-3 pieces of evidence per KSB, ensuring variety in evidence types.", timestamp: twoDaysAgo },
      ],
      "demo-5": [
        { id: "demo-5-u1", type: "user", content: "How should I prepare for the End-Point Assessment?", timestamp: threeDaysAgo },
        { id: "demo-5-a1", type: "atlas", content: "The End-Point Assessment (EPA) is your final assessment to demonstrate occupational competence. Here's how to prepare:\n\n**1. Know your assessment methods**\nReview what assessments you'll face - this could include professional discussions, projects, presentations, or tests.\n\n**2. Review your portfolio**\nEnsure all evidence is complete and well-organised.\n\n**3. Practice explaining your work**\nBe ready to discuss your experiences and learning in detail.\n\n**4. Revise key knowledge areas**\nRefresh your understanding of theoretical concepts.\n\n**5. Mock assessments**\nWork with your coach to practice under exam conditions.", timestamp: threeDaysAgo },
      ],
      "demo-6": [
        { id: "demo-6-u1", type: "user", content: "What career options do I have after completing my apprenticeship?", timestamp: lastWeek },
        { id: "demo-6-a1", type: "atlas", content: "Completing your apprenticeship opens up several exciting career pathways:\n\n**Immediate options:**\n- Continue in your current role with increased responsibilities\n- Apply for promotion within your organisation\n- Seek roles at other companies with your new qualifications\n\n**Further development:**\n- Progress to a higher-level apprenticeship\n- Pursue professional certifications in your field\n- Consider degree-level study (many apprenticeships provide UCAS points)\n\n**Long-term goals:**\n- Specialise in a particular area of your profession\n- Move into management or leadership roles\n- Consider mentoring future apprentices\n\nWould you like to explore any of these options in more detail?", timestamp: lastWeek },
      ],
    };
  });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatName, setChatName] = useState("Chat");
  const otjQueryClient = useQueryClient();
  const [loggedOtjMessageIds, setLoggedOtjMessageIds] = useState<Set<string>>(new Set());

  const [draftsPromptDismissed, setDraftsPromptDismissed] = useState(false);

  useEffect(() => {
    if (isDraftsMode) {
      setDraftsPromptDismissed(false);
    }
  }, [isDraftsMode, prototypeTab]);

  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const handleOpenFullScreen = (inline = false) => {
    let handoffToken: string | null = null;
    try {
      // Clean up stale handoffs (legacy shared key + tokenized entries older than 5 minutes)
      localStorage.removeItem('atlas-fullscreen-handoff');
      const staleKeys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith(ATLAS_FULLSCREEN_HANDOFF_PREFIX)) continue;
        const createdAt = Number(key.slice(ATLAS_FULLSCREEN_HANDOFF_PREFIX.length).split('-')[0]);
        if (!Number.isFinite(createdAt) || Date.now() - createdAt > 5 * 60 * 1000) {
          staleKeys.push(key);
        }
      }
      staleKeys.forEach((key) => localStorage.removeItem(key));

      if (chatMessages.length > 0) {
        handoffToken = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        localStorage.setItem(`${ATLAS_FULLSCREEN_HANDOFF_PREFIX}${handoffToken}`, JSON.stringify({
          token: handoffToken,
          chatId: currentChatId,
          chatName,
          messages: chatMessages,
        }));
      }
    } catch {
      handoffToken = null;
    }
    // Force-write the active chat into shared state right now (the normal
    // write-through effect skips while Atlas is typing), so the full-screen
    // tab can always resolve the ?chat= id from shared state.
    try {
      if (currentChatId && chatMessages.length > 0) {
        const shared = loadSharedAtlasState() || { chats: [], messages: {} };
        shared.messages[currentChatId] = chatMessages.map(serializeSharedMessage);
        const existing = shared.chats.find(c => c.id === currentChatId);
        if (existing) {
          existing.name = chatName;
        } else {
          const first = chatMessages[0];
          const lastAtlas = [...chatMessages].reverse().find(m => m.type === 'atlas');
          shared.chats = [{
            id: currentChatId,
            name: chatName,
            timestamp: (first.timestamp instanceof Date ? first.timestamp : new Date()).toISOString(),
            pinned: undefined,
            preview: lastAtlas ? lastAtlas.content.replace(/[*#`]/g, '').slice(0, 100) : undefined,
          }, ...shared.chats];
        }
        saveSharedAtlasState(shared, syncSourceIdRef.current);
      }
    } catch {}
    const chatParam = currentChatId && chatMessages.length > 0
      ? `&chat=${encodeURIComponent(currentChatId)}`
      : '';
    const handoffParam = handoffToken ? `&handoff=${encodeURIComponent(handoffToken)}` : '';
    const fullScreenUrl = `/atlas?context=homepage&day=60${chatParam}${handoffParam}`;
    if (inline) {
      window.location.assign(fullScreenUrl);
    } else {
      window.open(fullScreenUrl, 'atlas-fullscreen');
      // Full screen now lives in the new tab: collapse the sidebar here and
      // pre-register the heartbeat so the lock engages without waiting for
      // the new tab's first beat.
      fetch('/api/atlas/fullscreen-heartbeat', { method: 'POST' }).catch(() => {});
      setAtlasVisible(false);
    }
  };
  // Let the top-bar "New Window" menu item route through the same handoff
  // logic so an in-progress chat carries over to the new tab.
  const handleOpenFullScreenRef = useRef(handleOpenFullScreen);
  handleOpenFullScreenRef.current = handleOpenFullScreen;
  useEffect(() => {
    const onOpenWindow = (e: Event) => {
      e.preventDefault();
      const inline = Boolean((e as CustomEvent).detail?.inline);
      handleOpenFullScreenRef.current(inline);
    };
    window.addEventListener('atlas-open-window', onOpenWindow);
    return () => window.removeEventListener('atlas-open-window', onOpenWindow);
  }, []);
  const [recentChats, setRecentChats] = useState<{ id: string; name: string; timestamp?: Date; pinned?: boolean; preview?: string }[]>(() => {
    const now = new Date();
    const today = new Date(now);
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(now);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    return [
      { id: "demo-1", name: "Help with project submission deadline", timestamp: today, preview: "I'd be happy to help you with your project submission deadline! Here are some key things to keep in mind." },
      { id: "demo-2", name: "Understanding KSB requirements", timestamp: today, preview: "KSBs (Knowledge, Skills, and Behaviours) are the core competencies you need to demonstrate." },
      { id: "demo-3", name: "Off-the-job training questions", timestamp: yesterday, preview: "Off-the-job training is a mandatory part of your apprenticeship. Here's what you need to know." },
      { id: "demo-4", name: "Portfolio evidence guidance", timestamp: twoDaysAgo, preview: "Strong portfolio evidence maps clearly to your KSBs and shows your actual work." },
      { id: "demo-5", name: "End-point assessment preparation", timestamp: threeDaysAgo, preview: "Your EPA has several components. Let's break down how to prepare for each one." },
      { id: "demo-6", name: "Career development advice", timestamp: lastWeek, preview: "Great to hear you're thinking about your career development! Here are some suggestions." },
    ];
  });

  // --- Mirroring with full-screen Atlas via shared localStorage state ---
  const syncSourceIdRef = useRef(`panel-${Math.random().toString(36).slice(2)}`);
  const applyingSharedRef = useRef(false);
  const sharedHydratedRef = useRef(false);

  const serializeSharedMessage = (m: ChatMessage): SharedMessage => ({
    ...m,
    timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : String(m.timestamp),
  } as SharedMessage);

  const reviveSharedMessages = (msgs: SharedMessage[]): ChatMessage[] =>
    msgs.map(m => ({ ...(m as unknown as ChatMessage), timestamp: new Date(m.timestamp) }));

  const applySharedState = (shared: SharedAtlasState) => {
    applyingSharedRef.current = true;
    const revived: Record<string, ChatMessage[]> = {};
    for (const [id, msgs] of Object.entries(shared.messages)) {
      revived[id] = reviveSharedMessages(msgs);
    }
    setChatMessagesStore(prev => ({ ...prev, ...revived }));
    setRecentChats(shared.chats.map(c => {
      const lastAtlas = [...(shared.messages[c.id] || [])].reverse().find(m => m.type === 'atlas');
      return {
        id: c.id,
        name: c.name,
        timestamp: new Date(c.timestamp),
        pinned: c.pinned,
        preview: c.preview ?? (lastAtlas ? lastAtlas.content.replace(/[*#`]/g, '').slice(0, 100) : undefined),
      };
    }));
    if (currentChatId) {
      const meta = shared.chats.find(c => c.id === currentChatId);
      if (!meta) {
        setChatMessages([]);
        setChatName("Chat");
        setCurrentChatId(null);
      } else {
        if (meta.name !== chatName) setChatName(meta.name);
        const msgs = revived[currentChatId];
        // Never replace the open conversation while a response is in flight
        if (msgs && !isTyping && JSON.stringify(shared.messages[currentChatId]) !== JSON.stringify(chatMessages.map(serializeSharedMessage))) {
          setChatMessages(msgs);
        }
      }
    }
    requestAnimationFrame(() => { applyingSharedRef.current = false; });
  };

  useEffect(() => {
    // "Back to Multiverse" handoff: full-screen Atlas navigates home with
    // ?atlasChat=<id> so the sidebar reopens the same conversation.
    let requestedChatId: string | null = null;
    try {
      const params = new URLSearchParams(window.location.search);
      requestedChatId = params.get('atlasChat');
      if (params.has('atlasChat') || params.has('atlasOpen')) {
        params.delete('atlasChat');
        params.delete('atlasOpen');
        const qs = params.toString();
        window.history.replaceState({}, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
      }
    } catch {}
    const openRequestedChat = (shared: SharedAtlasState | null, isFinal: boolean) => {
      if (!requestedChatId || !shared) return;
      const meta = shared.chats.find(c => c.id === requestedChatId);
      const msgs = shared.messages[requestedChatId];
      if (meta && msgs && msgs.length > 0) {
        setCurrentChatId(requestedChatId);
        setChatName(meta.name);
        setChatMessages(reviveSharedMessages(msgs));
      }
      // Only consume once the authoritative (server) snapshot has been
      // applied — the localStorage pass may be stale, and consuming early
      // would let an older server copy clobber the restored conversation.
      if (isFinal) requestedChatId = null;
    };
    const shared = loadSharedAtlasState();
    if (shared) applySharedState(shared);
    openRequestedChat(shared, false);
    // Also hydrate from the server (the authoritative copy — localStorage is
    // partitioned between the preview iframe and separate tabs). Enable
    // write-through only after hydration so the mount-pass write effect can't
    // clobber shared state with stale seeds.
    let cancelled = false;
    fetchSharedAtlasState()
      .then(fresh => {
        if (cancelled) return;
        if (fresh) applySharedState(fresh);
        openRequestedChat(fresh ?? loadSharedAtlasState(), true);
      })
      .finally(() => { if (!cancelled) sharedHydratedRef.current = true; });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sharedHydratedRef.current || applyingSharedRef.current || isTyping) return;
    let chats = recentChats.map(c => ({
      id: c.id,
      name: c.name,
      timestamp: (c.timestamp instanceof Date ? c.timestamp : new Date()).toISOString(),
      pinned: c.pinned,
      preview: c.preview,
    }));
    const messages: Record<string, SharedMessage[]> = {};
    for (const [id, msgs] of Object.entries(chatMessagesStore)) {
      messages[id] = msgs.map(serializeSharedMessage);
    }
    if (currentChatId && chatMessages.length > 0) {
      messages[currentChatId] = chatMessages.map(serializeSharedMessage);
      if (chats.some(c => c.id === currentChatId)) {
        chats = chats.map(c => c.id === currentChatId ? { ...c, name: chatName } : c);
      } else {
        const first = chatMessages[0];
        const lastAtlas = [...chatMessages].reverse().find(m => m.type === 'atlas');
        chats = [{
          id: currentChatId,
          name: chatName,
          timestamp: (first.timestamp instanceof Date ? first.timestamp : new Date()).toISOString(),
          pinned: undefined,
          preview: lastAtlas ? lastAtlas.content.replace(/[*#`]/g, '').slice(0, 100) : undefined,
        }, ...chats];
      }
    }
    // Drop messages for chats that no longer exist (deletions)
    const chatIds = new Set(chats.map(c => c.id));
    for (const id of Object.keys(messages)) {
      if (!chatIds.has(id)) delete messages[id];
    }
    saveSharedAtlasState({ chats, messages }, syncSourceIdRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentChats, chatMessagesStore, chatMessages, chatName, currentChatId, isTyping]);

  useEffect(() => {
    return subscribeSharedAtlasState(syncSourceIdRef.current, applySharedState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatId, chatName, chatMessages, isTyping]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<{
    id: string;
    file: File;
    preview: string | null;
    isImage: boolean;
  }[]>([]);
  const [showHistory, setShowHistory] = useState(showHistoryProp);
  const [showChatSwitcher, setShowChatSwitcher] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackChoice, setFeedbackChoice] = useState<string>('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackContact, setFeedbackContact] = useState(false);
  const [messageFeedback, setMessageFeedback] = useState<Record<string, 'like' | 'dislike' | null>>({});
  const [dislikeFeedbackId, setDislikeFeedbackId] = useState<string | null>(null);
  const [dislikeFeedbackText, setDislikeFeedbackText] = useState('');
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const hasValue = inputValue.trim().length > 0 || attachedFiles.length > 0;
  const isInChatMode = chatMessages.length > 0;
  const lastDraftsMessageId = [...chatMessages]
    .reverse()
    .find((m) => m.action?.type === 'otj_drafts')?.id;
  const visibleChatMessages = chatMessages.filter(
    (m) =>
      !(
        m.action?.type === 'otj_drafts' &&
        !m.content?.trim() &&
        !m.action.data?.editedEntries?.length &&
        m.id !== lastDraftsMessageId
      ),
  );
  const [showShaderWave, setShowShaderWave] = useState(false);
  
  const getAtlasUrl = () => {
    return currentPageContext ? `/atlas?context=${currentPageContext}` : '/atlas';
  };

  // Mark message as done streaming
  const handleStreamingComplete = (messageId: string) => {
    setChatMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isStreaming: false } : msg
    ));
  };

  // Copy message to clipboard
  const handleCopyMessage = async (messageId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };

  // Read message aloud using speech synthesis
  const handleReadAloud = (messageId: string, content: string) => {
    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    
    // Strip markdown formatting for cleaner speech
    const cleanText = content
      .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
      .replace(/\*(.*?)\*/g, '$1') // Italic
      .replace(/#{1,6}\s/g, '') // Headers
      .replace(/`{1,3}[^`]*`{1,3}/g, '') // Code blocks
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
      .replace(/^\s*[-*+]\s/gm, '') // List markers
      .replace(/^\s*\d+\.\s/gm, '') // Numbered lists
      .trim();
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);
    speechSynthRef.current = utterance;
    setSpeakingMessageId(messageId);
    window.speechSynthesis.speak(utterance);
  };

  // Toggle like/dislike feedback
  const handleFeedback = (messageId: string, type: 'like' | 'dislike') => {
    const isTurningOff = messageFeedback[messageId] === type;
    if (!isTurningOff) {
      toasts.success("Feedback sent", undefined, { position: 'top-right' });
    }
    setMessageFeedback(prev => ({
      ...prev,
      [messageId]: prev[messageId] === type ? null : type
    }));
    if (type === 'dislike') {
      if (isTurningOff) {
        setDislikeFeedbackId(prev => (prev === messageId ? null : prev));
      } else {
        setDislikeFeedbackId(messageId);
        setDislikeFeedbackText('');
      }
    } else if (dislikeFeedbackId === messageId) {
      setDislikeFeedbackId(null);
    }
  };

  // Regenerate response
  const handleRegenerate = async (messageId: string) => {
    const messageIndex = chatMessages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;

    // Find the previous user message
    let userMessageIndex = messageIndex - 1;
    while (userMessageIndex >= 0 && chatMessages[userMessageIndex].type !== 'user') {
      userMessageIndex--;
    }
    if (userMessageIndex < 0) return;

    const userMessage = chatMessages[userMessageIndex];
    
    // Remove the atlas response and any subsequent messages
    const messagesBeforeRegenerate = chatMessages.slice(0, messageIndex);
    setChatMessages(messagesBeforeRegenerate);
    
    setIsTyping(true);

    try {
      const response = await fetch('/api/atlas/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          history: messagesBeforeRegenerate.slice(-10).map(m => ({ type: m.type, content: m.content })),
          prototypeMode
        }),
        signal: AbortSignal.timeout(30000)
      });

      const data = await response.json();
      
      const atlasMessage: ChatMessage = {
        id: `atlas-${Date.now()}`,
        type: 'atlas',
        content: data.content || data.response || "I apologize, but I couldn't generate a response. Please try again.",
        timestamp: new Date(),
        isStreaming: true,
        action: data.action
      };

      setChatMessages([...messagesBeforeRegenerate, atlasMessage]);
    } catch (error) {
      console.error('Error regenerating response:', error);
      const randomResponse = fakeAtlasResponses[Math.floor(Math.random() * fakeAtlasResponses.length)];
      const atlasMessage: ChatMessage = {
        id: `atlas-${Date.now()}`,
        type: 'atlas',
        ...randomResponse,
        timestamp: new Date(),
        isStreaming: true
      };
      setChatMessages([...messagesBeforeRegenerate, atlasMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);
  
  const MIN_WIDTH = 300;
  const MAX_WIDTH = 600;

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const scrollToBottomDeferred = () => {
    scrollToBottom();
    requestAnimationFrame(() => {
      scrollToBottom();
      requestAnimationFrame(scrollToBottom);
    });
  };

  useEffect(() => {
    const lastChatMessage = chatMessages[chatMessages.length - 1];
    if (
      prototypeTab !== 'after-drafts' &&
      lastChatMessage &&
      lastChatMessage.id === 'drafts-review'
    ) {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = 0;
      }
      return;
    }
    scrollToBottomDeferred();
  }, [chatMessages, isTyping, prototypeMode, prototypeTab]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() && attachedFiles.length === 0) return;
    
    const messageFiles: ChatMessageFile[] = attachedFiles.map(f => ({
      id: f.id,
      name: f.file.name,
      preview: f.preview,
      isImage: f.isImage
    }));
    
    const isFirstMessage = chatMessages.length === 0;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: messageText,
      timestamp: new Date(),
      files: messageFiles.length > 0 ? messageFiles : undefined
    };
    
    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    setInputValue("");

    
    setAttachedFiles([]);
    
    if (!currentChatId) {
      setCurrentChatId(`chat-${Date.now()}`);
    }
    if (chatMessages.length === 0) {
      const isOtjLoggingIntent = /\blog\b[\s\S]*\b(time|otj|off[- ]the[- ]job|hours?|minutes?|mins?)\b|\b(time|otj|off[- ]the[- ]job)\b[\s\S]*\blog/i.test(messageText);
      setChatName(
        isOtjLoggingIntent
          ? 'OTJ logging'
          : messageText.slice(0, 30) + (messageText.length > 30 ? '...' : ''),
      );
    }

    const lastMessage = chatMessages[chatMessages.length - 1];

    const otjSummaryData = otjQueryClient.getQueryData<OtjSummary>(['/api/otj']);
    const hasCompleteDrafts = (otjSummaryData?.entries || []).some(
      (e) => e.status === 'draft' && getDraftMissingFields(e).length === 0,
    );

    let pendingOtjMessage: ChatMessage | null = null;
    let pendingDraftsMessage: ChatMessage | null = null;
    let pendingDeleteMessage: ChatMessage | null = null;
    for (let i = chatMessages.length - 1; i >= 0; i--) {
      const m = chatMessages[i];
      if (m.type !== 'atlas' || loggedOtjMessageIds.has(m.id)) continue;
      if (m.action?.type === 'otj_log') {
        pendingOtjMessage = m;
        break;
      }
      if (m.action?.type === 'otj_delete_confirm') {
        pendingDeleteMessage = m;
        break;
      }
      if (m.action?.type === 'otj_drafts') {
        if (hasCompleteDrafts) pendingDraftsMessage = m;
        break;
      }
    }
    const pendingOtjAction =
      pendingOtjMessage && pendingOtjMessage.action?.type === 'otj_log'
        ? pendingOtjMessage.action
        : null;

    if (prototypeTab === 'after-drafts' && AFFIRMATIVE_REPLY_RE.test(messageText.trim())) {
      const alreadyShownReview = chatMessages.some((m) => m.id === 'drafts-review');
      const lastAtlas = [...chatMessages].reverse().find((m) => m.type === 'atlas');
      const showedDraftsPrompt =
        !!lastAtlas &&
        (lastAtlas.action?.type === 'otj_logged' || lastAtlas.action?.type === 'otj_edited');
      if (!alreadyShownReview && showedDraftsPrompt) {
        setIsTyping(true);
        try {
          const res = await apiRequest('POST', '/api/otj/reset-drafts', undefined);
          const summary = await res.json();
          otjQueryClient.setQueryData(['/api/otj'], summary);
          await otjQueryClient.invalidateQueries({ queryKey: ['/api/otj'] });
        } catch {
          // If reset fails, still show whatever drafts we have
        }
        setTimeout(() => {
          setChatMessages((prev) => [
            ...prev,
            {
              id: 'drafts-review',
              type: 'atlas',
              content: '',
              timestamp: new Date(),
              action: { type: 'otj_drafts' },
            },
          ]);
          setIsTyping(false);
        }, 500);
        return;
      }
    }

    if (pendingDeleteMessage && AFFIRMATIVE_REPLY_RE.test(messageText.trim())) {
      const deleteMessage = pendingDeleteMessage;
      const entries =
        deleteMessage.action?.type === 'otj_delete_confirm'
          ? deleteMessage.action.data.entries
          : [];
      setIsTyping(true);
      try {
        if (entries.length === 0) throw new Error('No entry to remove');
        let summary: OtjSummary | null = null;
        for (const entry of entries) {
          const res = await apiRequest('DELETE', `/api/otj/${entry.id}`, undefined);
          summary = await res.json();
        }
        if (!summary) throw new Error('No entry to remove');
        setLoggedOtjMessageIds((prev) => new Set(prev).add(deleteMessage.id));
        otjQueryClient.setQueryData(['/api/otj'], summary);
        await otjQueryClient.invalidateQueries({ queryKey: ['/api/otj'] });
        const deletedTasks = entries.map((e) => e.task || 'that entry');
        setChatMessages((prev) => [
          ...prev,
          {
            id: `atlas-${Date.now()}`,
            type: 'atlas',
            content: `Done — I've removed ${
              deletedTasks.length === 1
                ? `"${deletedTasks[0]}"`
                : `${deletedTasks.length} entries`
            } and your off-the-job total and progress are updated.\n\nWant to keep going? You could ask me how you're tracking this week, log more off-the-job time, or check what else counts as off-the-job training.`,
            timestamp: new Date(),
            action: { type: 'otj_deleted', data: { summary, deletedTasks } },
          },
        ]);
      } catch (error) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: `atlas-${Date.now()}`,
            type: 'atlas',
            content: "I couldn't remove that just now — please try again in a moment.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
      return;
    }

    if (pendingDraftsMessage && AFFIRMATIVE_REPLY_RE.test(messageText.trim())) {
      setIsTyping(true);
      try {
        const current = otjQueryClient.getQueryData<OtjSummary>(['/api/otj']);
        const draftEntries = (current?.entries || []).filter(
          (e) => e.status === 'draft' && getDraftMissingFields(e).length === 0,
        );
        if (draftEntries.length === 0) throw new Error('No drafts to confirm');
        const confirmedSnapshot = (current?.entries || []).filter(
          (e) => e.status === 'draft',
        );
        setChatMessages((prev) =>
          prev.map((m) =>
            m.id === pendingDraftsMessage.id && m.action?.type === 'otj_drafts'
              ? {
                  ...m,
                  action: {
                    ...m.action,
                    data: { ...(m.action.data || {}), confirmedSnapshot },
                  },
                }
              : m,
          ),
        );
        setLoggedOtjMessageIds((prev) => new Set(prev).add(pendingDraftsMessage.id));
        let summary: OtjSummary | null = null;
        for (const draft of draftEntries) {
          const res = await apiRequest('POST', `/api/otj/${draft.id}/confirm`, undefined);
          summary = await res.json();
        }
        if (!summary) throw new Error('No drafts to confirm');
        otjQueryClient.setQueryData(['/api/otj'], summary);
        await otjQueryClient.invalidateQueries({ queryKey: ['/api/otj'] });
        const entries: OtjLogEntryData[] = draftEntries.map((d) => ({
          task: d.task || 'Off-the-job learning',
          category: d.category || 'other',
          date: d.date,
          dateLabel: d.dateLabel,
          hours: d.hours || Math.floor((d.minutesTotal || 0) / 60),
          minutes: d.minutes ?? (d.minutesTotal || 0) % 60,
        }));
        setChatMessages((prev) => [
          ...prev,
          {
            id: `atlas-${Date.now()}`,
            type: 'atlas',
            content: "Done — that's logged and your progress is up to date.",
            timestamp: new Date(),
            action: { type: 'otj_logged', data: { entries, summary, fromDraftsConfirm: true } },
          },
        ]);
      } catch (error) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: `atlas-${Date.now()}`,
            type: 'atlas',
            content: "I couldn't log that just now — please try again in a moment.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
      return;
    }

    if (pendingOtjAction && AFFIRMATIVE_REPLY_RE.test(messageText.trim())) {
      const draftData = pendingOtjAction.data;
      setIsTyping(true);
      try {
        let summary: OtjSummary | null = null;
        for (const entry of draftData.entries) {
          const res = await apiRequest('POST', '/api/otj', {
            task: entry.task?.trim() || 'Off-the-job learning',
            category: OTJ_CATEGORY_OPTIONS.some((o) => o.value === entry.category)
              ? entry.category
              : 'other',
            date: entry.date || entry.dateLabel || '',
            hours: entry.hours || 0,
            minutes: entry.minutes || 0,
          });
          summary = await res.json();
        }
        if (!summary) throw new Error('No entries to log');
        otjQueryClient.setQueryData(['/api/otj'], summary);
        await otjQueryClient.invalidateQueries({ queryKey: ['/api/otj'] });
        if (pendingOtjMessage) {
          setLoggedOtjMessageIds((prev) => new Set(prev).add(pendingOtjMessage.id));
        }
        setChatMessages((prev) => [
          ...prev,
          {
            id: `atlas-${Date.now()}`,
            type: 'atlas',
            content: "Done — that's logged and your progress is up to date.",
            timestamp: new Date(),
            action: { type: 'otj_logged', data: { ...draftData, summary } },
          },
        ]);
      } catch (error) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: `atlas-${Date.now()}`,
            type: 'atlas',
            content: "I couldn't log that just now — please try again in a moment.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
      return;
    }

    setIsTyping(true);
    
    try {
      const response = await fetch('/api/atlas/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: updatedMessages.slice(-10).map(m => ({ type: m.type, content: m.content })),
          prototypeMode,
          pendingOtjEntries: pendingOtjAction ? pendingOtjAction.data.entries : undefined,
          pendingDraftIds: pendingDraftsMessage
            ? (otjQueryClient.getQueryData<OtjSummary>(['/api/otj'])?.entries || [])
                .filter((e) => e.status === 'draft' && getDraftMissingFields(e).length === 0)
                .map((e) => e.id)
            : undefined,
          workingHoursConfirmed: pendingOtjAction ? true : undefined
        }),
        signal: AbortSignal.timeout(30000)
      });
      
      const data = await response.json();
      
      const supportActions = getSupportActions(messageText);

      if ((data.action?.type === 'otj_logged' || data.action?.type === 'otj_edited' || data.action?.type === 'otj_deleted' || data.action?.type === 'otj_drafts') && data.action.data?.summary) {
        if (pendingDraftsMessage && data.action.type === 'otj_logged') {
          const previousSummary = otjQueryClient.getQueryData<OtjSummary>(['/api/otj']);
          const confirmedSnapshot = (previousSummary?.entries || []).filter(
            (e) => e.status === 'draft',
          );
          setChatMessages((prev) =>
            prev.map((m) =>
              m.id === pendingDraftsMessage.id && m.action?.type === 'otj_drafts'
                ? {
                    ...m,
                    action: {
                      ...m.action,
                      data: { ...(m.action.data || {}), confirmedSnapshot },
                    },
                  }
                : m,
            ),
          );
        }
        otjQueryClient.setQueryData(['/api/otj'], data.action.data.summary);
        await otjQueryClient.invalidateQueries({ queryKey: ['/api/otj'] });
        if (pendingOtjAction && pendingOtjMessage && data.action.type !== 'otj_drafts') {
          setLoggedOtjMessageIds((prev) => new Set(prev).add(pendingOtjMessage.id));
        }
        if (pendingDraftsMessage && data.action.type === 'otj_logged') {
          setLoggedOtjMessageIds((prev) => new Set(prev).add(pendingDraftsMessage.id));
        }
      }

      const isDraftsConfirmLogged =
        !!pendingDraftsMessage && data.action?.type === 'otj_logged';
      const atlasMessage: ChatMessage = {
        id: `atlas-${Date.now()}`,
        type: 'atlas',
        content: data.content || data.error || "I'm sorry, I couldn't generate a response.",
        timestamp: new Date(),
        isStreaming: true,
        supportActions,
        action:
          isDraftsConfirmLogged && data.action?.type === 'otj_logged'
            ? {
                ...data.action,
                data: { ...data.action.data, fromDraftsConfirm: true },
              }
            : data.action,
      };
      
      setChatMessages(prev => {
        const hasEditedEntries =
          atlasMessage.action?.type === 'otj_drafts' &&
          !!atlasMessage.action.data?.editedEntries?.length;
        if (
          atlasMessage.action?.type === 'otj_drafts' &&
          !hasEditedEntries &&
          prev.some(m => m.action?.type === 'otj_drafts')
        ) {
          return [...prev, { ...atlasMessage, action: undefined }];
        }
        return [...prev, atlasMessage];
      });
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `atlas-${Date.now()}`,
        type: 'atlas',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
        isStreaming: true,
        supportActions: getSupportActions(messageText)
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const handleNewChat = () => {
    if (chatMessages.length > 0 && currentChatId) {
      setChatMessagesStore(prev => ({ ...prev, [currentChatId]: chatMessages }));
      setRecentChats(prev => {
        const exists = prev.some(chat => chat.id === currentChatId);
        if (!exists) {
          return [{ id: currentChatId, name: chatName, timestamp: new Date() }, ...prev].slice(0, 9);
        }
        return prev;
      });
    }
    setChatMessages([]);
    setChatName("Chat");
    setCurrentChatId(null);
    setInputValue("");
  };

  const handleDeleteCurrentChat = () => {
    if (currentChatId) {
      const chatId = currentChatId;
      setRecentChats(prev => prev.filter(c => c.id !== chatId));
      setChatMessagesStore(prev => {
        const next = { ...prev };
        delete next[chatId];
        return next;
      });
    }
    setChatMessages([]);
    setChatName("Chat");
    setCurrentChatId(null);
    setInputValue("");
  };

  const pendingMessageRef = useRef<string | null>(null);
  
  useEffect(() => {
    if (pendingMessage && isVisible) {
      pendingMessageRef.current = pendingMessage;
      clearPendingMessage();
      handleNewChat();
    }
  }, [pendingMessage, isVisible]);

  useEffect(() => {
    if (pendingMessageRef.current && chatMessages.length === 0 && !currentChatId) {
      const msg = pendingMessageRef.current;
      pendingMessageRef.current = null;
      handleSendMessage(msg);
    }
  }, [chatMessages, currentChatId]);

  const handleSelectChat = (chatId: string, chatNameToSelect: string) => {
    if (currentChatId && chatMessages.length > 0) {
      setChatMessagesStore(prev => ({ ...prev, [currentChatId]: chatMessages }));
      setRecentChats(prev => {
        const exists = prev.some(chat => chat.id === currentChatId);
        if (!exists) {
          return [{ id: currentChatId, name: chatName, timestamp: new Date() }, ...prev].slice(0, 9);
        }
        return prev;
      });
    }
    setCurrentChatId(chatId);
    setChatName(chatNameToSelect);
    setChatMessages(chatMessagesStore[chatId] || []);
  };

  const handleAttachmentClick = () => {
    setShowUploadModal(true);
  };

  const handleUploadConfirm = () => {
    setShowUploadModal(false);
    fileInputRef.current?.click();
  };

  const handleUploadCancel = () => {
    setShowUploadModal(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const fileId = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const isImage = file.type.startsWith('image/');
        
        if (isImage) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setAttachedFiles(prev => [...prev, {
              id: fileId,
              file,
              preview: event.target?.result as string,
              isImage: true
            }]);
          };
          reader.readAsDataURL(file);
        } else {
          setAttachedFiles(prev => [...prev, {
            id: fileId,
            file,
            preview: null,
            isImage: false
          }]);
        }
      });
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const isResizable = prototypeMode !== 'before';

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isResizable) return;
    e.preventDefault();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startWidth = panelWidth;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = startX - moveEvent.clientX;
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + deltaX));
      setPanelWidth(newWidth);
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const v3BorderClass = side === 'left' ? 'border-r' : 'border-l';
  const v3Variants = side === 'left' ? panelVariantsLeft : panelVariants;

  if (showLocalPersonalisation) {
    return (
      <motion.div 
        className={`bg-primary ${v3BorderClass} border-separator-primary flex flex-col h-full flex-shrink-0 relative`}
        style={{ width: `${panelWidth}px` }}
        variants={v3Variants}
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
        data-testid="atlas-sidebar-v3"
      >
        <div
          className={`absolute left-0 top-0 h-full z-10 group ${isResizable ? 'cursor-ew-resize' : ''}`}
          style={{ width: '8px', marginLeft: '-4px', display: isResizable ? undefined : 'none' }}
          onMouseDown={handleMouseDown}
          data-testid="atlas-resize-handle-v3"
        >
          <div className="absolute left-1/2 top-0 h-full w-[2px] -ml-px bg-transparent group-hover:bg-action transition-colors" />
        </div>
        <PersonalisationPanel 
          onBack={() => setShowLocalPersonalisation(false)} 
          onToggle={onToggle}
        />
      </motion.div>
    );
  }

  if (showMessages) {
    return (
      <motion.div 
        className={`bg-primary ${v3BorderClass} border-separator-primary flex flex-col h-full flex-shrink-0 relative`}
        style={{ width: `${panelWidth}px` }}
        variants={v3Variants}
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
        data-testid="atlas-sidebar-v3"
      >
        {isResizable && <div
          className="absolute left-0 top-0 h-full cursor-ew-resize z-10 group"
          style={{ width: '8px', marginLeft: '-4px' }}
          onMouseDown={handleMouseDown}
          data-testid="atlas-resize-handle-v3"
        >
          <div className="absolute left-1/2 top-0 h-full w-[2px] -ml-px bg-transparent group-hover:bg-action transition-colors" />
        </div>}
        <MessagesPanel onBack={() => onMessagesClose?.()} onToggle={onToggle} />
      </motion.div>
    );
  }

  if (showNotifications) {
    return (
      <motion.div 
        className={`bg-primary ${v3BorderClass} border-separator-primary flex flex-col h-full flex-shrink-0 relative`}
        style={{ width: `${panelWidth}px` }}
        variants={v3Variants}
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
        data-testid="atlas-sidebar-v3"
      >
        {isResizable && <div
          className="absolute left-0 top-0 h-full cursor-ew-resize z-10 group"
          style={{ width: '8px', marginLeft: '-4px' }}
          onMouseDown={handleMouseDown}
          data-testid="atlas-resize-handle-v3"
        >
          <div className="absolute left-1/2 top-0 h-full w-[2px] -ml-px bg-transparent group-hover:bg-action transition-colors" />
        </div>}
        <NotificationsPanel onBack={() => onNotificationsClose?.()} onToggle={onToggle} />
      </motion.div>
    );
  }

  if (showFeedback) {
    const feedbackOptions = [
      "I'm enjoying Atlas",
      "I've encountered some issues",
      "I have suggestions for improvement",
      "Something else",
    ];
    const closeFeedback = () => {
      setShowFeedback(false);
      setFeedbackChoice('');
      setFeedbackText('');
      setFeedbackContact(false);
    };
    return (
      <motion.div
        className={`bg-primary ${v3BorderClass} border-separator-primary flex flex-col h-full flex-shrink-0 relative`}
        style={{ width: `${panelWidth}px` }}
        variants={v3Variants}
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
        data-testid="atlas-sidebar-v3-feedback"
      >
        {isResizable && <div
          className="absolute left-0 top-0 h-full cursor-ew-resize z-10 group"
          style={{ width: '8px', marginLeft: '-4px' }}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute left-1/2 top-0 h-full w-[2px] -ml-px bg-transparent group-hover:bg-action transition-colors" />
        </div>}
        <div className="flex items-center justify-between p-2 border-b border-separator-primary">
          <div className="flex items-center" style={{ gap: '8px' }}>
            <Button
              variant="secondary"
              size="small"
              iconPosition="center"
              Icon={<ChevronLeftIcon size="small" />}
              aria-label="Back"
              data-testid="button-feedback-back"
              onClick={closeFeedback}
            />
            <span className="text-m font-semibold text-primary">Leave feedback</span>
          </div>
          <Button
            variant="secondary"
            size="small"
            iconPosition="center"
            Icon={<CloseIcon size="small" />}
            aria-label="Close"
            data-testid="button-feedback-close"
            onClick={onToggle}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-2 flex flex-col" style={{ gap: '24px' }}>
          <p className="text-s text-primary" style={{ lineHeight: '1.5' }}>
            We're always looking to improve your experience with Atlas. If you've got feedback, we'd love to hear it. Whether it's a compliment, a suggestion, or a concern, your input is valuable.
          </p>
          <div className="flex flex-col" style={{ gap: '12px' }}>
            <span className="text-s font-semibold text-primary">What's on your mind?</span>
            <div className="flex flex-col" style={{ gap: '8px' }}>
              {feedbackOptions.map((opt) => (
                <label key={opt} className="flex items-center cursor-pointer" style={{ gap: '8px' }}>
                  <input
                    type="radio"
                    name="feedback-choice"
                    value={opt}
                    checked={feedbackChoice === opt}
                    onChange={() => setFeedbackChoice(opt)}
                    className="w-3 h-3 accent-action cursor-pointer"
                    data-testid={`radio-feedback-${opt.replace(/\s+/g, '-').toLowerCase()}`}
                  />
                  <span className="text-s text-primary">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <label className="flex items-start cursor-pointer" style={{ gap: '8px' }}>
            <input
              type="checkbox"
              checked={feedbackContact}
              onChange={(e) => setFeedbackContact(e.target.checked)}
              className="mt-0-5 w-3 h-3 accent-action cursor-pointer"
              data-testid="checkbox-feedback-contact"
            />
            <span className="text-s font-semibold text-primary" style={{ lineHeight: '1.5' }}>
              Yes, I'm open to being contacted by the Atlas team to participate in user research
            </span>
          </label>
        </div>
        <div className="border-t border-separator-primary p-2 flex items-center justify-end" style={{ gap: '8px' }}>
          <Button variant="secondary" size="default" onClick={closeFeedback} data-testid="button-feedback-cancel">
            Cancel
          </Button>
          <Button
            variant="primary"
            size="default"
            disabled={!feedbackChoice}
            onClick={async () => {
              try {
                await submitAtlasFeedback({
                  choice: feedbackChoice,
                  comments: feedbackText,
                  openToContact: feedbackContact,
                });
                closeFeedback();
              } catch {
                // keep the panel open so the user can retry
              }
            }}
            data-testid="button-feedback-submit"
          >
            Submit feedback
          </Button>
        </div>
      </motion.div>
    );
  }

  if (showHistory) {
    return (
      <motion.div 
        className={`bg-primary ${v3BorderClass} border-separator-primary flex flex-col h-full flex-shrink-0 relative`}
        style={{ width: `${panelWidth}px` }}
        variants={v3Variants}
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
        data-testid="atlas-sidebar-v3"
      >
        {isResizable && <div
          className="absolute left-0 top-0 h-full cursor-ew-resize z-10 group"
          style={{ width: '8px', marginLeft: '-4px' }}
          onMouseDown={handleMouseDown}
          data-testid="atlas-resize-handle-v3"
        >
          <div className="absolute left-1/2 top-0 h-full w-[2px] -ml-px bg-transparent group-hover:bg-action transition-colors" />
        </div>}
        <HistoryPanel 
          onBack={() => {
            setShowHistory(false);
            onHistoryClose?.();
          }} 
          onToggle={onToggle}
          onNewChat={handleNewChat}
          chats={recentChats}
          currentChatId={currentChatId}
          currentChatName={chatName}
          onSelectChat={handleSelectChat}
          onRenameChat={(chatId, newName) => {
            setRecentChats(prev => prev.map(c => c.id === chatId ? { ...c, name: newName } : c));
            if (chatId === currentChatId) {
              setChatName(newName);
            }
          }}
          onTogglePin={(chatId) => {
            setRecentChats(prev => {
              const exists = prev.some(c => c.id === chatId);
              if (!exists && chatId === currentChatId) {
                return [{ id: chatId, name: chatName, timestamp: new Date(), pinned: true }, ...prev];
              }
              return prev.map(c => c.id === chatId ? { ...c, pinned: !c.pinned } : c);
            });
          }}
          onDeleteChat={(chatId) => {
            setRecentChats(prev => prev.filter(c => c.id !== chatId));
            setChatMessagesStore(prev => {
              const next = { ...prev };
              delete next[chatId];
              return next;
            });
            if (chatId === currentChatId) {
              // Clear the UI without re-persisting the deleted chat
              setChatMessages([]);
              setChatName("Chat");
              setCurrentChatId(null);
              setInputValue("");
            }
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`bg-primary ${v3BorderClass} border-separator-primary flex flex-col flex-shrink-0 relative`}
      style={{ width: `${panelWidth}px`, height: '100%' }}
      variants={v3Variants}
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      data-testid="atlas-sidebar-v3"
    >
      {isResizable && <div
        className="absolute left-0 top-0 h-full cursor-ew-resize z-10 group"
        style={{ width: '8px', marginLeft: '-4px' }}
        onMouseDown={handleMouseDown}
        data-testid="atlas-resize-handle-v3"
      >
        <div className="absolute left-1/2 top-0 h-full w-[2px] -ml-px bg-transparent group-hover:bg-action transition-colors" />
      </div>}
      {showShaderWave && (
        <AtlasShaderWave onComplete={() => setShowShaderWave(false)} />
      )}
      {isInChatMode ? (
        <>
          {prototypeMode === 'after' ? (
            /* Two-row header for 'after' mode: brand row + chat name row */
            <div
              className="absolute top-0 left-0 right-0 z-10 flex flex-col"
              style={{ background: 'linear-gradient(to bottom, var(--atlas-panel-bg, #ffffff) 79.687%, transparent)' }}
            >
              {/* Row 1: brand + buttons */}
              <div className="flex items-center justify-between" style={{ gap: '8px', padding: '12px 8px 16px 8px' }}>
                <div className="flex items-center min-w-0 flex-1" style={{ gap: '8px' }}>
                  <span
                    className="font-semibold text-primary whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
                    style={{ fontSize: '16px', letterSpacing: '0.24px', lineHeight: '1.5' }}
                    data-testid="text-chat-title"
                    title={chatName}
                  >
                    {chatName}
                  </span>
                </div>
                <div className="flex items-center flex-shrink-0" style={{ gap: '4px' }}>
                  <Tooltip title="New chat" placement="top">
                    <Button
                      variant="primary"
                      size="small"
                      iconPosition="center"
                      Icon={<EditWriteIcon size="small" variant="white" />}
                      aria-label="New chat"
                      data-testid="button-new-chat"
                      onClick={handleNewChat}
                    />
                  </Tooltip>
                  <div className="relative flex items-center">
                    <Tooltip title="History" placement="top">
                      <Button
                        variant="secondary"
                        size="small"
                        iconPosition="center"
                        Icon={<HistoryIcon size="small" variant="primary" />}
                        aria-label="History"
                        data-testid="button-history"
                        onClick={() => setShowChatSwitcher(v => !v)}
                      />
                    </Tooltip>
                    {showChatSwitcher && (
                      <>
                        <div className="fixed inset-0 z-20" onClick={() => setShowChatSwitcher(false)} />
                        <div
                          className="absolute z-30 flex flex-col"
                          style={{ top: 'calc(100% + 8px)', right: 0, width: '280px', borderRadius: '8px', boxShadow: '0px 4px 16px 0px rgba(26,29,35,0.12), 0px 0px 1px 0px rgba(144,146,145,0.56)', backgroundColor: '#ffffff', padding: '4px' }}
                          data-testid="popover-chat-switcher"
                        >
                          <span className="text-xs font-semibold text-secondary" style={{ letterSpacing: '0.24px', padding: '6px 8px 2px' }}>Recents</span>
                          {[
                            ...(currentChatId ? [{ id: currentChatId, name: chatName }] : []),
                            ...recentChats.filter(c => c.id !== currentChatId).slice(0, 6),
                          ].map((chat) => {
                            const isCurrent = chat.id === currentChatId;
                            return (
                              <button
                                key={chat.id}
                                className="flex items-center w-full text-left border-none cursor-pointer rounded"
                                style={{ minHeight: '36px', padding: '6px 8px', background: isCurrent ? '#edebe8' : 'white', gap: '8px' }}
                                onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.background = '#f5f4f2'; }}
                                onMouseLeave={e => { if (!isCurrent) e.currentTarget.style.background = 'white'; }}
                                onClick={() => { if (!isCurrent) handleSelectChat(chat.id, chat.name); setShowChatSwitcher(false); }}
                              >
                                <span className="flex-1 font-medium text-primary truncate" style={{ fontSize: '14px', letterSpacing: '0.28px', lineHeight: '1.5' }}>{chat.name}</span>
                                {isCurrent && <CheckIcon size="small" variant="primary" style={{ flexShrink: 0 }} />}
                              </button>
                            );
                          })}
                          <div style={{ height: '1px', backgroundColor: '#dbdad6', margin: '4px 0' }} />
                          <button
                            className="flex items-center w-full border-none cursor-pointer rounded"
                            style={{ minHeight: '36px', padding: '6px 8px', background: 'white', gap: '6px' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#f5f4f2'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}
                            onClick={() => { setShowChatSwitcher(false); setShowHistory(true); }}
                          >
                            <HistoryIcon size="small" variant="secondary" />
                            <span className="font-medium text-secondary" style={{ fontSize: '14px', letterSpacing: '0.28px', lineHeight: '1.5' }}>View all history</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <DropdownRoot modal={false}>
                    <Tooltip title="Options" placement="top">
                      <DropdownTrigger asChild>
                        <Button
                          variant="secondary"
                          size="small"
                          iconPosition="center"
                          Icon={<DotsIcon size="small" className="rotate-90" />}
                          aria-label="More options"
                          data-testid="button-more-options"
                        />
                      </DropdownTrigger>
                    </Tooltip>
                    <DropdownContent
                      align="end"
                      className="p-0 rounded-base min-w-[180px]"
                      style={{ boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.04)', border: '0.5px solid #dbdad6' }}
                    >
                      <div className="py-1-5 px-0">
                        {isInChatMode && (
                          <DropdownItem
                            className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                            onClick={handleDeleteCurrentChat}
                            data-testid="dropdown-item-delete"
                          >
                            <BinIcon size="small" variant="primary" />
                            <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>Delete chat</span>
                          </DropdownItem>
                        )}
                        <DropdownItem
                          className="group flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-[#f5f3ee]"
                          data-testid="dropdown-item-feedback"
                          onClick={() => setShowFeedback(true)}
                        >
                          <HeartIcon size="small" variant="primary" className="transition-colors group-hover:[&_path]:fill-[#E1705F] group-hover:[&_path]:stroke-[#E1705F]" />
                          <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>Leave feedback</span>
                        </DropdownItem>
                      </div>
                    </DropdownContent>
                  </DropdownRoot>
                  <Tooltip title="Close" placement="top">
                    <Button
                      variant="secondary"
                      size="small"
                      iconPosition="center"
                      Icon={<CloseIcon size="small" />}
                      aria-label="Close"
                      data-testid="button-collapse-atlas"
                      onClick={onToggle}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="absolute top-0 left-0 right-0 z-10 flex items-center p-2"
              style={{ background: 'linear-gradient(to bottom, var(--atlas-panel-bg, #ffffff) 79.687%, transparent)', minHeight: '64px' }}
            >
                <div className="flex items-center" style={{ gap: '8px' }}>
                  <span
                    className="font-semibold text-primary whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ fontSize: '14px', letterSpacing: '0.28px', lineHeight: '1.5' }}
                  >
                    Atlas
                  </span>
                  <img src={multiverseHexagon} alt="Multiverse" style={{ width: '20px', height: '17px', filter: HEX_INDIGO_FILTER }} />
                  <span className="font-medium text-secondary whitespace-nowrap" style={{ fontSize: '14px', letterSpacing: '0.28px', lineHeight: '1.5' }}>AI Guide</span>
                </div>
              <div className="flex items-center flex-shrink-0" style={{ gap: '4px' }}>
                <Tooltip title="New chat" placement="top">
                  <Button
                    variant="primary"
                    size="small"
                    iconPosition="center"
                    Icon={<EditWriteIcon size="small" variant="white" />}
                    aria-label="New chat"
                    data-testid="button-new-chat"
                    onClick={handleNewChat}
                  />
                </Tooltip>
                <Tooltip title="History" placement="top">
                  <Button
                    variant="secondary"
                    size="small"
                    iconPosition="center"
                    Icon={<HistoryIcon size="small" variant="primary" />}
                    aria-label="History"
                    data-testid="button-history"
                    onClick={() => setShowHistory(true)}
                  />
                </Tooltip>
                <DropdownRoot modal={false}>
                  <Tooltip title="Options" placement="top">
                    <DropdownTrigger asChild>
                      <Button
                        variant="secondary"
                        size="small"
                        iconPosition="center"
                        Icon={<DotsIcon size="small" className="rotate-90" />}
                        aria-label="More options"
                        data-testid="button-more-options"
                      />
                    </DropdownTrigger>
                  </Tooltip>
                  <DropdownContent 
                    align="end" 
                    className="p-0 rounded-base min-w-[180px]"
                    style={{
                      boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.04)',
                      border: '0.5px solid #dbdad6'
                    }}
                  >
                    <div className="py-1-5 px-0">
                          <DropdownItem 
                            className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                            onClick={handleDeleteCurrentChat}
                            data-testid="dropdown-item-delete"
                          >
                            <BinIcon size="small" variant="primary" />
                            <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>
                              Delete
                            </span>
                          </DropdownItem>
                          <div className="mx-0" style={{ height: '1px', backgroundColor: '#dbdad6', margin: '4px 0' }} />
                          <DropdownItem 
                            className="group flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-[#f5f3ee]"
                            data-testid="dropdown-item-feedback"
                            onClick={() => setShowFeedback(true)}
                          >
                            <HeartIcon size="small" variant="primary" className="transition-colors group-hover:[&_path]:fill-[#E1705F] group-hover:[&_path]:stroke-[#E1705F]" />
                            <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>
                              Leave feedback
                            </span>
                          </DropdownItem>
                    </div>
                  </DropdownContent>
                </DropdownRoot>
                <Tooltip title="Close" placement="top">
                  <Button
                    variant="secondary"
                    size="small"
                    iconPosition="center"
                    Icon={<CloseIcon size="small" />}
                    aria-label="Close"
                    data-testid="button-collapse-atlas"
                    onClick={onToggle}
                  />
                </Tooltip>
              </div>
            </div>
          )}

          <div 
            ref={chatContainerRef}
            className="flex-1 flex flex-col overflow-y-auto"
            style={{ gap: '24px', padding: '16px', paddingTop: prototypeMode === 'after' ? '135px' : '80px' }}
          >
            {visibleChatMessages.map((message) => (
              <div key={message.id}>
                {message.type === 'user' ? (
                  <div className="flex flex-col items-end" style={{ gap: '4px' }}>
                    {message.files && message.files.length > 0 && (
                      <div className="flex flex-wrap justify-end" style={{ gap: '8px' }}>
                        {message.files.map((file) => (
                          file.isImage && file.preview ? (
                            <img 
                              key={file.id}
                              src={file.preview} 
                              alt={file.name}
                              className="object-cover"
                              style={{ 
                                width: '80px', 
                                height: '80px',
                                borderRadius: '8px'
                              }}
                              data-testid={`image-preview-${file.id}`}
                            />
                          ) : (
                            <div 
                              key={file.id}
                              className="flex items-center bg-secondary rounded-lg"
                              style={{ 
                                padding: '8px 12px',
                                gap: '8px'
                              }}
                              data-testid={`file-preview-${file.id}`}
                            >
                              <TextFileIcon size="small" variant="secondary" />
                              <span className="text-xs text-primary truncate" style={{ maxWidth: '120px' }}>
                                {file.name}
                              </span>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                    {message.content.trim() && (
                      <div 
                        style={{
                          backgroundColor: '#e7eafe',
                          borderRadius: '8px 8px 2px 8px',
                          padding: '12px',
                          ...({})
                        }}
                        data-testid={`message-user-${message.id}`}
                      >
                        <p className="text-s text-primary" style={{ letterSpacing: '0.28px', lineHeight: '1.5' }}>
                          {message.content}
                        </p>
                      </div>
                    )}
                  </div>
                ) : prototypeMode === 'before' ? (
                  <div className="flex flex-col" data-testid={`message-atlas-${message.id}`}>
                    <div className="flex items-end" style={{ gap: '8px' }}>
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{ width: '24px', height: '24px' }}
                      >
                        {(
                          <div
                            className="flex items-center justify-center"
                            style={{
                              width: '23.5px',
                              height: '22.5px',
                              borderRadius: '8.6px',
                              background: 'white',
                              boxShadow: '0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)',
                              transform: 'rotate(-3.88deg)',
                            }}
                          >
                            <img src={atlasIcon} alt="Atlas" style={{ width: '12px', height: '13px' }} />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0" style={{ gap: '4px' }}>
                        <span className="text-xs text-secondary" style={{ lineHeight: '1.25', letterSpacing: '0.24px' }}>
                          Atlas
                        </span>
                        <div
                          className="bg-secondary border border-separator-primary w-full"
                          style={{
                            borderRadius: '8px 8px 8px 2px',
                            padding: '12px',
                          }}
                        >
                          <div className="text-s text-primary" style={{ lineHeight: '1.5', letterSpacing: '0.28px' }}>
                            <BeforeMessageContent
                              message={message}
                              onReady={() => {
                                if (message.isStreaming) {
                                  handleStreamingComplete(message.id);
                                }
                                scrollToBottom();
                              }}
                            />
                          </div>
                          {!message.isStreaming && message.supportActions && message.supportActions.length > 0 && (
                            <div className="flex justify-end" style={{ marginTop: '16px' }} data-testid={`support-actions-${message.id}`}>
                              <button
                                type="button"
                                className="flex items-center bg-primary transition-shadow hover:shadow-button-hover"
                                style={{
                                  gap: '8px',
                                  padding: '10px 14px',
                                  borderRadius: '8px',
                                  border: '0.5px solid #dbdad6',
                                  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.06)',
                                }}
                                data-testid={`button-support-bot-${message.id}`}
                                onClick={() => toasts.info("Chat to support bot", "This is a prototype affordance.", { position: 'top-right' })}
                              >
                                <ExternalLinkIcon size="small" variant="action" className="flex-shrink-0" />
                                <span className="text-s font-semibold text-primary" style={{ lineHeight: '1.25', letterSpacing: '0.28px' }}>
                                  Chat to support bot
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0" style={{ gap: '4px' }}>
                      <div className="flex items-start" style={{ gap: '8px', marginTop: '4px', marginLeft: '32px' }}>
                        <button
                          className={`flex items-center justify-center flex-shrink-0 border border-solid transition-colors ${
                            messageFeedback[message.id] === 'like'
                              ? 'bg-success border-success'
                              : 'bg-primary border-separator-primary hover:bg-secondary'
                          }`}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                          }}
                          aria-label="Helpful"
                          data-testid={`button-like-${message.id}`}
                          onClick={() => handleFeedback(message.id, 'like')}
                        >
                          <span className="text-s font-semibold" style={{ lineHeight: '1.25', letterSpacing: '0.28px' }}>👍</span>
                        </button>
                        <button
                          className={`flex items-center justify-center flex-shrink-0 border border-solid transition-colors ${
                            messageFeedback[message.id] === 'dislike'
                              ? 'bg-negative border-negative'
                              : 'bg-primary border-separator-primary hover:bg-secondary'
                          }`}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                          }}
                          aria-label="Unhelpful"
                          data-testid={`button-dislike-${message.id}`}
                          onClick={() => handleFeedback(message.id, 'dislike')}
                        >
                          <span className="text-s font-semibold" style={{ lineHeight: '1.25', letterSpacing: '0.28px' }}>👎</span>
                        </button>
                      </div>
                      {dislikeFeedbackId === message.id && (
                        <div
                          className="bg-secondary border border-separator-primary rounded-lg flex flex-col [&_.group.relative]:w-full [&_textarea]:w-full"
                          style={{ marginLeft: '32px', marginTop: '8px', padding: '16px', gap: '16px', width: 'calc(100% - 32px)' }}
                          data-testid={`feedback-box-${message.id}`}
                        >
                          <span className="text-m font-semibold text-primary">
                            Why was this response unhelpful?
                          </span>
                          <Textarea
                            id={`dislike-feedback-${message.id}`}
                            label="Feedback"
                            hideLabel
                            placeholder="Leave feedback"
                            rows={4}
                            value={dislikeFeedbackText}
                            onChange={(e) => setDislikeFeedbackText(e.target.value)}
                            data-testid={`textarea-feedback-${message.id}`}
                          />
                          <div className="flex items-center justify-end" style={{ gap: '8px' }}>
                            <Button
                              variant="secondary"
                              size="small"
                              onClick={() => {
                                setDislikeFeedbackId(null);
                                setMessageFeedback(prev => ({ ...prev, [message.id]: null }));
                              }}
                              data-testid={`button-dismiss-feedback-${message.id}`}
                            >
                              Dismiss
                            </Button>
                            <Button
                              variant="primary"
                              size="small"
                              onClick={() => {
                                toasts.success('Thanks for your feedback');
                                setDislikeFeedbackId(null);
                                setDislikeFeedbackText('');
                                setMessageFeedback(prev => ({ ...prev, [message.id]: null }));
                              }}
                              data-testid={`button-submit-feedback-${message.id}`}
                            >
                              Leave feedback
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col" style={{ gap: '16px' }} data-testid={`message-atlas-${message.id}`}>
                    <div className="flex flex-col" style={{ gap: '18px' }}>
                      {message.titleLarge && (
                        <h2 className="text-xl font-semibold text-primary" style={{ lineHeight: '1.25' }}>
                          {message.titleLarge}
                        </h2>
                      )}
                      {message.titleMedium && (
                        <h3 className="text-l font-semibold text-primary" style={{ lineHeight: '1.5', letterSpacing: '0.36px' }}>
                          {message.titleMedium}
                        </h3>
                      )}
                      {message.titleSmall && (
                        <h4 className="text-m font-semibold text-primary" style={{ lineHeight: '1.25', letterSpacing: '0.32px' }}>
                          {message.titleSmall}
                        </h4>
                      )}
                      <div className="prose prose-sm max-w-none text-primary" style={{ lineHeight: '1.5', letterSpacing: '0.28px' }}>
                        {message.isStreaming ? (
                          <TypewriterText 
                            content={message.content} 
                            onComplete={() => handleStreamingComplete(message.id)}
                            onTick={scrollToBottom}
                          />
                        ) : (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({children}) => <h1 className="text-2xl font-semibold text-primary mt-4 mb-2 first:mt-0">{children}</h1>,
                              h2: ({children}) => <h2 className="text-xl font-semibold text-primary mt-4 mb-2 first:mt-0">{children}</h2>,
                              h3: ({children}) => <h3 className="text-l font-semibold text-primary mt-3 mb-1.5 first:mt-0">{children}</h3>,
                              h4: ({children}) => <h4 className="text-m font-semibold text-primary mt-2 mb-1 first:mt-0">{children}</h4>,
                              p: ({children}) => <p className="text-s text-primary mb-2 last:mb-0">{children}</p>,
                              strong: ({children}) => <strong className="font-semibold text-primary">{children}</strong>,
                              em: ({children}) => <em className="italic">{children}</em>,
                              ul: ({children}) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                              ol: ({children}) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                              li: ({children}) => <li className="text-s text-primary">{children}</li>,
                              blockquote: ({children}) => <blockquote className="border-l-2 border-action pl-2 italic text-secondary my-2">{children}</blockquote>,
                              code: ({className, children}) => {
                                const text = String(children ?? "");
                                const match = /language-(\w+)/.exec(className || "");
                                const isBlock = !!match || text.includes("\n");
                                return isBlock ? (
                                  <CodeBlock language={match?.[1] || "text"} value={text.replace(/\n$/, "")} showCopy={true} />
                                ) : (
                                  <code className="bg-secondary px-1 py-0.5 rounded text-s font-mono text-primary">{children}</code>
                                );
                              },
                              pre: ({children}) => <>{children}</>,
                              a: ({href, children}) => <a href={href} className="text-action underline hover:no-underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                              hr: () => <hr className="border-separator-primary my-3" />,
                              table: ({children}) => <table className="w-full border-collapse my-2 text-s">{children}</table>,
                              th: ({children}) => <th className="border border-separator-primary p-1 bg-secondary font-semibold text-left">{children}</th>,
                              td: ({children}) => <td className="border border-separator-primary p-1">{children}</td>,
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>

                    {!message.isStreaming && message.action?.type === 'otj_log' && (
                      <OtjDraftConfirmationCard
                        data={message.action.data}
                        showGuidance={!loggedOtjMessageIds.has(message.id)}
                        onFollowUp={handleSendMessage}
                      />
                    )}

                    {!message.isStreaming && message.action?.type === 'otj_logged' && (
                      <OtjLoggedCard
                        data={message.action.data}
                        summary={message.action.data.summary}
                        onFollowUp={handleSendMessage}
                        showEntries={false}
                        suppressDraftsNudge={!!message.action.data.fromDraftsConfirm}
                      />
                    )}

                    {!message.isStreaming && message.action?.type === 'otj_partial' && (
                      <RemainingDraftsPanel onFollowUp={handleSendMessage} />
                    )}

                    {!message.isStreaming && message.action?.type === 'otj_edited' && (
                      <OtjLoggedCard
                        data={message.action.data}
                        summary={message.action.data.summary}
                        onFollowUp={handleSendMessage}
                        variant="edited"
                      />
                    )}

                    {!message.isStreaming && message.action?.type === 'otj_logged_list' && (
                      <div className="flex flex-col" style={{ gap: '8px' }}>
                        {(message.action.data?.entries || []).map((entry: OtjEntry) => (
                          <DraftReviewCard key={entry.id} entry={entry} logged />
                        ))}
                      </div>
                    )}

                    {!message.isStreaming && message.action?.type === 'otj_delete_confirm' && (
                      <OtjDeleteConfirmCard
                        entries={message.action.data.entries}
                        confirmed={loggedOtjMessageIds.has(message.id)}
                      />
                    )}

                    {!message.isStreaming &&
                      message.action?.type === 'otj_drafts' &&
                      message.id === lastDraftsMessageId && (
                        <DraftsReviewList
                          onFollowUp={handleSendMessage}
                          showHeading={
                            message.id === 'drafts-review' ||
                            !!message.action.data?.editedEntries?.length
                          }
                          confirmed={loggedOtjMessageIds.has(message.id)}
                          snapshotEntries={message.action.data?.confirmedSnapshot}
                          initialEntries={message.action.data?.editedEntries}
                        />
                      )}

                    {!message.isStreaming && message.action?.type === 'otj_drafts_prompt' && (
                      <DraftsPrompt
                        onDismiss={() => setChatMessages([])}
                        onReview={() =>
                          setChatMessages([
                            {
                              id: 'drafts-review',
                              type: 'atlas',
                              content: '',
                              timestamp: new Date(),
                              action: { type: 'otj_drafts' },
                            },
                          ])
                        }
                      />
                    )}

                    {!message.isStreaming && message.supportActions && message.supportActions.length > 0 && (
                      <div className="flex items-center flex-wrap" style={{ gap: '8px' }} data-testid={`support-actions-${message.id}`}>
                        {message.supportActions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            type="button"
                            className="flex items-center bg-primary transition-shadow hover:shadow-button-hover"
                            style={{
                              gap: '4px',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              border: '0.5px solid #dbdad6',
                              boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.06)',
                            }}
                            data-testid={`button-support-${action.icon}-${message.id}`}
                            onClick={() => toasts.info(action.label, "This is a prototype affordance.")}
                          >
                            {action.icon === 'chat' ? (
                              <ChatIcon size="small" variant="action" className="flex-shrink-0" />
                            ) : (
                              <ExternalLinkIcon size="small" variant="action" className="flex-shrink-0" />
                            )}
                            <span className="text-primary font-medium" style={{ fontSize: '12px', lineHeight: '1.25' }}>
                              {action.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center">
                      <div 
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                          width: '32px',
                          height: '32px'
                        }}
                      >
                        {(
                          <div 
                            className="flex items-center justify-center"
                            style={{
                              width: '26px',
                              height: '25px',
                              borderRadius: '5px',
                              background: 'white',
                              border: 'none',
                              boxShadow: '0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)',
                              transform: 'rotate(-3.88deg)',
                            }}
                          >
                            <img src={atlasIcon} alt="Atlas" style={{ width: '13.5px', height: '14.6px' }} />
                          </div>
                        )}
                      </div>
                      
                      <Tooltip title={copiedMessageId === message.id ? "Copied!" : "Copy"} placement="top">
                        <button
                          className={`flex items-center justify-center rounded-lg transition-colors ${
                            copiedMessageId === message.id 
                              ? 'bg-success' 
                              : 'hover:bg-secondary'
                          }`}
                          style={{ width: '32px', height: '32px' }}
                          aria-label="Copy"
                          data-testid={`button-copy-${message.id}`}
                          onClick={() => handleCopyMessage(message.id, message.content)}
                        >
                          {copiedMessageId === message.id ? (
                            <CheckIcon size="small" variant="success" />
                          ) : (
                            <CloneIcon size="small" variant="secondary" />
                          )}
                        </button>
                      </Tooltip>
                      <Tooltip title="Helpful" placement="top">
                        <button
                          className={`flex items-center justify-center rounded-lg transition-colors ${
                            messageFeedback[message.id] === 'like'
                              ? 'bg-success'
                              : 'hover:bg-secondary'
                          }`}
                          style={{ width: '32px', height: '32px' }}
                          aria-label="Helpful"
                          data-testid={`button-like-${message.id}`}
                          onClick={() => handleFeedback(message.id, 'like')}
                        >
                          <LikeIcon size="small" variant={messageFeedback[message.id] === 'like' ? "success" : "secondary"} />
                        </button>
                      </Tooltip>
                      <Tooltip title="Unhelpful" placement="top">
                        <button
                          className={`flex items-center justify-center rounded-lg transition-colors ${
                            messageFeedback[message.id] === 'dislike'
                              ? 'bg-negative'
                              : 'hover:bg-secondary'
                          }`}
                          style={{ width: '32px', height: '32px' }}
                          aria-label="Unhelpful"
                          data-testid={`button-dislike-${message.id}`}
                          onClick={() => handleFeedback(message.id, 'dislike')}
                        >
                          <DislikeIcon size="small" variant={messageFeedback[message.id] === 'dislike' ? "negative" : "secondary"} />
                        </button>
                      </Tooltip>
                    </div>
                    {dislikeFeedbackId === message.id && (
                      <div
                        className="bg-primary rounded-lg shadow-card flex flex-col [&_.group.relative]:w-full [&_textarea]:w-full"
                        style={{ marginTop: '8px', padding: '16px', gap: '16px' }}
                        data-testid={`feedback-box-${message.id}`}
                      >
                        <div className="flex items-start justify-between" style={{ gap: '8px' }}>
                          <span className="text-m font-semibold text-primary">
                            Why was this response unhelpful?
                          </span>
                          <button
                            className="flex items-center justify-center flex-shrink-0 rounded-lg hover:bg-secondary transition-colors"
                            style={{ width: '24px', height: '24px' }}
                            aria-label="Close feedback"
                            data-testid={`button-close-feedback-${message.id}`}
                            onClick={() => {
                              setDislikeFeedbackId(null);
                              setMessageFeedback(prev => ({ ...prev, [message.id]: null }));
                            }}
                          >
                            <CloseIcon size="small" variant="secondary" />
                          </button>
                        </div>
                        <div
                          className="flex transition-all focus-within:border-[#4a5ff7] focus-within:shadow-[0px_0px_0px_2px_#d2d7fd]"
                          style={{
                            border: '1px solid #dbdad6',
                            borderRadius: '16px',
                            padding: '12px',
                          }}
                        >
                          <textarea
                            id={`dislike-feedback-${message.id}`}
                            aria-label="Feedback"
                            placeholder="Leave feedback"
                            rows={4}
                            value={dislikeFeedbackText}
                            onChange={(e) => setDislikeFeedbackText(e.target.value)}
                            className="w-full text-s bg-transparent outline-none resize-none text-primary placeholder:text-secondary"
                            data-testid={`textarea-feedback-${message.id}`}
                          />
                        </div>
                        <div className="flex items-center justify-end" style={{ gap: '8px' }}>
                          <Button
                            variant="secondary"
                            size="small"
                            onClick={() => {
                              setDislikeFeedbackId(null);
                              setMessageFeedback(prev => ({ ...prev, [message.id]: null }));
                            }}
                            data-testid={`button-dismiss-feedback-${message.id}`}
                          >
                            Dismiss
                          </Button>
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() => {
                              toasts.success('Thanks for your feedback');
                              setDislikeFeedbackId(null);
                              setDislikeFeedbackText('');
                              setMessageFeedback(prev => ({ ...prev, [message.id]: null }));
                            }}
                            data-testid={`button-submit-feedback-${message.id}`}
                          >
                            Leave feedback
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              prototypeMode === 'before' ? (
                <div className="flex items-end" style={{ gap: '8px' }} data-testid="atlas-thinking-state">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: '24px', height: '24px' }}
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: '23.5px',
                        height: '22.5px',
                        borderRadius: '8.6px',
                        background: 'white',
                        boxShadow: '0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)',
                        transform: 'rotate(-3.88deg)',
                      }}
                    >
                      <img src={atlasIcon} alt="Atlas" style={{ width: '12px', height: '13px' }} />
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0" style={{ gap: '4px' }}>
                    <span className="text-xs text-secondary" style={{ lineHeight: '1.25', letterSpacing: '0.24px' }}>
                      Atlas
                    </span>
                    <div
                      className="bg-secondary border border-separator-primary"
                      style={{
                        borderRadius: '8px 8px 8px 2px',
                        padding: '12px',
                      }}
                    >
                      <p className={`text-s ${'text-secondary'}`} style={{ letterSpacing: '0.28px', lineHeight: '1.5' }}>
                        Atlas is thinking...
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center" style={{ gap: '8px' }} data-testid="atlas-thinking-state">
                  <div 
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '32px',
                      height: '32px'
                    }}
                  >
                    {(
                      <div 
                        className="flex items-center justify-center"
                        style={{
                          width: '26px',
                          height: '25px',
                          borderRadius: '5px',
                          background: 'white',
                          boxShadow: '0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)',
                          transform: 'rotate(-3.88deg)',
                        }}
                      >
                        <img src={atlasIcon} alt="Atlas" style={{ width: '13.5px', height: '14.6px' }} />
                      </div>
                    )}
                  </div>
                  <p className={`text-s ${'text-secondary'}`} style={{ letterSpacing: '0.28px', lineHeight: '1.5' }}>
                    Atlas is thinking...
                  </p>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <>
          <div className="relative flex items-center justify-between p-2">
            {prototypeMode === 'after' ? (
              <div className="flex items-center" style={{ gap: '8px' }} data-testid="chat-title-static-home">
                <span
                  className="font-semibold text-primary whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ fontSize: '14px', letterSpacing: '0.28px', lineHeight: '1.5' }}
                  data-testid="text-chat-title-home"
                >
                  Atlas
                </span>
                <img src={multiverseHexagon} alt="Multiverse" style={{ width: '20px', height: '17px', filter: HEX_INDIGO_FILTER }} />
                <span className="font-medium text-secondary whitespace-nowrap" style={{ fontSize: '14px', letterSpacing: '0.28px', lineHeight: '1.5' }}>AI Guide</span>
              </div>
            ) : (
              <div className="flex items-center" style={{ gap: '8px' }}>
                <span
                  className="font-medium text-primary whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ fontSize: '14px', letterSpacing: '0.28px', lineHeight: '1.5' }}
                >
                  Atlas
                </span>
                <div className="flex items-center" style={{ gap: '4px' }}>
                  <img src={multiverseLogomark} alt="" style={{ width: '14px', height: '11.9px' }} />
                  <span
                    className="font-medium text-secondary whitespace-nowrap"
                    style={{ fontSize: '14px', letterSpacing: '0.28px', lineHeight: '1.5' }}
                  >
                    AI Guide
                  </span>
                </div>
              </div>
            )}
            <div className="flex items-center" style={{ gap: '4px' }}>
              {prototypeMode === 'after' && (
                <>
                  <Tooltip title="New chat" placement="top">
                    <Button
                      variant="primary"
                      size="small"
                      iconPosition="center"
                      Icon={<EditWriteIcon size="small" variant="white" />}
                      aria-label="New chat"
                      data-testid="button-new-chat-welcome"
                      onClick={handleNewChat}
                    />
                  </Tooltip>
                  <div className="relative flex items-center">
                    <Tooltip title="History" placement="top">
                      <Button
                        variant="secondary"
                        size="small"
                        iconPosition="center"
                        Icon={<HistoryIcon size="small" variant="primary" />}
                        aria-label="History"
                        data-testid="button-history-welcome"
                        onClick={() => setShowChatSwitcher(v => !v)}
                      />
                    </Tooltip>
                    {showChatSwitcher && (
                      <>
                        <div className="fixed inset-0 z-20" onClick={() => setShowChatSwitcher(false)} />
                        <div
                          className="absolute z-30 flex flex-col"
                          style={{ top: 'calc(100% + 8px)', right: 0, width: '280px', borderRadius: '8px', boxShadow: '0px 4px 16px 0px rgba(26,29,35,0.12), 0px 0px 1px 0px rgba(144,146,145,0.56)', backgroundColor: '#ffffff', padding: '4px' }}
                          data-testid="popover-chat-switcher-welcome"
                        >
                          <span className="text-xs font-semibold text-secondary" style={{ letterSpacing: '0.24px', padding: '6px 8px 2px' }}>Recents</span>
                          {recentChats.slice(0, 6).map((chat) => (
                            <button
                              key={chat.id}
                              className="flex items-center w-full text-left border-none cursor-pointer rounded"
                              style={{ minHeight: '36px', padding: '6px 8px', background: 'white', gap: '8px' }}
                              onMouseEnter={e => { e.currentTarget.style.background = '#f5f4f2'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}
                              onClick={() => { handleSelectChat(chat.id, chat.name); setShowChatSwitcher(false); }}
                            >
                              <span className="flex-1 font-medium text-primary truncate" style={{ fontSize: '14px', letterSpacing: '0.28px', lineHeight: '1.5' }}>{chat.name}</span>
                            </button>
                          ))}
                          <div style={{ height: '1px', backgroundColor: '#dbdad6', margin: '4px 0' }} />
                          <button
                            className="flex items-center w-full border-none cursor-pointer rounded"
                            style={{ minHeight: '36px', padding: '6px 8px', background: 'white', gap: '6px' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#f5f4f2'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}
                            onClick={() => { setShowChatSwitcher(false); setShowHistory(true); }}
                          >
                            <HistoryIcon size="small" variant="secondary" />
                            <span className="font-medium text-secondary" style={{ fontSize: '14px', letterSpacing: '0.28px', lineHeight: '1.5' }}>View all history</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              <DropdownRoot modal={false} open={forceMoreMenuOpen || undefined}>
                <Tooltip title="Options" placement="top">
                  <DropdownTrigger asChild>
                    <Button
                      variant="secondary"
                      size="small"
                      iconPosition="center"
                      Icon={<DotsIcon size="small" className="rotate-90" />}
                      aria-label="More options"
                      data-testid="button-more-options"
                      className={forceMoreMenuOpen ? 'bg-action-secondary-hover' : ''}
                    />
                  </DropdownTrigger>
                </Tooltip>
                <DropdownContent 
                  align="end" 
                  className="p-0 rounded-base min-w-[180px]"
                  style={{
                    boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.04)',
                    border: '0.5px solid #dbdad6'
                  }}
                  data-testid="dropdown-more-options"
                >
                  <div className="py-1-5 px-0">
                    {prototypeMode !== 'after' ? (
                      <>
                        <DropdownItem 
                          className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                          data-testid="dropdown-item-delete"
                          onClick={handleDeleteCurrentChat}
                        >
                          <BinIcon size="small" variant="primary" />
                          <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>
                            Delete
                          </span>
                        </DropdownItem>
                        <div className="mx-0" style={{ height: '1px', backgroundColor: '#dbdad6', margin: '4px 0' }} />
                        <DropdownItem 
                          className="group flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-[#f5f3ee]"
                          data-testid="dropdown-item-feedback"
                          onClick={() => setShowFeedback(true)}
                        >
                          <HeartIcon size="small" variant="primary" className="transition-colors group-hover:[&_path]:fill-[#E1705F] group-hover:[&_path]:stroke-[#E1705F]" />
                          <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>
                            Leave feedback
                          </span>
                        </DropdownItem>
                      </>
                    ) : (
                      <>
                        {isInChatMode && (
                          <DropdownItem 
                            className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                            data-testid="dropdown-item-delete"
                            onClick={handleDeleteCurrentChat}
                          >
                            <BinIcon size="small" variant="primary" />
                            <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>
                              Delete chat
                            </span>
                          </DropdownItem>
                        )}
                        <DropdownItem 
                          className="group flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-[#f5f3ee]"
                          data-testid="dropdown-item-feedback"
                          onClick={() => setShowFeedback(true)}
                        >
                          <HeartIcon size="small" variant="primary" className="transition-colors group-hover:[&_path]:fill-[#E1705F] group-hover:[&_path]:stroke-[#E1705F]" />
                          <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>
                            Leave feedback
                          </span>
                        </DropdownItem>
                      </>
                    )}
                  </div>
                </DropdownContent>
              </DropdownRoot>
              <Tooltip title="Close" placement="top">
                <Button
                  variant="secondary"
                  size="small"
                  iconPosition="center"
                  Icon={<CloseIcon size="small" />}
                  aria-label="Close"
                  data-testid="button-collapse-atlas"
                  onClick={onToggle}
                />
              </Tooltip>
            </div>
          </div>
          <div className="flex-1 flex flex-col p-2 overflow-y-auto relative" style={{ gap: '24px' }}>
            {topContent && (
              <div className="absolute top-0 left-0 right-0 p-2">
                {topContent}
              </div>
            )}
            <div className="flex flex-col items-start w-full mt-auto" style={{ gap: '24px' }}>
              <div 
                className="flex items-center justify-center"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8.605px',
                  background: 'white',
                  border: 'none',
                  boxShadow: '0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)',
                  transform: 'rotate(-3.88deg)',
                }}
              >
                <img src={atlasIcon} alt="Atlas" style={{ width: '24px', height: '26px' }} />
              </div>
              
              <h3 className="text-m font-medium text-primary w-full" data-testid="text-atlas-greeting">
                {greeting || "Hey Sarah, I can help you navigate your apprenticeship"}
              </h3>
            </div>

            <div className="flex flex-col items-start" style={{ gap: '8px' }} data-testid="atlas-suggestions">
              {suggestions.map((suggestion, index) => {
                return (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className={`group w-full flex cursor-pointer select-none items-center text-s font-medium leading-tight transition-all border active:shadow-none text-left ${'bg-primary rounded-lg border-separator-primary shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] hover:bg-secondary active:bg-[#e8e7e3]'}`}
                  style={{
                    padding: '8px 12px',
                    ...({})
                  }}
                  data-testid={`button-suggestion-${index}`}
                >
                  <div className="flex items-center" style={{ gap: '8px' }}>
                    <SuggestionIcon type={suggestion.icon} color={undefined} />
                    <span className={"text-action underline decoration-dashed underline-offset-4 group-hover:decoration-solid"} style={{ letterSpacing: '0.28px' }}>{suggestion.text}</span>
                  </div>
                </button>
                );
              })}
            </div>

            {!hideContentGuidance && (
              <div className="flex flex-col items-start gap-1">
                <span className="text-s font-medium text-secondary">{contentGuidanceTitle || "Content guidance"}</span>
                {(contentGuidance || defaultContentGuidance).map((item, index) => {
                  return (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(item)}
                    className="w-full p-1 text-left hover:opacity-80 transition-opacity"
                    style={{
                      backgroundColor: '#f5f7ff',
                      borderRadius: '5px',
                      padding: undefined,
                    }}
                    data-testid={`button-guidance-${index}`}
                  >
                    <span className={`text-s font-medium ${'text-action'}`}>{item}</span>
                  </button>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
      {isDraftsMode && prototypeTab !== 'after-drafts' && !draftsPromptDismissed && (
        <div style={{ padding: '0 16px', position: 'relative', zIndex: 21 }}>
          <DraftsPrompt
            variant="card"
            onDismiss={() => setDraftsPromptDismissed(true)}
            onReview={() => {
              setDraftsPromptDismissed(true);
              setChatMessages([
                {
                  id: 'drafts-review',
                  type: 'atlas',
                  content: '',
                  timestamp: new Date(),
                  action: { type: 'otj_drafts' },
                },
              ]);
            }}
          />
        </div>
      )}
      <div className="p-2" style={{ position: 'relative', zIndex: 21 }}>
        {prototypeMode === 'after' && isInChatMode && (
          <button
            className="group flex items-center justify-between w-full transition-colors hover:bg-[#eef2ff]"
            style={{ padding: '7px 12px', borderRadius: 10, background: '#f5f7ff', border: '1px solid #c7cdf9', marginBottom: '8px' }}
            onClick={() => handleOpenFullScreen()}
            data-testid="button-open-fullscreen-quiet"
          >
            <span className="flex items-center" style={{ gap: 7, fontSize: 12, color: '#212223' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4a5ff7" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
              Need a larger workspace?
            </span>
            <span className="flex items-center group-hover:underline" style={{ gap: 3, fontSize: 12, fontWeight: 600, color: '#4a5ff7', textUnderlineOffset: 2 }}>
              Open Atlas in full view
              <ArrowUpRightIcon size="small" variant="action" style={{ width: '11px', height: '11px' }} />
            </span>
          </button>
        )}
        <div 
          className="flex flex-col overflow-hidden transition-all"
          style={{
            backgroundColor: prototypeMode === 'after' ? 'transparent' : '#ffffff',
            backdropFilter: prototypeMode === 'after' ? 'blur(8px)' : 'none',
            WebkitBackdropFilter: prototypeMode === 'after' ? 'blur(8px)' : 'none',
            border: isFocused ? ('1px solid #4a5ff7') : '1px solid #dbdad6',
            borderRadius: '16px',
            padding: '8px',
            boxShadow: isFocused ? ('0px 0px 0px 2px #d2d7fd') : 'none'
          }}
          data-testid="atlas-input-container"
        >
          {attachedFiles.length > 0 && (
            <div style={{ padding: '8px 8px 0 8px' }}>
              <div className="flex flex-wrap" style={{ gap: '8px' }}>
                {attachedFiles.map((attachedFile) => (
                  <div 
                    key={attachedFile.id}
                    className="inline-flex items-center group cursor-pointer relative"
                    style={{ 
                      padding: '4px 8px 4px 4px',
                      gap: '6px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #dbdad6',
                      borderRadius: '8px',
                      boxShadow: '0px 1px 2px 0px rgba(26, 29, 35, 0.05)',
                      maxWidth: '150px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5f5f4';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                    data-testid={`file-preview-${attachedFile.id}`}
                  >
                    {attachedFile.isImage && attachedFile.preview ? (
                      <img 
                        src={attachedFile.preview} 
                        alt={attachedFile.file.name}
                        className="object-cover flex-shrink-0"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px'
                        }}
                      />
                    ) : (
                      <div 
                        className="flex items-center justify-center bg-action flex-shrink-0"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px'
                        }}
                      >
                        <TextFileIcon size="small" variant="white" />
                      </div>
                    )}
                    <span className="text-xs text-primary truncate">
                      {attachedFile.file.name}
                    </span>
                    <button
                      onClick={() => handleRemoveFile(attachedFile.id)}
                      className="absolute flex items-center justify-center bg-inverse-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        width: '16px',
                        height: '16px',
                        right: '4px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}
                      aria-label="Remove file"
                      data-testid={`button-remove-file-${attachedFile.id}`}
                    >
                      <CloseIcon size="small" variant="white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ padding: '8px' }}>
            <textarea
              rows={1}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                const el = e.target;
                el.style.height = 'auto';
                const maxHeight = 200;
                el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
                el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
                requestAnimationFrame(() => {
                  if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                  }
                });
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                handleKeyDown(e);
                if (e.key === 'Enter' && !e.shiftKey) {
                  const el = e.target as HTMLTextAreaElement;
                  el.style.height = '20px';
                  el.style.overflowY = 'hidden';
                }
              }}
              placeholder="Ask me anything..."
              className="w-full block text-s bg-transparent outline-none resize-none atlas-thin-scroll"
              style={{
                color: inputValue.trim().length > 0 || attachedFiles.length > 0 ? '#212223' : '#6f7171',
                lineHeight: '20px',
                height: '20px',
                maxHeight: '200px',
                overflowY: 'hidden',
                width: 'calc(100% + 14px)',
                paddingRight: '14px'
              }}
              data-testid="input-atlas-message"
            />
          </div>
          <div className="flex items-center justify-between" style={{ height: '32px' }}>
            <Tooltip title="Add attachment" placement="top">
              <Button
                variant="text"
                size="small"
                iconPosition="center"
                Icon={<PlusIcon size="small" />}
                aria-label="Add attachment"
                data-testid="button-add-attachment"
                onClick={handleAttachmentClick}
                className={isOnboardingActive && onboardingStep === 5 ? 'bg-action-secondary-hover' : ''}
              />
            </Tooltip>
            <div className="flex items-center" style={{ gap: '8px' }}>
              <Tooltip title="Send" placement="top">
                <div style={{ opacity: hasValue ? 1 : 0.64 }}>
                  <Button
                    variant="primary"
                    size="small"
                    iconPosition="center"
                    Icon={<ArrowUpIcon size="small" variant="white" />}
                    aria-label="Send message"
                    data-testid="button-send"
                    onClick={() => handleSendMessage(inputValue)}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
        <AtlasPrivacyNotice />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        data-testid="input-file-upload"
      />
      {showUploadModal && createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={handleUploadCancel}
          data-testid="upload-modal-overlay"
        >
          <div 
            className="bg-primary rounded-lg shadow-card"
            style={{ 
              maxWidth: '400px', 
              width: '90%',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onClick={(e) => e.stopPropagation()}
            data-testid="upload-modal"
          >
            <div className="flex items-center justify-between">
              <span className="text-l font-semibold text-primary" style={{ lineHeight: '1.25' }}>Upload to Atlas</span>
              <button
                onClick={handleUploadCancel}
                className="p-1 hover:bg-secondary rounded cursor-pointer"
                aria-label="Close"
                data-testid="button-close-upload-modal"
              >
                <CloseIcon size="small" variant="secondary" />
              </button>
            </div>
            <p className="text-m text-primary" style={{ lineHeight: '1.5' }}>
              Please don't upload files containing personal information, commercially sensitive or confidential data.
            </p>
            <div className="flex items-end justify-end" style={{ gap: '16px' }}>
              <Button
                variant="secondary"
                size="small"
                onClick={handleUploadCancel}
                data-testid="button-cancel-upload"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={handleUploadConfirm}
                data-testid="button-confirm-upload"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </motion.div>
  );
}
