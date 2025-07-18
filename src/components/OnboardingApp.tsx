import { useState } from "react";
import PlatformSelection from "./onboarding/PlatformSelection";
import ProfileConnection from "./onboarding/ProfileConnection";
import DataProcessing from "./onboarding/DataProcessing";
import CreatorOverview from "../pages/dashboard/CreatorOverview";
import VideoAnalysis from "../pages/dashboard/VideoAnalysis";
import { Link, Navigate, useNavigate } from "react-router-dom";

type OnboardingStep =
  | "platforms"
  | "connection"
  | "processing"
  | "overview"
  | "videos";

const OnboardingApp = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("platforms");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [connectedProfiles, setConnectedProfiles] = useState<any[]>([]);

  const handlePlatformsSelected = (platforms: string[]) => {
    setSelectedPlatforms(platforms);
    setCurrentStep("connection");
  };

  const handleConnectionComplete = (profiles: any[]) => {
    setConnectedProfiles(profiles);
    setCurrentStep("processing");
  };

  const handleProcessingComplete = (username: string) => {
    // Navigate to the user's dashboard with their username
    navigate(`/dashboard/${username}`);
  };

  const handleViewVideoAnalysis = () => {
    setCurrentStep("videos");
  };

  const handleBackToOverview = () => {
    setCurrentStep("overview");
  };

  // Get the primary username (first connected profile)
  const primaryUsername =
    connectedProfiles.length > 0 ? connectedProfiles[0].username : null;

  return (
    <main className="min-h-screen bg-[#120A04] flex flex-row p-4 ">
      <section className="w-1/4 flex flex-col  justify-between p-4 ">
        <Link to="/" className="flex items-center space-x-1">
          <img src="/logo.png" alt="Crux" className="w-10 h-10" />
          <span className="text-2xl font-medium font-sans text-white">
            Crux.ai
          </span>
        </Link>
        <div className="flex-1 mt-32 flex-col justify-center gap-2 ">
          <p className="text-orange-300 text-sm font-normal">GET STARTED</p>
          <h3 className="text-white text-4xl font-semibold">Welcome!</h3>
          <p className="text-white text-sm">
            Let's set things up so you can start optimizing your content.
          </p>
        </div>
        <div className="flex flex-col  gap-4 ">
          <p className="text-[#A27E6D] text-sm leading-loose">
            " Crux has been really helpful for me. It's a great tool for
            analyzing my content and getting insights on how to improve it. "
          </p>
          <div className=" ">
            <h4 className="text-white text-lg font-medium">John Doe</h4>
            <p className="text-white text-sm">@daniel_crux</p>
          </div>
        </div>
      </section>
      <section className="w-3/4 bg-white rounded-md flex flex-col items-center justify-center">
        <div className="container mx-auto px-6 py-8 justify-center items-center">
          {currentStep === "platforms" && (
            <PlatformSelection onPlatformsSelected={handlePlatformsSelected} />
          )}

          {currentStep === "connection" && (
            <ProfileConnection
              selectedPlatforms={selectedPlatforms}
              onConnectionComplete={handleConnectionComplete}
            />
          )}

          {currentStep === "processing" && (
            <DataProcessing
              connectedProfiles={connectedProfiles}
              username={primaryUsername}
              onProcessingComplete={handleProcessingComplete}
            />
          )}

          {currentStep === "overview" && <Navigate to="/dashboard" replace />}
        </div>
      </section>
    </main>
  );
};

export default OnboardingApp;
