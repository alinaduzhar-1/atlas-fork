import { useParams, Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  Button,
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  BookIcon,
  CheckIcon,
  ChatIcon,
  ProfileMenu,
  QuillIcon,
  FormIcon,
  ChecklistIcon,
} from "@multiverse-io/stardust-react";
import AtlasSidebar, { AtlasFloatingButton, SuggestionItem } from "@/components/atlas";
import atlasIcon from "@/assets/atlas-icon.svg";
import { useAtlasVersion } from "@/components/atlas-version-context";

const beforeUnitSuggestions: SuggestionItem[] = [
  { text: "Summarise this page", icon: "text" },
  { text: "How is this relevant to my job?", icon: "lightbulb" },
  { text: "Help me understand this unit", icon: "person" },
  { text: "Quiz me on this unit", icon: "checklist" },
];

const afterUnitSuggestions: SuggestionItem[] = [
  { text: "Summarise this page in simple terms", icon: "text" },
  { text: "How does data governance apply to my role?", icon: "lightbulb" },
  { text: "What are the key takeaways I need to remember?", icon: "checklist" },
  { text: "Quiz me on what I just read", icon: "person" },
];

const beforeUnitContentGuidance = [
  "What counts as Off-The-Job training?",
  "How do I track my progress against KSBs?",
  "Explain the End-Point Assessment simply",
  "What evidence do I need for my portfolio?",
];

const afterUnitContentGuidance = [
  "What's the difference between data governance and data management?",
  "How does GDPR apply to data governance?",
  "What are the key principles of a data governance framework?",
  "How do I create an effective data policy?",
];

const unitData = {
  id: 1,
  title: "Navigating Data and Governance Policy",
  moduleName: "Module 2: Foundations of Data Management",
  duration: "1 hr 30 min",
  activities: [
    {
      id: "intro",
      title: "Introduction to Data Governance",
      icon: "👋",
      type: "intro",
      status: "in-progress",
    },
  ],
  sections: [
    {
      id: "section-1",
      title: "Understanding Data Governance",
      expanded: true,
      activities: [
        { id: "1-1", title: "What is Data Governance?", type: "book", status: "ready" },
        { id: "1-2", title: "Key Principles and Frameworks", type: "book", status: "in-progress" },
      ],
    },
    {
      id: "section-2",
      title: "Data Policies and Compliance",
      expanded: true,
      activities: [
        { id: "2-1", title: "Data Protection Regulations", type: "book", status: "ready" },
        { id: "2-2", title: "GDPR and Data Privacy", type: "book", status: "ready" },
        { id: "2-3", title: "Creating Data Policies", type: "quill", status: "ready" },
        { id: "2-4", title: "Compliance Assessment", type: "form", status: "ready" },
        { id: "2-5", title: "Governance Checklist", type: "checklist", status: "ready" },
      ],
    },
    {
      id: "section-3",
      title: "Data Stewardship",
      expanded: false,
      activities: [],
    },
  ],
};

type ActivityStatus = "complete" | "in-progress" | "ready" | "not-started";

function StatusIcon({ status }: { status: ActivityStatus }) {
  switch (status) {
    case "complete":
      return (
        <div 
          className="flex-shrink-0 rounded-full bg-success flex items-center justify-center"
          style={{ width: '16px', height: '16px' }}
        >
          <CheckIcon size="small" className="text-white" style={{ width: '12px', height: '12px' }} />
        </div>
      );
    case "in-progress":
    case "ready":
      return (
        <div 
          className="flex-shrink-0 rounded-full"
          style={{ 
            width: '16px', 
            height: '16px',
            border: '1.5px solid #0097f8'
          }} 
        />
      );
    default:
      return (
        <div 
          className="flex-shrink-0 rounded-full border-separator-primary"
          style={{ 
            width: '16px', 
            height: '16px',
            border: '1.5px solid #edebe8'
          }} 
        />
      );
  }
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "quill":
      return <QuillIcon size="small" variant="secondary" className="flex-shrink-0" style={{ width: '16px', height: '16px' }} />;
    case "form":
      return <FormIcon size="small" variant="secondary" className="flex-shrink-0" style={{ width: '16px', height: '16px' }} />;
    case "checklist":
      return <ChecklistIcon size="small" variant="secondary" className="flex-shrink-0" style={{ width: '16px', height: '16px' }} />;
    default:
      return <BookIcon size="small" variant="secondary" className="flex-shrink-0" style={{ width: '16px', height: '16px' }} />;
  }
}

