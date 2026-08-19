import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Learning from "@/pages/learning";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import ProjectSubmission from "@/pages/project-submission";
import MySessions from "@/pages/my-sessions";
import OffTheJob from "@/pages/off-the-job";
import OffTheJobEntries from "@/pages/off-the-job-entries";
import ProgressReviews from "@/pages/progress-reviews";
import Portfolio from "@/pages/portfolio";
import Settings from "@/pages/settings";
import Unit from "@/pages/unit";
import AtlasStandalonePage from "@/pages/atlas";
import AtlasMobilePreview from "@/pages/atlas-mobile-preview";
import ButterflyPage from "@/pages/butterfly";
import NavigationLayout from "./components/navigation";
import { AtlasVersionProvider } from "./components/atlas-version-context";
import OnboardingTour from "./components/OnboardingTour";
import { Toaster } from "@multiverse-io/stardust-react";

function MainRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/learning" component={Learning} />
      <Route path="/learning/unit/:unitId" component={Unit} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route path="/my-sessions" component={MySessions} />
      <Route path="/off-the-job" component={OffTheJob} />
      <Route path="/off-the-job/all" component={OffTheJobEntries} />
      <Route path="/progress-reviews" component={ProgressReviews} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/otj/reset-session", { method: "POST" });
        const summary = await res.json();
        await queryClient.cancelQueries({ queryKey: ["/api/otj"] });
        queryClient.setQueryData(["/api/otj"], summary);
        queryClient.invalidateQueries({ queryKey: ["/api/otj"] });
      } catch {
        // ignore reset failures
      }
    })();
  }, []);
  
  const isSubmissionPage = location.match(/^\/projects\/[^/]+\/submission$/);
  const isUnitPage = location.match(/^\/learning\/unit\/[^/]+$/);
  const isAtlasPage = location === "/atlas" || location.startsWith("/atlas?");
  const isAtlasMobilePreview = location === "/atlas-mobile" || location.startsWith("/atlas-mobile?");
  const isButterflyPage = location.match(/^\/butterfly(\/|\?|$)/);
  
  return (
    <AtlasVersionProvider>
      {!isAtlasPage && !isAtlasMobilePreview && !isButterflyPage && <OnboardingTour />}
      <Toaster />
      <QueryClientProvider client={queryClient}>
        {isButterflyPage ? (
          <ButterflyPage />
        ) : isAtlasMobilePreview ? (
          <AtlasMobilePreview />
        ) : isAtlasPage ? (
          <AtlasStandalonePage />
        ) : isSubmissionPage ? (
          <Switch>
            <Route path="/projects/:id/submission" component={ProjectSubmission} />
          </Switch>
        ) : isUnitPage ? (
          <Switch>
            <Route path="/learning/unit/:unitId" component={Unit} />
          </Switch>
        ) : (
          <NavigationLayout>
            <MainRouter />
          </NavigationLayout>
        )}
      </QueryClientProvider>
    </AtlasVersionProvider>
  );
}

export default App;
