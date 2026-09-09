import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { loadSharedAtlasState, saveSharedAtlasState, subscribeSharedAtlasState, type SharedAtlasState, type SharedMessage } from "@/lib/atlas-sync";
import { useSearch } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Button,
  SearchIcon,
  DotsIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowLeftIcon,
  ArrowUpRightIcon,
  ChatIcon,
  AlertIcon,
  HelpIcon,
  Tooltip,
  TextFileIcon,
  CloseIcon,
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  EditIcon,
  EditWriteIcon,
  HeartIcon,
  HomeIcon,
  FolderIcon,
  CalendarIcon,
  TargetIcon,
  EyeIcon,
  GroupMemberReviewIcon,
  PersonIcon,
  GridIcon,
  CloneIcon,
  SpeakerIcon,
  LikeIcon,
  DislikeIcon,
  CheckIcon,
  ChevronLeftIcon,
  BinIcon,
  HistoryIcon,
  Textarea,
  TextInput,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  toasts,
  ProfileMenu,
} from "@multiverse-io/stardust-react";
import atlasIcon from "@/assets/atlas-icon.svg";
import multiverseHexagon from "@/assets/multiverse_hexagon.svg";
import { ATLAS_CONVERSATION_STORAGE_KEY, ATLAS_FULLSCREEN_HANDOFF_PREFIX } from "@/components/atlas-constants";
import { fetchSharedAtlasState } from "@/lib/atlas-sync";
import { AtlasFeedbackModal } from "@/components/atlas";
import { useAtlasVersion } from "@/components/atlas-version-context";
import { AtlasPrivacyNotice } from "@/components/atlas-privacy-notice";
import { ATLAS_FULLSCREEN_CLOSE_URL } from "@/components/atlas-constants";

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

interface PageContext {
  id: string;
  label: string;
  icon: "home" | "learning" | "projects" | "sessions" | "offthejob" | "progress" | "portfolio";
}

const CANONICAL_CONTEXTS: PageContext[] = [
  { id: "homepage", label: "Home", icon: "home" },
  { id: "learning", label: "Learning", icon: "learning" },
  { id: "projects", label: "Projects", icon: "projects" },
  { id: "sessions", label: "My Sessions", icon: "sessions" },
  { id: "offthejob", label: "Off the Job", icon: "offthejob" },
  { id: "progress", label: "Progress Reviews", icon: "progress" },
  { id: "portfolio", label: "Portfolio", icon: "portfolio" },
];

const CONTEXT_ALIASES: Record<string, string> = {
  "homepage": "homepage",
  "home": "homepage",
  "/": "homepage",
  "learning": "learning",
  "projects": "projects",
  "project": "projects",
  "sessions": "sessions",
  "my-sessions": "sessions",
  "mysessions": "sessions",
  "offthejob": "offthejob",
  "off-the-job": "offthejob",
  "otj": "offthejob",
  "progress": "progress",
  "progress-reviews": "progress",
  "progressreviews": "progress",
  "portfolio": "portfolio",
};

function PinGlyph({ size = 16, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d="M12 17v5" />
      <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
    </svg>
  );
}

function MarqueeTitle({ text, active, testId }: { text: string; active: boolean; testId?: string }) {
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

function getContextById(id: string): PageContext | undefined {
  return CANONICAL_CONTEXTS.find(c => c.id === id);
}

function resolveContextAlias(alias: string): PageContext | undefined {
  const canonicalId = CONTEXT_ALIASES[alias.toLowerCase()];
  if (!canonicalId) return undefined;
  return getContextById(canonicalId);
}

function ContextIcon({ type, className }: { type: PageContext["icon"]; className?: string }) {
  const iconProps = { size: "small" as const, variant: "primary" as const, className };
  switch (type) {
    case "home":
      return <HomeIcon {...iconProps} />;
    case "learning":
      return <GridIcon {...iconProps} />;
    case "projects":
      return <EditIcon {...iconProps} />;
    case "sessions":
      return <PersonIcon {...iconProps} />;
    case "offthejob":
      return <CalendarIcon {...iconProps} />;
    case "progress":
      return <TextFileIcon {...iconProps} />;
    case "portfolio":
      return <FolderIcon {...iconProps} />;
    default:
      return <HomeIcon {...iconProps} />;
  }
}

const suggestions = [
  { text: "What should I focus on next?", icon: "target" },
  { text: "Plan my next two weeks", icon: "calendar" },
  { text: "I need help with something", icon: "review" },
  { text: "Show me what you can do", icon: "eye" },
];

function SuggestionIcon({ type }: { type: string }) {
  switch (type) {
    case "chat":
      return <ChatIcon size="small" variant="action" className="flex-shrink-0" />;
    case "search":
      return <SearchIcon size="small" variant="action" className="flex-shrink-0" />;
    case "alert":
      return <AlertIcon size="small" variant="action" className="flex-shrink-0" />;
    case "help":
      return <HelpIcon size="small" variant="action" className="flex-shrink-0" />;
    case "target":
      return <TargetIcon size="small" variant="action" className="flex-shrink-0" />;
    case "calendar":
      return <CalendarIcon size="small" variant="action" className="flex-shrink-0" />;
    case "review":
      return <GroupMemberReviewIcon size="small" variant="action" className="flex-shrink-0" />;
    case "eye":
      return <EyeIcon size="small" variant="action" className="flex-shrink-0" />;
    default:
      return <ChatIcon size="small" variant="action" className="flex-shrink-0" />;
  }
}

function AtlasIcon({ size = "medium" }: { size?: "small" | "medium" }) {
  
  const dimensions = size === "medium" ? { width: "48px", height: "48px" } : { width: "32px", height: "30px" };
  const iconSize = size === "medium" ? "24px" : "16px";
  const radius = size === "medium" ? "8.605px" : "5px";
  const activeIcon = atlasIcon;
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: radius,
        background: 'white',
        boxShadow: "0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)",
        transform: "rotate(-3.88deg)",
      }}
    >
      <img src={activeIcon} alt="Atlas" style={{ width: iconSize, height: iconSize }} />
    </div>
  );
}

interface AttachedFile {
  id: string;
  file: File;
  preview: string | null;
  isImage: boolean;
}

interface ChatMessageFile {
  id: string;
  name: string;
  preview: string | null;
  isImage: boolean;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'atlas';
  content: string;
  timestamp: Date;
  files?: ChatMessageFile[];
  isStreaming?: boolean;
}

function TypewriterText({ 
  content, 
  onComplete,
  speed = 8
}: { 
  content: string; 
  onComplete?: () => void;
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
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [content, speed, onComplete, isComplete]);
  
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
          const isInline = !className;
          return isInline ? (
            <code className="bg-secondary px-1 py-0.5 rounded text-s font-mono text-primary">{children}</code>
          ) : (
            <code className="block bg-secondary p-2 rounded-lg text-s font-mono text-primary overflow-x-auto my-2">{children}</code>
          );
        },
        pre: ({children}) => <pre className="bg-secondary p-2 rounded-lg overflow-x-auto my-2">{children}</pre>,
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

interface AtlasMemory {
  id: string;
  content: string;
  createdAt: string;
}