function ActivityItem({ 
  activity, 
  isActive, 
  onClick,
  showIndent = false,
}: { 
  activity: { id: string; title: string; type: string; status: string; icon?: string }; 
  isActive: boolean;
  onClick: () => void;
  showIndent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center rounded-base transition-colors text-left ${
        isActive ? "bg-action-secondary-active" : "hover:bg-secondary"
      }`}
      style={{ 
        height: '40px', 
        gap: '8px', 
        paddingLeft: '8px', 
        paddingRight: '8px',
      }}
      data-testid={`activity-${activity.id}`}
    >
      <div className="flex flex-1 items-start min-w-0" style={{ gap: '8px' }}>
        {showIndent && (
          <div className="flex-shrink-0 rounded-base" style={{ width: '16px', height: '16px', backgroundColor: 'transparent' }} />
        )}
        {activity.icon ? (
          <span className="flex-shrink-0 flex items-center justify-center" style={{ width: '16px', height: '16px', fontSize: '14px', lineHeight: '32px' }}>
            {activity.icon}
          </span>
        ) : (
          <ActivityIcon type={activity.type} />
        )}
        <span 
          className="flex-1 truncate"
          style={{ 
            fontFamily: "'Saans', sans-serif",
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '1.25',
            letterSpacing: '0.28px',
            color: isActive ? '#273282' : '#212223',
          }}
        >
          {activity.title}
        </span>
      </div>
      <StatusIcon status={activity.status as ActivityStatus} />
    </button>
  );
}

function SectionAccordion({ 
  section, 
  activeActivityId, 
  onActivityClick,
}: { 
  section: { id: string; title: string; expanded: boolean; activities: Array<{ id: string; title: string; type: string; status: string }> };
  activeActivityId: string | null;
  onActivityClick: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(section.expanded);
  
  return (
    <div className="w-full">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center rounded-base transition-colors"
        style={{ 
          gap: '4px', 
          paddingLeft: '4px', 
          paddingRight: '4px',
          paddingTop: '8px',
          paddingBottom: '8px',
        }}
        data-testid={`section-${section.id}`}
      >
        <div 
          className="flex items-center justify-center rounded-base flex-shrink-0"
          style={{ 
            width: '24px', 
            height: '24px', 
            padding: '4px',
            boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.06)'
          }}
        >
          {isExpanded ? (
            <ChevronDownIcon size="small" variant="primary" style={{ width: '16px', height: '16px' }} />
          ) : (
            <ChevronRightIcon size="small" variant="primary" style={{ width: '16px', height: '16px' }} />
          )}
        </div>
        <span 
          className="flex-1 truncate text-left"
          style={{ 
            fontFamily: "'Saans', sans-serif",
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '1.25',
            letterSpacing: '0.28px',
            color: '#212223',
          }}
        >
          {section.title}
        </span>
      </button>
      
      {isExpanded && section.activities.length > 0 && (
        <div>
          {section.activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              isActive={activeActivityId === activity.id}
              onClick={() => onActivityClick(activity.id)}
              showIndent
            />
          ))}
        </div>
      )}
    </div>
  );
}

function UnitHeader({ onChatClick, onBackClick, onAtlasClick }: { onChatClick: () => void; onBackClick: () => void; onAtlasClick: () => void }) {
  
  return (
    <div className="bg-primary border-b border-separator-primary">
      <div className="flex items-center justify-between" style={{ padding: '8px' }}>
        <button 
          type="button"
          onClick={() => onBackClick()}
          className="flex items-center cursor-pointer bg-transparent border-none hover:opacity-80 transition-opacity" 
          style={{ gap: '4px', padding: '8px', margin: '-8px' }} 
          data-testid="link-back-to-learning"
        >
          <span style={{ pointerEvents: 'none' }}>
            <ArrowLeftIcon size="small" variant="action" />
          </span>
          <span 
            style={{ 
              fontFamily: "'Saans', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '1.25',
              color: 'var(--text-color-action)',
              pointerEvents: 'none',
            }}
          >
            Back to home
          </span>
        </button>
        
        <div className="flex items-center" style={{ gap: '8px' }}>
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
            onClick={onChatClick}
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

function UnitSidebar({ 
  activeActivityId, 
  onActivityClick 
}: { 
  activeActivityId: string | null;
  onActivityClick: (id: string) => void;
}) {
  return (
    <div 
      className="flex-shrink-0 border-r border-separator-primary bg-primary overflow-y-auto flex flex-col"
      style={{ width: '240px', paddingLeft: '8px', paddingRight: '8px' }}
    >
      <div className="flex flex-col" style={{ gap: '16px', paddingTop: '16px' }}>
        <div className="flex flex-col" style={{ gap: '16px', paddingLeft: '8px', paddingRight: '8px' }}>
          <div 
            className="w-full rounded-lg overflow-hidden relative"
            style={{ 
              height: '125px',
              background: 'linear-gradient(228deg, #FFFFFF 2.83%, #E7EAFE 99.02%)',
            }}
          >
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 224 125" 
              preserveAspectRatio="xMidYMid slice"
              style={{ opacity: 0.6 }}
            >
              <defs>
                <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="8" height="8">
                  <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" style={{ stroke: '#c5c8f0', strokeWidth: 1.5 }} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
            </svg>
          </div>
          
          <div style={{ paddingTop: '4px', paddingBottom: '4px' }}>
            <h1 
              data-testid="text-unit-title"
              style={{ 
                fontFamily: "'Saans', sans-serif",
                fontWeight: 670,
                fontSize: '18px',
                lineHeight: '1.5',
                letterSpacing: '0.36px',
                color: '#212223',
              }}
            >
              {unitData.title}
            </h1>
          </div>
          
          <div style={{ height: '1px', backgroundColor: '#edebe8' }} />
        </div>
        
        <div className="flex flex-col" style={{ gap: '16px' }}>
          <div className="flex flex-col">
            {unitData.activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                isActive={activeActivityId === activity.id}
                onClick={() => onActivityClick(activity.id)}
              />
            ))}
          </div>
          
          {unitData.sections.map((section) => (
            <SectionAccordion
              key={section.id}
              section={section}
              activeActivityId={activeActivityId}
              onActivityClick={onActivityClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function UnitContent() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-primary">
      <div className="flex-1 overflow-y-auto">
        <div 
          className="mx-auto"
          style={{ 
            maxWidth: '800px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookIcon size="small" variant="secondary" style={{ width: '16px', height: '16px' }} />
              <span
                style={{
                  fontFamily: "'Saans', sans-serif",
                  fontWeight: 670,
                  fontSize: '12px',
                  lineHeight: '1.5',
                  letterSpacing: '0.24px',
                  color: '#6f7171',
                }}
              >
                Content
              </span>
            </div>
            
            <h1
              style={{
                fontFamily: "'Saans', sans-serif",
                fontWeight: 670,
                fontSize: '32px',
                lineHeight: '1.25',
                color: '#212223',
                margin: 0,
              }}
              data-testid="text-activity-title"
            >
              Welcome to your Programme
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p
              style={{
                fontFamily: "'Saans', sans-serif",
                fontSize: '18px',
                lineHeight: '1.5',
                letterSpacing: '0.36px',
                color: '#212223',
                margin: 0,
              }}
            >
              <span style={{ fontWeight: 670 }}>Total time to complete:</span>
              <span style={{ fontWeight: 400 }}> 10 minutes</span>
            </p>
          </div>
          
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <p
              style={{
                fontFamily: "'Saans', sans-serif",
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '1.5',
                letterSpacing: '0.36px',
                color: '#212223',
                margin: '0 0 16px 0',
              }}
            >
              Welcome to "Data Fundamentals and Accredited Learning"! This unit is designed to equip you with the essential skills and knowledge to navigate the evolving landscape of data in today's digital world.
            </p>
            
            <p
              style={{
                fontFamily: "'Saans', sans-serif",
                fontWeight: 670,
                fontSize: '18px',
                lineHeight: '1.5',
                letterSpacing: '0.36px',
                color: '#212223',
                margin: '0 0 8px 0',
              }}
            >
              What You Will Learn:
            </p>
            
            <ul
              style={{
                fontFamily: "'Saans', sans-serif",
                fontSize: '18px',
                lineHeight: '1.5',
                letterSpacing: '0.36px',
                color: '#212223',
                margin: '0 0 16px 0',
                paddingLeft: '24px',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 570 }}>Understanding Data</span>
                <span style={{ fontWeight: 400 }}>: Dive into the core principles of data, including types, structures, and the significance of data literacy in various industries.</span>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 570 }}>Data Collection and Management:</span>
                <span style={{ fontWeight: 400 }}> Explore techniques for collecting, storing, and maintaining data integrity, ensuring that you're prepared to work with high-quality data.</span>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 670 }}>Data Visualization:</span>
                <span style={{ fontWeight: 400 }}> Gain insights into presenting data using visualization tools, turning complex information into understandable and actionable insights.</span>
              </li>
            </ul>
            
            <p
              style={{
                fontFamily: "'Saans', sans-serif",
                fontWeight: 670,
                fontSize: '18px',
                lineHeight: '1.5',
                letterSpacing: '0.36px',
                color: '#212223',
                margin: '0 0 8px 0',
              }}
            >
              Accredited Learning Experience:
            </p>
            
            <p
              style={{
                fontFamily: "'Saans', sans-serif",
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '1.5',
                letterSpacing: '0.36px',
                color: '#212223',
                margin: '0 0 16px 0',
              }}
            >
              As part of this apprenticeship program, you will not only learn concepts but also apply them in real-world scenarios. Your journey will include hands-on projects, collaboration with industry professionals, and mentorship opportunities that will enhance your practical experience.
            </p>
            
            <p
              style={{
                fontFamily: "'Saans', sans-serif",
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '1.5',
                letterSpacing: '0.36px',
                color: '#212223',
                margin: '0 0 16px 0',
              }}
            >
              Through a blend of theory and practice, you'll earn recognized credentials that validate your expertise and prepare you for future career opportunities in data analytics and related fields.
            </p>
            
            <p
              style={{
                fontFamily: "'Saans', sans-serif",
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '1.5',
                letterSpacing: '0.36px',
                color: '#212223',
                margin: '0',
              }}
            >
              Join us as we embark on this exciting learning journey, empowering you to become proficient in data fundamentals while achieving accredited learning through your apprenticeship. Let's unlock the power of data together!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Unit() {
  const { unitId } = useParams<{ unitId: string }>();
  const [, setLocation] = useLocation();
  const { version, atlasVisible, setAtlasVisible, toggleAtlas, prototypeMode } = useAtlasVersion();
  const [activeActivityId, setActiveActivityId] = useState<string | null>("intro");
  const [showMessages, setShowMessages] = useState(false);
  
  const effectiveAtlasMode = 'inline' as 'inline' | 'overlay';
  
  useEffect(() => {
    if (prototypeMode === 'before' || prototypeMode === 'after') {
      setAtlasVisible(true);
    }
  }, [prototypeMode, setAtlasVisible]);
  
  const handleChatClick = () => {
    if (!atlasVisible) {
      toggleAtlas();
    }
    setShowMessages(true);
  };
  
  const handleBackClick = () => {
    setLocation("/learning");
  };
  
  return (
    <div className="h-screen flex flex-col bg-primary" data-testid="unit-page">
      <UnitHeader onChatClick={handleChatClick} onBackClick={handleBackClick} onAtlasClick={() => toggleAtlas()} />
      
      <div className="flex-1 flex overflow-hidden">
        <motion.div 
          className="flex overflow-hidden relative"
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
          <UnitSidebar 
            activeActivityId={activeActivityId}
            onActivityClick={setActiveActivityId}
          />
          
          <UnitContent />
        </motion.div>
        
        {effectiveAtlasMode === 'inline' && (
          <AtlasSidebar 
            version={version} 
            isVisible={atlasVisible} 
            onToggle={toggleAtlas}
            hideContentGuidance={false}
            showMessages={showMessages}
            onMessagesClose={() => setShowMessages(false)}
            suggestions={prototypeMode === 'after' ? afterUnitSuggestions : beforeUnitSuggestions}
            contentGuidance={prototypeMode === 'after' ? afterUnitContentGuidance : beforeUnitContentGuidance}
            greeting={prototypeMode === 'after' ? "Hey Sarah, I can help you study" : undefined}
            prototypeMode={prototypeMode}
          />
        )}
      </div>
      {effectiveAtlasMode === 'overlay' && createPortal(
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
            <AtlasSidebar 
              version={version} 
              isVisible={true} 
              onToggle={toggleAtlas}
              hideContentGuidance={false}
              showMessages={showMessages}
              onMessagesClose={() => setShowMessages(false)}
              suggestions={prototypeMode === 'after' ? afterUnitSuggestions : beforeUnitSuggestions}
              contentGuidance={prototypeMode === 'after' ? afterUnitContentGuidance : beforeUnitContentGuidance}
              greeting={prototypeMode === 'after' ? "Hey Sarah, I can help you study" : undefined}
              prototypeMode={prototypeMode}
            />
          </div>
        </motion.div>,
        document.body
      )}
    </div>
  );
}
