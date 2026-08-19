/**
 * Interaction checks for the redesigned top-bar Atlas control
 * (`UnifiedAtlasControl`): Sidebar open/close, Full view opening the named
 * `atlas-fullscreen` tab, and the Sidebar segment disabling (with tooltip)
 * while Full view runs — across both header variants in navigation.
 */
import React, { useEffect } from "react";
import { render, screen, fireEvent, waitFor, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { UnifiedAtlasControl } from "@/components/atlas";
import NavigationLayout from "@/components/navigation";
import { AtlasVersionProvider, useAtlasVersion, type PrototypeTab } from "@/components/atlas-version-context";

const TOOLTIP_COPY = "Atlas is running in a new tab. The sidebar is paused until you close it.";

function mockFetch({ fullscreenActive }: { fullscreenActive: boolean }) {
  return vi.fn(async (input: any) => {
    const url = typeof input === "string" ? input : input?.url ?? "";
    if (url.includes("/api/atlas/fullscreen-active")) {
      return { ok: true, json: async () => ({ active: fullscreenActive }) } as any;
    }
    return { ok: false, json: async () => ({}) } as any;
  });
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("UnifiedAtlasControl (unit)", () => {
  it("unlocked: sidebar segment is enabled and fires onSidebarClick (open/close)", () => {
    const onSidebarClick = vi.fn();
    const { rerender } = render(
      <UnifiedAtlasControl
        atlasLockedClosed={false}
        sidebarOpen={false}
        onSidebarClick={onSidebarClick}
        onFullViewClick={() => {}}
      />,
    );

    const sidebarBtn = screen.getByTestId("button-atlas-sidebar-mode");
    expect(sidebarBtn).toHaveAttribute("aria-pressed", "false");
    expect(sidebarBtn.style.cursor).toBe("pointer");

    fireEvent.click(sidebarBtn);
    expect(onSidebarClick).toHaveBeenCalledTimes(1);

    // Simulate the parent opening the sidebar in response.
    rerender(
      <UnifiedAtlasControl
        atlasLockedClosed={false}
        sidebarOpen={true}
        onSidebarClick={onSidebarClick}
        onFullViewClick={() => {}}
      />,
    );
    expect(screen.getByTestId("button-atlas-sidebar-mode")).toHaveAttribute("aria-pressed", "true");

    // Clicking again requests a close.
    fireEvent.click(screen.getByTestId("button-atlas-sidebar-mode"));
    expect(onSidebarClick).toHaveBeenCalledTimes(2);
  });

  it("unlocked: static 'Ask Atlas' label renders and full view segment fires onFullViewClick", () => {
    const onFullViewClick = vi.fn();
    render(
      <UnifiedAtlasControl
        atlasLockedClosed={false}
        sidebarOpen={false}
        onSidebarClick={() => {}}
        onFullViewClick={onFullViewClick}
      />,
    );
    expect(screen.getByTestId("label-ask-atlas")).toHaveTextContent("Ask Atlas");
    const fullViewBtn = screen.getByTestId("button-atlas-fullview-mode");
    expect(fullViewBtn).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(fullViewBtn);
    expect(onFullViewClick).toHaveBeenCalledTimes(1);
  });

  it("locked: sidebar segment is disabled, shows the tooltip, and full view stays active/clickable", async () => {
    const onSidebarClick = vi.fn();
    const onFullViewClick = vi.fn();
    render(
      <UnifiedAtlasControl
        atlasLockedClosed={true}
        sidebarOpen={false}
        onSidebarClick={onSidebarClick}
        onFullViewClick={onFullViewClick}
      />,
    );

    const sidebarBtn = screen.getByTestId("button-atlas-sidebar-mode");
    expect(sidebarBtn.style.cursor).toBe("not-allowed");
    expect(sidebarBtn.style.opacity).toBe("0.4");
    fireEvent.click(sidebarBtn);
    expect(onSidebarClick).not.toHaveBeenCalled();

    // Tooltip appears on hover while locked.
    const user = userEvent.setup();
    await user.hover(sidebarBtn);
    await waitFor(() => {
      expect(screen.getAllByText(TOOLTIP_COPY).length).toBeGreaterThan(0);
    });

    // Full view segment reflects the running tab and still responds.
    const fullViewBtn = screen.getByTestId("button-atlas-fullview-mode");
    expect(fullViewBtn).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(fullViewBtn);
    expect(onFullViewClick).toHaveBeenCalledTimes(1);
  });

  it("unlocked: no tooltip wrapper content is mounted for the enabled sidebar segment", () => {
    render(
      <UnifiedAtlasControl
        atlasLockedClosed={false}
        sidebarOpen={false}
        onSidebarClick={() => {}}
        onFullViewClick={() => {}}
      />,
    );
    expect(screen.queryByText(TOOLTIP_COPY)).not.toBeInTheDocument();
  });
});

function SetTab({ tab }: { tab: PrototypeTab }) {
  const { setPrototypeTab } = useAtlasVersion();
  useEffect(() => {
    setPrototypeTab(tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);
  return null;
}

function renderNavigation(tab: PrototypeTab) {
  return render(
    <QueryClientProvider client={queryClient}>
      <AtlasVersionProvider>
        <SetTab tab={tab} />
        <NavigationLayout>
          <div>page body</div>
        </NavigationLayout>
      </AtlasVersionProvider>
    </QueryClientProvider>,
  );
}

// Both header variants render the same UnifiedAtlasControl wiring:
// 'after-drafts' uses the inline (after-mode) top bar, 'before' uses HeaderRoot.
describe.each<PrototypeTab>(["after-drafts", "before"])(
  "NavigationLayout header variant (prototypeTab=%s)",
  (tab) => {
    beforeEach(() => {
      vi.stubGlobal("fetch", mockFetch({ fullscreenActive: false }));
      window.sessionStorage.clear();
      window.localStorage.clear();
    });

    it("renders the unified control and toggles the sidebar open/closed when unlocked", async () => {
      renderNavigation(tab);
      const sidebarBtn = await screen.findByTestId("button-atlas-sidebar-mode");

      // after-mode forces the sidebar open initially; before-mode starts from
      // provider default (visible). Either way the first click closes it.
      await waitFor(() => expect(sidebarBtn).toHaveAttribute("aria-pressed", "true"));
      fireEvent.click(sidebarBtn);
      await waitFor(() => expect(sidebarBtn).toHaveAttribute("aria-pressed", "false"));
      fireEvent.click(sidebarBtn);
      await waitFor(() => expect(sidebarBtn).toHaveAttribute("aria-pressed", "true"));
    });

    it("full view segment dispatches the atlas-open-window event when unlocked", async () => {
      const dispatched: Event[] = [];
      const listener = (e: Event) => dispatched.push(e);
      window.addEventListener("atlas-open-window", listener);
      try {
        renderNavigation(tab);
        const fullViewBtn = await screen.findByTestId("button-atlas-fullview-mode");
        fireEvent.click(fullViewBtn);
        expect(dispatched.length).toBe(1);
      } finally {
        window.removeEventListener("atlas-open-window", listener);
      }
    });

    it("locks the sidebar segment (disabled + tooltip) while full view runs, and full view focuses the named atlas-fullscreen tab", async () => {
      vi.stubGlobal("fetch", mockFetch({ fullscreenActive: true }));
      const fakeWin = { location: { href: "about:blank" }, focus: vi.fn() };
      const openSpy = vi.spyOn(window, "open").mockReturnValue(fakeWin as any);

      renderNavigation(tab);
      const fullViewBtn = await screen.findByTestId("button-atlas-fullview-mode");
      // Wait for the heartbeat poll to engage the lock.
      await waitFor(() => expect(fullViewBtn).toHaveAttribute("aria-pressed", "true"));

      const sidebarBtn = screen.getByTestId("button-atlas-sidebar-mode");
      expect(sidebarBtn.style.cursor).toBe("not-allowed");
      fireEvent.click(sidebarBtn);
      // Sidebar stays closed while locked.
      expect(sidebarBtn).toHaveAttribute("aria-pressed", "false");

      const user = userEvent.setup();
      await user.hover(sidebarBtn);
      await waitFor(() => {
        expect(screen.getAllByText(TOOLTIP_COPY).length).toBeGreaterThan(0);
      });

      // Full view click re-targets the existing named tab and focuses it.
      fireEvent.click(fullViewBtn);
      expect(openSpy).toHaveBeenCalledWith("", "atlas-fullscreen");
      expect(fakeWin.focus).toHaveBeenCalled();
      expect(fakeWin.location.href).toContain("/atlas?context=homepage");
    });

    it("locked with popup blocked: full view falls back to the atlas-open-window event", async () => {
      vi.stubGlobal("fetch", mockFetch({ fullscreenActive: true }));
      vi.spyOn(window, "open").mockReturnValue(null);
      const dispatched: Event[] = [];
      const listener = (e: Event) => dispatched.push(e);
      window.addEventListener("atlas-open-window", listener);
      try {
        renderNavigation(tab);
        const fullViewBtn = await screen.findByTestId("button-atlas-fullview-mode");
        await waitFor(() => expect(fullViewBtn).toHaveAttribute("aria-pressed", "true"));
        fireEvent.click(fullViewBtn);
        expect(dispatched.length).toBe(1);
      } finally {
        window.removeEventListener("atlas-open-window", listener);
      }
    });
  },
);

// The sidebar-open flow that the atlas-open-window event triggers lives in the
// Atlas panel itself and ends in `window.open(url, 'atlas-fullscreen')`. Verify
// that contract at the source level so a rename of the named tab can't slip by.
describe("full-screen tab naming contract", () => {
  it("atlas.tsx opens the full screen url in the named 'atlas-fullscreen' tab", async () => {
    const fs = await import("node:fs/promises");
    const src = await fs.readFile("client/src/components/atlas.tsx", "utf8");
    expect(src).toMatch(/window\.open\(fullScreenUrl,\s*['"]atlas-fullscreen['"]\)/);
  });

  it("both navigation header variants pass identical UnifiedAtlasControl wiring", async () => {
    const fs = await import("node:fs/promises");
    const src = await fs.readFile("client/src/components/navigation.tsx", "utf8");
    const blocks = Array.from(src.matchAll(/<UnifiedAtlasControl[\s\S]*?\/>/g)).map((m) =>
      m[0].replace(/\s+/g, " "),
    );
    expect(blocks.length).toBe(2);
    expect(blocks[0]).toBe(blocks[1]);
  });
});
