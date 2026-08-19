import { Layout } from "@/components/layouts";
import {
  Button,
  Badge,
  ArrowRightIcon,
  PlayIcon,
  SyncIcon,
} from "@multiverse-io/stardust-react";
import { Link, useRoute } from "wouter";
import ShaderCanvas from "@/components/butterfly/ShaderCanvas";
import type { ShaderParams } from "@/components/butterfly/shaders";
import { useAtlasVersion } from "@/components/atlas-version-context";
import atlasIcon from "@/assets/atlas-icon.svg";

const marketingColors = {
  eclipse: "#ddfc9d",
} as const;

type ProjectStatus =
  | "not_started"
  | "in_progress"
  | "needs_more_work"
  | "reflect_on_feedback"
  | "awaiting_review"
  | "complete";

type ProjectRecord = {
  id: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  shader: ShaderParams;
};

const DEEP_PURPLE_SHADER: ShaderParams = {
  intensity: 0.6,
  symmetry: 1.0,
  noiseScale: 2.0,
  noiseSpeed: 30,
  animate: true,
  grainAmount: 0.08,
  flowAngle: 120,
  curveDistortion: 0.5,
  depthIntensity: 0.4,
  highlightStrength: 0.3,
  foldScale: 0.5,
  colorCount: 4,
  colors: [
    [0.15, 0.10, 0.45],
    [0.25, 0.18, 0.60],
    [0.35, 0.25, 0.70],
    [0.20, 0.15, 0.55],
  ],
};

const VIOLET_BARS_SHADER: ShaderParams = {
  intensity: 0.65,
  symmetry: 1.0,
  noiseScale: 2.2,
  noiseSpeed: 30,
  animate: true,
  grainAmount: 0.08,
  flowAngle: 90,
  curveDistortion: 0.55,
  depthIntensity: 0.4,
  highlightStrength: 0.3,
  foldScale: 0.55,
  colorCount: 4,
  colors: [
    [0.60, 0.20, 0.55],
    [0.70, 0.30, 0.65],
    [0.80, 0.40, 0.75],
    [0.55, 0.15, 0.50],
  ],
};

const PROJECTS: Record<string, ProjectRecord> = {
  "1": {
    id: "1",
    title: "Applying Data Architecture and Data Ethics in Exploratory Analysis",
    subtitle:
      "This project focused on condensing large texts to capture the most important and relevant information.",
    status: "not_started",
    shader: DEEP_PURPLE_SHADER,
  },
  "2": {
    id: "2",
    title: "Data Analytics Foundation: From Tools to Implementation",
    subtitle:
      "Master fundamental data analysis techniques using BI tools and Python for business insights.",
    status: "in_progress",
    shader: VIOLET_BARS_SHADER,
  },
  "3": {
    id: "3",
    title: "AI-A Week 1 | Project Discovery and Proposal",
    subtitle:
      "Identify high-impact tasks, build your first automation, and design a pilot project ready for next week's build.",
    status: "needs_more_work",
    shader: VIOLET_BARS_SHADER,
  },
};

const IN_PROGRESS_STATUSES: ProjectStatus[] = [
  "in_progress",
  "needs_more_work",
  "reflect_on_feedback",
  "awaiting_review",
  "complete",
];

function ProjectCover({ shader }: { shader: ShaderParams }) {
  return (
    <div
      className="w-[80px] h-[80px] rounded-lg overflow-hidden flex-shrink-0"
      data-testid="project-cover"
    >
      <ShaderCanvas params={shader} />
    </div>
  );
}

