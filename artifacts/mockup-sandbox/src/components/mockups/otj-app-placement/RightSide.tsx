import { c, entries, CardShell, RightStatus, TotalRow, SectionTag, Frame } from "./_shared";

function Card({ entry, logged }: { entry: (typeof entries)[number]; logged?: boolean }) {
  return (
    <CardShell logged={logged}>
      <div className="flex flex-col" style={{ gap: "4px" }}>
        <div className="flex items-start justify-between" style={{ gap: "12px" }}>
          <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
            {entry.task}
          </span>
          <RightStatus logged={logged} duration={entry.duration} withOtjBadge />
        </div>
        <span className="text-xs" style={{ color: c.textSecondary, fontWeight: 570 }}>
          {entry.category} · {entry.date}
        </span>
      </div>
    </CardShell>
  );
}

function Section({ label, logged }: { label: string; logged?: boolean }) {
  return (
    <div className="flex flex-col" style={{ gap: "8px" }}>
      <SectionTag>{label}</SectionTag>
      {entries.map((entry, i) => (
        <Card key={i} entry={entry} logged={logged} />
      ))}
      <TotalRow logged={logged} />
    </div>
  );
}

export function RightSide() {
  return (
    <Frame>
      <Section label="Draft" />
      <Section label="Confirmed" logged />
    </Frame>
  );
}
