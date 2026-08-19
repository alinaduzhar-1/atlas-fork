import { Welcome, Composer, IconBtn, recentChats } from "./_shared/Panel";
import { ChevronDown, MoreVertical, X, Plus, History, Check } from "lucide-react";

export function TitleSwitcher() {
  return (
    <div className="h-screen w-full flex flex-col bg-white relative" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="flex items-center justify-between px-3 flex-shrink-0" style={{ height: 56, gap: 8 }}>
        <button className="flex items-center min-w-0 rounded-lg hover:bg-[#f5f4f2]" style={{ gap: 6, padding: "4px 8px", margin: "-4px -8px", background: "#f5f4f2" }}>
          <span className="font-medium truncate" style={{ fontSize: 15, letterSpacing: "0.28px", color: "#212223" }}>New chat</span>
          <ChevronDown size={15} color="#6f7171" style={{ transform: "rotate(180deg)" }} />
        </button>
        <div className="flex items-center flex-shrink-0" style={{ gap: 4 }}>
          <IconBtn label="New chat" filled><Plus size={16} /></IconBtn>
          <IconBtn label="More options"><MoreVertical size={15} /></IconBtn>
          <IconBtn label="Close"><X size={15} /></IconBtn>
        </div>
      </div>
      {/* switcher dropdown shown open */}
      <div className="absolute z-10 flex flex-col"
        style={{ top: 52, left: 12, width: 260, padding: 6, borderRadius: 10, background: "#fff",
          border: "0.5px solid #dbdad6", boxShadow: "0px 8px 20px 0px rgba(26,29,35,0.12)" }}>
        <button className="flex items-center w-full rounded-md" style={{ gap: 8, padding: "8px 8px", background: "#edebe8" }}>
          <span className="flex-1 text-left truncate font-medium" style={{ fontSize: 13, color: "#212223" }}>New chat</span>
          <Check size={14} color="#212223" />
        </button>
        {recentChats.map(name => (
          <button key={name} className="flex items-center w-full rounded-md hover:bg-[#f5f4f2] text-left" style={{ padding: "8px 8px" }}>
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
