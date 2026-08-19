import { c, person, Frame } from "./_shared";
import sarahPhoto from "./sarah.png";

const stardust = {
  textPrimary: "hsl(210 3% 13%)",
  textSecondary: "hsl(180 1% 38%)",
  brand100: "hsl(232 92% 95%)",
  brand200: "hsl(233 91% 91%)",
  brand600: "hsl(233 92% 63%)",
  gray100: "hsl(36 12% 92%)",
  yellow50: "hsl(49 100% 92%)",
  yellow100: "hsl(49 100% 78%)",
  yellow200: "hsl(46 100% 64%)",
  yellow700: "hsl(35 58% 28%)",
};

export function ProgressBar() {
  const weekLogged = 2 * 60 + 45;
  const weekRequired = 6 * 60 + 30;
  const pct = Math.round((weekLogged / weekRequired) * 100);
  return (
    <Frame>
      <div
        className="flex w-full items-center border bg-white"
        style={{
          gap: 16,
          padding: "16px 24px",
          borderRadius: 8,
          borderColor: c.borderTertiary,
          boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.08)",
        }}
      >
        <img
          src={sarahPhoto}
          alt="Sarah Mitchell"
          className="rounded-full flex-shrink-0 object-cover"
          style={{
            width: 44,
            height: 44,
            border: `2px solid ${stardust.brand200}`,
          }}
        />

        <span className="text-sm whitespace-nowrap" style={{ color: stardust.textPrimary, fontWeight: 670, minWidth: 110 }}>
          {person.name}
        </span>

        <div className="flex flex-1 flex-col" style={{ gap: 6, minWidth: 160 }}>
          <span className="text-xs" style={{ color: stardust.textSecondary, fontWeight: 570 }}>
            <span style={{ color: stardust.textPrimary, fontWeight: 670 }}>2hr 45min</span> of 6hr 30min this week
          </span>
          <div className="h-1 w-full rounded-full" style={{ backgroundColor: stardust.gray100 }}>
            <div
              className="h-1 rounded-full"
              style={{ width: `${pct}%`, backgroundColor: stardust.brand600 }}
            />
          </div>
        </div>

        <span
          className="rounded-full text-xs whitespace-nowrap flex-shrink-0"
          style={{
            padding: "4px 12px",
            backgroundColor: "hsl(0 85% 95%)",
            color: "hsl(7 62% 37%)",
            fontWeight: 670,
            border: "1px solid hsl(0 75% 88%)",
          }}
        >
          16h behind overall
        </span>
      </div>
    </Frame>
  );
}
