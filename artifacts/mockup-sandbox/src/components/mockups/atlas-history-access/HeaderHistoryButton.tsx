import { Header, Welcome, Composer, IconBtn, recentChats } from "./_shared/Panel";
import { History } from "lucide-react";

export function HeaderHistoryButton() {
  return (
    <div className="h-screen w-full flex flex-col bg-white relative" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <Header extraButtons={<IconBtn label="History"><History size={15} /></IconBtn>} />
      {/* popover shown open for the mockup, anchored under the history button */}
      <div className="absolute z-10 flex flex-col"
        style={{ top: 52, right: 84, width: 240, padding: 6, borderRadius: 10, background: "#fff",
          border: "0.5px solid #dbdad6", boxShadow: "0px 8px 20px 0px rgba(26,29,35,0.12)" }}>
        <span className="font-semibold px-2 py-1" style={{ fontSize: 11, letterSpacing: "0.24px", color: "#6f7171", textTransform: "uppercase" }}>Recent chats</span>
        {recentChats.map(name => (
          <button key={name} className="flex items-center w-full rounded-md hover:bg-[#f5f4f2] text-left"
            style={{ padding: "8px 8px" }}>
            <span className="truncate font-medium" style={{ fontSize: 13, color: "#212223" }}>{name}</span>
          </button>
        ))}
        <div style={{ height: 1, background: "#ebeae7", margin: "4px 0" }} />
        <button className="flex items-center w-full rounded-md hover:bg-[#f5f4f2]" style={{ gap: 6, padding: "8px 8px" }}>
          <History size={14} color="#6f7171" />
          <span style={{ fontSize: 13, color: "#6f7171", fontWeight: 500 }}>View all history</span>
        </button>
      </div>
      <Welcome />
      <Composer />
    </div>
  );
}
