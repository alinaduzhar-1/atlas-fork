import React from "react";
import { Stage, UpRight, T3, ACTION } from "./_shared";

// Exact copy of current: centered tertiary text + action link, above the composer
export function Current() {
  return (
    <Stage note="Current: centered caption + underlinable link with ↗, sits directly above the input">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "6px 12px 0" }}>
        <span style={{ fontSize: 11, color: T3, letterSpacing: "0.2px" }}>Need a larger workspace?</span>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: ACTION, letterSpacing: "0.2px", textDecoration: "none" }}>
          Open Atlas in full screen <UpRight size={11} />
        </a>
      </div>
    </Stage>
  );
}
