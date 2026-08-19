import { Layout } from "@/components/layouts";
import {
  Button,
  Badge,
  CardButton,
  EyeIcon,
  CheckCircleIcon,
  CircleIcon,
} from "@multiverse-io/stardust-react";

interface Project {
  id: string;
  title: string;
  status: "complete" | "not_started";
  coverColor: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Data Analytics Foundation: From Tools to Implementation",
    status: "complete",
    coverColor: "bg-action",
  },
  {
    id: "2",
    title: "Data Quality and Governance Excellence Through Modern Tools",
    status: "complete",
    coverColor: "bg-[#FBB348]",
  },
  {
    id: "3",
    title: "Data Quality and Governance Excellence Through Modern Tools",
    status: "not_started",
    coverColor: "bg-[#8423FF]",
  },
  {
    id: "4",
    title: "Unified Data Architecture: Building Business Intelligence Connections",
    status: "not_started",
    coverColor: "bg-[#393B3C]",
  },
  {
    id: "5",
    title: "Applying Data Architecture and Data Ethics in Exploratory Analysis",
    status: "not_started",
    coverColor: "bg-[#2B326D]",
  },
  {
    id: "6",
    title: "Statistical Intelligence and Hypothesis Testing for Business Decisions",
    status: "not_started",
    coverColor: "bg-secondary",
  },
  {
    id: "7",
    title: "Predictive Time Series Analytics Through Machine Learning Models",
    status: "not_started",
    coverColor: "bg-action",
  },
  {
    id: "8",
    title: "Machine Learning Foundations and Advanced Clustering Applications",
    status: "not_started",
    coverColor: "bg-[#FBB348]",
  },
];

