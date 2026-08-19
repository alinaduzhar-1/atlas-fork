import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom lacks these browser APIs used by framer-motion / stardust components.
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as any;
}

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (!(window as any).ResizeObserver) {
  (window as any).ResizeObserver = ResizeObserverStub;
}

if (!(window as any).speechSynthesis) {
  (window as any).speechSynthesis = {
    cancel: () => {},
    speak: () => {},
    getVoices: () => [],
    addEventListener: () => {},
    removeEventListener: () => {},
  };
}

if (!window.scrollTo) {
  window.scrollTo = () => {};
}
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

// Avoid real network from polling effects; individual tests override this.
vi.stubGlobal(
  "fetch",
  vi.fn(async () => ({ ok: false, json: async () => ({}) })),
);
