import { c, person, Avatar, Frame } from "./_shared";

export function Minimal() {
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
        <span className="text-sm" style={{ color: c.textPrimary, fontWeight: 670 }}>
          {person.name}
        </span>
        <span className="text-sm" style={{ color: c.textSecondary, fontWeight: 570 }}>
          Logged {person.weekLogged} this week
        </span>
        <span className="ml-auto text-sm" style={{ color: c.negativeText, fontWeight: 670 }}>
          {person.behind}
        </span>
      </div>
    </Frame>
  );
}