function StepIndicator({ 
  step, 
  isActive, 
  label 
}: { 
  step: number; 
  isActive: boolean; 
  label: string;
}) {
  return (
    <div className="flex flex-col items-center" style={{ gap: '8px' }}>
      <div 
        className={`flex items-center justify-center rounded-full text-xs font-semibold ${
          isActive 
            ? 'bg-action text-white' 
            : 'bg-white border border-separator-primary text-secondary'
        }`}
        style={{ width: '24px', height: '24px' }}
        data-testid={`step-indicator-${step}`}
      >
        {step}
      </div>
      <span 
        className={`text-s font-semibold ${isActive ? 'text-primary' : 'text-secondary'}`}
        data-testid={`step-label-${step}`}
      >
        {label}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isComplete = project.status === "complete";
  
  return (
    <CardButton 
      className="w-full"
      data-testid={`project-card-${project.id}`}
    >
      <div 
        className="flex items-center w-full"
        style={{ gap: '4px', paddingRight: '24px' }}
      >
        <div className="flex items-center flex-1" style={{ gap: '24px', padding: '4px' }}>
          <div 
            className={`${project.coverColor} rounded-lg overflow-hidden shrink-0`}
            style={{ width: '80px', height: '80px' }}
          />
          <p className="text-m font-semibold text-primary flex-1">
            {project.title}
          </p>
        </div>
        
        {isComplete ? (
          <Badge purpose="success" variant="subtle">
            <CheckCircleIcon size="small" variant="success" />
            Complete
          </Badge>
        ) : (
          <Badge purpose="neutral" variant="subtle">
            <CircleIcon size="small" />
            Not started
          </Badge>
        )}
      </div>
    </CardButton>
  );
}

export default function Portfolio() {
  const completedProjects = projects.filter(p => p.status === "complete").length;
  const totalProjects = projects.length;

  return (
    <Layout width="narrow">
      <div className="flex flex-col w-full" style={{ gap: '40px', paddingBottom: '120px' }}>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-semibold text-primary" data-testid="text-page-title">
            Data Fellowship Portfolio
          </h1>
          <Button variant="secondary" size="small" data-testid="button-preview-portfolio">
            Preview portfolio
            <EyeIcon size="small" variant="action" />
          </Button>
        </div>

        <div 
          className="flex flex-col w-full bg-primary border border-separator-primary rounded-lg relative overflow-hidden"
          data-testid="progress-tracker"
        >
          <div 
            className="bg-inverse-primary w-full"
            style={{ padding: '8px 16px' }}
          >
            <p 
              className="text-s font-semibold text-white"
              data-testid="text-progress-header"
            >
              End point assessment progress
            </p>
          </div>
          
          <div className="flex w-full" style={{ gap: '16px', padding: '16px' }}>
            <div className="flex" style={{ width: '240px', gap: '12px' }}>
              <div className="flex-shrink-0" style={{ paddingTop: '2px' }}>
                <StepIndicator step={1} isActive={true} label="" />
              </div>
              <div className="flex flex-col" style={{ gap: '8px' }}>
                <div className="flex flex-col" style={{ gap: '4px' }}>
                  <p className="text-s font-semibold text-primary" data-testid="text-step-1-title">
                    Complete projects, introduction and conclusion
                  </p>
                  <p className="text-xs text-secondary" data-testid="text-step-1-description">
                    We'll auto-generate your portfolio for you - focus on completing your projects to finish your portfolio!
                  </p>
                </div>
                
                <div 
                  className="bg-[#F5F7FF] rounded-lg"
                  style={{ padding: '8px' }}
                >
                  <p className="text-xs text-primary" data-testid="text-projects-completed">
                    <span className="font-bold text-action">{completedProjects}</span> of {totalProjects}
                  </p>
                  <p className="text-xs text-primary">projects completed</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-1" style={{ gap: '16px' }}>
              <div className="flex-1 flex" style={{ gap: '8px' }}>
                <div className="flex-shrink-0" style={{ paddingTop: '2px' }}>
                  <StepIndicator step={2} isActive={false} label="" />
                </div>
                <p className="text-s font-semibold text-secondary" data-testid="text-step-2">
                  Download & edit portfolio
                </p>
              </div>
              <div className="flex-1 flex" style={{ gap: '8px' }}>
                <div className="flex-shrink-0" style={{ paddingTop: '2px' }}>
                  <StepIndicator step={3} isActive={false} label="" />
                </div>
                <p className="text-s font-semibold text-secondary" data-testid="text-step-3">
                  Submit final portfolio
                </p>
              </div>
              <div className="flex-1 flex" style={{ gap: '8px' }}>
                <div className="flex-shrink-0" style={{ paddingTop: '2px' }}>
                  <StepIndicator step={4} isActive={false} label="" />
                </div>
                <p className="text-s font-semibold text-secondary" data-testid="text-step-4">
                  End point assessment
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full" style={{ gap: '40px' }}>
          <div className="flex flex-col" style={{ gap: '8px' }}>
            <h2 className="text-xl font-semibold text-primary" data-testid="text-introduction-title">
              Introduction
            </h2>
            <p className="text-l text-secondary opacity-80" data-testid="text-introduction-placeholder">
              Click here to add your introduction...
            </p>
          </div>

          <div className="flex flex-col w-full" style={{ gap: '8px' }}>
            <div className="flex flex-col w-full" style={{ gap: '16px' }}>
              <h2 className="text-xl font-semibold text-primary" data-testid="text-projects-title">
                Projects
              </h2>
              <p className="text-m text-secondary" data-testid="text-projects-description">
                Focus on gradually completing your projects to see your portfolio progress!
              </p>
            </div>
            
            <div className="flex flex-col w-full" style={{ gap: '16px' }}>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          <div className="flex flex-col opacity-80" style={{ gap: '8px', paddingBottom: '96px' }}>
            <h2 className="text-xl font-semibold text-primary" data-testid="text-conclusion-title">
              Conclusion
            </h2>
            <p className="text-l text-secondary" data-testid="text-conclusion-placeholder">
              Click here to add your conclusion...
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
