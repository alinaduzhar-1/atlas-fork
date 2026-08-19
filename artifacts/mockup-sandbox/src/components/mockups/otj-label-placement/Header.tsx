import { Clock } from "lucide-react";
import { c, entries, StatusBadge, TotalRow, Frame } from "./_shared";

function Card({ entry, confirmed }: { entry: (typeof entries)[number]; confirmed?: boolean }) {
  return (
    <div
      className="flex w-full items-start justify-between rounded-md border bg-white"
      style={{ gap: "16px", padding: "12px 16px", borderColor: c.borderTertiary }}
    >
      <div className="flex min-w-0 flex-col" style={{ gap: "2px" }}>
        <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
          {entry.task}
        </span>
        <span className="text-xs" style={{ color: c.textSecondary }}>
          {entry.category} · {entry.date} · {entry.duration}
        </span>
      </div>
      <div className="flex flex-shrink-0 items-center" style={{ paddingTop: "2px" }}>
        <StatusBadge confirmed={confirmed} />
      </div>
    </div>
  );
}

function Section({ heading, confirmed }: { heading: string; confirmed?: boolean }) {
  return (
    <div className="flex flex-col" style={{ gap: "8px" }}>
      <div className="flex items-center" style={{ gap: "8px" }}>
        <Clock size={16} style={{ color: c.action }} />
        <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
          {heading}
        </span>
      </div>
      {entries.map((entry, i) => (
        <Card key={i} entry={entry} confirmed={confirmed} />
      ))}
      <TotalRow confirmed={confirmed} />
    </div>
  );
}

export function Header() {
  return (
    <Frame>
      <Section heading="Off-the-Job time — drafts to review" />
      <Section heading="Off-the-Job time — logged" confirmed />
    </Frame>
  );
}
