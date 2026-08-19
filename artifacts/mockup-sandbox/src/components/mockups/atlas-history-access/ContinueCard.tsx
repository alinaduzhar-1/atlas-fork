import { Header, Welcome, Composer, recentChats } from "./_shared/Panel";
import { X } from "lucide-react";

export function ContinueCard() {
  const card = (
    <div className="rounded-xl" style={{ border: "1px solid #ebeae7", background: "#faf9f7", padding: "10px 12px" }}>
      <div className="flex items-center justify-between">
        <span className="font-semibold" style={{ fontSize: 11.5, letterSpacing: "0.24px", color: "#6f7171", textTransform: "uppercase" }}>Continue where you left off</span>
        <X size={13} color="#9b9d9d" />
      </div>
      <div className="flex flex-col" style={{ gap: 2, marginTop: 6 }}>
        {recentChats.slice(0, 2).map((name, i) => (
          <button key={name} className="flex items-center justify-between w-full rounded-md hover:bg-[#f0efec] text-left" style={{ padding: "6px 6px", gap: 8 }}>
            <span className="truncate font-medium" style={{ fontSize: 13, color: "#212223" }}>{name}</span>
            <span className="flex-shrink-0" style={{ fontSize: 11.5, color: "#9b9d9d" }}>{i === 0 ? "2h ago" : "Yesterday"}</span>
          </button>
        ))}
      </div>
      <button style={{ fontSize: 12, color: "#4a5ff7", marginTop: 6, paddingLeft: 6 }}>View all history</button>
    </div>
  );
  return (
    <div className="h-screen w-full flex flex-col bg-white" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <Header />
      <Welcome />
      <Composer above={card} />
    </div>
  );
}