interface PersonalisationData {
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

interface PersonalisationPageProps {
  onClose: () => void;
}

function PersonalisationPage({ onClose }: PersonalisationPageProps) {
  const [formData, setFormData] = useState<PersonalisationData>(() => getStoredPersonalisation());
  const [editingMemoryId, setEditingMemoryId] = useState<string | null>(null);
  const [editingMemoryContent, setEditingMemoryContent] = useState('');

  const handleFieldChange = (field: keyof PersonalisationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    savePersonalisation(formData);
    toasts.success("Personalisation saved", "Your preferences have been updated");
    onClose();
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
            onClick={onClose}
          />
          <span className="text-m font-medium text-primary">Personalisation</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ padding: '16px' }}>
        <div className="flex flex-col" style={{ gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
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

export default function AtlasStandalonePage() {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [contexts, setContexts] = useState<PageContext[]>([]);
  const [showContextPicker, setShowContextPicker] = useState(false);
  const [showPersonalisation, setShowPersonalisation] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatsTab, setChatsTab] = useState<'no-chats' | 'with-chats' | '20-plus'>(() =>
    new URLSearchParams(window.location.search).get("chats") === "many"
      ? '20-plus'
      : new URLSearchParams(window.location.search).get("chats") === "none"
        ? 'no-chats'
        : 'with-chats'
  );
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const [groupBy, setGroupBy] = useState<'none' | 'similarity' | 'date'>('none');
  const isResizingSidebar = useRef(false);

  // While this full-screen page is open, heartbeat the server so the main
  // app keeps its sidebar locked closed. On leave (back navigation, tab
  // close), send an explicit close so the app unlocks immediately.
  useEffect(() => {
    // Name this window so the platform's "Atlas full screen" button can
    // focus the existing tab instead of opening a duplicate.
    try {
      window.name = "atlas-fullscreen";
    } catch {}
    const beat = () => {
      fetch("/api/atlas/fullscreen-heartbeat", { method: "POST" }).catch(() => {});
    };
    beat();
    const id = setInterval(beat, 2000);
    const close = () => {
      try {
        navigator.sendBeacon(ATLAS_FULLSCREEN_CLOSE_URL);
      } catch {}
    };
    window.addEventListener("pagehide", close);
    return () => {
      clearInterval(id);
      window.removeEventListener("pagehide", close);
      close();
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizingSidebar.current) return;
      setSidebarWidth(Math.min(420, Math.max(180, e.clientX)));
    };
    const onMouseUp = () => {
      if (!isResizingSidebar.current) return;
      isResizingSidebar.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contextPickerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearch();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [messageFeedback, setMessageFeedback] = useState<Record<string, 'like' | 'dislike' | null>>({});
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [currentChatName, setCurrentChatName] = useState("New Atlas chat");
  const [chatHistory, setChatHistory] = useState<{ id: string; title: string; date: string; timestamp: Date; preview?: string; pinned?: boolean }[]>(() => {
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
    
    const base = [
      { id: "demo-1", title: "Help with project submission deadline", date: "today", timestamp: today, preview: "I'd be happy to help you with your project submission deadline! Here are some key things to keep in mind." },
      { id: "demo-2", title: "Understanding KSB requirements", date: "today", timestamp: today, preview: "KSBs (Knowledge, Skills, and Behaviours) are the core competencies you need to demonstrate." },
      { id: "demo-3", title: "Off-the-job training questions", date: "yesterday", timestamp: yesterday, preview: "Off-the-job training is a mandatory part of your apprenticeship. Here's what you need to know." },
      { id: "demo-4", title: "Portfolio evidence guidance", date: "2daysago", timestamp: twoDaysAgo, preview: "Strong portfolio evidence maps clearly to your KSBs and shows your actual work." },
      { id: "demo-5", title: "End-point assessment preparation", date: "3daysago", timestamp: threeDaysAgo, preview: "Your EPA has several components. Let's break down how to prepare for each one." },
      { id: "demo-6", title: "Career development advice", date: "lastweek", timestamp: lastWeek, preview: "Great to hear you're thinking about your career development! Here are some suggestions." },
    ];

    const manyChats = new URLSearchParams(window.location.search).get("chats") === "many";
    if (!manyChats) return base;
    return [...base, ...buildExtraChats()];
  });

  function buildExtraChats() {
    const now = new Date();
    const extraTitles = [
      "Time management strategies for apprentices",
      "How to prepare for my next progress review",
      "Feedback on my data visualisation project",
      "SQL query optimisation tips",
      "Building confidence in presentations",
      "Understanding my learning plan",
      "Preparing evidence for the Data Analysis unit",
      "Balancing work and study time",
      "Questions about my gateway meeting",
      "Improving my stakeholder communication",
      "Python vs R for my analysis project",
      "How to document off-the-job hours correctly",
      "Getting more from my coach sessions",
      "Interpreting my skills radar results",
      "Setting goals for the next quarter",
      "Help structuring my project report",
      "Dashboard design best practices",
      "Understanding distinction criteria",
    ];
    const extras = extraTitles.map((title, i) => {
      const ts = new Date(now);
      ts.setDate(ts.getDate() - (8 + i));
      return {
        id: `demo-extra-${i + 1}`,
        title,
        date: "older",
        timestamp: ts,
        preview: "Here's a summary of what we discussed in this conversation.",
      };
    });
    return extras;
  }

  // --- Mirroring with the sidebar Atlas panel via shared localStorage state ---
  const syncSourceIdRef = useRef(`fullscreen-${Math.random().toString(36).slice(2)}`);
  const applyingSharedRef = useRef(false);
  const sharedHydratedRef = useRef(false);
  // 'no-chats' is an isolated demo state: it never reads from or writes to
  // the shared cross-tab history. Chats started there live only in this tab.
  const chatsTabRef = useRef(chatsTab);
  chatsTabRef.current = chatsTab;
  const [noChatsLocalIds, setNoChatsLocalIds] = useState<string[]>([]);
  const sharedMessagesRef = useRef<Record<string, SharedMessage[]>>({});
  const urlChatRestoredRef = useRef(false);
  const knownSharedChatIdsRef = useRef<Set<string>>(new Set());

  const serializeSharedMessage = (m: ChatMessage): SharedMessage => ({
    ...m,
    timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : String(m.timestamp),
  } as SharedMessage);

  const reviveSharedMessages = (msgs: SharedMessage[]): ChatMessage[] =>
    msgs.map(m => ({ ...(m as unknown as ChatMessage), timestamp: new Date(m.timestamp) }));

  const applySharedState = (shared: SharedAtlasState) => {
    if (chatsTabRef.current === 'no-chats') return;
    applyingSharedRef.current = true;
    sharedMessagesRef.current = shared.messages;
    const newlySeen = shared.chats.map(c => c.id);
    setChatHistory(shared.chats.map(c => {
      const lastAtlas = [...(shared.messages[c.id] || [])].reverse().find(m => m.type === 'atlas');
      return {
        id: c.id,
        title: c.name,
        date: 'today',
        timestamp: new Date(c.timestamp),
        pinned: c.pinned,
        preview: c.preview ?? (lastAtlas ? lastAtlas.content.replace(/[*#`]/g, '').slice(0, 100) : undefined),
      };
    }));
    if (currentChatId) {
      const meta = shared.chats.find(c => c.id === currentChatId);
      if (!meta) {
        // Only treat a missing chat as a deletion if shared state previously
        // knew about it; otherwise (e.g. restored via handoff before the
        // sidebar's write-through flushed) keep the open conversation.
        if (knownSharedChatIdsRef.current.has(currentChatId)) {
          setChatMessages([]);
          setCurrentChatId(null);
          setCurrentChatName("New Atlas chat");
        }
      } else {
        if (meta.name !== currentChatName) setCurrentChatName(meta.name);
        const msgs = shared.messages[currentChatId];
        // Never replace the open conversation while a response is in flight
        if (msgs && !isTyping && JSON.stringify(msgs) !== JSON.stringify(chatMessages.map(serializeSharedMessage))) {
          setChatMessages(reviveSharedMessages(msgs));
        }
      }
    }
    for (const id of newlySeen) knownSharedChatIdsRef.current.add(id);
    requestAnimationFrame(() => { applyingSharedRef.current = false; });
  };

  useEffect(() => {
    const hydrateFrom = (shared: SharedAtlasState) => {
      applySharedState(shared);
      // Deterministic open-with-chat: ?chat=<id> opens that chat from shared state
      if (urlChatRestoredRef.current) return;
      const requestedChatId = new URLSearchParams(window.location.search).get('chat');
      if (requestedChatId) {
        const meta = shared.chats.find(c => c.id === requestedChatId);
        const msgs = shared.messages[requestedChatId];
        if (meta && msgs && msgs.length > 0) {
          urlChatRestoredRef.current = true;
          setCurrentChatId(requestedChatId);
          setCurrentChatName(meta.name);
          setChatMessages(reviveSharedMessages(msgs));
        }
      }
    };
    // Hydrate from the server only (authoritative). This tab's localStorage is
    // partition-local and likely stale — hydrating from it first could mark
    // ?chat= as restored against old data or clobber the server snapshot.
    // Enable write-through only after hydration + handoff/session restoration
    // have committed, so the mount-pass write effect can't clobber shared state.
    let cancelled = false;
    fetchSharedAtlasState()
      .then(fresh => {
        if (cancelled) return;
        if (fresh) {
          hydrateFrom(fresh);
        } else {
          const local = loadSharedAtlasState();
          if (local) hydrateFrom(local);
        }
      })
      .finally(() => { if (!cancelled) sharedHydratedRef.current = true; });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sharedHydratedRef.current || applyingSharedRef.current || isTyping) return;
    if (chatsTab === 'no-chats') return;
    let chats = chatHistory.map(c => ({
      id: c.id,
      name: c.title,
      timestamp: (c.timestamp instanceof Date ? c.timestamp : new Date()).toISOString(),
      pinned: c.pinned,
      preview: c.preview,
    }));
    const messages: Record<string, SharedMessage[]> = { ...sharedMessagesRef.current };
    if (currentChatId && chatMessages.length > 0) {
      messages[currentChatId] = chatMessages.map(serializeSharedMessage);
      if (chats.some(c => c.id === currentChatId)) {
        chats = chats.map(c => c.id === currentChatId ? { ...c, name: currentChatName } : c);
      } else {
        const first = chatMessages[0];
        const lastAtlasMsg = [...chatMessages].reverse().find(m => m.type === 'atlas');
        chats = [{
          id: currentChatId,
          name: currentChatName,
          timestamp: (first.timestamp instanceof Date ? first.timestamp : new Date()).toISOString(),
          pinned: undefined,
          preview: lastAtlasMsg ? lastAtlasMsg.content.replace(/[*#`]/g, '').slice(0, 100) : undefined,
        }, ...chats];
      }
    }
    // Drop messages for chats that no longer exist (deletions)
    const chatIds = new Set(chats.map(c => c.id));
    for (const id of Object.keys(messages)) {
      if (!chatIds.has(id)) delete messages[id];
    }
    sharedMessagesRef.current = messages;
    saveSharedAtlasState({ chats, messages }, syncSourceIdRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatHistory, chatMessages, currentChatName, currentChatId, isTyping]);

  useEffect(() => {
    return subscribeSharedAtlasState(syncSourceIdRef.current, applySharedState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatId, currentChatName, chatMessages, isTyping]);

  useEffect(() => {
    try {
      // The ?chat= URL restoration is authoritative; the handoff is only a
      // fallback for when the shared state didn't have the conversation.
      if (urlChatRestoredRef.current) return;
      const urlToken = new URLSearchParams(window.location.search).get('handoff');
      if (!urlToken) return;
      const storageKey = `${ATLAS_FULLSCREEN_HANDOFF_PREFIX}${urlToken}`;
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const handoff = JSON.parse(raw) as { token?: string; chatId: string | null; chatName: string; messages: (Omit<ChatMessage, 'timestamp'> & { timestamp: string })[] };
      if (!handoff || handoff.token !== urlToken || !Array.isArray(handoff.messages) || handoff.messages.length === 0) {
        localStorage.removeItem(storageKey);
        return;
      }
      localStorage.removeItem(storageKey);
      const messages: ChatMessage[] = handoff.messages.map(m => ({ ...m, timestamp: new Date(m.timestamp) }));
      const chatId = handoff.chatId || `chat-${Date.now()}`;
      setChatMessages(messages);
      setCurrentChatId(chatId);
      setCurrentChatName(handoff.chatName || 'Chat');
      setChatHistory(prev => {
        if (prev.some(c => c.id === chatId)) {
          return prev.map(c => c.id === chatId ? { ...c, title: handoff.chatName || c.title } : c);
        }
        const lastAtlas = [...messages].reverse().find(m => m.type === 'atlas');
        return [{
          id: chatId,
          title: handoff.chatName || 'Chat',
          date: 'today',
          timestamp: new Date(),
          preview: lastAtlas ? lastAtlas.content.replace(/[*#`]/g, '').slice(0, 100) : undefined,
        }, ...prev];
      });
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isInChatMode = chatMessages.length > 0;

  const [hoveredRecentId, setHoveredRecentId] = useState<string | null>(null);
  const [openRecentMenuId, setOpenRecentMenuId] = useState<string | null>(null);
  const [renamingRecentId, setRenamingRecentId] = useState<string | null>(null);
  const [renameRecentValue, setRenameRecentValue] = useState("");

  const [renamingHeader, setRenamingHeader] = useState(false);
  const [headerRenameValue, setHeaderRenameValue] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const commitHeaderRename = () => {
    const newTitle = headerRenameValue.trim();
    if (newTitle && currentChatId) {
      setChatHistory(prev => prev.map(c => c.id === currentChatId ? { ...c, title: newTitle } : c));
      setCurrentChatName(newTitle);
    }
    setRenamingHeader(false);
    setHeaderRenameValue("");
  };

  const commitRecentRename = () => {
    if (renamingRecentId && renameRecentValue.trim()) {
      const newTitle = renameRecentValue.trim();
      setChatHistory(prev => prev.map(c => c.id === renamingRecentId ? { ...c, title: newTitle } : c));
      if (renamingRecentId === currentChatId) {
        setCurrentChatName(newTitle);
      }
    }
    setRenamingRecentId(null);
    setRenameRecentValue("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextPickerRef.current && !contextPickerRef.current.contains(event.target as Node)) {
        setShowContextPicker(false);
      }
    };

    if (showContextPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showContextPicker]);

  useEffect(() => {
    const urlSearch = window.location.search;
    const params = new URLSearchParams(urlSearch);
    const contextParam = params.get("context");
    if (contextParam) {
      const contextData = resolveContextAlias(contextParam);
      if (contextData) {
        setContexts(prev => {
          if (prev.some(c => c.id === contextData.id)) {
            return prev;
          }
          return [...prev, contextData];
        });
      }
    }
  }, []);

  useEffect(() => {
    try {
      const storedConversation = sessionStorage.getItem(ATLAS_CONVERSATION_STORAGE_KEY);
      if (storedConversation) {
        const parsed = JSON.parse(storedConversation);
        if (parsed.chatMessages && Array.isArray(parsed.chatMessages) && parsed.chatMessages.length > 0) {
          const messagesWithDates = parsed.chatMessages.map((msg: { timestamp: string | Date; id: string; type: 'user' | 'atlas'; content: string; files?: { id: string; name: string; preview: string | null; isImage: boolean }[]; isStreaming?: boolean }) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setChatMessages(messagesWithDates);
        }
        if (parsed.chatName) {
          setCurrentChatName(parsed.chatName);
        }
        if (parsed.currentChatId) {
          setCurrentChatId(parsed.currentChatId);
        }
        if (parsed.contexts && Array.isArray(parsed.contexts)) {
          const validContexts = parsed.contexts
            .map((ctx: { id: string }) => resolveContextAlias(ctx.id))
            .filter((ctx: PageContext | undefined): ctx is PageContext => ctx !== undefined);
          if (validContexts.length > 0) {
            setContexts(prev => {
              const newContexts = validContexts.filter((vc: PageContext) => !prev.some(p => p.id === vc.id));
              return [...prev, ...newContexts];
            });
          }
        }
        sessionStorage.removeItem(ATLAS_CONVERSATION_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to restore conversation from sessionStorage:', e);
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const hasValue = inputValue.trim().length > 0 || attachedFiles.length > 0;

  const handleStreamingComplete = (messageId: string) => {
    setChatMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isStreaming: false } : msg
      )
    );
  };

  const handleCopyMessage = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleReadAloud = (messageId: string, content: string) => {
    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = content.replace(/[#*_~`]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);
    speechSynthRef.current = utterance;
    setSpeakingMessageId(messageId);
    window.speechSynthesis.speak(utterance);
  };

  const handleFeedback = (messageId: string, type: 'like' | 'dislike') => {
    setMessageFeedback(prev => ({
      ...prev,
      [messageId]: prev[messageId] === type ? null : type
    }));
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() && attachedFiles.length === 0) return;
    
    const messageFiles: ChatMessageFile[] = attachedFiles.map(f => ({
      id: f.id,
      name: f.file.name,
      preview: f.preview,
      isImage: f.isImage
    }));
    
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: messageText,
      timestamp: new Date(),
      files: messageFiles.length > 0 ? messageFiles : undefined
    };
    
    if (!currentChatId && chatMessages.length === 0) {
      const newChatId = `chat-${Date.now()}`;
      const chatTitle = messageText.slice(0, 50) + (messageText.length > 50 ? "..." : "");
      setCurrentChatId(newChatId);
      setCurrentChatName(chatTitle);
      if (chatsTab === 'no-chats') setNoChatsLocalIds(prev => [...prev, newChatId]);
      setChatHistory(prev => [
        { id: newChatId, title: chatTitle, date: "today", timestamp: new Date(), preview: messageText },
        ...prev
      ]);
    } else if (currentChatId) {
      setChatHistory(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, timestamp: new Date() }
          : chat
      ));
    }
    
    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    setInputValue("");
    setAttachedFiles([]);
    
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/atlas/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: updatedMessages.slice(-10).map(m => ({ type: m.type, content: m.content }))
        })
      });
      
      const data = await response.json();
      
      const atlasMessage: ChatMessage = {
        id: `atlas-${Date.now()}`,
        type: 'atlas',
        content: data.content || data.error || "I'm sorry, I couldn't generate a response.",
        timestamp: new Date(),
        isStreaming: true
      };
      
      setChatMessages(prev => [...prev, atlasMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `atlas-${Date.now()}`,
        type: 'atlas',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
        isStreaming: true
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
      const el = e.target as HTMLTextAreaElement;
      if (el && el.tagName === 'TEXTAREA') {
        el.style.height = "20px";
        el.style.overflowY = "hidden";
      }
    }
  };

  const handleNewChat = () => {
    setChatMessages([]);
    setInputValue("");
    setAttachedFiles([]);
    setContexts([]);
    setCurrentChatId(null);
    setCurrentChatName("New Atlas chat");
  };

  const handleDeleteChat = (chatId: string) => {
    setChatHistory(prev => prev.filter(c => c.id !== chatId));
    delete sharedMessagesRef.current[chatId];
    if (chatId === currentChatId) {
      // Clear the active chat without re-persisting it
      setChatMessages([]);
      setInputValue("");
      setAttachedFiles([]);
      setContexts([]);
      setCurrentChatId(null);
      setCurrentChatName("New Atlas chat");
    }
  };

  const handleSelectChat = (chatId: string, chatTitle: string) => {
    setCurrentChatId(chatId);
    setCurrentChatName(chatTitle);
    setInputValue("");
    setAttachedFiles([]);
    setContexts([]);
    
    const demoMessages: Record<string, ChatMessage[]> = {
      "demo-1": [
        { id: "demo-1-user", type: "user", content: "Help with project submission deadline", timestamp: new Date(), isStreaming: false },
        { id: "demo-1-atlas", type: "atlas", content: "I'd be happy to help you with your project submission deadline! Here are some key things to keep in mind:\n\n1. **Check your deadline** - Make sure you know the exact date and time\n2. **Review requirements** - Ensure all deliverables are ready\n3. **Plan buffer time** - Submit at least a day early if possible\n\nWould you like me to help you create a submission checklist?", timestamp: new Date(), isStreaming: false },
      ],
      "demo-2": [
        { id: "demo-2-user", type: "user", content: "Understanding KSB requirements", timestamp: new Date(), isStreaming: false },
        { id: "demo-2-atlas", type: "atlas", content: "KSBs (Knowledge, Skills, and Behaviours) are the core competencies you need to demonstrate throughout your apprenticeship.\n\n**Knowledge** - What you need to understand\n**Skills** - What you need to be able to do\n**Behaviours** - How you should conduct yourself\n\nEach KSB maps to specific learning outcomes. Would you like me to explain how to evidence them in your portfolio?", timestamp: new Date(), isStreaming: false },
      ],
      "demo-3": [
        { id: "demo-3-user", type: "user", content: "Off-the-job training questions", timestamp: new Date(), isStreaming: false },
        { id: "demo-3-atlas", type: "atlas", content: "Off-the-job training is a mandatory part of your apprenticeship. Here's what you need to know:\n\n- **Minimum 20%** of your working hours should be dedicated to OTJ training\n- This includes coaching sessions, workshops, and self-study\n- You should log all OTJ hours accurately\n\nWhat specific questions do you have about tracking or planning your OTJ hours?", timestamp: new Date(), isStreaming: false },
      ],
      "demo-4": [
        { id: "demo-4-user", type: "user", content: "Portfolio evidence guidance", timestamp: new Date(), isStreaming: false },
        { id: "demo-4-atlas", type: "atlas", content: "Building a strong portfolio is essential for your EPA. Here are some tips:\n\n1. **Collect evidence regularly** - Don't leave it until the end\n2. **Map to KSBs** - Each piece should demonstrate specific competencies\n3. **Quality over quantity** - Strong, detailed evidence is better than lots of weak examples\n4. **Include reflections** - Show your learning journey\n\nWould you like help with a specific type of evidence?", timestamp: new Date(), isStreaming: false },
      ],
      "demo-5": [
        { id: "demo-5-user", type: "user", content: "End-point assessment preparation", timestamp: new Date(), isStreaming: false },
        { id: "demo-5-atlas", type: "atlas", content: "Your EPA is the final assessment of your apprenticeship. Here's how to prepare:\n\n**Components typically include:**\n- Portfolio review\n- Professional discussion\n- Project presentation\n\n**Preparation tips:**\n- Review all your KSBs and evidence\n- Practice speaking about your work confidently\n- Prepare examples for each competency\n\nWhen is your EPA scheduled?", timestamp: new Date(), isStreaming: false },
      ],
      "demo-6": [
        { id: "demo-6-user", type: "user", content: "Career development advice", timestamp: new Date(), isStreaming: false },
        { id: "demo-6-atlas", type: "atlas", content: "Great to hear you're thinking about your career development! Here are some suggestions:\n\n1. **Set clear goals** - Where do you want to be in 1, 3, 5 years?\n2. **Build your network** - Connect with mentors and peers\n3. **Continue learning** - Look for additional certifications or training\n4. **Seek feedback** - Regular reviews help you grow\n\nWhat area of your career would you like to focus on?", timestamp: new Date(), isStreaming: false },
      ],
    };
    
    const sharedMsgs = sharedMessagesRef.current[chatId];
    if (sharedMsgs && sharedMsgs.length > 0) {
      setChatMessages(reviveSharedMessages(sharedMsgs));
    } else {
      setChatMessages(demoMessages[chatId] || []);
    }
  };

  const getDateLabel = (date: Date): string => {
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
  };

  const groupedChatHistory = () => {
    const groups: Map<string, typeof chatHistory> = new Map();
    
    chatHistory.forEach(chat => {
      const label = getDateLabel(chat.timestamp);
      if (!groups.has(label)) {
        groups.set(label, []);
      }
      groups.get(label)!.push(chat);
    });
    
    groups.forEach((chatList, label) => {
      chatList.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    });
    
    const orderedLabels = ["Today", "Yesterday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const result: { day: string; items: typeof chatHistory }[] = [];
    
    orderedLabels.forEach(label => {
      if (groups.has(label)) {
        result.push({ day: label, items: groups.get(label)! });
        groups.delete(label);
      }
    });
    
    groups.forEach((chatList, label) => {
      result.push({ day: label, items: chatList });
    });
    
    return result;
  };

  const handleAddContext = (contextId: string) => {
    const contextData = getContextById(contextId);
    if (contextData && !contexts.some(c => c.id === contextData.id)) {
      setContexts(prev => [...prev, contextData]);
    }
    setShowContextPicker(false);
  };

  const handleRemoveContext = (contextId: string) => {
    setContexts(prev => prev.filter(c => c.id !== contextId));
  };

  const availableContexts = CANONICAL_CONTEXTS.filter(
    context => !contexts.some(c => c.id === context.id)
  );

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const fileId = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const isImage = file.type.startsWith("image/");

        if (isImage) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setAttachedFiles((prev) => [
              ...prev,
              {
                id: fileId,
                file,
                preview: event.target?.result as string,
                isImage: true,
              },
            ]);
          };
          reader.readAsDataURL(file);
        } else {
          setAttachedFiles((prev) => [
            ...prev,
            {
              id: fileId,
              file,
              preview: null,
              isImage: false,
            },
          ]);
        }
      });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleSuggestionClick = (text: string) => {
    handleSendMessage(text);
  };

  const renderInputArea = () => (
    <motion.div 
      className="w-full p-2"
      initial={false}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <div
        className="flex flex-col transition-all"
        style={{
          backgroundColor: "#ffffff",
          border: isFocused ? "1px solid #4a5ff7" : "1px solid #dbdad6",
          borderRadius: "16px",
          padding: "8px",
          boxShadow: isFocused ? "0px 0px 0px 2px #d2d7fd" : "none",
        }}
        data-testid="atlas-input-container"
      >
        <div className="flex items-center relative hidden" style={{ height: "32px", gap: "4px" }}>
          <div className="relative" ref={contextPickerRef}>
            <Tooltip title="Add page context" placement="top">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowContextPicker(!showContextPicker);
                }}
                className="flex items-center justify-center cursor-pointer transition-colors hover:bg-secondary bg-primary border border-separator-primary rounded-full shadow-button-default"
                style={{
                  width: "32px",
                  height: "32px",
                }}
                aria-label="Add page context"
                data-testid="button-add-context"
              >
                <span className="text-secondary font-semibold" style={{ fontSize: "16px", lineHeight: "16px" }}>@</span>
              </button>
            </Tooltip>
            
            {showContextPicker && (
              <div
                className="absolute left-0 bg-primary rounded-lg border border-separator-primary shadow-card"
                style={{ minWidth: "180px", top: "40px", zIndex: 9999 }}
                data-testid="context-picker-dropdown"
              >
                <div style={{ padding: "4px 0" }}>
                  {availableContexts.length > 0 ? (
                    availableContexts.map((context) => (
                      <button
                        key={context.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddContext(context.id);
                        }}
                        className="w-full flex items-center cursor-pointer hover:bg-secondary transition-colors text-left"
                        style={{ gap: "8px", padding: "8px 12px" }}
                        data-testid={`context-option-${context.id}`}
                      >
                        <ContextIcon type={context.icon} />
                        <span className="text-s font-medium text-primary">
                          {context.label}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="text-s text-secondary" style={{ padding: "8px 12px" }}>
                      All contexts added
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {contexts.map((context) => (
            <div
              key={context.id}
              className="flex items-center transition-colors hover:bg-secondary group bg-primary border border-separator-primary rounded-full shadow-button-default"
              style={{ height: "32px", padding: "0 8px", gap: "4px" }}
              data-testid={`context-tag-${context.id}`}
            >
              <ContextIcon type={context.icon} />
              <span className="text-xs font-medium text-primary whitespace-nowrap">
                {context.label}
              </span>
              <button
                onClick={() => handleRemoveContext(context.id)}
                className="items-center justify-center hover:bg-[#e8e7e3] rounded-full transition-colors hidden group-hover:flex"
                style={{ width: "16px", height: "16px" }}
                aria-label={`Remove ${context.label} context`}
              >
                <CloseIcon size="small" variant="secondary" />
              </button>
            </div>
          ))}
        </div>

        {attachedFiles.length > 0 && (
          <div style={{ padding: "8px 8px 0 8px" }}>
            <div className="flex flex-wrap" style={{ gap: "8px" }}>
              {attachedFiles.map((attachedFile) => (
                <div
                  key={attachedFile.id}
                  className="inline-flex items-center group cursor-pointer relative"
                  style={{
                    padding: "4px 8px 4px 4px",
                    gap: "6px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #dbdad6",
                    borderRadius: "8px",
                    boxShadow: "0px 1px 2px 0px rgba(26, 29, 35, 0.05)",
                    maxWidth: "150px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f5f5f4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                  }}
                  data-testid={`file-preview-${attachedFile.id}`}
                >
                  {attachedFile.isImage && attachedFile.preview ? (
                    <img
                      src={attachedFile.preview}
                      alt={attachedFile.file.name}
                      className="object-cover flex-shrink-0"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center bg-action flex-shrink-0"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "4px",
                      }}
                    >
                      <TextFileIcon size="small" variant="white" />
                    </div>
                  )}
                  <span className="text-xs text-primary truncate">{attachedFile.file.name}</span>
                  <button
                    onClick={() => handleRemoveFile(attachedFile.id)}
                    className="absolute flex items-center justify-center bg-inverse-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      width: "16px",
                      height: "16px",
                      right: "4px",
                      top: "50%",
                      transform: "translateY(-50%)",
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

        <div style={{ padding: "8px" }}>
          <textarea
            rows={1}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              const el = e.target;
              el.style.height = "auto";
              const lineHeight = 20;
              const maxHeight = lineHeight * 10;
              el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
              el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
              requestAnimationFrame(() => {
                if (chatContainerRef.current) {
                  chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }
              });
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="w-full block text-s bg-transparent outline-none resize-none atlas-thin-scroll"
            style={{
              color: hasValue ? "#212223" : "#6f7171",
              lineHeight: "20px",
              height: "20px",
              maxHeight: "200px",
              overflowY: "hidden",
              width: "calc(100% + 14px)",
              paddingRight: "14px",
            }}
            data-testid="input-atlas-message"
          />
        </div>

        <div className="flex items-center justify-between" style={{ height: "32px" }}>
          <Tooltip title="Add attachment" placement="top">
            <Button
              variant="text"
              size="small"
              iconPosition="center"
              Icon={<PlusIcon size="small" />}
              aria-label="Add attachment"
              data-testid="button-add-attachment"
              onClick={handleAttachmentClick}
            />
          </Tooltip>
          <div className="flex items-center" style={{ gap: "8px" }}>
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
      {/* Centred to match this view's 800px centred composer column. */}
      <AtlasPrivacyNotice align="centre" />
    </motion.div>
  );

  return (
    <div className="flex flex-col h-screen w-full bg-primary overflow-hidden">
      <div className="flex flex-1 min-h-0 overflow-hidden">
      {/* Sidebar */}
      {(chatsTab !== 'no-chats' || isInChatMode) && (
      <aside
        className="hidden md:flex flex-col justify-between border-r border-separator-primary overflow-hidden py-2 flex-shrink-0 relative"
        style={{ width: `${sidebarWidth}px`, backgroundColor: '#f9f8f6', paddingBottom: 0 }}
      >
        <div className="flex flex-col gap-2 flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center px-2 pt-0-75 pb-1-25 gap-1">
            <span className="text-m font-semibold text-primary" style={{ letterSpacing: "0.3px" }}>
              Atlas
            </span>
            <img
              src={multiverseHexagon}
              alt=""
              style={{ width: "22px", height: "19px", filter: "brightness(0) saturate(100%) invert(32%) sepia(98%) saturate(1752%) hue-rotate(226deg) brightness(99%) contrast(95%)" }}
            />
            <span className="text-m font-medium text-secondary" style={{ letterSpacing: "0.3px" }}>
              AI Guide
            </span>
          </div>

          {/* New chat */}
          <div className="px-1">
            <Button
              variant="primary"
              size="small"
              Icon={<EditWriteIcon size="small" variant="white" />}
              iconPosition="left"
              className="w-full"
              onClick={handleNewChat}
              data-testid="button-new-chat-sidebar"
            >
              New chat
            </Button>
          </div>

          {/* Search */}
          <div className="px-1">
            <TextInput
              id="atlas-search"
              label="Search history"
              hideLabel
              type="search"
              size="small"
              fullWidth
              LeftIcon={<SearchIcon size="small" variant="secondary" />}
              style={{ height: "34px" }}
              placeholder="Search history"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-atlas-search"
            />
          </div>

          <style>{`@keyframes atlas-title-marquee { 0%, 15% { transform: translateX(0); } 85%, 100% { transform: translateX(var(--marquee-shift)); } }`}</style>
          {/* Chat History */}
          <div className="flex flex-col px-1 overflow-y-auto flex-1 min-h-0" style={{ gap: "16px" }}>
            {(() => {
              const items = [...chatHistory]
                .filter((item) => chatsTab !== 'no-chats' || noChatsLocalIds.includes(item.id))
                .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .sort((a, b) => {
                  if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
                  return b.timestamp.getTime() - a.timestamp.getTime();
                });
              if (items.length === 0) return null;
              const renderRow = (item: (typeof items)[number]) => {
                    const isHovered = hoveredRecentId === item.id;
                    return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectChat(item.id, item.title)}
                      onMouseEnter={() => setHoveredRecentId(item.id)}
                      onMouseLeave={() => setHoveredRecentId(null)}
                      style={{ padding: '3px 8px 10px' }}
                      className={`relative w-full text-left rounded-lg transition-colors cursor-pointer ${
                        currentChatId === item.id 
                          ? "bg-[#e7e5e0]" 
                          : "hover:bg-[#e7e5e0]"
                      }`}
                      data-testid={`chat-history-${item.id}`}
                    >
                      <div className="flex items-center" style={{ gap: "8px" }}>
                        {renamingRecentId === item.id ? (
                          <input
                            autoFocus
                            value={renameRecentValue}
                            onChange={(e) => setRenameRecentValue(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') commitRecentRename();
                              if (e.key === 'Escape') { setRenamingRecentId(null); setRenameRecentValue(""); }
                            }}
                            onBlur={commitRecentRename}
                            className="text-s font-semibold text-primary flex-1 min-w-0 bg-primary border border-action rounded-base px-0-5"
                            style={{ letterSpacing: "0.28px" }}
                            data-testid={`input-rename-recent-${item.id}`}
                          />
                        ) : (
                        <MarqueeTitle
                          text={item.title}
                          active={isHovered || openRecentMenuId === item.id}
                          testId={`text-title-recent-${item.id}`}
                        />
                        )}
                        {renamingRecentId !== item.id && (
                          <span
                            className="flex-shrink-0 text-xs text-secondary"
                            style={{ marginLeft: 'auto', letterSpacing: '0.24px' }}
                            data-testid={`text-date-recent-${item.id}`}
                          >
                            {chatRowDateLabel(item.timestamp)}
                          </span>
                        )}
                        {renamingRecentId !== item.id && (
                          <div
                            className="flex-shrink-0"
                            style={{
                              position: 'absolute',
                              right: '4px',
                              bottom: '6px',
                              visibility: (isHovered || openRecentMenuId === item.id) ? 'visible' : 'hidden',
                              opacity: (isHovered || openRecentMenuId === item.id) ? 1 : 0,
                              background: '#e7e5e0',
                              borderRadius: '8px',
                              boxShadow: '-10px 0 8px -2px #e7e5e0',
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DropdownRoot open={openRecentMenuId === item.id} onOpenChange={(open: boolean) => setOpenRecentMenuId(open ? item.id : null)}>
                              <DropdownTrigger asChild>
                                <Button 
                                  variant="secondary" 
                                  size="tiny"
                                  iconPosition="center"
                                  Icon={<DotsIcon size="small" className="rotate-90" />}
                                  aria-label="More options"
                                  data-testid={`button-more-recent-${item.id}`}
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
                                    data-testid={`dropdown-item-pin-recent-${item.id}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setChatHistory(prev => prev.map(c => c.id === item.id ? { ...c, pinned: !c.pinned } : c));
                                    }}
                                  >
                                    <PinGlyph size={16} className="text-primary" />
                                    <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>
                                      {item.pinned ? 'Unpin chat' : 'Pin chat'}
                                    </span>
                                  </DropdownItem>
                                  <DropdownItem
                                    className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                                    data-testid={`dropdown-item-rename-recent-${item.id}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setRenamingRecentId(item.id);
                                      setRenameRecentValue(item.title);
                                    }}
                                  >
                                    <EditIcon size="small" variant="primary" />
                                    <span className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px' }}>
                                      Rename
                                    </span>
                                  </DropdownItem>
                                  <DropdownItem
                                    className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                                    data-testid={`dropdown-item-delete-recent-${item.id}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenRecentMenuId(null);
                                      setDeleteConfirmId(item.id);
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
                      <div className="flex items-center" style={{ gap: "8px" }}>
                        <span
                          className="text-xs block flex-1 min-w-0"
                          style={{
                            color: "#626464",
                            letterSpacing: "0.24px",
                            lineHeight: "16px",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.preview || "No messages sent yet"}
                        </span>
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
              const dateBucketFor = (d: Date) => {
                const now = new Date();
                const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                if (d >= startOfToday) return "Today";
                if (d >= new Date(startOfToday.getTime() - 7 * 24 * 60 * 60 * 1000)) return "Previous 7 days";
                return "Older";
              };
              const groups = groupBy === 'similarity'
                ? ["Portfolio & evidence", "Off-the-job training", "Assessment & projects", "Career", "Other"]
                    .map(label => ({ label: label as string | null, items: items.filter(i => bucketFor(i.title) === label) }))
                    .filter(g => g.items.length > 0)
                : groupBy === 'date'
                ? ["Today", "Previous 7 days", "Older"]
                    .map(label => ({ label: label as string | null, items: items.filter(i => dateBucketFor(i.timestamp) === label) }))
                    .filter(g => g.items.length > 0)
                : (() => {
                    const pinnedItems = items.filter(i => i.pinned);
                    if (pinnedItems.length === 0) return [{ label: null as string | null, items }];
                    const recentItems = items.filter(i => !i.pinned);
                    const gs = [{ label: null as string | null, items: pinnedItems }];
                    if (recentItems.length > 0) gs.push({ label: 'Recent' as string | null, items: recentItems });
                    return gs;
                  })();
              return (
                <div className="flex flex-col" style={{ gap: "4px" }}>
                  <div className="flex items-center justify-between pl-1">
                    <span className="text-xs font-semibold text-secondary" style={{ letterSpacing: "0.24px" }}>
                      {groupBy === 'none' && items.some(i => i.pinned) ? 'Pinned' : 'Recents'}
                    </span>
                  </div>
                  {groups.map((g, gi) => (
                    <div key={g.label ?? 'all'} className="flex flex-col" style={{ gap: '4px' }}>
                      {g.label && (
                        <span className="text-xs font-medium text-secondary px-1" style={{ letterSpacing: '0.24px', marginTop: '4px' }}>
                          {g.label}
                        </span>
                      )}
                      {g.items.map(renderRow)}
                      {g.label && gi < groups.length - 1 && (
                        <div style={{ height: '1px', backgroundColor: '#dbdad6', margin: '8px 4px 4px' }} />
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col flex-shrink-0 px-2" style={{ paddingBottom: "20px" }}>
          <div style={{ height: "1px", backgroundColor: "#dbdad6", marginBottom: "15px" }} data-testid="separator-multiverse" />
          <span className="text-xs" style={{ letterSpacing: "0.2px", color: "#565858" }}>
            Atlas is powered by{" "}
            <a href="https://www.multiverse.io" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "#565858" }}>Multiverse</a>
          </span>
        </div>
        {/* Resize handle */}
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            isResizingSidebar.current = true;
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
          }}
          className="absolute top-0 right-0 h-full hover:bg-action/30 transition-colors"
          style={{ width: "4px", cursor: "col-resize" }}
          data-testid="sidebar-resize-handle"
        />
      </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {chatsTab === 'no-chats' && !isInChatMode && (
          <span
            className="absolute bottom-2 left-2 z-10 text-xs text-tertiary"
            style={{ letterSpacing: "0.2px", whiteSpace: "nowrap" }}
            data-testid="link-powered-by-multiverse"
          >
            Atlas is powered by{" "}
            <a href="https://www.multiverse.io" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>Multiverse</a>
          </span>
        )}
        {showPersonalisation ? (
          <PersonalisationPage onClose={() => setShowPersonalisation(false)} />
        ) : (
          <>
        {/* Header */}
        <header
          className="relative flex items-center justify-between p-2 z-10"
          style={{
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(255, 255, 255, 0.88)",
            ...(isInChatMode ? { borderBottom: '1px solid #dbdad6' } : {}),
          }}
        >
          <div className="flex items-center gap-1">
            {chatsTab === 'no-chats' && !isInChatMode && (
              <>
                <div className="flex items-center gap-1">
                  <span className="text-m font-semibold text-primary" style={{ letterSpacing: "0.3px" }}>
                    Atlas
                  </span>
                  <img
                    src={multiverseHexagon}
                    alt=""
                    style={{ width: "22px", height: "19px", filter: "brightness(0) saturate(100%) invert(32%) sepia(98%) saturate(1752%) hue-rotate(226deg) brightness(99%) contrast(95%)" }}
                  />
                  <span className="text-m font-medium text-secondary" style={{ letterSpacing: "0.3px" }}>
                    AI Guide
                  </span>
                </div>
              </>
            )}
          </div>
          {isInChatMode && (
            <div className={renamingHeader ? "absolute" : "absolute pointer-events-none"} style={{ left: '16px', top: '50%', transform: 'translateY(-50%)' }}>
              {renamingHeader ? (
                <input
                  autoFocus
                  value={headerRenameValue}
                  onChange={(e) => setHeaderRenameValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitHeaderRename();
                    if (e.key === 'Escape') { setRenamingHeader(false); setHeaderRenameValue(""); }
                  }}
                  onBlur={commitHeaderRename}
                  className="text-m font-medium text-primary"
                  style={{ letterSpacing: '0.24px', border: '1px solid #4a5ff7', borderRadius: 8, padding: '3px 8px', outline: 'none', background: '#ffffff', minWidth: 220 }}
                  data-testid="input-rename-chat-header"
                />
              ) : (
                <span
                  className="text-m font-medium text-primary"
                  style={{ letterSpacing: '0.24px' }}
                >
                  {currentChatName}
                </span>
              )}
            </div>
          )}
          <div className="flex items-center gap-1">
            <button
              className="flex items-center gap-1 transition-colors hover:bg-[#f5f7ff]"
              style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.2px", flexShrink: 0, marginRight: "12px", color: "#3b3fd8", border: "none", padding: "6px 10px", borderRadius: "10px" }}
              onClick={() => {
                // Leaving full screen for the app in this same tab: tell the
                // server immediately so the sidebar unlocks without waiting
                // for the heartbeat to go stale, then open with the Atlas
                // sidebar visible.
                try {
                  navigator.sendBeacon(ATLAS_FULLSCREEN_CLOSE_URL);
                } catch {}
                window.location.href = currentChatId ? `/?atlasChat=${encodeURIComponent(currentChatId)}` : "/?atlasOpen=1";
              }}
              data-testid="button-back-to-multiverse"
            >
              Open Multiverse →
            </button>
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
                onCloseAutoFocus={(e: Event) => e.preventDefault()}
                style={{
                  boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.04)",
                  border: "0.5px solid #dbdad6",
                }}
              >
                <div className="py-1-5 px-0">
                  {isInChatMode && currentChatId && (
                    <>
                      <DropdownItem
                        className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                        data-testid="dropdown-item-pin-chat"
                        onClick={() => {
                          setChatHistory(prev => prev.map(c => c.id === currentChatId ? { ...c, pinned: !c.pinned } : c));
                        }}
                      >
                        <PinGlyph size={16} className="text-primary" />
                        <span className="text-s font-medium text-primary" style={{ letterSpacing: "0.28px" }}>
                          {chatHistory.find(c => c.id === currentChatId)?.pinned ? 'Unpin chat' : 'Pin chat'}
                        </span>
                      </DropdownItem>
                      <DropdownItem
                        className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                        data-testid="dropdown-item-rename-chat"
                        onClick={() => {
                          setRenamingHeader(true);
                          setHeaderRenameValue(currentChatName);
                        }}
                      >
                        <EditIcon size="small" variant="primary" />
                        <span className="text-s font-medium text-primary" style={{ letterSpacing: "0.28px" }}>
                          Rename
                        </span>
                      </DropdownItem>
                      <DropdownItem
                        className="flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-action-secondary-hover"
                        data-testid="dropdown-item-delete-chat"
                        onClick={() => {
                          if (currentChatId) setDeleteConfirmId(currentChatId);
                        }}
                      >
                        <BinIcon size="small" variant="primary" />
                        <span className="text-s font-medium text-primary" style={{ letterSpacing: "0.28px" }}>
                          Delete chat
                        </span>
                      </DropdownItem>
                      <div className="mx-0" style={{ height: '1px', backgroundColor: '#dbdad6', margin: '4px 0' }} />
                    </>
                  )}
                  <DropdownItem
                    className="group flex items-center gap-0-5 px-1-5 py-1 cursor-pointer hover:bg-[#f5f3ee]"
                    data-testid="dropdown-item-feedback"
                    onClick={() => setShowFeedbackModal(true)}
                  >
                    <HeartIcon size="small" variant="primary" className="transition-colors group-hover:[&_path]:fill-[#E1705F] group-hover:[&_path]:stroke-[#E1705F]" />
                    <span className="text-s font-medium text-primary" style={{ letterSpacing: "0.28px" }}>
                      Leave feedback
                    </span>
                  </DropdownItem>
                </div>
              </DropdownContent>
            </DropdownRoot>
            <AtlasFeedbackModal open={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />
            {deleteConfirmId && createPortal(
              <div
                className="fixed inset-0 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.4)', zIndex: 100001 }}
                onClick={() => setDeleteConfirmId(null)}
                onKeyDown={(e) => { if (e.key === 'Escape') setDeleteConfirmId(null); }}
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
                      onClick={() => setDeleteConfirmId(null)}
                      autoFocus
                      data-testid="button-cancel-delete-chat"
                    >
                      Cancel
                    </button>
                    <button
                      style={{ height: 40, padding: '0 20px', borderRadius: 10, background: '#c14a35', border: 'none', fontSize: 15, fontWeight: 600, color: '#ffffff', cursor: 'pointer' }}
                      onClick={() => { handleDeleteChat(deleteConfirmId); setDeleteConfirmId(null); }}
                      data-testid="button-confirm-delete-chat"
                    >
                      Delete chat
                    </button>
                  </div>
                </div>
              </div>,
              document.body,
            )}
            <ProfileMenu
              links={[
                { name: "Settings", url: "#settings", icon: "cog", external: false },
                { name: "Help", url: "#help", icon: "help", external: false },
              ]}
              imageUrl=""
              logoutUrl="#logout"
              profileName="Sarah Mitchell"
            />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {!isInChatMode ? (
              <motion.div 
                key="welcome"
                className="flex-1 flex items-center justify-center px-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center w-full" style={{ maxWidth: "800px" }}>
                  {/* Welcome Section */}
                  <div className="flex flex-col items-center pb-5 gap-3 pt-1 w-full" style={{ maxWidth: "500px" }}>
                    {/* Icon and Title */}
                    <div className="flex flex-col items-center gap-2 w-full">
                      <AtlasIcon size="medium" />
                      <p className="text-l font-medium text-primary text-center w-full" style={{ letterSpacing: "0.36px" }}>
                        Hey Sarah, I can help you navigate your apprenticeship
                      </p>
                    </div>

                    {/* Suggestions */}
                    <div className="flex flex-wrap items-start justify-center" style={{ gap: "8px" }}>
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className="group flex cursor-pointer select-none items-center text-s font-medium leading-tight transition-all bg-primary border border-separator-primary rounded-lg hover:bg-secondary active:bg-[#e8e7e3] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] active:shadow-none text-left"
                          style={{
                            padding: "8px 12px",
                          }}
                          data-testid={`button-suggestion-${index}`}
                        >
                          <div className="flex items-center" style={{ gap: "8px" }}>
                            <SuggestionIcon type={suggestion.icon} />
                            <span className="text-action underline decoration-dashed underline-offset-4 group-hover:decoration-solid" style={{ letterSpacing: "0.28px" }}>
                              {suggestion.text}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Section */}
                  {renderInputArea()}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="chat"
                className="flex-1 flex flex-col overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Messages Area */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto px-5"
                  style={{ paddingTop: "16px", paddingBottom: "16px" }}
                >
                  <div className="flex flex-col gap-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
                    {chatMessages.map((message) => (
                      <div key={message.id} className="flex flex-col" style={{ gap: "16px" }}>
                        {message.type === 'user' ? (
                          <div className="flex flex-col items-end" style={{ gap: "8px" }}>
                            {message.files && message.files.length > 0 && (
                              <div className="flex flex-wrap justify-end" style={{ gap: "8px" }}>
                                {message.files.map(file => (
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
                                  padding: '12px'
                                }}
                                data-testid={`message-user-${message.id}`}
                              >
                                <p className="text-s text-primary" style={{ letterSpacing: '0.28px', lineHeight: '1.5' }}>
                                  {message.content}
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col" style={{ gap: "16px" }} data-testid={`message-atlas-${message.id}`}>
                            <div className="flex flex-col" style={{ gap: "18px" }}>
                              <div className="prose prose-sm max-w-none text-primary" style={{ lineHeight: '1.5', letterSpacing: '0.28px' }}>
                                {message.isStreaming ? (
                                  <TypewriterText 
                                    content={message.content} 
                                    onComplete={() => handleStreamingComplete(message.id)}
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
                                        const isInline = !className;
                                        return isInline ? (
                                          <code className="bg-secondary px-1 py-0.5 rounded text-s font-mono text-primary">{children}</code>
                                        ) : (
                                          <code className="block bg-secondary p-2 rounded-lg text-s font-mono text-primary overflow-x-auto my-2">{children}</code>
                                        );
                                      },
                                      pre: ({children}) => <pre className="bg-secondary p-2 rounded-lg overflow-x-auto my-2">{children}</pre>,
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
                            
                            {/* Message Actions */}
                            <div className="flex items-center" style={{ gap: "4px" }}>
                              <div 
                                className="flex items-center justify-center flex-shrink-0"
                                style={{
                                  width: '32px',
                                  height: '32px'
                                }}
                              >
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
                              <Tooltip title={speakingMessageId === message.id ? "Stop reading" : "Read aloud"} placement="top">
                                <button
                                  className={`flex items-center justify-center rounded-lg transition-colors ${
                                    speakingMessageId === message.id
                                      ? 'bg-info'
                                      : 'hover:bg-secondary'
                                  }`}
                                  style={{ width: '32px', height: '32px' }}
                                  aria-label="Read aloud"
                                  data-testid={`button-read-aloud-${message.id}`}
                                  onClick={() => handleReadAloud(message.id, message.content)}
                                >
                                  <SpeakerIcon size="small" variant={speakingMessageId === message.id ? "action" : "secondary"} />
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
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex items-center" style={{ gap: '8px' }} data-testid="atlas-thinking-state">
                        <div 
                          className="flex items-center justify-center flex-shrink-0"
                          style={{
                            width: '32px',
                            height: '32px'
                          }}
                        >
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
                        </div>
                        <p className="text-s text-secondary" style={{ letterSpacing: '0.28px', lineHeight: '1.5' }}>
                          Atlas is thinking...
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sticky Input Area */}
                <motion.div 
                  className="bg-primary"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    delay: 0.1
                  }}
                >
                  {renderInputArea()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
          </>
        )}
      </div>

      {/* Prototype tab switcher */}
      <div className="fixed bottom-2 right-2 z-40">
        <div
          className="bg-primary rounded-lg flex flex-col"
          style={{ padding: '12px', gap: '8px', boxShadow: '0px 4px 8px 0px rgba(26,29,35,0.08), 0px 0px 1px 0px rgba(144,146,145,0.56)' }}
        >
          <span className="text-s font-medium text-secondary">Full screen Atlas</span>
          <div className="flex" style={{ gap: '8px' }}>
            <button
              onClick={() => {
                setChatsTab('no-chats');
                handleNewChat();
              }}
              className={`rounded-base text-s font-medium transition-colors ${
                chatsTab === 'no-chats'
                  ? 'bg-action text-white'
                  : 'bg-secondary text-secondary hover:bg-action-secondary-hover'
              }`}
              style={{ minWidth: '64px', padding: '6px 14px' }}
              data-testid="button-tab-no-chats"
            >
              No chats
            </button>
            <button
              onClick={() => {
                setChatsTab('with-chats');
                setChatHistory(prev => prev.filter(c => !c.id.startsWith('demo-extra-')));
              }}
              className={`rounded-base text-s font-medium transition-colors ${
                chatsTab === 'with-chats'
                  ? 'bg-action text-white'
                  : 'bg-secondary text-secondary hover:bg-action-secondary-hover'
              }`}
              style={{ minWidth: '64px', padding: '6px 14px' }}
              data-testid="button-tab-with-chats"
            >
              Includes chats
            </button>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        data-testid="input-file-upload"
      />
    </div>
    </div>
  );
}
