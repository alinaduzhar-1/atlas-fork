import { useState } from "react";
import { Layout } from "@/components/layouts";
import { 
  Button,
  Link,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  PersonIcon,
  UsersIcon,
  VideoIcon,
  DotsIcon,
  ArrowUpRightIcon,
} from "@multiverse-io/stardust-react";

interface Session {
  id: number;
  title: string;
  month: string;
  day: number;
  timeRange: string;
  type: string;
  hostName: string;
  attendeeCount: number;
  isLive?: boolean;
}

const upcomingSessions: Session[] = [
  {
    id: 1,
    title: "Flying Start",
    month: "FEB",
    day: 15,
    timeRange: "12:00 pm - 3:00 pm GMT",
    type: "Delivery session",
    hostName: "Oliver Patel",
    attendeeCount: 50,
    isLive: true,
  },
  {
    id: 2,
    title: "Flying start",
    month: "FEB",
    day: 15,
    timeRange: "12:00 pm - 3:00 pm GMT",
    type: "Delivery session",
    hostName: "Oliver Patel",
    attendeeCount: 50,
  },
  {
    id: 3,
    title: "Flying start",
    month: "FEB",
    day: 10,
    timeRange: "12:00 pm - 3:00 pm GMT",
    type: "Delivery session",
    hostName: "Oliver Patel",
    attendeeCount: 50,
  },
  {
    id: 4,
    title: "Module 1: Introduction to AI",
    month: "FEB",
    day: 7,
    timeRange: "12:00 pm - 3:00 pm GMT",
    type: "Delivery session",
    hostName: "Oliver Patel",
    attendeeCount: 50,
  },
  {
    id: 5,
    title: "Flying start",
    month: "FEB",
    day: 3,
    timeRange: "12:00 pm - 3:00 pm GMT",
    type: "Delivery session",
    hostName: "Oliver Patel",
    attendeeCount: 50,
  },
];

const pastSessions: Session[] = [
  {
    id: 101,
    title: "Onboarding Session",
    month: "JAN",
    day: 15,
    timeRange: "10:00 am - 11:30 am GMT",
    type: "Delivery session",
    hostName: "Emma Wilson",
    attendeeCount: 45,
  },
  {
    id: 102,
    title: "Welcome Call",
    month: "JAN",
    day: 10,
    timeRange: "2:00 pm - 3:00 pm GMT",
    type: "Delivery session",
    hostName: "James Brown",
    attendeeCount: 60,
  },
];

function SessionCard({ session }: { session: Session }) {
  return (
    <div
      className="bg-primary flex items-start justify-between rounded-lg overflow-hidden"
      style={{
        border: session.isLive ? '1px solid #4a5ff7' : '0.5px solid #dbdad6',
        boxShadow: session.isLive 
          ? '0px 0px 1px 0px rgba(0,0,0,0.24), 0px 4px 8px 0px rgba(0,0,0,0.08)' 
          : '0px 0px 1px 0px rgba(0,0,0,0.24), 0px 4px 8px 0px rgba(0,0,0,0.08)',
        padding: '12px'
      }}
      data-testid={`card-session-${session.id}`}
    >
      <div className="flex items-start" style={{ gap: '12px' }}>
        <div 
          className="flex flex-col items-center justify-center rounded-base flex-shrink-0"
          style={{
            width: '64px',
            height: '76px',
            backgroundColor: session.isLive ? '#f5f7ff' : '#f8f7f3',
            border: session.isLive ? '1px solid #f2f8fe' : '1px solid #f8f7f3'
          }}
        >
          {session.isLive ? (
            <div 
              className="flex items-center rounded-base"
              style={{
                backgroundColor: '#f5f7ff',
                padding: '4px 8px',
                gap: '8px'
              }}
            >
              <VideoIcon size="small" variant="action" />
              <span className="text-xs font-semibold text-action">Live</span>
            </div>
          ) : (
            <>
              <span className="text-m text-action">{session.month}</span>
              <span className="text-3xl font-semibold text-primary">{session.day}</span>
            </>
          )}
        </div>

        <div className="flex flex-col" style={{ gap: '16px' }}>
          <div className="flex flex-col" style={{ gap: '8px' }}>
            <p className="text-m font-semibold text-primary">{session.title}</p>
            <p className="text-s text-secondary">{session.timeRange}</p>
          </div>

          <div className="flex items-center" style={{ gap: '12px' }}>
            <div className="flex items-center" style={{ gap: '4px' }}>
              <PersonIcon size="small" variant="secondary" />
              <span className="text-xs text-secondary">{session.type}</span>
            </div>
            
            <div 
              className="rounded-full flex-shrink-0"
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: '#6f7171'
              }}
            />
            
            <div className="flex items-center" style={{ gap: '4px' }}>
              <PersonIcon size="small" variant="secondary" />
              <span className="text-xs text-secondary">
                Hosted by <span className="font-semibold">{session.hostName}</span>
              </span>
            </div>
            
            <div 
              className="rounded-full flex-shrink-0"
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: '#6f7171'
              }}
            />
            
            <div className="flex items-center" style={{ gap: '4px' }}>
              <UsersIcon size="small" variant="secondary" />
              <span className="text-xs text-secondary">{session.attendeeCount} attending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center" style={{ gap: '8px' }}>
        {session.isLive && (
          <Button variant="primary" size="small" data-testid={`button-join-${session.id}`}>
            Join session
          </Button>
        )}
        <Button 
          variant="secondary" 
          size="small"
          iconPosition="center"
          Icon={<DotsIcon size="small" />}
          aria-label="More options"
          data-testid={`button-more-${session.id}`}
        />
      </div>
    </div>
  );
}

export default function MySessions() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <Layout width="narrow">
      <div className="space-y-3">
        <div className="flex flex-col" style={{ gap: '8px' }}>
          <h1 className="text-3xl font-semibold text-primary" data-testid="text-page-title">
            My live sessions
          </h1>
          <div className="flex items-center" style={{ gap: '8px' }}>
            <span className="text-m text-secondary">Missing a session?</span>
            <Link href="#" isExternal className="flex items-center" style={{ gap: '8px' }}>
              Visit support
              <ArrowUpRightIcon size="medium" />
            </Link>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="upcoming" data-testid="tab-upcoming">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past" data-testid="tab-past">
              Past
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="flex flex-col" style={{ gap: '8px', paddingTop: '24px' }}>
              {upcomingSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="flex flex-col" style={{ gap: '8px', paddingTop: '24px' }}>
              {pastSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
