import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "wouter";
import { 
  ArrowLeftIcon, 
  Button, 
  ChatIcon,
  ProfileMenu,
  ClockIcon,
  CloseIcon,
} from "@multiverse-io/stardust-react";
import AtlasSidebar, { AtlasFloatingButton, SuggestionItem } from "@/components/atlas";
import atlasIcon from "@/assets/atlas-icon.svg";
import { useAtlasVersion } from "@/components/atlas-version-context";
import { motion } from "framer-motion";

const beforeProjectSubmissionSuggestions: SuggestionItem[] = [
  { text: "Tell me what you can do for me", icon: "chat" },
  { text: "Search for anything", icon: "search" },
  { text: "I have an issue", icon: "alert" },
  { text: "I'm not sure what to do next", icon: "help" },
];

const afterProjectSubmissionSuggestions: SuggestionItem[] = [
  { text: "Check my task 1 answer against the brief", icon: "checklist" },
  { text: "What's the difference between data architecture and data ethics?", icon: "search" },
  { text: "Help me improve my writing for task 2", icon: "text" },
  { text: "Am I covering all the required KSBs?", icon: "alert" },
];

const projectSubmissionGreeting = "Hey Sarah, I can help you to deliver your project idea";

function ProjectIdeaCard() {
  return (
    <div 
      className="bg-secondary rounded-xl flex flex-col overflow-hidden w-full"
      style={{ padding: '16px', gap: '4px' }}
      data-testid="card-project-idea"
    >
      <p className="text-s font-medium text-primary leading-normal">
        Your project idea
      </p>
      <p className="text-m font-medium text-primary leading-tight">
        AI Knowledge Assistant for Cross-Department Best Practice Sharing
      </p>
      <p className="text-s font-regular text-primary leading-tight">
        Implementing a generative AI tool to streamline resource discovery and sharing across departments.
      </p>
    </div>
  );
}

const marketingColors = {
  eclipse: "#ddfc9d",
  darkUltraviolet: "#2b326d",
} as const;

type ActivePanel = "atlas" | "tasks";

