import { Check, Clock, Stamp } from "lucide-react";

const c = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 44%)",
  brandBlue: "#4a5ff7",
  successGreen: "hsl(156 68% 30%)",
  borderLight: "#e5e7eb",
  bgLight: "#f9fafb",
  stampGreen: "rgba(5, 150, 105, 0.15)",
};

const entries = [
  {
    category: "Study",
    task: "Data modelling module — independent study",
    date: "Monday, 6 July 2026",
    duration: "2 hrs",
    durationValue: "2",
    durationUnit: "hrs",
  },
  {
    category: "Mentoring",
    task: "Mentoring session with line manager",
    date: "Tuesday, 7 July 2026",
    duration: "45 min",
    durationValue: "45",
    durationUnit: "min",
  },
];

function TicketDraft({ entry }: { entry: (typeof entries)[number] }) {
  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-4"
      style={{
        border: `2px dashed ${c.borderLight}`,
      }}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 rotate-12 text-6xl font-bold opacity-[0.03]"
        style={{ color: c.textPrimary }}
      >
        PENDING
      </div>
      
      <div className="flex flex-col gap-1">
        <span
          className="w-fit rounded bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          style={{ color: c.textSecondary }}
        >
          {entry.category}
        </span>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-black leading-none tracking-tight" style={{ color: c.textPrimary }}>
            {entry.durationValue}
          </span>
          <span className="text-sm font-semibold" style={{ color: c.textSecondary }}>
            {entry.durationUnit}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-0.5">
        <span className="line-clamp-2 text-xs font-medium leading-tight" style={{ color: c.textPrimary }}>
          {entry.task}
        </span>
        <span className="text-[10px]" style={{ color: c.textSecondary }}>
          {entry.date}
        </span>
      </div>
    </div>
  );
}

function TicketLogged({ entry }: { entry: (typeof entries)[number] }) {
  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-4 shadow-sm"
      style={{
        border: `1px solid ${c.borderLight}`,
        borderLeft: `4px solid ${c.successGreen}`,
      }}
    >
      <div
        className="pointer-events-none absolute -right-2 top-2 -rotate-12 rounded border-2 border-green-600/30 px-2 py-0.5 text-xs font-black tracking-widest text-green-600/30"
      >
        LOGGED
      </div>

      <div className="flex flex-col gap-1">
        <span
          className="w-fit rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: c.bgLight, color: c.textSecondary }}
        >
          {entry.category}
        </span>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-black leading-none tracking-tight" style={{ color: c.successGreen }}>
            {entry.durationValue}
          </span>
          <span className="text-sm font-semibold" style={{ color: c.textSecondary }}>
            {entry.durationUnit}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-0.5">
        <span className="line-clamp-2 text-xs font-medium leading-tight" style={{ color: c.textPrimary }}>
          {entry.task}
        </span>
        <span className="text-[10px]" style={{ color: c.textSecondary }}>
          {entry.date}
        </span>
      </div>
    </div>
  );
}

function DraftPunchCard() {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: c.textSecondary }}>
        Draft
      </span>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          {entries.map((entry, i) => (
            <TicketDraft key={i} entry={entry} />
          ))}
        </div>
        
        <div
          className="flex items-center justify-between rounded-xl px-5 py-4"
          style={{ border: `2px dashed ${c.borderLight}`, backgroundColor: c.bgLight }}
        >
          <div className="flex flex-col">
            <span className="text-sm font-medium" style={{ color: c.textSecondary }}>
              Pending total
            </span>
            <p className="mt-1 text-xs" style={{ color: c.textSecondary }}>
              Review your time above. Reply to confirm.
            </p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black" style={{ color: c.textPrimary }}>
              2<span className="text-sm font-semibold text-gray-500">h</span> 45<span className="text-sm font-semibold text-gray-500">m</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoggedPunchCard() {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: c.textSecondary }}>
        Logged
      </span>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          {entries.map((entry, i) => (
            <TicketLogged key={i} entry={entry} />
          ))}
        </div>
        
        <div
          className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm"
          style={{ border: `1px solid ${c.borderLight}` }}
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ backgroundColor: "rgba(5, 150, 105, 0.04)" }}>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                <Check size={18} strokeWidth={3} />
              </div>
              <span className="text-sm font-bold" style={{ color: c.textPrimary }}>
                Total hours logged
              </span>
            </div>
            <div className="flex items-baseline gap-1 text-green-700">
              <span className="text-2xl font-black">2</span>
              <span className="text-sm font-bold">hrs</span>
              <span className="text-2xl font-black">45</span>
              <span className="text-sm font-bold">min</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t px-5 py-3" style={{ borderColor: c.borderLight, backgroundColor: c.bgLight }}>
            <span className="text-xs font-medium" style={{ color: c.textSecondary }}>
              Weekly Target: 6 hrs 30 min
            </span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-green-500" style={{ width: "65%" }} />
              </div>
              <span className="text-xs font-bold" style={{ color: c.textPrimary }}>
                4h 15m
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PunchCard() {
  return (
    <div className="flex min-h-screen justify-center bg-white p-8">
      <div className="flex w-[440px] flex-col gap-10">
        <DraftPunchCard />
        <LoggedPunchCard />
      </div>
    </div>
  );
}
