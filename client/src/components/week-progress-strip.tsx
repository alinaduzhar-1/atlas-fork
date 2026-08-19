import type { OtjSummary } from "@shared/schema";
import sarahPhoto from "@/assets/sarah.png";

function stripDuration(totalMinutes: number): string {
  const h = Math.floor(Math.max(0, totalMinutes) / 60);
  const m = Math.max(0, totalMinutes) % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}hr`;
  return `${h}hr ${m}min`;
}

export function WeekProgressStrip({ summary }: { summary?: OtjSummary }) {
  const weeklyLogged = summary?.weeklyLoggedMinutes ?? 0;
  const weeklyRequired = summary?.weeklyRequiredMinutes ?? 0;
  const pct = Math.min(100, summary?.weeklyPercent ?? 0);
  const behindMinutes = summary?.behindMinutes ?? 0;
  const behindHours = Math.round(behindMinutes / 60);

  return (
    <div
      className="flex w-full items-center rounded-lg border border-separator-primary bg-primary"
      style={{ gap: "16px", padding: "16px 24px", boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.08)" }}
      data-testid="strip-week-progress"
    >
      <img
        src={sarahPhoto}
        alt="Sarah Mitchell"
        className="rounded-full flex-shrink-0 object-cover"
        style={{ width: "44px", height: "44px", border: "2px solid hsl(233 91% 91%)" }}
        data-testid="img-strip-avatar"
      />
      <span className="text-m font-semibold text-primary whitespace-nowrap" data-testid="text-strip-name">
        Sarah Mitchell
      </span>
      <div className="flex flex-1 flex-col" style={{ gap: "6px", minWidth: "160px" }}>
        <span className="text-s text-secondary" data-testid="text-strip-week-hours">
          <span className="font-semibold text-primary">{stripDuration(weeklyLogged)}</span>
          {" "}of {stripDuration(weeklyRequired)} this week
        </span>
        <div className="w-full h-[4px] bg-secondary rounded-full overflow-hidden">
          <div
            className="h-[4px] bg-action rounded-full"
            style={{ width: `${pct}%` }}
            data-testid="bar-strip-progress"
          />
        </div>
      </div>
      {behindMinutes > 0 && (
        <span
          className="rounded-full text-s font-semibold text-negative bg-negative whitespace-nowrap flex-shrink-0"
          style={{ padding: "4px 12px", border: "1px solid hsl(0 75% 88%)" }}
          data-testid="badge-strip-behind"
        >
          {behindHours}h behind overall
        </span>
      )}
    </div>
  );
}