function StartProjectBanner({
  projectId,
  size = "full",
}: {
  projectId: string;
  size?: "full" | "compact";
}) {
  const isCompact = size === "compact";
  const titleClass = isCompact ? "text-m" : "text-l";
  const subtitleClass = isCompact ? "text-xs" : "text-s";
  const svgSize = isCompact ? "w-[88px] h-[96px]" : "w-[104px] h-[112px]";
  const textPaddingRight = isCompact ? "pr-[80px]" : "pr-[96px]";

  return (
    <div
      className="bg-action rounded-lg overflow-hidden relative w-full p-3"
      data-testid="banner-start-project"
    >
      <div className="relative flex flex-col gap-2">
        <svg
          viewBox="0 0 120 131"
          fill="none"
          className={`absolute -top-2 -right-2 ${svgSize} pointer-events-none`}
          style={{ transform: "rotate(11deg)" }}
          aria-hidden
        >
          <rect x="20" y="10" width="80" height="60" rx="8" fill="white" stroke="black" strokeWidth="2" />
          <rect x="30" y="70" width="60" height="50" rx="6" fill="white" stroke="black" strokeWidth="2" />
          <circle cx="85" cy="35" r="15" fill="#4a5ff7" stroke="black" strokeWidth="2" />
          <rect x="40" y="45" width="30" height="20" rx="4" fill={marketingColors.eclipse} stroke="black" strokeWidth="2" />
        </svg>
        <div className={`${textPaddingRight} relative`}>
          <p
            className={`${titleClass} font-medium text-white leading-tight`}
            data-testid="text-banner-title"
          >
            Start project now
          </p>
          <p
            className={`${subtitleClass} text-white mt-1 leading-tight`}
            data-testid="text-banner-subtitle"
          >
            Demonstrate your learning through applied projects
          </p>
        </div>
        <Link href={`/projects/${projectId}/submission`} className="relative inline-block w-fit">
          <Button
            variant="secondary"
            size="small"
            className="px-6"
            data-testid="button-start-project"
          >
            Start project
            <ArrowRightIcon size="small" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function StatusSidebarCard({ projectId, status, inline = false }: { projectId: string; status: ProjectStatus; inline?: boolean }) {
  type StatusVisual = {
    label: string;
    description: string;
    badgeVariant: "light" | "subtle" | "heavy";
    badgePurpose: "brand" | "info";
    messageTinted: boolean;
  };

  const statusInfo: Record<ProjectStatus, StatusVisual> = {
    not_started: {
      label: "Not started",
      description: "You haven't started this project yet.",
      badgeVariant: "light",
      badgePurpose: "brand",
      messageTinted: false,
    },
    in_progress: {
      label: "In progress",
      description: "Keep going, you're almost ready to submit your project!",
      badgeVariant: "light",
      badgePurpose: "info",
      messageTinted: false,
    },
    needs_more_work: {
      label: "Needs more work",
      description: "Your project needs more work in order to be completed.",
      badgeVariant: "heavy",
      badgePurpose: "brand",
      messageTinted: false,
    },
    reflect_on_feedback: {
      label: "Reflect on feedback",
      description: "Review your coach's feedback and update your submission.",
      badgeVariant: "light",
      badgePurpose: "brand",
      messageTinted: true,
    },
    awaiting_review: {
      label: "Awaiting review",
      description: "Your coach is reviewing your submission.",
      badgeVariant: "light",
      badgePurpose: "brand",
      messageTinted: true,
    },
    complete: {
      label: "Complete",
      description: "This project has been marked complete.",
      badgeVariant: "light",
      badgePurpose: "brand",
      messageTinted: false,
    },
  };

  const info = statusInfo[status];

  return (
    <div
      className="bg-primary rounded-lg shadow-card border border-separator-primary p-3 flex flex-col gap-2"
      data-testid="card-status-sidebar"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-m font-semibold text-primary">Status</p>
        <Badge purpose={info.badgePurpose} variant={info.badgeVariant} data-testid="badge-project-status">
          <SyncIcon
            size="small"
            className={info.badgeVariant === "heavy" ? "stroke-white" : undefined}
          />
          {info.label}
        </Badge>
      </div>
      <p
        className={
          info.messageTinted
            ? "text-s text-primary leading-normal bg-blue-100 border border-blue-300 rounded-base p-2"
            : "text-s text-secondary leading-normal"
        }
      >
        {info.description}
      </p>
      <Link href={`/projects/${projectId}/submission`} className="block w-full">
        <Button
          variant="secondary"
          size="small"
          className="w-full"
          data-testid="button-continue-project"
        >
          Continue project
          <ArrowRightIcon size="small" />
        </Button>
      </Link>
    </div>
  );
}

function AtlasHelpCard() {
  const { setAtlasVisible } = useAtlasVersion();

  return (
    <div
      className="bg-secondary rounded-lg p-3 flex items-start gap-3"
      data-testid="card-atlas-help"
    >
      <div className="flex-1">
        <p className="text-l font-semibold text-primary">
          Need some help getting <span className="bg-[#ddfc9d] px-0.5">started</span>?
        </p>
        <p className="text-m text-secondary mt-1 leading-normal">
          Have a quick conversation with me, and I'll help you come up with some project ideas.
        </p>
        <Button
          variant="primary"
          size="small"
          className="mt-2"
          onClick={() => setAtlasVisible(true)}
          data-testid="button-atlas-help-start"
        >
          Start conversation with Atlas
          <ArrowRightIcon size="small" />
        </Button>
      </div>
      <img
        src={atlasIcon}
        alt=""
        className="w-[56px] h-[56px] flex-shrink-0"
      />
    </div>
  );
}

function VideoSection({ title }: { title: string }) {
  return (
    <div
      className="rounded-lg overflow-hidden border border-separator-primary bg-inverse-primary relative aspect-video"
      data-testid="section-video"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #2d4a3e 0%, #3d5a4e 50%, #2d4a3e 100%)",
        }}
      />
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <p className="text-s text-white font-medium">
          {title} - 11 February 2026
        </p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80px] h-[80px] rounded-full bg-white/90 flex items-center justify-center shadow-card">
          <PlayIcon size="medium" variant="primary" />
        </div>
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 text-white text-s rounded-md px-2 py-1 flex items-center gap-2">
        <span>1×</span>
        <span>1 min 17 sec</span>
      </div>
    </div>
  );
}

