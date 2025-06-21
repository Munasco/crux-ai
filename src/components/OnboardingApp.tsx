
import { useState } from "react";
import PlatformSelection from "./onboarding/PlatformSelection";
import ProfileConnection from "./onboarding/ProfileConnection";
import DataProcessing from "./onboarding/DataProcessing";
import CreatorOverview from "./dashboard/CreatorOverview";
import VideoAnalysis from "./dashboard/VideoAnalysis";

type OnboardingStep = 'platforms' | 'connection' | 'processing' | 'overview' | 'videos';

const OnboardingApp = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('platforms');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [connectedProfiles, setConnectedProfiles] = useState<any[]>([]);

  const handlePlatformsSelected = (platforms: string[]) => {
    setSelectedPlatforms(platforms);
    setCurrentStep('connection');
  };

  const handleConnectionComplete = (profiles: any[]) => {
    setConnectedProfiles(profiles);
    setCurrentStep('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentStep('overview');
  };

  const handleViewVideoAnalysis = () => {
    setCurrentStep('videos');
  };

  const handleBackToOverview = () => {
    setCurrentStep('overview');
  };

  return (
    <div className="min-h-screen gradient-soft">
      <div className="container mx-auto px-6 py-8">
        {currentStep === 'platforms' && (
          <PlatformSelection onPlatformsSelected={handlePlatformsSelected} />
        )}
        
        {currentStep === 'connection' && (
          <ProfileConnection 
            selectedPlatforms={selectedPlatforms}
            onConnectionComplete={handleConnectionComplete}
          />
        )}
        
        {currentStep === 'processing' && (
          <DataProcessing 
            connectedProfiles={connectedProfiles}
            onProcessingComplete={handleProcessingComplete}
          />
        )}
        
        {currentStep === 'overview' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Your Creator{" "}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Intelligence
                </span>
              </h1>
              <p className="text-gray-600 text-lg">
                Complete analysis of your creator ecosystem across {connectedProfiles.length} platform{connectedProfiles.length !== 1 ? 's' : ''}
              </p>
            </div>
            <CreatorOverview onViewVideoAnalysis={handleViewVideoAnalysis} />
          </div>
        )}
        
        {currentStep === 'videos' && (
          <VideoAnalysis onBack={handleBackToOverview} />
        )}
      </div>
    </div>
  );
};

export default OnboardingApp;
