import React from "react";
import { Stage, UpRight, T3 } from "./_shared";

// Hypothesis: drop the question — a single quiet right-aligned link, minimum noise above the composer
export function MinimalRightLink() {
  return (
    <Stage note="Minimal: question removed; one quiet right-aligned link, hover reveals underline">
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 6px 0" }}>
        <a href="#" onClick={(e) => e.preventDefault()} style={{
          display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 500,
          color: T3, letterSpacing: "0.2px", textDecoration: "underline", textUnderlineOffset: 2,
        }}>
          Open in full screen <UpRight size={10} color={T3} />
        </a>
      </div>
    </Stage>
  );
}
