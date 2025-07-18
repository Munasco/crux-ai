import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import queryClient from "./lib/queryClient";
import Landing from "./pages/Landing";
import DashboardPage from "./pages/dashboard";
import NotFound from "./pages/NotFound";
import OnboardingApp from "./components/OnboardingApp";
import Dashboard from "./pages/dashboard/Dashboard";
import DiagnoseTab from "./pages/dashboard/DiagnoseTab";
import PrescribeTab from "./pages/dashboard/PrescribeTab";
import RemediateTab from "./pages/dashboard/RemediateTab";
import VideoAnalysis from "./pages/dashboard/VideoAnalysis";
import SponsorTab from "./pages/dashboard/SponsorTab";
import { InstagramAnalysis } from "./components/InstagramAnalysis";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/dashboard/:username"
            element={
              <DashboardPage
                children={<Dashboard />}
                title="Dashboard"
                subTitle="Dashboard"
              />
            }
          />
          <Route path="/onboarding" element={<OnboardingApp />} />
          <Route path="/instagram-analysis" element={<InstagramAnalysis />} />
          <Route
            path="/dashboard/diagnose"
            element={
              <DashboardPage
                children={<DiagnoseTab />}
                title="Diagnose"
                subTitle="Diagnose"
              />
            }
          />
          <Route
            path="/dashboard/prescribe"
            element={
              <DashboardPage
                children={<PrescribeTab />}
                title="Prescribe"
                subTitle="Prescribe"
              />
            }
          />
          <Route
            path="/dashboard/remediate"
            element={
              <DashboardPage
                children={<RemediateTab />}
                title="Remediate"
                subTitle="Remediate"
              />
            }
          />
          <Route
            path="/dashboard/videos"
            element={
              <DashboardPage
                children={<VideoAnalysis onBack={() => {}} />}
                title="Videos"
                subTitle="Videos"
              />
            }
          />
          <Route
            path="/dashboard/sponsor"
            element={
              <DashboardPage
                children={<SponsorTab />}
                title="Sponsorships"
                subTitle="Sponsorships"
              />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
