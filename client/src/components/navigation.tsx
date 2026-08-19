import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  NavigationRoot,
  NavigationMenu,
  NavigationMenuGroup,
  NavigationMenuItem,
  NavigationMenuItemIconProps,
  HomeIcon,
  NavigationPageContent,
  HeaderRoot,
  BellIcon,
  Button,
  ChatIcon,
  HeaderSlotCenter,
  HeaderSlotEnd,
  HeaderSlots,
  HeaderSlotStart,
  ProfileMenu,
  CalendarIcon,
  FolderIcon,
  GridIcon,
  EditIcon,
  PersonIcon,
  TextFileIcon,
  CogIcon,
  HeartIcon,
  ArrowUpRightIcon,
  ArrowLeftIcon,
} from "@multiverse-io/stardust-react";
import { Tooltip } from "@multiverse-io/stardust-react";
import { Link, useLocation } from "wouter";
import AtlasSidebar, { AtlasFloatingButton, UnifiedAtlasControl, SuggestionItem } from "./atlas";
import { unitContentGuidance } from "./atlas-constants";
import atlasIcon from "@/assets/atlas-icon.svg";
import { useState, useRef, useEffect } from "react";
import { queryClient } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import {
  useAtlasVersion,
  type AtlasMode,
  type PrototypeTab,
} from "./atlas-version-context";