function CurriculumSections() {
  const tasks: { label: string; title: string; bullets: string[] }[] = [
    {
      label: "Task 1",
      title: "Frame your problem space",
      bullets: [
        "Identify a workflow problem in your role that's worth solving. Capture the pain points, the people affected, and the impact on your team or organisation.",
      ],
    },
    {
      label: "Task 2",
      title: "Draft your first project idea",
      bullets: [
        "Turn your problem statement into an initial project idea. Outline the approach, the data or systems involved, and the outcome you're aiming for.",
      ],
    },
    {
      label: "Task 3",
      title: "Get AI feedback on your draft",
      bullets: [
        "Run your draft idea through Atlas and review the feedback. Use it to clarify your scope, sharpen your solution approach, and strengthen your impact statement. Review this feedback carefully before your live session—it will serve as the foundation for your Lab discussion.",
      ],
    },
    {
      label: "Lab session",
      title: "Pressure test your idea",
      bullets: [
        "Bring your Task 3 draft and AI feedback to the live Lab session. Work with your coach and peers to validate your project idea, identify potential blockers, and refine your scope for maximum impact.",
      ],
    },
    {
      label: "Task 4",
      title: "Submit your final idea",
      bullets: [
        "Submit your refined proposal after the Lab session. Incorporate all feedback—from your coach, peers, and the AI—and complete a final check to confirm your project is Viable, Impactful, Simple, and Achievable (VISA). This becomes your build-ready plan for the coming week.",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-3" data-testid="container-curriculum">
      {tasks.map((task) => (
        <div key={task.label} className="flex flex-col gap-1">
          <p className="text-l font-semibold text-primary leading-normal">
            <span className="bg-[#ddfc9d] px-0.5">{task.label}:</span> {task.title}
          </p>
          <ul className="list-disc pl-3 space-y-1">
            {task.bullets.map((b, i) => (
              <li key={i} className="text-m text-primary leading-normal">
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ReadyToBeginRow({ projectId }: { projectId: string }) {
  return (
    <div
      className="grid grid-cols-2 gap-4 items-center pt-4 border-t border-separator-primary"
      data-testid="row-ready-to-begin"
    >
      <div>
        <p className="text-l font-semibold text-primary">Ready to Begin?</p>
        <p className="text-m text-secondary mt-1 leading-normal">
          Click <span className="font-semibold text-primary">"Start Project"</span> to
          read the detailed instructions for each task.
        </p>
      </div>
      <StartProjectBanner projectId={projectId} />
    </div>
  );
}

function DescriptionSection() {
  return (
    <div className="space-y-3" data-testid="container-description">
      <p className="text-m text-primary leading-normal">
        In Module 1, you will be designing, building, and creating a strategic business
        case for an AI agent. This project will allow the opportunity for you to showcase
        the full story: the workflow problem you are setting out to solve, your comparison
        of on-premise, cloud, and third-party options, your live working agent, and the
        strategic value it brings to your organisation.
      </p>
      <p className="text-m text-primary leading-normal">
        You'll bring together the work you are doing throughout this module and talk
        through it with The Assessor (our AI Independent Assessor) for 10–15 minutes.
      </p>
    </div>
  );
}

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const projectId = params?.id || "1";
  const project = PROJECTS[projectId] ?? PROJECTS["1"];
  const { prototypeMode } = useAtlasVersion();

  const isInProgress = IN_PROGRESS_STATUSES.includes(project.status);
  const showAtlasHelp = !isInProgress && prototypeMode === "after";
  const showCompactBanner = !isInProgress && prototypeMode === "before";
  const showInlineBanner = !isInProgress && prototypeMode === "after";
  const showReadyToBegin = !isInProgress;
  const showVideo = isInProgress;
  const showStatusCard = isInProgress && prototypeMode === "before";
  const showInlineStatus = isInProgress && prototypeMode === "after";

  return (
    <Layout width="default">
      <div className="flex flex-col gap-3 pl-6">
        <div className="relative w-[560px]">
          <div className="flex flex-col gap-4 w-[560px]">
            <ProjectCover shader={project.shader} />

            <div className="flex flex-col gap-1">
              <h1
                className="text-3xl font-semibold text-primary leading-tight"
                data-testid="text-project-title"
              >
                {project.title}
              </h1>
              <p
                className="text-l text-secondary leading-normal"
                data-testid="text-project-subtitle"
              >
                {project.subtitle}
              </p>
            </div>

            {showInlineBanner && (
              <StartProjectBanner projectId={projectId} size="full" />
            )}

            {showInlineStatus && (
              <StatusSidebarCard projectId={projectId} status={project.status} inline />
            )}

            {showVideo && <VideoSection title={project.title} />}

            <DescriptionSection />

            {!isInProgress && <CurriculumSections />}

            {showReadyToBegin && <ReadyToBeginRow projectId={projectId} />}
          </div>

          <aside className="absolute top-0 left-[576px] w-[256px] flex flex-col gap-3">
            {showCompactBanner && (
              <StartProjectBanner projectId={projectId} size="compact" />
            )}
            {showStatusCard && (
              <StatusSidebarCard projectId={projectId} status={project.status} />
            )}
          </aside>
        </div>
      </div>
    </Layout>
  );
}
