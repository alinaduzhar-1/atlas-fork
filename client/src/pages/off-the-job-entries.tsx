import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Layout } from "@/components/layouts";
import { apiRequest } from "@/lib/queryClient";
import type { OtjSummary, OtjEntry, OtjStatus } from "@shared/schema";
import {
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  SortButton,
  type SortDirection,
  SegmentedControl,
  SegmentedControlItem,
  Badge,
  Button,
  TextInput,
  Skeleton,
  toasts,
  ArrowLeftIcon,
  EditIcon,
  BinIcon,
  SearchIcon,
  AlertIcon,
} from "@multiverse-io/stardust-react";

type StatusFilter = "all" | OtjStatus;
type SortKey = "status" | "hours" | "date" | "task" | "category";

const STATUS_BADGE: Record<
  OtjStatus,
  { label: string; purpose: "warning" | "neutral" | "success" }
> = {
  draft: { label: "Draft", purpose: "warning" },
  "non-compliant": { label: "Non-compliant", purpose: "neutral" },
  confirmed: { label: "Confirmed", purpose: "success" },
};

const STATUS_RANK: Record<OtjStatus, number> = {
  draft: 0,
  "non-compliant": 1,
  confirmed: 2,
};

function StatCard({
  label,
  children,
  testId,
}: {
  label: string;
  children: React.ReactNode;
  testId: string;
}) {
  return (
    <div className="flex flex-col" style={{ gap: "8px" }} data-testid={testId}>
      <span className="text-s text-secondary">{label}</span>
      <div className="flex items-baseline text-primary">{children}</div>
    </div>
  );
}

function HoursValue({ minutes }: { minutes: number }) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return (
    <>
      <span className="text-4xl font-medium">{hours}</span>
      <span className="text-xl font-medium text-secondary">h</span>
      <span className="text-4xl font-medium">&nbsp;{mins}</span>
      <span className="text-xl font-medium text-secondary">m</span>
    </>
  );
}

