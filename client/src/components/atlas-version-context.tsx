import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { queryClient } from "@/lib/queryClient";

export type AtlasVersion = 1 | 2 | 3;
export type AtlasMode = 'inline' | 'overlay';
export type PrototypeMode = 'before' | 'after';
export type PrototypeTab = 'before' | 'after' | 'drafts' | 'after-drafts';
export type TopButtonsDesign = '1' | '2';

export interface AtlasVersionContextType {
  version: AtlasVersion;
  setVersion: (version: AtlasVersion) => void;
  atlasVisible: boolean;
  setAtlasVisible: (visible: boolean) => void;
  toggleAtlas: () => void;
  atlasLockedClosed: boolean;
  atlasMode: AtlasMode;
  setAtlasMode: (mode: AtlasMode) => void;
  prototypeMode: PrototypeMode;
  prototypeTab: PrototypeTab;
  setPrototypeTab: (tab: PrototypeTab) => void;
  topButtonsDesign: TopButtonsDesign;
  setTopButtonsDesign: (design: TopButtonsDesign) => void;
  isOnboardingActive: boolean;
  onboardingStep: number;
  startOnboarding: () => void;
  stopOnboarding: () => void;
  nextOnboardingStep: () => void;
  prevOnboardingStep: () => void;
  forceMoreMenuOpen: boolean;
  pendingMessage: string | null;
  sendMessageToAtlas: (message: string) => void;
  clearPendingMessage: () => void;
}

const AtlasVersionContext = createContext<AtlasVersionContextType>({
  version: 3,
  setVersion: () => {},
  atlasVisible: false,
  setAtlasVisible: () => {},
  toggleAtlas: () => {},
  atlasLockedClosed: false,
  atlasMode: 'inline',
  setAtlasMode: () => {},
  prototypeMode: 'after',
  prototypeTab: 'after',
  setPrototypeTab: () => {},
  topButtonsDesign: '1',
  setTopButtonsDesign: () => {},
  isOnboardingActive: false,
  onboardingStep: 0,
  startOnboarding: () => {},
  stopOnboarding: () => {},
  nextOnboardingStep: () => {},
  prevOnboardingStep: () => {},
  forceMoreMenuOpen: false,
  pendingMessage: null,
  sendMessageToAtlas: () => {},
  clearPendingMessage: () => {},
});

export const useAtlasVersion = () => useContext(AtlasVersionContext);

export function AtlasVersionProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersion] = useState<AtlasVersion>(3);
  // While a full-screen Atlas tab is open (server-side heartbeat, polled
  // below), the sidebar is locked closed and cannot be opened. Once full
  // screen closes or the user navigates back to the app, the lock lifts and
  // the sidebar can be reopened.
  const [atlasLockedClosed, setAtlasLockedClosed] = useState(false);
  const atlasLockedRef = useRef(false);
  const [atlasVisible, setAtlasVisibleRaw] = useState(true);
  // Stable identities matter: consumers (e.g. NavigationLayout's force-open
  // effect) list these in useEffect deps, so a fresh function per render
  // would re-run those effects on every provider render and instantly undo
  // programmatic collapses.
  const setAtlasVisible = useCallback((visible: boolean | ((prev: boolean) => boolean)) => {
    setAtlasVisibleRaw(prev => {
      const next = typeof visible === "function" ? visible(prev) : visible;
      return atlasLockedRef.current ? false : next;
    });
  }, []);

  // Poll full-screen presence. localStorage/BroadcastChannel can't reach a
  // separate top-level tab from the embedded preview (storage partitioning),
  // so the server heartbeat is the source of truth.
  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const res = await fetch("/api/atlas/fullscreen-active");
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled || typeof data?.active !== "boolean") return;
        atlasLockedRef.current = data.active;
        setAtlasLockedClosed(data.active);
        if (data.active) setAtlasVisibleRaw(false);
      } catch {}
    };
    check();
    const id = setInterval(check, 2000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);
  const [atlasMode, setAtlasMode] = useState<AtlasMode>('inline');
  const [prototypeTab, setPrototypeTab] = useState<PrototypeTab>('after-drafts');
  const [topButtonsDesign, setTopButtonsDesign] = useState<TopButtonsDesign>('1');
  const prototypeMode: PrototypeMode = prototypeTab === 'before' ? 'before' : 'after';
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);

  const toggleAtlas = useCallback(() => setAtlasVisible(prev => !prev), [setAtlasVisible]);

  const startOnboarding = () => {
    if (!atlasVisible) {
      setAtlasVisible(true);
    }
    setOnboardingStep(0);
    setIsOnboardingActive(true);
  };

  const stopOnboarding = () => {
    setIsOnboardingActive(false);
    setOnboardingStep(0);
  };

  const nextOnboardingStep = () => {
    if (onboardingStep < 5) {
      setOnboardingStep(prev => prev + 1);
    } else {
      stopOnboarding();
    }
  };

  const prevOnboardingStep = () => {
    if (onboardingStep > 0) {
      setOnboardingStep(prev => prev - 1);
    }
  };

  const forceMoreMenuOpen = isOnboardingActive && (onboardingStep === 3 || onboardingStep === 4);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const sendMessageToAtlas = (message: string) => {
    if (!atlasVisible) setAtlasVisible(true);
    setPendingMessage(message);
  };
  const clearPendingMessage = () => setPendingMessage(null);

  return (
    <AtlasVersionContext.Provider value={{
      version,
      setVersion,
      atlasVisible,
      setAtlasVisible,
      toggleAtlas,
      atlasLockedClosed,
      atlasMode,
      setAtlasMode,
      prototypeMode,
      prototypeTab,
      setPrototypeTab,
      topButtonsDesign,
      setTopButtonsDesign,
      isOnboardingActive,
      onboardingStep,
      startOnboarding,
      stopOnboarding,
      nextOnboardingStep,
      prevOnboardingStep,
      forceMoreMenuOpen,
      pendingMessage,
      sendMessageToAtlas,
      clearPendingMessage
    }}>
      {children}
    </AtlasVersionContext.Provider>
  );
}