function ProjectCoverSmall() {
  return (
    <div 
      className="w-[24px] h-[24px] rounded-base overflow-hidden relative flex-shrink-0"
      style={{ backgroundColor: marketingColors.darkUltraviolet }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect x="5" y="9" width="14" height="4" rx="1" fill={marketingColors.eclipse} transform="rotate(-30 12 12)" />
      </svg>
    </div>
  );
}

function SubmissionHeader({ onAtlasClick }: { onAtlasClick: () => void }) {
  
  return (
    <div className="bg-primary/88 backdrop-blur-sm border-b border-separator-primary">
      <div className="flex items-center justify-between p-2">
        <Link href="/projects/1">
          <div className="flex items-center gap-0.5 cursor-pointer" data-testid="link-back-to-description">
            <ArrowLeftIcon size="small" variant="action" />
            <span className="text-s font-medium text-action">Back to description</span>
          </div>
        </Link>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-1.5">
          <ProjectCoverSmall />
          <span className="text-s font-semibold text-primary">
            Applying Data Architecture and Data Ethics in Exploratory Analysis
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={onAtlasClick}
            className="flex items-center gap-[4px] h-[32px] px-[12px] py-[8px] rounded-lg bg-primary border border-separator-primary shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] text-s font-medium text-primary hover:bg-secondary transition-colors cursor-pointer"
            style={{ borderWidth: '0.5px' }}
            data-testid="button-ask-atlas"
          >
            <img src={atlasIcon} alt="" className={"w-[16px] h-[16px]"} />
            Ask Atlas
          </button>
          <Button
            size="small"
            variant="secondary"
            iconPosition="center"
            Icon={<ChatIcon size="small" />}
            aria-label="Messages"
            data-testid="button-chat"
          />
          <ProfileMenu
            imageUrl=""
            links={[
              { name: "Settings", url: "#settings", icon: "cog", external: false },
              { name: "Help", url: "#help", icon: "help", external: false },
            ]}
            logoutUrl="#logout"
            profileName="Sarah Mitchell"
          />
        </div>
      </div>
    </div>
  );
}

interface StatusBarProps {
  completedTasks: number;
  totalTasks: number;
  onTaskClick: () => void;
}

function StatusBar({ completedTasks, totalTasks, onTaskClick }: StatusBarProps) {
  return (
    <div className="border border-separator-primary rounded-t-lg overflow-hidden flex">
      <div className="flex-1 bg-primary flex items-center justify-center" style={{ padding: '12px', gap: '4px' }}>
        <span className="text-xs font-semibold text-secondary tracking-wide">Status</span>
        <div className="bg-secondary rounded-base flex items-center gap-1" style={{ padding: '4px 8px' }}>
          <ClockIcon size="small" variant="action" />
          <span className="text-xs font-semibold text-action tracking-wide">Awaiting review</span>
        </div>
      </div>
      <div className="flex-1 bg-primary flex items-center justify-center border-l border-separator-primary" style={{ padding: '12px', gap: '4px' }}>
        <span className="text-xs font-semibold text-secondary tracking-wide">Feedback</span>
        <span className="text-xs font-semibold text-primary tracking-wide">No reviews</span>
      </div>
      <div className="flex-1 bg-primary flex items-center justify-center border-l border-separator-primary" style={{ padding: '12px', gap: '4px' }}>
        <span className="text-xs font-semibold text-secondary tracking-wide">Task</span>
        <div 
          className="bg-secondary rounded-base flex items-center cursor-pointer hover:bg-action-secondary-hover transition-colors" 
          style={{ padding: '4px 8px' }}
          onClick={onTaskClick}
          data-testid="button-task-panel"
        >
          <span className="text-xs font-semibold text-primary tracking-wide" data-testid="text-task-progress">
            {completedTasks} / {totalTasks}
          </span>
        </div>
      </div>
    </div>
  );
}

interface SubmissionContentProps {
  tasks: string[];
  onTaskChange: (index: number, value: string) => void;
}

function SubmissionContent({ tasks, onTaskChange }: SubmissionContentProps) {
  return (
    <div className="flex-1 bg-primary border border-separator-primary border-t-0 rounded-b-lg shadow-card overflow-y-auto" style={{ padding: '84px' }}>
      <div className="max-w-[840px] mx-auto">
        <div className="flex flex-col" style={{ gap: '16px', marginBottom: '93px' }}>
          <input
            type="text"
            className="text-4xl font-regular text-primary leading-tight bg-transparent border-none outline-none w-full placeholder:text-secondary"
            placeholder="Untitled project..."
            data-testid="input-submission-title"
          />
          <div className="h-[2px] bg-separator-primary rounded-full w-full" />
        </div>
        
        <div className="flex flex-col" style={{ gap: '151px' }}>
          <textarea
            className="text-l text-primary leading-normal bg-transparent border-none outline-none w-full resize-none placeholder:text-secondary"
            placeholder="Click to start answering task 1..."
            rows={1}
            value={tasks[0]}
            onChange={(e) => onTaskChange(0, e.target.value)}
            data-testid="input-task-1"
          />
          
          <textarea
            className="text-l text-primary leading-normal bg-transparent border-none outline-none w-full resize-none placeholder:text-secondary"
            placeholder="Click to start answering task 2..."
            rows={1}
            value={tasks[1]}
            onChange={(e) => onTaskChange(1, e.target.value)}
            data-testid="input-task-2"
          />
          
          <textarea
            className="text-l text-primary leading-normal bg-transparent border-none outline-none w-full resize-none placeholder:text-secondary"
            placeholder="Click to start answering task 3..."
            rows={1}
            value={tasks[2]}
            onChange={(e) => onTaskChange(2, e.target.value)}
            data-testid="input-task-3"
          />
        </div>
      </div>
    </div>
  );
}

interface TasksPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

function TasksPanel({ isVisible, onClose }: TasksPanelProps) {
  return (
    <motion.div
      className="h-full bg-primary border-l border-separator-primary flex flex-col"
      style={{ width: 400 }}
      initial={{ x: 400 }}
      animate={{ x: isVisible ? 0 : 400 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 35,
        mass: 0.8
      }}
    >
      <div className="flex items-center justify-between p-2 border-b border-separator-primary">
        <h2 className="text-l font-semibold text-primary">Tasks</h2>
        <Button
          size="small"
          variant="text"
          iconPosition="center"
          Icon={<CloseIcon size="small" />}
          aria-label="Close tasks panel"
          onClick={onClose}
          data-testid="button-close-tasks"
        />
      </div>
      <div className="flex-1 p-2 overflow-y-auto">
        {/* Tasks panel content will be added later */}
      </div>
    </motion.div>
  );
}

export default function ProjectSubmission() {
  const { version, atlasVisible, setAtlasVisible, toggleAtlas, prototypeMode } = useAtlasVersion();
  const effectiveAtlasMode = prototypeMode === 'after' ? 'inline' : 'overlay';
  const currentSubmissionSuggestions = prototypeMode === 'after' ? afterProjectSubmissionSuggestions : beforeProjectSubmissionSuggestions;
  const currentSubmissionGreeting = prototypeMode === 'after' ? projectSubmissionGreeting : undefined;
  const [tasks, setTasks] = useState<string[]>(["", "", ""]);
  
  useEffect(() => {
    if (prototypeMode === 'after') {
      setAtlasVisible(true);
    }
  }, [prototypeMode]);
  const [activePanel, setActivePanel] = useState<ActivePanel>("atlas");
  
  const handleTaskChange = (index: number, value: string) => {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index] = value;
      return newTasks;
    });
  };
  
  const completedTasks = tasks.filter(task => task.trim().length > 0).length;
  
  const handleTaskClick = () => {
    setActivePanel("tasks");
  };
  
  const handleCloseTasksPanel = () => {
    setActivePanel("atlas");
  };
  
  const handleOpenAtlas = () => {
    if (activePanel !== "atlas") {
      setActivePanel("atlas");
      if (!atlasVisible) {
        toggleAtlas();
      }
    } else {
      toggleAtlas();
    }
  };
  
  const isPanelVisible = activePanel === "atlas" ? atlasVisible : true;

  return (
    <div className="h-screen overflow-hidden bg-primary flex flex-col">
      <SubmissionHeader onAtlasClick={handleOpenAtlas} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <motion.div 
          className="flex-1 overflow-hidden flex flex-col p-2"
          animate={{
            marginRight: effectiveAtlasMode === 'inline' ? (isPanelVisible ? 0 : -400) : 0
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 35,
            mass: 0.8
          }}
        >
          <StatusBar 
            completedTasks={completedTasks} 
            totalTasks={3} 
            onTaskClick={handleTaskClick}
          />
          <SubmissionContent tasks={tasks} onTaskChange={handleTaskChange} />
        </motion.div>
        
        {activePanel === "atlas" ? (
          <>
            {effectiveAtlasMode === 'inline' && (
              <AtlasSidebar version={version} isVisible={atlasVisible} onToggle={toggleAtlas} suggestions={currentSubmissionSuggestions} hideContentGuidance={true} greeting={currentSubmissionGreeting} topContent={<ProjectIdeaCard />} prototypeMode={prototypeMode} />
            )}
          </>
        ) : (
          <>
            <TasksPanel isVisible={true} onClose={handleCloseTasksPanel} />
          </>
        )}
      </div>
      {effectiveAtlasMode === 'overlay' && activePanel === "atlas" && createPortal(
        <motion.div
          className="fixed top-0 right-0 z-[99999]"
          initial={{ x: "100%" }}
          animate={{ x: atlasVisible ? "0%" : "100%" }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 35,
            mass: 0.8
          }}
          style={{ 
            boxShadow: atlasVisible ? '-4px 0 12px rgba(0,0,0,0.1)' : 'none',
            height: '100vh'
          }}
        >
          <div style={{ height: '100vh' }}>
            <AtlasSidebar version={version} isVisible={true} onToggle={toggleAtlas} suggestions={currentSubmissionSuggestions} hideContentGuidance={true} greeting={currentSubmissionGreeting} topContent={<ProjectIdeaCard />} prototypeMode={prototypeMode} />
          </div>
        </motion.div>,
        document.body
      )}
    </div>
  );
}
