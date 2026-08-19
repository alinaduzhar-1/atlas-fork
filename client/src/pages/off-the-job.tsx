import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Layout } from "@/components/layouts";
import type { OtjSummary } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import {
  Button,
  Badge,
  Checkbox,
  Textarea,
  TextInput,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Link,
  toasts,
} from "@multiverse-io/stardust-react";

function ProgressLegendItem({ 
  color, 
  label, 
  value 
}: { 
  color: "action" | "info"; 
  label: string; 
  value: string;
}) {
  return (
    <div className="flex items-center gap-[4px]">
      <div className="size-4 flex items-center justify-center">
        <div 
          className={`size-2 rounded-full ${
            color === "action" ? "bg-action" : "bg-[#DEEDFD]"
          }`}
          style={{ 
            boxShadow: "0 0 0 1.5px white" 
          }}
        />
      </div>
      <span className="text-xs font-semibold text-secondary">{label}</span>
      <span className="text-xs text-secondary">{value}</span>
    </div>
  );
}

function compactDuration(totalMinutes: number): string {
  const h = Math.floor(Math.max(0, totalMinutes) / 60);
  const m = Math.max(0, totalMinutes) % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export default function OffTheJob() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { data: summary } = useQuery<OtjSummary>({ queryKey: ["/api/otj"] });

  const behindMinutes = summary?.behindMinutes ?? 0;
  const behindHours = Math.floor(behindMinutes / 60);
  const behindMins = behindMinutes % 60;
  const weeklyLoggedMinutes = summary?.weeklyLoggedMinutes ?? 0;
  const weeklyRequiredMinutes = summary?.weeklyRequiredMinutes ?? 0;
  const weeklyPercent = summary?.weeklyPercent ?? 0;

  const handleSubmit = async () => {
    const parsedHours = parseInt(hours, 10) || 0;
    const parsedMinutes = parseInt(minutes, 10) || 0;

    if (!task.trim()) {
      toasts.warning("Add a task", "Describe what you did before saving.");
      return;
    }
    if (!category) {
      toasts.warning("Choose a category", "Select a category for this entry.");
      return;
    }
    if (parsedHours === 0 && parsedMinutes === 0) {
      toasts.warning("Add a duration", "Enter at least some hours or minutes.");
      return;
    }
    if (!confirmed) {
      toasts.warning("Confirmation needed", "Please confirm you completed this during working hours.");
      return;
    }

    setSaving(true);
    try {
      await apiRequest("POST", "/api/otj", {
        task: task.trim(),
        category,
        date: selectedDate || new Date().toISOString().slice(0, 10),
        hours: parsedHours,
        minutes: parsedMinutes,
      });
      await queryClient.invalidateQueries({ queryKey: ["/api/otj"] });
      toasts.success("Off-the-job time logged", "Your entry has been saved.");
      setTask("");
      setCategory("");
      setSelectedDate("");
      setHours("");
      setMinutes("");
      setConfirmed(false);
    } catch (error) {
      toasts.error("Could not save entry", "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout width="narrow">
      <div className="flex flex-col" style={{ gap: '40px', paddingTop: '24px', paddingBottom: '120px' }}>
        <div className="flex flex-col" style={{ gap: '24px' }}>
          <div className="flex flex-col" style={{ gap: '8px' }}>
            <h1 className="text-3xl font-semibold text-primary" data-testid="text-page-title">
              Off the job
            </h1>
            <p className="text-m text-secondary" data-testid="text-page-description">
              Log the time you have spent learning during working hours
            </p>
          </div>
          
          <div className="w-full h-px bg-separator-primary" />
          
          <div className="flex items-start justify-between w-full">
            <div className="text-action">
              <span className="text-3xl font-medium" data-testid="text-hours-due">{behindHours}</span>
              <span className="text-m">h</span>
              <span className="text-3xl font-medium"> </span>
              <span className="text-xl font-medium" data-testid="text-minutes-due">{behindMins}</span>
              <span className="text-m">m </span>
              <span className="text-m text-primary">due</span>
            </div>
            <Badge purpose="success" variant="subtle" data-testid="badge-extra-hours">
              +8 hours
            </Badge>
          </div>
          
          <div className="w-full h-px bg-separator-primary" />
          
          <div className="flex flex-col" style={{ gap: '8px' }}>
            <p className="text-m text-primary">
              <span className="font-medium" data-testid="text-weekly-completed-label">Weekly completed</span>
              <span className="text-secondary"> </span>
              <span className="text-secondary" data-testid="text-weekly-completed-value">({compactDuration(weeklyLoggedMinutes)})</span>
            </p>
            <div className="w-full flex flex-col" style={{ gap: '8px' }}>
              <div className="w-full h-1 bg-[#DEEDFD] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-action rounded-full" 
                  style={{ width: `${weeklyPercent}%` }}
                  data-testid="progress-bar-fill"
                />
              </div>
              <div className="flex items-center" style={{ gap: '16px' }}>
                <ProgressLegendItem color="action" label="Catch-up" value="(2h)" />
                <ProgressLegendItem color="info" label="Weekly due" value={`(${compactDuration(weeklyRequiredMinutes)})`} />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end w-full">
            <Button
              variant="text"
              size="small"
              onClick={() => navigate("/off-the-job/all")}
              data-testid="button-view-all"
            >
              View all
            </Button>
          </div>
          
          <div className="w-full h-px bg-separator-primary" />
        </div>

        <div className="flex flex-col w-full" style={{ gap: '24px' }}>
          <h2 className="text-2xl font-medium text-primary" data-testid="text-log-time-title">
            Log your time
          </h2>
          
          <div className="flex flex-col w-full" style={{ gap: '24px' }}>
            <div className="flex flex-col w-full" style={{ gap: '4px' }}>
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <label className="text-s font-semibold text-primary">Task</label>
                <Link 
                  href="#" 
                  className="text-s underline"
                  data-testid="link-what-counts"
                >
                  What counts as off the job?
                </Link>
              </div>
              <div className="form-field-full-width">
                <Textarea
                  id="task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder=""
                  rows={4}
                  hideLabel
                  label="Task description"
                  data-testid="input-task"
                />
              </div>
            </div>
            
            <div className="form-field-full-width">
              <Select 
                id="category" 
                label="Category"
                value={category}
                onValueChange={setCategory}
                data-testid="select-category"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="training" data-testid="select-item-training">Training</SelectItem>
                  <SelectItem value="coaching" data-testid="select-item-coaching">Coaching</SelectItem>
                  <SelectItem value="shadowing" data-testid="select-item-shadowing">Shadowing</SelectItem>
                  <SelectItem value="mentoring" data-testid="select-item-mentoring">Mentoring</SelectItem>
                  <SelectItem value="study" data-testid="select-item-study">Study</SelectItem>
                  <SelectItem value="other" data-testid="select-item-other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="form-field-full-width">
              <TextInput
                id="date"
                label="Choose the date(s) you did this task"
                description="Use the formate DD/MM/YYYY"
                placeholder="Select date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                data-testid="input-date"
              />
            </div>
            
            <div className="grid grid-cols-2 w-full" style={{ gap: '24px' }}>
              <div className="form-field-full-width">
                <TextInput
                  id="hours"
                  label="Hours"
                  placeholder=""
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  type="number"
                  data-testid="input-hours"
                />
              </div>
              <div className="form-field-full-width">
                <TextInput
                  id="minutes"
                  label="Minutes"
                  placeholder=""
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  type="number"
                  data-testid="input-minutes"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full h-px bg-separator-primary" />
        
        <Checkbox
          label="I confirm that I've completed these tasks during my working hours"
          name="confirm"
          checked={confirmed}
          onChange={(e) => setConfirmed((e.target as HTMLInputElement).checked)}
          data-testid="checkbox-confirm"
        />
        
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={saving}
          className="w-full"
          data-testid="button-save-entry"
        >
          {saving ? "Saving…" : "Save off the job entry"}
        </Button>
      </div>
    </Layout>
  );
}
