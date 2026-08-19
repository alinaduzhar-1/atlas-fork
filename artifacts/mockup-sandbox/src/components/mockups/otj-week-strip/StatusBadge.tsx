import { c, person, Avatar, Frame } from "./_shared";

export function StatusBadge() {
  return (
    <Frame>
      <div
        className="flex w-full items-center rounded-lg border bg-white"
        style={{
          gap: 12,
          padding: "10px 16px",
          borderColor: c.borderTertiary,
          boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.06)",
        }}
      >
        <Avatar />
        <div className="flex flex-col" style={{ gap: 1 }}>
          <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670, lineHeight: "18px" }}>
            {person.name}
          </span>
          <span className="text-xs" style={{ color: c.textMeta, fontWeight: 570, lineHeight: "16px" }}>
            {person.weekLogged} logged this week
          </span>
        </div>
        <span
          className="ml-auto rounded-full text-xs whitespace-nowrap"
          style={{
            padding: "2px 10px",
            backgroundColor: c.negativeBg,
            color: c.negativeText,
            fontWeight: 670,
          }}
        >
          {person.behind}
        </span>
      </div>
    </Frame>
  );
}
