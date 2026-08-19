import { useState } from "react";
import { Layout } from "@/components/layouts";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent,
  Button,
  PersonIcon,
  EmailIcon,
  CogIcon,
  EditIcon
} from "@multiverse-io/stardust-react";

interface InfoFieldProps {
  label: string;
  value: string;
  testId: string;
}

function InfoField({ label, value, testId }: InfoFieldProps) {
  return (
    <div className="flex flex-col" style={{ gap: '4px' }}>
      <p className="text-s font-semibold text-primary leading-normal" data-testid={`label-${testId}`}>
        {label}
      </p>
      <p className="text-m text-primary leading-normal" data-testid={`value-${testId}`}>
        {value}
      </p>
    </div>
  );
}

function PersonalInformationTab() {
  return (
    <div className="flex flex-col w-full" style={{ gap: '32px' }}>
      <div className="flex w-full">
        <div className="flex flex-col flex-1" style={{ gap: '24px' }}>
          <div className="flex flex-col" style={{ gap: '8px', maxWidth: '580px' }}>
            <p className="text-l font-medium text-primary leading-normal" data-testid="title-name">
              Name
            </p>
            <p className="text-m text-secondary leading-normal" data-testid="description-name">
              Your company manages this account. You can view your information below, but to make changes, contact your administrator.
            </p>
          </div>
          <InfoField label="Legal first name" value="Jane" testId="legal-first-name" />
          <InfoField label="Legal last name" value="Doe" testId="legal-last-name" />
        </div>
      </div>

      <div className="bg-separator-primary h-px w-full" />

      <div className="flex w-full justify-between items-start">
        <div className="flex flex-col" style={{ gap: '24px', flex: 1 }}>
          <p className="text-l font-medium text-primary leading-normal" data-testid="title-about">
            About
          </p>
          <InfoField label="Preferred first name" value="Jan" testId="preferred-first-name" />
          <InfoField label="Pronouns" value="–" testId="pronouns" />
        </div>
        <Button variant="secondary" size="small" data-testid="button-edit-about">
          <EditIcon size="small" />
          Edit
        </Button>
      </div>

      <div className="bg-separator-primary h-px w-full" />
    </div>
  );
}

function ContactPreferencesTab() {
  return (
    <div className="flex flex-col w-full" style={{ gap: '32px' }}>
      <div className="flex w-full justify-between items-start">
        <div className="flex flex-col" style={{ gap: '24px', flex: 1 }}>
          <div className="flex flex-col" style={{ gap: '8px', maxWidth: '580px' }}>
            <p className="text-l font-medium text-primary leading-normal" data-testid="title-email-preferences">
              Email preferences
            </p>
            <p className="text-m text-secondary leading-normal" data-testid="description-email-preferences">
              Manage your email notification settings.
            </p>
          </div>
          <InfoField label="Email notifications" value="Enabled" testId="email-notifications" />
          <InfoField label="Marketing emails" value="Disabled" testId="marketing-emails" />
        </div>
        <Button variant="secondary" size="small" data-testid="button-edit-email-preferences">
          <EditIcon size="small" />
          Edit
        </Button>
      </div>

      <div className="bg-separator-primary h-px w-full" />

      <div className="flex w-full justify-between items-start">
        <div className="flex flex-col" style={{ gap: '24px', flex: 1 }}>
          <div className="flex flex-col" style={{ gap: '8px', maxWidth: '580px' }}>
            <p className="text-l font-medium text-primary leading-normal" data-testid="title-communication">
              Communication
            </p>
            <p className="text-m text-secondary leading-normal" data-testid="description-communication">
              How would you like us to contact you?
            </p>
          </div>
          <InfoField label="Preferred contact method" value="Email" testId="contact-method" />
        </div>
        <Button variant="secondary" size="small" data-testid="button-edit-communication">
          <EditIcon size="small" />
          Edit
        </Button>
      </div>
    </div>
  );
}

function AccountSettingsTab() {
  return (
    <div className="flex flex-col w-full" style={{ gap: '32px' }}>
      <div className="flex w-full justify-between items-start">
        <div className="flex flex-col" style={{ gap: '24px', flex: 1 }}>
          <div className="flex flex-col" style={{ gap: '8px', maxWidth: '580px' }}>
            <p className="text-l font-medium text-primary leading-normal" data-testid="title-security">
              Security
            </p>
            <p className="text-m text-secondary leading-normal" data-testid="description-security">
              Manage your account security settings.
            </p>
          </div>
          <InfoField label="Password" value="••••••••" testId="password" />
          <InfoField label="Two-factor authentication" value="Not enabled" testId="two-factor" />
        </div>
        <Button variant="secondary" size="small" data-testid="button-edit-security">
          <EditIcon size="small" />
          Edit
        </Button>
      </div>

      <div className="bg-separator-primary h-px w-full" />

      <div className="flex w-full">
        <div className="flex flex-col" style={{ gap: '24px', flex: 1 }}>
          <div className="flex flex-col" style={{ gap: '8px', maxWidth: '580px' }}>
            <p className="text-l font-medium text-primary leading-normal" data-testid="title-account">
              Account
            </p>
            <p className="text-m text-secondary leading-normal" data-testid="description-account">
              Your account information.
            </p>
          </div>
          <InfoField label="Email" value="jane.doe@company.com" testId="email" />
          <InfoField label="Account created" value="January 15, 2024" testId="account-created" />
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <Layout width="narrow">
      <div className="flex flex-col w-full" style={{ gap: '32px', paddingBottom: '120px' }}>
        <h1 className="text-3xl font-semibold text-primary" data-testid="text-page-title">
          My account
        </h1>

        <div className="settings-tabs">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
            <TabsTrigger value="personal" data-testid="tab-personal">
              <PersonIcon size="small" variant={activeTab === "personal" ? "action" : "secondary"} />
              Personal Information
            </TabsTrigger>
            <TabsTrigger value="contact" data-testid="tab-contact">
              <EmailIcon size="small" variant={activeTab === "contact" ? "action" : "secondary"} />
              Contact preferences
            </TabsTrigger>
            <TabsTrigger value="account" data-testid="tab-account">
              <CogIcon size="small" variant={activeTab === "account" ? "action" : "secondary"} />
              Account Settings
            </TabsTrigger>
          </TabsList>

          <div style={{ paddingTop: '32px' }}>
            <TabsContent value="personal" data-testid="content-personal">
              <PersonalInformationTab />
            </TabsContent>
            <TabsContent value="contact" data-testid="content-contact">
              <ContactPreferencesTab />
            </TabsContent>
            <TabsContent value="account" data-testid="content-account">
              <AccountSettingsTab />
            </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
