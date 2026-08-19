import { Layout } from "@/components/layouts";
import {
  Button,
  Link,
  ExternalLinkIcon,
} from "@multiverse-io/stardust-react";

function SegmentedProgressBar({ 
  completed, 
  total 
}: { 
  completed: number; 
  total: number; 
}) {
  return (
    <div className="flex w-full" style={{ gap: '4px', height: '16px' }}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`flex-1 h-full ${
            index < completed ? 'bg-action' : 'bg-secondary'
          } ${index === 0 ? 'rounded-l-full' : ''} ${
            index === total - 1 ? 'rounded-r-full' : ''
          }`}
          data-testid={`progress-segment-${index}`}
        />
      ))}
    </div>
  );
}

function StatusItem({ 
  label, 
  status 
}: { 
  label: string; 
  status: string; 
}) {
  return (
    <div className="flex items-center" style={{ gap: '8px' }}>
      <span className="text-s font-semibold text-primary" data-testid={`status-label-${label.toLowerCase().replace(' ', '-')}`}>
        {label}
      </span>
      <span className="text-s text-primary" data-testid={`status-value-${label.toLowerCase().replace(' ', '-')}`}>
        {status}
      </span>
    </div>
  );
}

export default function ProgressReviews() {
  const completedQuestions = 0;
  const totalQuestions = 6;

  return (
    <Layout width="narrow">
      <div className="flex flex-col w-full" style={{ gap: '56px', paddingTop: '24px', paddingBottom: '120px' }}>
        <div className="flex flex-col w-full" style={{ gap: '24px' }}>
          <h1 className="text-3xl font-semibold text-primary" data-testid="text-page-title">
            Progress Reviews
          </h1>
          
          <div className="flex flex-col w-full" style={{ gap: '8px' }}>
            <div className="flex items-center justify-between w-full">
              <span className="text-s font-medium text-primary" data-testid="text-apprentice-label">
                Apprentice
              </span>
              <span className="text-s text-primary" data-testid="text-questions-completed">
                <span className="font-medium">{completedQuestions}/{totalQuestions}</span>
                {' '}
                <span>questions completed</span>
              </span>
            </div>
            
            <SegmentedProgressBar completed={completedQuestions} total={totalQuestions} />
          </div>
          
          <div className="w-full h-px bg-separator-primary" />
          
          <div className="flex items-center" style={{ gap: '32px' }}>
            <StatusItem label="Coach" status="Incomplete" />
            <StatusItem label="Line manager" status="Incomplete" />
          </div>
          
          <div className="flex flex-col w-full items-end" style={{ gap: '16px' }}>
            <div className="flex flex-col w-full" style={{ gap: '8px' }}>
              <p className="text-s font-medium text-primary" data-testid="text-next-review-label">
                YOUR NEXT PROGRESS REVIEW
              </p>
              <p className="text-xs text-primary" data-testid="text-next-review-description">
                You should complete and submit your progress review form before your meeting with your coach and line manager. You will be able to edit this form until you submit it.
              </p>
            </div>
            
            <Button 
              variant="primary" 
              data-testid="button-start-review"
            >
              Start
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col w-full" style={{ gap: '8px' }}>
          <p className="text-s font-medium text-primary" data-testid="text-previous-reviews-label">
            PREVIOUS PROGRESS REVIEWS
          </p>
          <div className="flex items-start justify-between w-full" style={{ gap: '8px' }}>
            <p className="flex-1 text-xs text-primary" data-testid="text-previous-reviews-description">
              If you have older progress reviews that aren't on the above list, view them here.
            </p>
            <Link 
              href="#" 
              isExternal 
              className="text-xs flex items-center shrink-0"
              data-testid="link-view-previous"
            >
              View
              <ExternalLinkIcon size="small" variant="action" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
