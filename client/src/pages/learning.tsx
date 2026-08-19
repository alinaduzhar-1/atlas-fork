import { Layout } from "@/components/layouts";
import { 
  Button, 
  Progress,
  EyeIcon,
  ClockIcon,
  CalendarIcon,
} from "@multiverse-io/stardust-react";
import { Link } from "wouter";
import ShaderCanvas from "@/components/butterfly/ShaderCanvas";
import type { ShaderParams } from "@/components/butterfly/shaders";

const UNIT_THUMBNAIL_PRESET: ShaderParams = {
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
};

function UnitThumbnail({ size = 48 }: { size?: number }) {
  return (
    <div 
      className="rounded-lg flex-shrink-0 overflow-hidden"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <ShaderCanvas params={UNIT_THUMBNAIL_PRESET} />
    </div>
  );
}

const modules = [
  {
    id: 1,
    number: 2,
    title: "Foundations of Data Management",
    dueDate: "14 March 2025",
    unitsCompleted: 2,
    unitsTotal: 3,
    units: [
      {
        id: 1,
        title: "Navigating Data and Governance Policy",
        duration: "1 hr 30 min",
      },
      {
        id: 2,
        title: "Ensuring Data Accuracy and Quality in a BI tool",
        duration: "30 min",
      },
      {
        id: 3,
        title: "Ensuring Data Accuracy and Quality in Python",
        duration: "1 hr",
      },
    ],
  },
];

export default function Learning() {
  return (
    <Layout width="narrow">
      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
            <ShaderCanvas params={UNIT_THUMBNAIL_PRESET} />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-primary" data-testid="text-page-title">
            Data Fellowship
          </h1>
        </div>

        <div className="space-y-1">
          <p className="text-m font-semibold text-primary" data-testid="text-progress-label">
            Completed 1 of 8 projects
          </p>
          <p className="text-s text-secondary" data-testid="text-progress-message">
            Keep going with your learning - you're doing great!
          </p>
          <Progress 
            label="" 
            variant="primary" 
            value={13} 
            type="simple"
            data-testid="progress-bar"
          />
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-primary" data-testid="text-modules-heading">
              Modules
            </h2>
            <Button 
              variant="secondary" 
              size="small"
              data-testid="button-show-completed"
            >
              <EyeIcon size="small" />
              Show completed modules
            </Button>
          </div>

          <div className="bg-secondary rounded-lg p-3 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon size="small" variant="secondary" />
              <span className="text-s text-primary" data-testid="text-sessions-banner">
                View your live sessions for these modules
              </span>
            </div>
            <Link href="/my-sessions">
              <Button variant="secondary" size="small" data-testid="button-view-sessions">
                View sessions
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {modules.map((module) => (
              <div 
                key={module.id} 
                className="bg-secondary rounded-lg p-1 pb-0.5"
                data-testid={`card-module-${module.id}`}
              >
                <div className="p-2 flex items-center justify-between">
                  <h3 className="text-m font-medium text-primary" data-testid={`text-module-title-${module.id}`}>
                    Module {module.number} · {module.title}
                  </h3>
                  <div className="flex items-center gap-1 text-s text-primary">
                    <span data-testid={`text-module-due-${module.id}`}>Complete project by: {module.dueDate}</span>
                    <ClockIcon size="small" />
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="bg-primary border border-separator-primary rounded-md overflow-hidden shadow-card">
                    <div className="px-2 py-2 flex items-center justify-between border-b border-separator-primary">
                      <span className="text-s font-medium text-secondary">Units</span>
                      <span className="text-s text-secondary">{module.unitsCompleted}/{module.unitsTotal}</span>
                    </div>
                    
                    <div className="divide-y divide-separator-primary">
                      {module.units.map((unit) => (
                        <Link 
                          key={unit.id} 
                          href={`/learning/unit/${unit.id}`}
                        >
                          <div 
                            className="px-2 py-2 flex items-center gap-2 hover:bg-secondary transition-colors cursor-pointer"
                            data-testid={`card-unit-${unit.id}`}
                          >
                            <UnitThumbnail size={48} />
                            <div className="flex-1 min-w-0">
                              <p className="text-s font-medium text-primary" data-testid={`text-unit-title-${unit.id}`}>
                                {unit.title}
                              </p>
                              <p className="text-s text-secondary" data-testid={`text-unit-duration-${unit.id}`}>
                                {unit.duration}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
