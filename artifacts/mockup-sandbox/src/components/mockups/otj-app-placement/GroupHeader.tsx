import { Clock } from "lucide-react";
import { c, entries, CardShell, RightStatus, TotalRow, Frame } from "./_shared";

function Card({ entry, logged }: { entry: (typeof entries)[number]; logged?: boolean }) {
  return (
    <CardShell logged={logged}>
      <div className="flex flex-col" style={{ gap: "4px" }}>
        <div className="flex items-start justify-between" style={{ gap: "12px" }}>
          <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
            {entry.task}
          </span>
          <RightStatus logged={logged} duration={entry.duration} />
        </div>
        <span className="text-xs" style={{ color: c.textSecondary, fontWeight: 570 }}>
          {entry.category} · {entry.date}
        </span>
      </div>
    </CardShell>
  );
}

function Section({ heading, logged }: { heading: string; logged?: boolean }) {
  return (
    <div className="flex flex-col" style={{ gap: "8px" }}>
      <div className="flex items-center" style={{ gap: "8px" }}>
        <Clock size={16} style={{ color: c.action }} />
        <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
          {heading}
        </span>
      </div>
      {entries.map((entry, i) => (
        <Card key={i} entry={entry} logged={logged} />
      ))}
      <TotalRow logged={logged} />
    </div>
  );
}

export function GroupHeader() {
  return (
    <Frame>
      <Section heading="Drafts" />
      <Section heading="Confirmed" logged />
    </Frame>
  );
}
