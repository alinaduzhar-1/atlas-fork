import { Layout } from "@/components/layouts";
import { 
  Badge,
  ClockIcon,
  CheckCircleIcon,
  SyncIcon,
} from "@multiverse-io/stardust-react";
import { Link } from "wouter";
import ShaderCanvas from "@/components/butterfly/ShaderCanvas";
import type { ShaderParams } from "@/components/butterfly/shaders";

type ProjectStatus = "awaiting_review" | "in_progress" | "needs_more_work" | "complete" | "reflect_on_feedback" | "not_started";

type Project = {
  id: number;
  title: string;
  description: string;
  status: ProjectStatus;
};

const PROJECT_SHADER_PRESETS: ShaderParams[] = [
  {
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
  },
  {
    intensity: 0.5,
    symmetry: 1.0,
    noiseScale: 1.5,
    noiseSpeed: 30,
    animate: true,
    grainAmount: 0.08,
    flowAngle: 90,
    curveDistortion: 0.45,
    depthIntensity: 0.35,
    highlightStrength: 0.25,
    foldScale: 0.5,
    colorCount: 4,
    colors: [
      [0.91, 0.91, 0.82],
      [0.78, 0.83, 0.63],
      [0.94, 0.93, 0.88],
      [0.63, 0.66, 0.38],
    ],
  },
  {
    intensity: 0.6,
    symmetry: 1.0,
    noiseScale: 1.8,
    noiseSpeed: 35,
    animate: true,
    grainAmount: 0.08,
    flowAngle: 60,
    curveDistortion: 0.5,
    depthIntensity: 0.4,
    highlightStrength: 0.3,
    foldScale: 0.55,
    colorCount: 4,
    colors: [
      [0.94, 0.63, 0.20],
      [0.90, 0.55, 0.15],
      [0.96, 0.72, 0.30],
      [0.85, 0.50, 0.12],
    ],
  },
  {
    intensity: 0.6,
    symmetry: 1.0,
    noiseScale: 2.0,
    noiseSpeed: 35,
    animate: true,
    grainAmount: 0.08,
    flowAngle: 150,
    curveDistortion: 0.55,
    depthIntensity: 0.45,
    highlightStrength: 0.35,
    foldScale: 0.55,
    colorCount: 4,
    colors: [
      [0.60, 0.20, 0.55],
      [0.70, 0.30, 0.65],
      [0.80, 0.40, 0.75],
      [0.55, 0.15, 0.50],
    ],
  },
  {
    intensity: 0.5,
    symmetry: 1.0,
    noiseScale: 1.6,
    noiseSpeed: 30,
    animate: true,
    grainAmount: 0.08,
    flowAngle: 75,
    curveDistortion: 0.45,
    depthIntensity: 0.35,
    highlightStrength: 0.25,
    foldScale: 0.5,
    colorCount: 4,
    colors: [
      [0.45, 0.75, 0.20],
      [0.55, 0.82, 0.30],
      [0.65, 0.88, 0.40],
      [0.40, 0.70, 0.15],
    ],
  },
  {
    intensity: 0.5,
    symmetry: 1.0,
    noiseScale: 1.8,
    noiseSpeed: 25,
    animate: true,
    grainAmount: 0.08,
    flowAngle: 200,
    curveDistortion: 0.4,
    depthIntensity: 0.35,
    highlightStrength: 0.25,
    foldScale: 0.5,
    colorCount: 4,
    colors: [
      [0.18, 0.22, 0.28],
      [0.25, 0.30, 0.38],
      [0.30, 0.35, 0.45],
      [0.15, 0.18, 0.25],
    ],
  },
  {
    intensity: 0.6,
    symmetry: 1.0,
    noiseScale: 2.0,
    noiseSpeed: 35,
    animate: true,
    grainAmount: 0.08,
    flowAngle: 45,
    curveDistortion: 0.5,
    depthIntensity: 0.4,
    highlightStrength: 0.3,
    foldScale: 0.55,
    colorCount: 4,
    colors: [
      [0.15, 0.50, 0.70],
      [0.20, 0.60, 0.80],
      [0.25, 0.68, 0.88],
      [0.12, 0.45, 0.65],
    ],
  },
  {
    intensity: 0.6,
    symmetry: 1.0,
    noiseScale: 1.8,
    noiseSpeed: 30,
    animate: true,
    grainAmount: 0.08,
    flowAngle: 180,
    curveDistortion: 0.5,
    depthIntensity: 0.4,
    highlightStrength: 0.3,
    foldScale: 0.55,
    colorCount: 4,
    colors: [
      [0.92, 0.60, 0.15],
      [0.88, 0.50, 0.10],
      [0.95, 0.70, 0.25],
      [0.85, 0.45, 0.08],
    ],
  },
];

