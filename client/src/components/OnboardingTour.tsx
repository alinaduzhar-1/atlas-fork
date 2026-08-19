import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAtlasVersion } from "./atlas-version-context";

type TipPosition = 'top' | 'bottom' | 'left' | 'right';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  tipPosition: TipPosition;
  targetSelector: string;
  requiresDropdownOpen?: boolean;
  arrowPosition?: 'top' | 'center' | 'bottom';
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Context aware prompts",
    description: "Atlas provides smart suggestions based on where you are in the platform. These prompts help you get started quickly with relevant actions.",
    tipPosition: 'left',
    targetSelector: '[data-testid="atlas-suggestions"]',
    arrowPosition: 'center'
  },
  {
    id: 2,
    title: "New chat window",
    description: "Start a fresh conversation with Atlas at any time. Each new chat gives you a clean slate to explore different topics.",
    tipPosition: 'bottom',
    targetSelector: '[data-testid="button-new-chat"]'
  },
  {
    id: 3,
    title: "Past chats",
    description: "Access your previous conversations with Atlas. Your chat history is saved so you can pick up where you left off.",
    tipPosition: 'bottom',
    targetSelector: '[data-testid="dropdown-atlas-title"]'
  },
  {
    id: 4,
    title: "Expand Atlas",
    description: "Make Atlas larger for a more immersive experience. This gives you more space to read responses and explore content.",
    tipPosition: 'left',
    targetSelector: '[data-testid="dropdown-item-open-new-tab"]',
    requiresDropdownOpen: true
  },
  {
    id: 5,
    title: "Personalisation",
    description: "Customise how Atlas works for you. Set your preferences to get more tailored recommendations and responses.",
    tipPosition: 'left',
    targetSelector: '[data-testid="dropdown-item-personalisation"]',
    requiresDropdownOpen: true
  },
  {
    id: 6,
    title: "Attachments",
    description: "Share files and images with Atlas for more contextual help. Attach documents to get specific feedback and guidance.",
    tipPosition: 'top',
    targetSelector: '[data-testid="button-add-attachment"]'
  }
];

function TooltipArrow({ position, verticalPosition = 'top' }: { position: TipPosition; verticalPosition?: 'top' | 'center' | 'bottom' }) {
  const arrowStyle: React.CSSProperties = {
    width: 0,
    height: 0,
    position: 'absolute',
  };

  const getVerticalOffset = () => {
    switch (verticalPosition) {
      case 'top': return 26;
      case 'center': return '50%';
      case 'bottom': return 'calc(100% - 40px)';
    }
  };
  
  switch (position) {
    case 'top':
      return (
        <div 
          style={{
            ...arrowStyle,
            bottom: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '6px solid #171d4c',
          }}
        />
      );
    case 'bottom':
      return (
        <div 
          style={{
            ...arrowStyle,
            top: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderBottom: '6px solid #171d4c',
          }}
        />
      );
    case 'left':
      return (
        <div 
          style={{
            ...arrowStyle,
            right: -6,
            top: getVerticalOffset(),
            transform: verticalPosition === 'center' ? 'translateY(-50%)' : undefined,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderLeft: '6px solid #171d4c',
          }}
        />
      );
    case 'right':
      return (
        <div 
          style={{
            ...arrowStyle,
            left: -6,
            top: getVerticalOffset(),
            transform: verticalPosition === 'center' ? 'translateY(-50%)' : undefined,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '6px solid #171d4c',
          }}
        />
      );
  }
}

