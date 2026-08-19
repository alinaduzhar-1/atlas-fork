import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layouts";
import type { OtjSummary } from "@shared/schema";
import { 
  Button,
  ChevronRightIcon,
} from "@multiverse-io/stardust-react";
import ShaderCanvas from "@/components/butterfly/ShaderCanvas";
import { WeekProgressStrip } from "@/components/week-progress-strip";
import { useAtlasVersion } from "@/components/atlas-version-context";
import type { ShaderParams } from "@/components/butterfly/shaders";

const THUMBNAIL_SHADER_1: ShaderParams = {
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

const THUMBNAIL_SHADER_2: ShaderParams = {
  intensity: 0.7,
  symmetry: 1.0,
  noiseScale: 2.0,
  noiseSpeed: 40,
  animate: true,
  grainAmount: 0.08,
  flowAngle: 45,
  curveDistortion: 0.6,
  depthIntensity: 0.5,
  highlightStrength: 0.4,
  foldScale: 0.6,
  colorCount: 4,
  colors: [
    [0.77, 0.82, 0.19],
    [0.66, 0.72, 0.16],
    [0.85, 0.88, 0.28],
    [0.55, 0.55, 0.16],
  ],
};

function HomeSection({ 
  title, 
  children, 
  rightButtons,
}: { 
  title: string; 
  children: React.ReactNode; 
  rightButtons?: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-primary" data-testid="text-section-title">{title}</h2>
        <div className="flex items-center" style={{ gap: '8px' }}>
          {rightButtons}
        </div>
      </div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const { prototypeTab } = useAtlasVersion();
  const { data: otj } = useQuery<OtjSummary>({ queryKey: ['/api/otj'] });

  const weeklyLoggedLabel = otj?.weeklyLoggedLabel ?? '—';
  const weeklyRequiredLabel = otj?.weeklyRequiredLabel ?? '—';
  const weeklyPercent = otj?.weeklyPercent ?? 0;
  const totalLoggedLabel = otj?.totalLoggedLabel ?? '—';
  const expectedToDateLabel = otj?.expectedToDateLabel ?? '—';
  const behindLabel = otj?.behindLabel ?? '';
  const isBehind = otj?.isBehind ?? false;

  const cardStyle = {
    border: '1px solid #edebe8',
    boxShadow: 'none',
    backgroundColor: undefined,
    borderRadius: undefined,
  };

  return (
    <Layout width="narrow">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <p className={"text-s font-medium text-secondary"} data-testid={"text-greeting"}>
          Hi Sarah!
        </p>

        <HomeSection
          title="OTJ progress this week"
          rightButtons={
            <Link href="/learning" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="small">
                Log more time
                <ChevronRightIcon size="small" />
              </Button>
            </Link>
          }
        >
          {prototypeTab === 'drafts' ? (
            <WeekProgressStrip summary={otj} />
          ) : (
          <div
            className="bg-primary rounded-lg overflow-hidden"
            style={{ ...cardStyle, padding: '16px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div style={{ borderBottom: '1px solid #edebe8', paddingBottom: '12px', marginBottom: '12px' }}>
                  <p className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }}>
                    Logged learning this week
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="flex items-center" style={{ gap: '8px' }}>
                    <div style={{ flex: 1, position: 'relative', height: '4px', borderRadius: '999px', backgroundColor: '#edebe8' }}>
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '4px',
                        width: `${weeklyPercent}%`,
                        borderRadius: '999px',
                        backgroundColor: '#4a5ff7',
                      }} />
                    </div>
                    <p className="text-s text-primary" style={{ letterSpacing: '0.28px', lineHeight: '1.25', whiteSpace: 'nowrap' }} data-testid="text-weekly-percent">
                      {weeklyPercent}%
                    </p>
                  </div>

                  <div className="flex items-start justify-between">
                    <p className="text-s text-secondary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }} data-testid="text-weekly-logged">
                      {weeklyLoggedLabel}
                    </p>
                    <p className="text-s text-secondary" style={{ letterSpacing: '0.28px', lineHeight: '1.25', textAlign: 'right' }}>
                      {weeklyRequiredLabel}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center" style={{ gap: '40px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p className="text-s text-secondary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }}>
                    All time logged
                  </p>
                  <div className="flex items-start" style={{ gap: '16px' }}>
                    <p className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px', lineHeight: '1.25', whiteSpace: 'nowrap' }} data-testid="text-total-logged">
                      {totalLoggedLabel}
                    </p>
                    {isBehind && (
                      <div className="flex items-center" style={{ gap: '4px' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 4V12" stroke="#c94030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5 9L8 12L11 9" stroke="#c94030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-s" style={{ color: '#c94030', letterSpacing: '0.28px', lineHeight: '1.25', whiteSpace: 'nowrap' }} data-testid="text-behind">
                          Behind {behindLabel}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ width: '1px', alignSelf: 'stretch', backgroundColor: '#edebe8' }} />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
                  <p className="text-s text-secondary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }}>
                    Expected to date
                  </p>
                  <p className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }} data-testid="text-expected">
                    {expectedToDateLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
          )}
        </HomeSection>

        <HomeSection
          title="Continue learning"
          rightButtons={
            <Link href="/learning" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="small">
                Your programme
                <ChevronRightIcon size="small" />
              </Button>
            </Link>
          }
        >
          <div
            className="bg-primary rounded-lg overflow-hidden"
            style={cardStyle}
          >
            <div
              className="flex items-center justify-between"
              style={{ padding: '16px', borderBottom: '1px solid #edebe8' }}
            >
              <div className="flex items-center" style={{ gap: '12px' }}>
                {(
                  <div className="rounded-lg flex items-center justify-center flex-shrink-0" style={{ width: '40px', height: '40px', backgroundColor: '#e0e7ff' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="2" width="7" height="7" rx="1" fill="#818cf8" opacity="0.6"/>
                      <rect x="11" y="2" width="7" height="7" rx="1" fill="#818cf8"/>
                      <rect x="2" y="11" width="7" height="7" rx="1" fill="#818cf8"/>
                      <rect x="11" y="11" width="7" height="7" rx="1" fill="#818cf8" opacity="0.6"/>
                    </svg>
                  </div>
                )}
                <div>
                  <p className="text-s font-medium text-primary">Data-Driven Decision Making</p>
                  <p className="text-xs text-secondary">Independent learning</p>
                </div>
              </div>
              <div className="flex items-center" style={{ gap: '8px' }}>
                <span className="text-s" style={{ letterSpacing: '0.28px', lineHeight: '1.25', whiteSpace: 'nowrap', color: undefined}}>{<span className="text-action">In progress</span>}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" stroke="#edebe8" strokeWidth="2" fill="none" />
                  <circle cx="12" cy="12" r="8" stroke={'#4a5ff7'} strokeWidth="2" fill="none"
                    strokeDasharray={`${0.4 * 2 * Math.PI * 8} ${2 * Math.PI * 8}`}
                    strokeLinecap="round"
                    transform="rotate(-90 12 12)"
                  />
                </svg>
              </div>
            </div>
            <div
              className="flex items-center justify-between"
              style={{ padding: '16px' }}
            >
              <div className="flex items-center" style={{ gap: '12px' }}>
                {(
                  <div className="rounded-lg flex items-center justify-center flex-shrink-0" style={{ width: '40px', height: '40px', backgroundColor: '#fef3c7' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 17L10 3L17 17H3Z" fill="#f59e0b" opacity="0.3"/>
                      <path d="M5 15L10 5L15 15H5Z" fill="#f59e0b" opacity="0.6"/>
                      <line x1="3" y1="17" x2="17" y2="17" stroke="#f59e0b" strokeWidth="1.5"/>
                      <line x1="5" y1="13" x2="15" y2="13" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>
                    </svg>
                  </div>
                )}
                <div>
                  <p className="text-s font-medium text-primary">Data analysis: from tools to implementation</p>
                  <p className="text-xs text-secondary">Project</p>
                </div>
              </div>
              <div className="flex items-center" style={{ gap: '8px' }}>
                <span className="text-s" style={{ letterSpacing: '0.28px', lineHeight: '1.25', whiteSpace: 'nowrap', color: undefined}}>{<span className="text-action">In progress</span>}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" stroke="#edebe8" strokeWidth="2" fill="none" />
                  <circle cx="12" cy="12" r="8" stroke={'#4a5ff7'} strokeWidth="2" fill="none"
                    strokeDasharray={`${0.1 * 2 * Math.PI * 8} ${2 * Math.PI * 8}`}
                    strokeLinecap="round"
                    transform="rotate(-90 12 12)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </HomeSection>

        <HomeSection
          title="Upcoming live sessions"
          rightButtons={
            <Link href="/my-sessions" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="small">
                Your sessions
                <ChevronRightIcon size="small" />
              </Button>
            </Link>
          }
        >
          <div
            className="bg-primary rounded-lg overflow-hidden"
            style={cardStyle}
          >
            <div
              className="flex items-center"
              style={{ padding: '16px', borderBottom: '1px solid #edebe8' }}
            >
              <div className="flex items-center" style={{ flex: 1, gap: '16px' }}>
                <div 
                  className={'flex flex-col items-center justify-center flex-shrink-0 rounded-lg'}
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#f5f7ff',
                    border: '1px solid #edebe8',
                    borderRadius: undefined,
                  }}
                >
                  <span className="font-semibold" style={{ fontSize: '12px', lineHeight: '1.25', letterSpacing: '0.24px', color: '#4a5ff7'}}>APR</span>
                  <span className="font-semibold" style={{ fontSize: '16px', lineHeight: '1.25', letterSpacing: '0.32px', color: '#00254c'}}>9</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }}>
                    Navigating data accuracy and quality in a digital world
                  </p>
                  <div className="flex items-center" style={{ gap: '8px' }}>
                    <span className="text-s text-secondary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }}>9:30 – 12:30</span>
                    <span style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: '#6f7171', flexShrink: 0 }} />
                    <span className="text-s text-secondary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }}>Group coaching</span>
                    <span style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: '#6f7171', flexShrink: 0 }} />
                    <div className="flex items-center" style={{ gap: '4px' }}>
                      <span className="text-s text-secondary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }}>Host</span>
                      <div 
                        className="flex items-center justify-center rounded-full flex-shrink-0"
                        style={{ width: '24px', height: '24px', backgroundColor: '#e9d5ff' }}
                      >
                        <span style={{ fontSize: '10px', fontWeight: 670, color: 'rgba(0,0,0,0.72)', letterSpacing: '0.2px', textTransform: 'uppercase' }}>MT</span>
                      </div>
                      <span className="text-s text-secondary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }}>Marcus Thompson</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex items-center"
              style={{ padding: '16px' }}
            >
              <div className="flex items-center" style={{ flex: 1, gap: '16px' }}>
                <div 
                  className={'flex flex-col items-center justify-center flex-shrink-0 rounded-lg'}
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#f5f7ff',
                    border: '1px solid #edebe8',
                    borderRadius: undefined,
                  }}
                >
                  <span className="font-semibold" style={{ fontSize: '12px', lineHeight: '1.25', letterSpacing: '0.24px', color: '#4a5ff7'}}>APR</span>
                  <span className="font-semibold" style={{ fontSize: '16px', lineHeight: '1.25', letterSpacing: '0.32px', color: '#00254c'}}>21</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p className="text-s font-medium text-primary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }}>
                    Delivering change in a digital world
                  </p>
                  <div className="flex items-center" style={{ gap: '8px' }}>
                    <span className="text-s text-secondary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }}>9:30 – 12:30</span>
                    <span style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: '#6f7171', flexShrink: 0 }} />
                    <span className="text-s text-secondary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }}>Group coaching</span>
                    <span style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: '#6f7171', flexShrink: 0 }} />
                    <div className="flex items-center" style={{ gap: '4px' }}>
                      <span className="text-s text-secondary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }}>Host</span>
                      <div 
                        className="flex items-center justify-center rounded-full flex-shrink-0"
                        style={{ width: '24px', height: '24px', backgroundColor: '#fecdd3' }}
                      >
                        <span style={{ fontSize: '10px', fontWeight: 670, color: 'rgba(0,0,0,0.72)', letterSpacing: '0.2px', textTransform: 'uppercase' }}>MR</span>
                      </div>
                      <span className="text-s text-secondary" style={{ letterSpacing: '0.28px', lineHeight: '1.25' }}>Maria Rosas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HomeSection>

        <HomeSection
          title="Tasks"
        >
          <div
            className="bg-primary rounded-lg overflow-hidden"
            style={cardStyle}
          >
            <div
              className="flex items-center justify-between"
              style={{ padding: '16px', borderBottom: '1px solid #edebe8' }}
            >
              <div>
                <p className="text-s font-medium text-primary">Submit your "Data analysis" project</p>
                <p className="text-xs text-secondary">15 min</p>
              </div>
              <div 
                className="flex items-center rounded-base flex-shrink-0"
                style={{
                  backgroundColor: '#fff7d4',
                  padding: '4px 8px',
                }}
              >
                <span className="text-xs font-semibold" style={{ color: '#2e1f0d' }}>Due 9th Apr</span>
              </div>
            </div>

            <div
              className="flex items-center justify-between"
              style={{ padding: '16px' }}
            >
              <div>
                <p className="text-s font-medium text-primary">Log your off-the-job hours</p>
                <p className="text-xs text-secondary">You're 16 hours behind</p>
              </div>
              <div 
                className="flex items-center rounded-base flex-shrink-0"
                style={{
                  backgroundColor: '#fff7d4',
                  padding: '4px 8px',
                }}
              >
                <span className="text-xs font-semibold" style={{ color: '#2e1f0d' }}>Overdue</span>
              </div>
            </div>
          </div>
        </HomeSection>
      </div>
    </Layout>
  );
}
