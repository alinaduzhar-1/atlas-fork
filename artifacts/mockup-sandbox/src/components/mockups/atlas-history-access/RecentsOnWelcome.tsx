import { Header, Welcome, Composer, recentChats } from "./_shared/Panel";
import { ChevronRight } from "lucide-react";

export function RecentsOnWelcome() {
  return (
    <div className="h-screen w-full flex flex-col bg-white" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <Header />
      <Welcome compact />
      <div className="flex flex-col px-4" style={{ gap: 6, marginTop: 20 }}>
        <div className="flex items-center justify-between">
          <span className="font-semibold" style={{ fontSize: 11.5, letterSpacing: "0.24px", color: "#6f7171", textTransform: "uppercase" }}>Recent chats</span>
          <button style={{ fontSize: 12, color: "#4a5ff7" }}>View all</button>
        </div>
        {recentChats.slice(0, 3).map(name => (
          <button key={name} className="flex items-center w-full rounded-lg hover:bg-[#f5f4f2]"
            style={{ gap: 8, padding: "8px 10px", background: "#faf9f7", border: "1px solid #f0efec" }}>
            <span className="flex-1 text-left truncate font-medium" style={{ fontSize: 13, color: "#212223" }}>{name}</span>
            <ChevronRight size={14} color="#9b9d9d" />
          </button>
        ))}
      </div>
      <Composer />
    </div>
  );
}
