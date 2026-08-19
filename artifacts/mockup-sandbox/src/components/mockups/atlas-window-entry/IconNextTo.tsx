import { ArrowUpRight } from "lucide-react";
import { TopBarShell, RightCluster, AskAtlasButton, IconButton } from "./_tb";

export function IconNextTo() {
  return (
    <TopBarShell note="Option A — A dedicated ↗ icon button sits directly to the right of Ask Atlas, matching the chat and notification icon buttons. Quiet, compact, and consistent with the existing icon row. Tooltip: 'Atlas Window'.">
      <RightCluster>
        <div className="flex items-center gap-x-2">
          <AskAtlasButton />
          <IconButton label="Atlas Window">
            <ArrowUpRight size={16} strokeWidth={1.8} color="#1f1e1d" />
          </IconButton>
        </div>
      </RightCluster>
    </TopBarShell>
  );
}
