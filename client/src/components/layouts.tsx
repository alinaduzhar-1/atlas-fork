import styles from "./layouts.module.css";
import { useAtlasVersion } from "./atlas-version-context";

/**
 * Predefined maximum widths for layout containers
 */
const maxWidths = {
  default: "1024px",
  narrow: "800px",
  slim: "560px",
  full: "100%",
} as const;

const gutterPresets = {
  default: {
    top: "var(--spacing-4x)",
    bottom: "var(--spacing-8x)",
    inline: "var(--spacing-3x)",
  },
  minimal: {
    top: "var(--spacing-2x)",
    bottom: "var(--spacing-4x)",
    inline: "var(--spacing-2x)",
  },
  zero: {
    top: "0",
    bottom: "0",
    inline: "0",
  },
} as const;

type LayoutWidths = keyof typeof maxWidths;
type GutterPreset = keyof typeof gutterPresets;

type LayoutProps = {
  children: React.ReactNode;
  width?: LayoutWidths;
  gutters?: GutterPreset;
  centerWhenAtlasHidden?: boolean;
};

/**
 * Main layout wrapper component that sets the maximum width for content
 * @param children - Content to be rendered within the layout
 * @param width - Maximum width preset (default: "default" = 1024px)
 * @param gutters - Gutter preset controlling padding on all sides (default: "default")
 * @param centerWhenAtlasHidden - Center content when Atlas panel is hidden (default: true)
 */
function Layout({
  children,
  width = "default",
  gutters = "default",
  centerWhenAtlasHidden = true,
}: LayoutProps) {
  const gutter = gutterPresets[gutters];
  const { atlasVisible } = useAtlasVersion();
  
  const shouldCenter = centerWhenAtlasHidden && !atlasVisible;

  return (
    <div
      id="wrapper"
      style={{
        ["--main-content-max-w" as string]: maxWidths[width],
        ["--layout-gutter-top" as string]: gutter.top,
        ["--layout-gutter-bottom" as string]: gutter.bottom,
        ["--layout-gutter-inline" as string]: gutter.inline,
        margin: shouldCenter ? '0 auto' : undefined,
      }}
      className={styles.wrapper}
    >
      {children}
    </div>
  );
}

/**
 * Grid container for panel layouts with main content and aside sections
 * @param children - Panel components (typically PanelMain and PanelAside)
 */
function PanelGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.panelGrid}>{children}</div>;
}

/**
 * Title component for panel layouts
 * @param children - Title content to display
 */
function PanelTitle({ children }: { children: React.ReactNode }) {
  return <div className={styles.panelTitle}>{children}</div>;
}

/**
 * Main content area within a panel grid
 * @param children - Primary content to display
 */
function PanelMain({ children }: { children: React.ReactNode }) {
  return <div className={styles.panelMain}>{children}</div>;
}

/**
 * Aside/sidebar component within a panel grid
 * Includes an inner wrapper for styling purposes
 * @param children - Sidebar content to display
 */
function PanelAside({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.panelAside}>
      <div className={styles.panelAsideInner}>{children}</div>
    </div>
  );
}

/**
 * Grid container for 50/50 split layouts
 * @param children - Components to be arranged in equal-width columns
 */
function FiftyFiftyGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.fiftyFiftyGrid}>{children}</div>;
}

export { Layout, PanelTitle, PanelGrid, PanelMain, PanelAside, FiftyFiftyGrid };