interface OnboardingTooltipProps {
  step: OnboardingStep;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

function OnboardingTooltip({ 
  step, 
  currentStep, 
  totalSteps, 
  onNext, 
  onBack, 
  onSkip 
}: OnboardingTooltipProps) {
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="relative"
      style={{
        width: 232,
        filter: 'drop-shadow(0px 2px 10px rgba(0,0,0,0.1))',
      }}
    >
      <TooltipArrow position={step.tipPosition} verticalPosition={step.arrowPosition} />
      <div 
        className="flex flex-col rounded-lg"
        style={{
          backgroundColor: '#171d4c',
          padding: 16,
          gap: 8,
        }}
      >
        <div 
          className="rounded"
          style={{
            backgroundColor: '#273282',
            height: 120,
            width: '100%',
          }}
        />
        
        <div className="flex flex-col" style={{ gap: 4 }}>
          <div className="flex items-center justify-between">
            <span 
              className="font-medium text-white"
              style={{ fontSize: 14, lineHeight: 1.25, letterSpacing: '0.28px' }}
            >
              {step.title}
            </span>
            <span 
              className="font-medium text-white"
              style={{ fontSize: 14, lineHeight: 1.25, letterSpacing: '0.28px' }}
            >
              {currentStep + 1}/{totalSteps}
            </span>
          </div>
          <p 
            className="text-white"
            style={{ fontSize: 12, lineHeight: 1.5, letterSpacing: '0.24px', opacity: 0.9 }}
          >
            {step.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            onClick={onSkip}
            className="text-white font-medium hover:opacity-80 transition-opacity"
            style={{ 
              fontSize: 12, 
              lineHeight: 1.25, 
              letterSpacing: '0.24px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
            }}
          >
            Skip
          </button>
          
          <div className="flex items-center" style={{ gap: 8 }}>
            {!isFirstStep && (
              <button
                onClick={onBack}
                className="font-medium text-white hover:opacity-80 transition-opacity"
                style={{
                  fontSize: 12,
                  lineHeight: 1.25,
                  letterSpacing: '0.24px',
                  backgroundColor: '#171d4c',
                  border: '1px solid #4a5ff7',
                  borderRadius: 6,
                  padding: '4px 8px',
                  height: 24,
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
            )}
            <button
              onClick={onNext}
              className="font-medium text-white hover:opacity-90 transition-opacity"
              style={{
                fontSize: 12,
                lineHeight: 1.25,
                letterSpacing: '0.24px',
                backgroundColor: '#4a5ff7',
                border: 'none',
                borderRadius: 6,
                padding: '4px 8px',
                height: 24,
                cursor: 'pointer',
              }}
            >
              {isLastStep ? 'Done' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function OnboardingTour() {
  const { 
    isOnboardingActive, 
    onboardingStep, 
    nextOnboardingStep, 
    prevOnboardingStep, 
    stopOnboarding 
  } = useAtlasVersion();
  
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);
  const [atlasBounds, setAtlasBounds] = useState<DOMRect | null>(null);

  const calculatePosition = useCallback(() => {
    const currentStep = onboardingSteps[onboardingStep];
    if (!currentStep) return;

    const atlasPanel = document.querySelector('[data-testid="atlas-sidebar-v3"]');
    if (atlasPanel) {
      setAtlasBounds(atlasPanel.getBoundingClientRect());
    }

    const targetElement = document.querySelector(currentStep.targetSelector);
    if (!targetElement) {
      setTimeout(() => calculatePosition(), 100);
      return;
    }

    const rect = targetElement.getBoundingClientRect();
    const tooltipWidth = 232;
    const tooltipHeight = 280;
    const gap = 12;

    let top = 0;
    let left = 0;

    switch (currentStep.tipPosition) {
      case 'top':
        top = rect.top - tooltipHeight - gap;
        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
        break;
      case 'bottom':
        top = rect.bottom + gap;
        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
        break;
      case 'left':
        if (currentStep.arrowPosition === 'center') {
          top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
        } else {
          top = rect.top + (rect.height / 2) - 40;
        }
        left = rect.left - tooltipWidth - gap;
        break;
      case 'right':
        if (currentStep.arrowPosition === 'center') {
          top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
        } else {
          top = rect.top + (rect.height / 2) - 40;
        }
        left = rect.right + gap;
        break;
    }

    left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));
    top = Math.max(8, Math.min(top, window.innerHeight - tooltipHeight - 8));

    setTooltipPosition({ top, left });
  }, [onboardingStep]);

  useEffect(() => {
    if (isOnboardingActive) {
      calculatePosition();
      window.addEventListener('resize', calculatePosition);
      return () => window.removeEventListener('resize', calculatePosition);
    }
  }, [isOnboardingActive, onboardingStep, calculatePosition]);

  useEffect(() => {
    if (isOnboardingActive) {
      const timer = setTimeout(() => calculatePosition(), 100);
      return () => clearTimeout(timer);
    }
  }, [onboardingStep, isOnboardingActive, calculatePosition]);
  
  if (!isOnboardingActive) return null;
  
  const currentStep = onboardingSteps[onboardingStep];
  
  if (!currentStep || !tooltipPosition) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 99999 }}
      >
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <mask id="atlas-cutout">
              <rect width="100%" height="100%" fill="white" />
              {atlasBounds && (
                <rect 
                  x={atlasBounds.left} 
                  y={atlasBounds.top} 
                  width={atlasBounds.width} 
                  height={atlasBounds.height} 
                  fill="black" 
                />
              )}
            </mask>
          </defs>
          <rect 
            width="100%" 
            height="100%" 
            fill="rgba(0, 0, 0, 0.5)" 
            mask="url(#atlas-cutout)"
            style={{ pointerEvents: 'auto' }}
            onClick={stopOnboarding}
          />
        </svg>
      </div>
      
      <AnimatePresence mode="wait">
        <div 
          key={onboardingStep} 
          style={{
            position: 'fixed',
            zIndex: 100001,
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
        >
          <OnboardingTooltip
            step={currentStep}
            currentStep={onboardingStep}
            totalSteps={onboardingSteps.length}
            onNext={nextOnboardingStep}
            onBack={prevOnboardingStep}
            onSkip={stopOnboarding}
          />
        </div>
      </AnimatePresence>
    </>,
    document.body
  );
}