const projects: Project[] = [
  {
    id: 1,
    title: "Applying Data Architecture and Data Ethics in Exploratory Analysis",
    description: "Architect robust data solutions that integrate SQL, AI, and enterprise principles while maintaining ethical standards.",
    status: "not_started",
  },
  {
    id: 2,
    title: "Data Analytics Foundation: From Tools to Implementation",
    description: "Master fundamental data analysis techniques using BI tools and Python for business insights.",
    status: "in_progress",
  },
  {
    id: 3,
    title: "Data Quality and Governance Excellence Through Modern Tools",
    description: "Implement robust data quality frameworks and governance policies across organizations.",
    status: "needs_more_work",
  },
  {
    id: 4,
    title: "Strategic Data Storytelling: Stakeholder-Driven Visual Intelligence",
    description: "Transform complex data into compelling visual narratives.",
    status: "complete",
  },
  {
    id: 5,
    title: "Unified Data Architecture: Building Business Intelligence Connections",
    description: "Design and implement integrated data systems that connect various business intelligence components.",
    status: "reflect_on_feedback",
  },
  {
    id: 6,
    title: "Statistical Intelligence and Hypothesis Testing for Business Decisions",
    description: "Apply statistical methods and hypothesis testing to drive data-informed decisions.",
    status: "not_started",
  },
  {
    id: 7,
    title: "Predictive Time Series Analytics Through Machine Learning Models",
    description: "Develop time series forecasting models using machine learning techniques for business prediction.",
    status: "not_started",
  },
  {
    id: 8,
    title: "Machine Learning Foundations and Advanced Clustering Applications",
    description: "Build a strong foundation in machine learning principles and clustering techniques.",
    status: "not_started",
  },
];

function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  switch (status) {
    case "awaiting_review":
      return (
        <Badge purpose="info" variant="subtle" data-testid="badge-awaiting-review">
          <ClockIcon size="small" />
          Awaiting review
        </Badge>
      );
    case "in_progress":
      return (
        <Badge purpose="info" variant="light" data-testid="badge-in-progress">
          <SyncIcon size="small" />
          In progress
        </Badge>
      );
    case "needs_more_work":
      return (
        <Badge purpose="brand" variant="heavy" data-testid="badge-needs-more-work">
          <SyncIcon size="small" className="stroke-white" />
          Needs more work
        </Badge>
      );
    case "complete":
      return (
        <Badge purpose="success" variant="subtle" data-testid="badge-complete">
          <CheckCircleIcon size="small" />
          Complete
        </Badge>
      );
    case "reflect_on_feedback":
      return (
        <Badge purpose="brand" variant="heavy" data-testid="badge-reflect-on-feedback">
          <SyncIcon size="small" className="stroke-white" />
          Reflect on feedback
        </Badge>
      );
    case "not_started":
    default:
      return null;
  }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const shaderParams = PROJECT_SHADER_PRESETS[index % PROJECT_SHADER_PRESETS.length];

  const cardContent = (
    <div
      className={`bg-primary rounded-lg shadow-card p-3 flex flex-col gap-2 w-[330px] min-h-[231px] ${(project.id === 1 || project.id === 2 || project.id === 3) ? 'cursor-pointer hover:shadow-button-hover transition-shadow' : ''}`}
      data-testid={`card-project-${project.id}`}
    >
      <div className="flex items-start justify-between">
        <div className="w-[56px] h-[56px] rounded-lg overflow-hidden flex-shrink-0">
          <ShaderCanvas params={shaderParams} />
        </div>
        <ProjectStatusBadge status={project.status} />
      </div>
      
      <div className="flex flex-col gap-0.5">
        <h3 
          className="text-m font-semibold text-primary leading-normal"
          data-testid={`text-project-title-${project.id}`}
        >
          {project.title}
        </h3>
        <p 
          className="text-s text-secondary leading-normal"
          data-testid={`text-project-description-${project.id}`}
        >
          {project.description}
        </p>
      </div>
    </div>
  );

  if (project.id === 1 || project.id === 2 || project.id === 3) {
    return (
      <Link href={`/projects/${project.id}`} data-testid={`link-project-${project.id}`}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export default function Projects() {
  return (
    <Layout width="full">
      <div className="flex flex-col gap-3">
        <h1 
          className="text-3xl font-semibold text-primary"
          data-testid="text-page-title"
        >
          Projects
        </h1>
        
        <div 
          className="flex flex-wrap gap-2"
          data-testid="container-projects-grid"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