export function TopButtonsSwitcher() {
  const { topButtonsDesign, setTopButtonsDesign } = useAtlasVersion();
  const [expanded, setExpanded] = useState(false);

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="fixed bg-primary shadow-card opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        style={{
          left: 0,
          bottom: '88px',
          padding: '10px 6px',
          zIndex: 9999,
          border: '1px solid #e5e5e5',
          borderLeft: 'none',
          borderRadius: '0 8px 8px 0',
          writingMode: 'vertical-rl',
        }}
        data-testid="top-buttons-switcher-collapsed"
        aria-label="Expand top buttons design switcher"
      >
        <span className="text-s font-medium text-secondary">Designs</span>
      </button>
    );
  }

  return (
    <div
      className="fixed bg-primary shadow-card opacity-70 hover:opacity-100 transition-opacity"
      style={{
        left: 0,
        bottom: '88px',
        padding: '14px',
        zIndex: 9999,
        border: '1px solid #e5e5e5',
        borderLeft: 'none',
        borderRadius: '0 8px 8px 0',
      }}
      data-testid="top-buttons-switcher"
    >
      <div className="flex flex-col" style={{ gap: '8px' }}>
        <div className="flex items-center justify-between" style={{ gap: '12px' }}>
          <span className="text-s font-medium text-secondary">Atlas Buttons</span>
          <button
            onClick={() => setExpanded(false)}
            className="text-secondary hover:text-primary cursor-pointer"
            style={{ lineHeight: 1, padding: '2px' }}
            data-testid="top-buttons-switcher-collapse"
            aria-label="Collapse top buttons design switcher"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7.5 2.5L4 6l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="flex" style={{ gap: '8px' }}>
          {(['1', '2'] as const).map((design) => (
            <button
              key={design}
              onClick={() => setTopButtonsDesign(design)}
              className={`rounded-base text-s font-medium transition-colors ${
                topButtonsDesign === design
                  ? 'bg-action text-white'
                  : 'bg-secondary text-secondary hover:bg-action-secondary-hover'
              }`}
              style={{ minWidth: '64px', padding: '6px 14px' }}
              data-testid={`button-top-buttons-design-${design}`}
            >
              {design}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AtlasModeSwitcher() {
  const { prototypeTab, setPrototypeTab, setAtlasVisible } = useAtlasVersion();
  const [switcherExpanded, setSwitcherExpanded] = useState(false);
  
  const handleModeSwitch = (tab: PrototypeTab) => {
    setPrototypeTab(tab);
    setAtlasVisible(true);
    if (tab === 'drafts' || tab === 'after-drafts') {
      fetch('/api/otj/reset-drafts', { method: 'POST' })
        .then((r) => (r.ok ? r.json() : null))
        .then((summary) => {
          if (summary) {
            queryClient.setQueryData(['/api/otj'], summary);
          }
          queryClient.invalidateQueries({ queryKey: ['/api/otj'] });
        })
        .catch(() => {});
    }
  };
  
  if (!switcherExpanded) {
    return (
      <button
        onClick={() => setSwitcherExpanded(true)}
        className="fixed bg-primary shadow-card opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        style={{
          left: 0,
          bottom: '16px',
          padding: '10px 6px',
          zIndex: 9999,
          border: '1px solid #e5e5e5',
          borderLeft: 'none',
          borderRadius: '0 8px 8px 0',
          writingMode: 'vertical-rl',
        }}
        data-testid="atlas-mode-switcher-collapsed"
        aria-label="Expand prototype switcher"
      >
        <span className="text-s font-medium text-secondary">Q2</span>
      </button>
    );
  }

  return (
    <div 
      className="fixed bg-primary shadow-card opacity-70 hover:opacity-100 transition-opacity"
      style={{
        left: 0,
        bottom: '16px',
        padding: '14px',
        zIndex: 9999,
        border: '1px solid #e5e5e5',
        borderLeft: 'none',
        borderRadius: '0 8px 8px 0',
      }}
      data-testid="atlas-mode-switcher"
    >
      <div className="flex flex-col" style={{ gap: '8px' }}>
        <div className="flex items-center justify-between" style={{ gap: '12px' }}>
          <span className="text-s font-medium text-secondary">Q2 OTJ Prototype</span>
          <button
            onClick={() => setSwitcherExpanded(false)}
            className="text-secondary hover:text-primary cursor-pointer"
            style={{ lineHeight: 1, padding: '2px' }}
            data-testid="atlas-mode-switcher-collapse"
            aria-label="Collapse prototype switcher"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7.5 2.5L4 6l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="flex" style={{ gap: '8px' }}>
          <button
            onClick={() => handleModeSwitch('after-drafts')}
            className={`rounded-base text-s font-medium transition-colors ${
              prototypeTab === 'after-drafts'
                ? 'bg-action text-white'
                : 'bg-secondary text-secondary hover:bg-action-secondary-hover'
            }`}
            style={{ minWidth: '64px', padding: '6px 14px' }}
            data-testid="button-mode-after-drafts"
          >
            Log OTJ
          </button>
          <button
            onClick={() => handleModeSwitch('drafts')}
            className={`rounded-base text-s font-medium transition-colors ${
              prototypeTab === 'drafts'
                ? 'bg-action text-white'
                : 'bg-secondary text-secondary hover:bg-action-secondary-hover'
            }`}
            style={{ minWidth: '64px', padding: '6px 14px' }}
            data-testid="button-mode-drafts"
          >
            Explorations
          </button>
        </div>
      </div>
    </div>
  );
}

const beforeHomeSuggestions: SuggestionItem[] = [
  { text: "Tell me what you can do for me", icon: "chat" },
  { text: "Search for anything", icon: "search" },
  { text: "I have an issue", icon: "alert" },
  { text: "I'm not sure what to do next", icon: "help" },
];

const beforeUnitSuggestions: SuggestionItem[] = [
  { text: "Summarise this page", icon: "text" },
  { text: "How is this relevant to my job?", icon: "lightbulb" },
  { text: "Help me understand this unit", icon: "person" },
  { text: "Quiz me on this unit", icon: "text" },
];

const beforeGenericSuggestions: SuggestionItem[] = [
  { text: "Tell me what you can do for me", icon: "chat" },
  { text: "Search for anything", icon: "search" },
  { text: "I have an issue", icon: "alert" },
  { text: "I'm not sure what to do next", icon: "help" },
];

const afterHomeSuggestions: SuggestionItem[] = [
  { text: "What should I focus on next?", icon: "target" },
  { text: "Plan my next two weeks", icon: "calendar" },
  { text: "I need help with something", icon: "review" },
  { text: "Show me what you can do", icon: "eye" },
];

const afterLearningSuggestions: SuggestionItem[] = [
  { text: "Quick recap of what I learned in Module 1", icon: "text" },
  { text: "What should I focus on to complete Module 2?", icon: "search" },
  { text: "When is my next live session for these modules?", icon: "calendar" },
  { text: "Help me prepare for the next live session", icon: "help" },
];

const afterProjectsSuggestions: SuggestionItem[] = [
  { text: "My 'AI for Business Value' deadline is in 5 days, help me plan", icon: "calendar" },
  { text: "What feedback did I get on my last submission?", icon: "text" },
  { text: "Which KSBs am I still missing across my projects?", icon: "search" },
  { text: "Help me prioritise what to work on next", icon: "alert" },
];

const afterProjectDetailSuggestions: SuggestionItem[] = [
  { text: "Help me brainstorm an angle for this project", icon: "lightbulb" },
  { text: "What KSBs does this project need to cover?", icon: "search" },
  { text: "Review my draft intro and give me feedback", icon: "text" },
  { text: "I'm stuck on how to structure my analysis", icon: "help" },
];

const afterProjectSubmissionSuggestions: SuggestionItem[] = [
  { text: "Check my task 1 answer against the brief", icon: "checklist" },
  { text: "What's the difference between data architecture and data ethics?", icon: "search" },
  { text: "Help me improve my writing for task 2", icon: "text" },
  { text: "Am I covering all the required KSBs?", icon: "alert" },
];

const afterProjectSubmissionContentGuidance = [
  "What's the difference between data architecture and data ethics?",
  "What should I include in task 1 about data architecture?",
  "Examples of data ethics issues in exploratory analysis",
];

const afterUnitSuggestions: SuggestionItem[] = [
  { text: "Summarise this page in simple terms", icon: "text" },
  { text: "How does data governance apply to my role?", icon: "lightbulb" },
  { text: "What are the key takeaways I need to remember?", icon: "checklist" },
  { text: "Quiz me on what I just read", icon: "person" },
];

const afterSessionsSuggestions: SuggestionItem[] = [
  { text: "Help me prepare for my session on Thursday", icon: "calendar" },
  { text: "What topics will be covered in my next session?", icon: "search" },
  { text: "Summarise what I should have completed before the session", icon: "text" },
  { text: "I missed my last session, what did I miss?", icon: "alert" },
];

const afterOffTheJobSuggestions: SuggestionItem[] = [
  { text: "What counts as off-the-job training?", icon: "help" },
  { text: "Help me log my learning activity from this week", icon: "text" },
  { text: "How many hours do I still need to complete?", icon: "search" },
];

const logOtjOffTheJobSuggestions: SuggestionItem[] = [
  { text: "Am I on track?", icon: "calendar" },
  { text: "What counts as OTJ?", icon: "help" },
  { text: "Log this week's learning", icon: "text" },
];

const afterProgressReviewsSuggestions: SuggestionItem[] = [
  { text: "Summarise the feedback from my last review", icon: "text" },
  { text: "What goals did I set in my previous review?", icon: "search" },
  { text: "Help me prepare for my next progress review", icon: "person" },
  { text: "What areas should I focus on improving?", icon: "alert" },
];

const afterPortfolioSuggestions: SuggestionItem[] = [
  { text: "What evidence am I still missing for my portfolio?", icon: "search" },
  { text: "Help me write a reflection for my latest project", icon: "text" },
  { text: "Which KSBs have I not yet evidenced?", icon: "checklist" },
  { text: "Review my portfolio and suggest improvements", icon: "lightbulb" },
];

const afterSettingsSuggestions: SuggestionItem[] = [
  { text: "How do I update my learning preferences?", icon: "help" },
  { text: "What notification settings are available?", icon: "search" },
  { text: "Help me understand my account settings", icon: "text" },
  { text: "I need to change my personal details", icon: "person" },
];

function NavigationLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { version, setVersion, atlasVisible, setAtlasVisible, toggleAtlas, atlasLockedClosed, prototypeMode, prototypeTab, topButtonsDesign } = useAtlasVersion();
  
  const effectiveAtlasMode: AtlasMode = prototypeMode === 'after' ? 'inline' : 'overlay';
  
  React.useEffect(() => {
    if (prototypeMode === 'after' && !atlasLockedClosed) {
      setAtlasVisible(true);
    }
  }, [prototypeMode, prototypeTab, location, setAtlasVisible, atlasLockedClosed]);
  // Legacy handoff params from full-screen Atlas: previously reopened the
  // sidebar. After a full-screen visit the sidebar stays closed for good.
  React.useEffect(() => {
    if (atlasLockedClosed) return;
    const params = new URLSearchParams(window.location.search);
    if (params.has('atlasChat') || params.has('atlasOpen')) {
      setAtlasVisible(true);
    }
  }, [setAtlasVisible, atlasLockedClosed]);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { data: otjSummary } = useQuery<{ entries?: { status: string }[] }>({
    queryKey: ['/api/otj'],
    enabled: location === "/off-the-job",
  });
  const otjDraftCount = (otjSummary?.entries || []).filter(
    (e) => e.status === 'draft',
  ).length;
  
  const isProjectDetailPage = location.startsWith("/projects/") && !location.includes("/submission") && location !== "/projects";
  const isProjectSubmissionPage = location.includes("/submission");
  const hideContentGuidance = prototypeMode === 'before' ? true : (location === "/" || location === "/projects" || location === "/learning" || isProjectDetailPage || location === "/my-sessions" || location === "/off-the-job" || location === "/progress-reviews" || location === "/portfolio" || location === "/settings");
  
  const isUnitPage = location.startsWith("/learning/unit/");
  
  const getSuggestionsForPage = (): SuggestionItem[] => {
    if (prototypeMode === 'before') {
      if (location === "/") return beforeHomeSuggestions;
      if (isUnitPage) return beforeUnitSuggestions;
      return beforeGenericSuggestions;
    }
    if (location === "/") return afterHomeSuggestions;
    if (location === "/learning") return afterLearningSuggestions;
    if (isUnitPage) return afterUnitSuggestions;
    if (location === "/projects") return afterProjectsSuggestions;
    if (isProjectDetailPage) return afterProjectDetailSuggestions;
    if (isProjectSubmissionPage) return afterProjectSubmissionSuggestions;
    if (location === "/my-sessions") return afterSessionsSuggestions;
    if (location === "/off-the-job") {
      if (prototypeTab === 'after-drafts') {
        if (otjDraftCount > 0) {
          return [
            { text: `Review ${otjDraftCount} draft${otjDraftCount === 1 ? '' : 's'}`, icon: "checklist" },
            ...logOtjOffTheJobSuggestions,
          ];
        }
        return [
          ...logOtjOffTheJobSuggestions,
          { text: "Hours remaining", icon: "search" },
        ];
      }
      return afterOffTheJobSuggestions;
    }
    if (location === "/progress-reviews") return afterProgressReviewsSuggestions;
    if (location === "/portfolio") return afterPortfolioSuggestions;
    if (location === "/settings") return afterSettingsSuggestions;
    return afterHomeSuggestions;
  };
  
  const getContentGuidanceForPage = (): string[] | undefined => {
    if (prototypeMode === 'before') return undefined;
    if (isProjectSubmissionPage) return afterProjectSubmissionContentGuidance;
    if (isUnitPage) return unitContentGuidance;
    return undefined;
  };
  
  const getContentGuidanceTitleForPage = (): string | undefined => {
    return undefined;
  };
  
  const getGreetingForPage = (): string | undefined => {
    if (prototypeMode === 'before') return undefined;
    if (location === "/") return "Hey Sarah, I can help you navigate your apprenticeship";
    if (location === "/projects") return "Hey Sarah, I can help you deliver your projects";
    if (isProjectDetailPage) return "Hey Sarah, I can help you to deliver your project idea";
    if (isProjectSubmissionPage) return "Hey Sarah, I can help you to deliver your project idea";
    if (location === "/learning") return "Hey Sarah, I can help you study";
    if (isUnitPage) return "Hey Sarah, I can help you study";
    if (location === "/my-sessions") return "Hey Sarah, I can help you prepare for your sessions";
    if (location === "/off-the-job") return "Hey Sarah, let's check your off-the-job hours";
    if (location === "/progress-reviews") return "Hey Sarah, let's look at your progress";
    if (location === "/portfolio") return "Hey Sarah, I can help with your portfolio";
    return undefined;
  };
  
  const getCurrentPageContext = (): string | undefined => {
    if (location === "/") return "homepage";
    if (location === "/learning" || isUnitPage) return "learning";
    if (location === "/projects" || isProjectDetailPage || isProjectSubmissionPage) return "projects";
    if (location === "/my-sessions") return "sessions";
    if (location === "/off-the-job") return "portfolio";
    if (location === "/progress-reviews") return "progress";
    if (location === "/portfolio") return "portfolio";
    if (location === "/settings") return "settings";
    return undefined;
  };
  
  const currentSuggestions = getSuggestionsForPage();
  const currentContentGuidance = getContentGuidanceForPage();
  const currentContentGuidanceTitle = getContentGuidanceTitleForPage();
  const currentGreeting = getGreetingForPage();
  const currentPageContext = getCurrentPageContext();
  
  const handleChatClick = () => {
    if (!atlasVisible) {
      toggleAtlas();
    }
    setShowNotifications(false);
    setShowMessages(true);
  };
  
  const handleNotificationsClick = () => {
    if (!atlasVisible) {
      toggleAtlas();
    }
    setShowMessages(false);
    setShowNotifications(true);
  };
  
  const handleAtlasButtonClick = () => {
    if (showMessages || showNotifications) {
      setShowMessages(false);
      setShowNotifications(false);
    } else {
      toggleAtlas();
    }
  };

  const atlasTab2Controls = (
    <div className="flex items-center" style={{ gap: '10px' }}>
      <div className="flex items-center gap-[6px] text-s font-medium text-secondary whitespace-nowrap flex-shrink-0" data-testid="label-continue-with-atlas">
        <img src={atlasIcon} alt="" className="w-[15px] h-[15px]" />
        Ask Atlas
      </div>
      <div className="flex items-stretch flex-shrink-0 h-[32px] rounded-lg bg-primary border border-separator-primary shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] overflow-hidden" style={{ borderWidth: '0.5px' }}>
        {!atlasLockedClosed && (
          <>
            <button
              className="flex items-center gap-[6px] px-[14px] text-s font-medium text-primary hover:bg-secondary transition-colors whitespace-nowrap"
              data-testid="button-atlas-sidebar"
              onClick={handleAtlasButtonClick}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /><line x1="9" y1="3" x2="9" y2="21" /></svg>
              Panel
            </button>
            <div style={{ width: '0.5px', background: '#dbdad6' }} />
          </>
        )}
        <button
          className="flex items-center gap-[6px] px-[14px] text-s font-medium text-primary hover:bg-secondary transition-colors whitespace-nowrap"
          aria-label="Open Atlas in full screen"
          data-testid="button-atlas-fullscreen"
          onClick={() => window.dispatchEvent(new CustomEvent('atlas-open-window'))}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
          Full screen
        </button>
      </div>
    </div>
  );

  return (
    <NavigationRoot>
      
      <NavigationMenu
        >
        <NavigationMenuGroup>
          <NavigationMenuItem
            as={Link}
            href="/"
            renderIcon={(iconProps: NavigationMenuItemIconProps) => (
              <HomeIcon {...iconProps} />
            )}
            active={location === "/"}
            data-testid="nav-home"
          >
            Home
          </NavigationMenuItem>
          <NavigationMenuItem
            as={Link}
            href="/learning"
            renderIcon={(iconProps: NavigationMenuItemIconProps) => (
              <GridIcon {...iconProps} />
            )}
            active={location === "/learning"}
            data-testid="nav-learning"
          >
            Learning
          </NavigationMenuItem>
          <NavigationMenuItem
            as={Link}
            href="/projects"
            renderIcon={(iconProps: NavigationMenuItemIconProps) => (
              <EditIcon {...iconProps} />
            )}
            active={location === "/projects"}
            data-testid="nav-projects"
          >
            Projects
          </NavigationMenuItem>
          <NavigationMenuItem
            as={Link}
            href="/my-sessions"
            renderIcon={(iconProps: NavigationMenuItemIconProps) => (
              <PersonIcon {...iconProps} />
            )}
            active={location === "/my-sessions"}
            data-testid="nav-my-sessions"
          >
            My sessions
          </NavigationMenuItem>
          <NavigationMenuItem
            as={Link}
            href="/off-the-job"
            renderIcon={(iconProps: NavigationMenuItemIconProps) => (
              <CalendarIcon {...iconProps} />
            )}
            active={location === "/off-the-job"}
            data-testid="nav-off-the-job"
          >
            Off the job
          </NavigationMenuItem>
          <NavigationMenuItem
            as={Link}
            href="/progress-reviews"
            renderIcon={(iconProps: NavigationMenuItemIconProps) => (
              <TextFileIcon {...iconProps} />
            )}
            active={location === "/progress-reviews"}
            data-testid="nav-progress-reviews"
          >
            Progress reviews
          </NavigationMenuItem>
          <NavigationMenuItem
            as={Link}
            href="/portfolio"
            renderIcon={(iconProps: NavigationMenuItemIconProps) => (
              <FolderIcon {...iconProps} />
            )}
            active={location === "/portfolio"}
            data-testid="nav-portfolio"
          >
            Portfolio
          </NavigationMenuItem>
          <NavigationMenuItem
            as={Link}
            href="/settings"
            renderIcon={(iconProps: NavigationMenuItemIconProps) => (
              <CogIcon {...iconProps} />
            )}
            active={location === "/settings"}
            data-testid="nav-settings"
          >
            Settings
          </NavigationMenuItem>
          <NavigationMenuItem
            as="a"
            href="https://community.multiverse.io"
            renderIcon={(iconProps: NavigationMenuItemIconProps) => (
              <HeartIcon {...iconProps} />
            )}
            data-testid="nav-community"
          >
            <span className="flex items-center justify-between w-full">
              Community
              <ArrowUpRightIcon size="small" className="ml-1" />
            </span>
          </NavigationMenuItem>
        </NavigationMenuGroup>
      </NavigationMenu>
      {version === 1 ? (
        <>
        <NavigationPageContent showHeader={false}>
          <div className="flex h-full overflow-hidden relative" {...({})}>
            <motion.div 
              className="flex flex-col overflow-hidden relative"
              animate={{
                marginRight: effectiveAtlasMode === 'inline' ? (atlasVisible ? 0 : -400) : 0
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 35,
                mass: 0.8
              }}
              style={{ flex: 1, minWidth: 0 }}
            >
              <div className="flex items-center justify-between p-2 bg-primary" {...({})}>
                <div className="flex items-center" style={{ gap: '12px' }}>
                  {isProjectDetailPage && (
                    <Link href="/projects">
                      <button
                        type="button"
                        className="flex items-center gap-[4px] h-[32px] px-[12px] py-[8px] rounded-lg bg-primary border border-separator-primary shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] text-s font-medium text-primary hover:bg-secondary transition-colors"
                        style={{ borderWidth: '0.5px' }}
                        data-testid="link-back-to-pathway"
                      >
                        <ArrowLeftIcon size="small" />
                        Back to pathway
                      </button>
                    </Link>
                  )}
                </div>
                <div className="flex justify-end gap-x-1 items-center">
                  {topButtonsDesign === '2' && <div style={{ marginRight: '24px' }}>{atlasTab2Controls}</div>}
                  {topButtonsDesign !== '2' && (
                    <UnifiedAtlasControl
                      atlasLockedClosed={atlasLockedClosed}
                      sidebarOpen={atlasVisible}
                      onSidebarClick={handleAtlasButtonClick}
                      onFullViewClick={() => {
                          if (atlasLockedClosed) {
                            const w = window.open('', 'atlas-fullscreen');
                            if (w) {
                              try { if (w.location.href === 'about:blank') { w.location.href = '/atlas?context=homepage&day=60'; } } catch {}
                              w.focus();
                            } else {
                              window.dispatchEvent(new CustomEvent('atlas-open-window'));
                            }
                          } else {
                            window.dispatchEvent(new CustomEvent('atlas-open-window'));
                          }
                        }}
                    />
                  )}
                  {(
                    <>
                      <button
                        className={`flex items-center justify-center h-[32px] w-[32px] min-w-[32px] flex-shrink-0 rounded-lg transition-colors cursor-pointer ${'bg-primary border border-separator-primary shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] hover:bg-secondary'}`}
                        style={{ borderWidth: '0.5px' }}
                        data-testid="button-messages"
                        aria-label="Messages"
                      >
                        <ChatIcon size="small" variant="primary" />
                      </button>
                      <div className="relative">
                        <button
                          className={`flex items-center justify-center h-[32px] w-[32px] min-w-[32px] flex-shrink-0 rounded-lg transition-colors cursor-pointer ${'bg-primary border border-separator-primary shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] hover:bg-secondary'}`}
                          style={{ borderWidth: '0.5px' }}
                          data-testid="button-notifications"
                          aria-label="Notifications"
                        >
                          <BellIcon size="small" variant="primary" />
                        </button>
                        <div
                          className="absolute flex items-center justify-center rounded-full"
                          style={{
                            top: '-8.5px',
                            right: '-4px',
                            width: '16px',
                            height: '16px',
                            minWidth: '16px',
                            background: '#d6ee40',
                            pointerEvents: 'none',
                          }}
                        >
                          <span className="font-semibold" style={{ fontSize: '10px', lineHeight: '10px', letterSpacing: '0.2px', color: '#18250f' }}>
                            2
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  <ProfileMenu
                    imageUrl=""
                    links={[
                      { name: "Settings", url: "#settings", icon: "cog", external: false },
                      { name: "Help", url: "#help", icon: "help", external: false },
                    ]}
                    logoutUrl="#logout"
                    profileName={"Sarah Mitchell"}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto relative" {...({})}>
                {children}
              </div>
            </motion.div>
            {effectiveAtlasMode === 'inline' && (
              <AtlasSidebar version={version} isVisible={atlasVisible} onToggle={toggleAtlas} hideContentGuidance={hideContentGuidance} showMessages={showMessages} onMessagesClose={() => setShowMessages(false)} showNotifications={showNotifications} onNotificationsClose={() => setShowNotifications(false)} suggestions={currentSuggestions} contentGuidance={currentContentGuidance} contentGuidanceTitle={currentContentGuidanceTitle} greeting={currentGreeting} currentPageContext={currentPageContext} prototypeMode={prototypeMode} />
            )}
          </div>
        </NavigationPageContent>
        {effectiveAtlasMode === 'overlay' && createPortal(
          <motion.div
            className="fixed top-0 right-0 z-[99999]"
            initial={{ x: "100%" }}
            animate={{ x: atlasVisible ? 0 : "100%" }}
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
              <AtlasSidebar version={version} isVisible={true} onToggle={toggleAtlas} hideContentGuidance={hideContentGuidance} showMessages={showMessages} onMessagesClose={() => setShowMessages(false)} showNotifications={showNotifications} onNotificationsClose={() => setShowNotifications(false)} suggestions={currentSuggestions} contentGuidance={currentContentGuidance} contentGuidanceTitle={currentContentGuidanceTitle} greeting={currentGreeting} currentPageContext={currentPageContext} prototypeMode={prototypeMode} />
            </div>
          </motion.div>,
          document.body
        )}
        </>
      ) : (
        <>
          <HeaderRoot>
            <HeaderSlots>
              <HeaderSlotStart>
                {isProjectDetailPage && (
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-[4px] h-[32px] px-[12px] py-[8px] rounded-lg bg-primary border border-separator-primary shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] text-s font-medium text-primary hover:bg-secondary transition-colors no-underline"
                    style={{ borderWidth: '0.5px' }}
                    data-testid="link-back-to-pathway"
                  >
                    <ArrowLeftIcon size="small" />
                    Back to pathway
                  </Link>
                )}
              </HeaderSlotStart>
              <HeaderSlotCenter></HeaderSlotCenter>
              <HeaderSlotEnd>
                <div className="flex justify-end gap-x-1 items-center">
                  {topButtonsDesign === '2' && <div style={{ marginRight: '24px' }}>{atlasTab2Controls}</div>}
                  {topButtonsDesign !== '2' && (
                    <UnifiedAtlasControl
                      atlasLockedClosed={atlasLockedClosed}
                      sidebarOpen={atlasVisible}
                      onSidebarClick={handleAtlasButtonClick}
                      onFullViewClick={() => {
                          if (atlasLockedClosed) {
                            const w = window.open('', 'atlas-fullscreen');
                            if (w) {
                              try { if (w.location.href === 'about:blank') { w.location.href = '/atlas?context=homepage&day=60'; } } catch {}
                              w.focus();
                            } else {
                              window.dispatchEvent(new CustomEvent('atlas-open-window'));
                            }
                          } else {
                            window.dispatchEvent(new CustomEvent('atlas-open-window'));
                          }
                        }}
                    />
                  )}
                  {(
                    <>
                      <button
                        className={`flex items-center justify-center h-[32px] w-[32px] min-w-[32px] flex-shrink-0 rounded-lg transition-colors cursor-pointer ${'bg-primary border border-separator-primary shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] hover:bg-secondary'}`}
                        style={{ borderWidth: '0.5px' }}
                        data-testid="button-messages"
                        aria-label="Messages"
                      >
                        <ChatIcon size="small" variant="primary" />
                      </button>
                      <div className="relative">
                        <button
                          className={`flex items-center justify-center h-[32px] w-[32px] min-w-[32px] flex-shrink-0 rounded-lg transition-colors cursor-pointer ${'bg-primary border border-separator-primary shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] hover:bg-secondary'}`}
                          style={{ borderWidth: '0.5px' }}
                          data-testid="button-notifications"
                          aria-label="Notifications"
                        >
                          <BellIcon size="small" variant="primary" />
                        </button>
                        <div
                          className="absolute flex items-center justify-center rounded-full"
                          style={{
                            top: '-8.5px',
                            right: '-4px',
                            width: '16px',
                            height: '16px',
                            minWidth: '16px',
                            background: '#d6ee40',
                            pointerEvents: 'none',
                          }}
                        >
                          <span className="font-semibold" style={{ fontSize: '10px', lineHeight: '10px', letterSpacing: '0.2px', color: '#18250f' }}>
                            2
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  <ProfileMenu
                    imageUrl=""
                    links={[
                      { name: "Settings", url: "#settings", icon: "cog", external: false },
                      { name: "Help", url: "#help", icon: "help", external: false },
                    ]}
                    logoutUrl="#logout"
                    profileName={"Sarah Mitchell"}
                  />
                </div>
              </HeaderSlotEnd>
            </HeaderSlots>
          </HeaderRoot>
          <NavigationPageContent>
            <div className="flex h-full overflow-hidden relative" {...({})}>
              <motion.div 
                className="overflow-y-auto relative"
                animate={{
                  marginRight: effectiveAtlasMode === 'inline' ? (atlasVisible ? 0 : -400) : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 35,
                  mass: 0.8
                }}
                style={{ flex: 1, minWidth: 0 }}
              >
                {children}
              </motion.div>
              {effectiveAtlasMode === 'inline' && (
                <AtlasSidebar version={version} isVisible={atlasVisible} onToggle={toggleAtlas} hideContentGuidance={hideContentGuidance} showMessages={showMessages} onMessagesClose={() => setShowMessages(false)} showNotifications={showNotifications} onNotificationsClose={() => setShowNotifications(false)} suggestions={currentSuggestions} contentGuidance={currentContentGuidance} contentGuidanceTitle={currentContentGuidanceTitle} greeting={currentGreeting} currentPageContext={currentPageContext} prototypeMode={prototypeMode} />
              )}
            </div>
          </NavigationPageContent>
          {effectiveAtlasMode === 'overlay' && createPortal(
            <motion.div
              className="fixed top-0 right-0 z-[99999]"
              initial={{ x: "100%" }}
              animate={{ x: atlasVisible ? 0 : "100%" }}
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
                <AtlasSidebar version={version} isVisible={true} onToggle={toggleAtlas} hideContentGuidance={hideContentGuidance} showMessages={showMessages} onMessagesClose={() => setShowMessages(false)} showNotifications={showNotifications} onNotificationsClose={() => setShowNotifications(false)} suggestions={currentSuggestions} contentGuidance={currentContentGuidance} contentGuidanceTitle={currentContentGuidanceTitle} greeting={currentGreeting} currentPageContext={currentPageContext} prototypeMode={prototypeMode} />
              </div>
            </motion.div>,
            document.body
          )}
        </>
      )}
    </NavigationRoot>
  );
}

export default NavigationLayout;