export default function OffTheJobEntries() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>("desc");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    if (status === "draft" || status === "non-compliant" || status === "confirmed") {
      setStatusFilter(status as StatusFilter);
    }
  }, []);

  const { data: summary, isLoading } = useQuery<OtjSummary>({
    queryKey: ["/api/otj"],
  });

  const confirmMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("POST", `/api/otj/${id}/confirm`, undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/otj"] });
      toasts.success("Entry confirmed", "This log has been confirmed.");
    },
    onError: () =>
      toasts.error("Could not confirm", "Something went wrong. Please try again."),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/otj/${id}`, undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/otj"] });
      toasts.success("Entry deleted", "The log has been removed.");
    },
    onError: () =>
      toasts.error("Could not delete", "Something went wrong. Please try again."),
  });

  const counts = summary?.statusCounts;
  const entries = summary?.entries ?? [];

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const visibleEntries = useMemo(() => {
    let rows = entries;
    if (statusFilter !== "all") {
      rows = rows.filter((e) => e.status === statusFilter);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (e) =>
          e.task.toLowerCase().includes(q) ||
          e.categoryLabel.toLowerCase().includes(q),
      );
    }
    if (sortKey) {
      const dir = sortDir === "asc" ? 1 : -1;
      rows = [...rows].sort((a, b) => {
        let cmp = 0;
        switch (sortKey) {
          case "status":
            cmp = STATUS_RANK[a.status] - STATUS_RANK[b.status];
            break;
          case "hours":
            cmp = a.minutesTotal - b.minutesTotal;
            break;
          case "date":
            cmp = a.date.localeCompare(b.date);
            break;
          case "task":
            cmp = a.task.localeCompare(b.task);
            break;
          case "category":
            cmp = a.categoryLabel.localeCompare(b.categoryLabel);
            break;
        }
        return cmp * dir;
      });
    }
    return rows;
  }, [entries, statusFilter, search, sortKey, sortDir]);

  const sortDirFor = (key: SortKey): SortDirection | false =>
    sortKey === key ? sortDir : false;

  const tabs: { value: StatusFilter; label: string; count?: number }[] = [
    { value: "all", label: "All", count: counts?.all },
    { value: "draft", label: "Drafts", count: counts?.draft },
    { value: "non-compliant", label: "Non-compliant", count: counts?.nonCompliant },
    { value: "confirmed", label: "Confirmed", count: counts?.confirmed },
  ];

  return (
    <Layout width="full">
      <div
        className="flex flex-col"
        style={{ gap: "32px", paddingTop: "16px", paddingBottom: "80px" }}
      >
        <button
          type="button"
          onClick={() => navigate("/off-the-job")}
          className="flex items-center text-action text-s font-medium w-fit"
          style={{ gap: "8px" }}
          data-testid="link-back"
        >
          <ArrowLeftIcon size="small" variant="action" />
          Back to off the job
        </button>

        <div
          className="flex flex-wrap"
          style={{ gap: "80px" }}
          data-testid="stats-row"
        >
          {isLoading || !summary ? (
            <>
              <Skeleton className="w-40 h-16" />
              <Skeleton className="w-40 h-16" />
              <Skeleton className="w-40 h-16" />
            </>
          ) : (
            <>
              <StatCard label="Hours completed to date" testId="stat-completed">
                <HoursValue minutes={summary.totalLoggedMinutes} />
              </StatCard>
              <StatCard label="Target hours" testId="stat-target">
                <HoursValue minutes={summary.programmeTargetMinutes} />
              </StatCard>
              <StatCard label="Progress" testId="stat-progress">
                <span className="text-4xl font-medium">
                  {summary.progressPercent}
                </span>
                <span className="text-xl font-medium text-secondary">%</span>
              </StatCard>
            </>
          )}
        </div>

        <div className="flex flex-col" style={{ gap: "8px" }}>
          <h1
            className="text-2xl font-semibold text-primary"
            data-testid="text-page-title"
          >
            All entries
          </h1>
          <p className="text-m text-secondary" data-testid="text-page-description">
            You can see all of the logs you've ever recorded here. Automatic logs
            will also be included here too.
          </p>
        </div>

        <div
          className="flex flex-wrap items-center justify-between"
          style={{ gap: "16px" }}
        >
          <SegmentedControl
            value={statusFilter}
            onValueChange={(v) => v && setStatusFilter(v as StatusFilter)}
            data-testid="segmented-status"
          >
            {tabs.map((tab) => (
              <SegmentedControlItem
                key={tab.value}
                value={tab.value}
                data-testid={`tab-${tab.value}`}
              >
                <span className="flex items-center" style={{ gap: "8px" }}>
                  {tab.label}
                  {typeof tab.count === "number" && (
                    <Badge purpose="neutral" variant="subtle">
                      {tab.count}
                    </Badge>
                  )}
                </span>
              </SegmentedControlItem>
            ))}
          </SegmentedControl>

          <div className="w-[300px] max-w-full form-field-full-width">
            <TextInput
              id="otj-search"
              label="Search entries"
              hideLabel
              type="search"
              placeholder="Search by task or category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              LeftIcon={<SearchIcon size="small" variant="secondary" />}
              data-testid="input-search"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <Table data-testid="table-entries">
            <THead>
              <TR>
                <TH>
                  <span className="flex items-center" style={{ gap: "4px" }}>
                    Status
                    <SortButton
                      direction={sortDirFor("status")}
                      onClick={() => toggleSort("status")}
                      aria-label="Sort by status"
                    />
                  </span>
                </TH>
                <TH>
                  <span className="flex items-center" style={{ gap: "4px" }}>
                    Hours
                    <SortButton
                      direction={sortDirFor("hours")}
                      onClick={() => toggleSort("hours")}
                      aria-label="Sort by hours"
                    />
                  </span>
                </TH>
                <TH>
                  <span className="flex items-center" style={{ gap: "4px" }}>
                    Date completed
                    <SortButton
                      direction={sortDirFor("date")}
                      onClick={() => toggleSort("date")}
                      aria-label="Sort by date"
                    />
                  </span>
                </TH>
                <TH>
                  <span className="flex items-center" style={{ gap: "4px" }}>
                    Task
                    <SortButton
                      direction={sortDirFor("task")}
                      onClick={() => toggleSort("task")}
                      aria-label="Sort by task"
                    />
                  </span>
                </TH>
                <TH>
                  <span className="flex items-center" style={{ gap: "4px" }}>
                    Category
                    <SortButton
                      direction={sortDirFor("category")}
                      onClick={() => toggleSort("category")}
                      aria-label="Sort by category"
                    />
                  </span>
                </TH>
                <TH>
                  <span className="flex items-center justify-end">Actions</span>
                </TH>
              </TR>
            </THead>
            <TBody>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <TR key={i}>
                    {Array.from({ length: 6 }).map((__, j) => (
                      <TD key={j}>
                        <Skeleton className="w-20 h-4" />
                      </TD>
                    ))}
                  </TR>
                ))
              ) : visibleEntries.length === 0 ? (
                <TR>
                  <TD colSpan={6}>
                    <div
                      className="flex items-center justify-center text-secondary text-m"
                      style={{ padding: "48px 0" }}
                      data-testid="empty-state"
                    >
                      No entries match your filters.
                    </div>
                  </TD>
                </TR>
              ) : (
                visibleEntries.map((entry) => (
                  <EntryRow
                    key={entry.id}
                    entry={entry}
                    onConfirm={() => confirmMutation.mutate(entry.id)}
                    onDelete={() => deleteMutation.mutate(entry.id)}
                    isMutating={
                      confirmMutation.isPending || deleteMutation.isPending
                    }
                  />
                ))
              )}
            </TBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}

function EntryRow({
  entry,
  onConfirm,
  onDelete,
  isMutating,
}: {
  entry: OtjEntry;
  onConfirm: () => void;
  onDelete: () => void;
  isMutating: boolean;
}) {
  const badge = STATUS_BADGE[entry.status];
  return (
    <TR data-testid={`row-${entry.id}`}>
      <TD>
        <Badge purpose={badge.purpose} variant="light">
          {badge.label}
        </Badge>
      </TD>
      <TD>
        <span className="text-m text-primary">{entry.hoursLabel}</span>
      </TD>
      <TD>
        <div className="flex flex-col" style={{ gap: "2px" }}>
          <span className="text-m text-primary">{entry.dateLabel}</span>
          {entry.dateWarning && (
            <span
              className="flex items-center text-xs text-negative"
              style={{ gap: "4px" }}
            >
              <AlertIcon size="small" variant="negative" />
              {entry.dateWarning}
            </span>
          )}
        </div>
      </TD>
      <TD>
        <span className="text-m text-primary">{entry.task}</span>
      </TD>
      <TD>
        <span className="text-m text-primary">{entry.categoryLabel}</span>
      </TD>
      <TD>
        <div
          className="flex items-center justify-end"
          style={{ gap: "8px" }}
        >
          {entry.status === "draft" && (
            <Button
              variant="primary"
              size="small"
              onClick={onConfirm}
              disabled={isMutating}
              data-testid={`button-confirm-${entry.id}`}
            >
              Confirm
            </Button>
          )}
          <Button
            variant="text"
            size="small"
            onClick={() =>
              toasts.info(
                "Edit from Off the job",
                "You can edit your entries from the Off the job page.",
              )
            }
            aria-label="Edit entry"
            data-testid={`button-edit-${entry.id}`}
          >
            <EditIcon size="small" variant="secondary" />
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={onDelete}
            disabled={isMutating}
            aria-label="Delete entry"
            data-testid={`button-delete-${entry.id}`}
          >
            <BinIcon size="small" variant="secondary" />
          </Button>
        </div>
      </TD>
    </TR>
  );
}
