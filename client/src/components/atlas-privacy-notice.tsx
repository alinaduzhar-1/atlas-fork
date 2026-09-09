/**
 * The wording, kept as a module-local constant so it has one home. Deliberately
 * NOT exported: a non-component export in a file imported by `atlas.tsx` breaks
 * React Fast Refresh (see `.agents/memory/atlas-fast-refresh.md`).
 */
const PRIVACY_COPY =
  "Please avoid sharing sensitive personal information with Atlas.";

interface AtlasPrivacyNoticeProps {
  /**
   * The side panel reads left-aligned under a full-width composer. The full
   * view centres its composer in an 800px column, so the notice centres with
   * it. One shared component, so alignment is a prop rather than a global.
   */
  align?: "start" | "centre";
}

/**
 * Quiet one-line privacy notice that sits directly under the Atlas composer.
 *
 * Plain microcopy on purpose — no ground, no icon, no interaction. The composer
 * above it is the only bounded box in that corner, so a card or a coloured
 * background here would read as a second competing element rather than as
 * system small print.
 *
 * It sits below the composer rather than in the welcome state so that it is
 * present mid-conversation too, which is when someone is actually typing.
 */
export function AtlasPrivacyNotice({ align = "start" }: AtlasPrivacyNoticeProps = {}) {
  return (
    <div
      className="w-full"
      /*
       * 8px top margin keeps it off the composer's border; the 4px inset lines
       * the text up with the composer's own left edge.
       */
      style={{
        padding: "0 4px",
        marginTop: "8px",
        textAlign: align === "centre" ? "center" : undefined,
      }}
      data-testid="atlas-privacy-notice"
    >
      <span className="text-xs text-secondary" style={{ lineHeight: "1.45" }}>
        {PRIVACY_COPY}
      </span>
    </div>
  );
}

export default AtlasPrivacyNotice;
