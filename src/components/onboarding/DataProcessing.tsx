import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Brain,
  Database,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useDashboardGeneration } from "../../hooks/useDashboardGeneration";

interface ConnectedProfile {
  platform: string;
  username: string;
}

interface DataProcessingProps {
  connectedProfiles: ConnectedProfile[];
  username?: string;
  onProcessingComplete: (username: string) => void;
}

const DataProcessing = ({
  connectedProfiles,
  username,
  onProcessingComplete,
}: DataProcessingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);

  const { generateDashboard, isGenerating, generateError, pollStatus } =
    useDashboardGeneration();
  const statusQuery = pollStatus(currentJobId!);

  // Map backend steps to our UI steps
  const steps = [
    {
      id: "fetch",
      title: "Fetching Profile Data",
      description: "Collecting posts, videos, and engagement metrics",
      icon: Database,
      backendStatus: "scraping_instagram",
    },
    {
      id: "analyze",
      title: "Content Analysis",
      description: "Analyzing content patterns, hooks, and performance",
      icon: TrendingUp,
      backendStatus: "analyzing",
    },
    {
      id: "embed",
      title: "Creating AI Model",
      description: "Building your personalized creator intelligence model",
      icon: Brain,
      backendStatus: "completed",
    },
  ];

  // Start dashboard generation when component mounts
  useEffect(() => {
    if (username && !currentJobId && !isGenerating) {
      const cleanUsername = username.replace(/^@/, "").trim();
      generateDashboard(cleanUsername, {
        onSuccess: (data) => {
          setCurrentJobId(data.jobId);
        },
        onError: (error) => {
          console.error("Failed to start analysis:", error);
        },
      });
    }
  }, [username, currentJobId, isGenerating, generateDashboard]);

  // Handle real progress updates from backend
  useEffect(() => {
    if (statusQuery.data) {
      const status = statusQuery.data.status;
      const backendProgress = statusQuery.data.progress;

      // Map backend progress to our 3-step UI
      if (status === "scraping_instagram" || status === "getting_followers") {
        setCurrentStep(0); // Step 1: Fetching
        setProgress((backendProgress / 100) * 33.33);
      } else if (status === "analyzing") {
        setCurrentStep(1); // Step 2: Analyzing
        setProgress(33.33 + ((backendProgress - 75) / 25) * 33.33);
      } else if (status === "completed") {
        setCurrentStep(2); // Step 3: Completed
        setProgress(100);
        setCompleted(true);

        // Navigate after a delay
        setTimeout(() => {
          onProcessingComplete(username!);
        }, 2000);
      } else if (status === "error") {
        // Handle error state
        console.error("Analysis failed:", statusQuery.data);
      }
    }
  }, [statusQuery.data, onProcessingComplete, username]);

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "starting":
        return "Initializing analysis...";
      case "scraping_instagram":
        return "Scraping Instagram profile data...";
      case "getting_followers":
        return "Getting follower count...";
      case "analyzing":
        return "Analyzing data with AI...";
      case "completed":
        return "Analysis completed successfully!";
      case "error":
        return "Analysis failed. Please try again.";
      default:
        return "Processing...";
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">
          Building Your Creator{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Intelligence
          </span>
        </h1>
        <p className="text-gray-600 text-lg">
          Analyzing {connectedProfiles.length} platform
          {connectedProfiles.length !== 1 ? "s" : ""} to create your
          personalized insights
        </p>
      </div>

      <Card className="border border-slate-100 rounded-xl shadow">
        <CardContent className="p-8 space-y-8">
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep || completed;

              return (
                <div key={step.id} className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-xl ${
                      isCompleted
                        ? "bg-green-500"
                        : isActive
                        ? "gradient-orange"
                        : "bg-gray-200"
                    } transition-all duration-300`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : isActive ? (
                      <Icon className="w-6 h-6 text-white animate-pulse" />
                    ) : (
                      <Icon className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold ${
                        isActive
                          ? "text-orange-600"
                          : isCompleted
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                  {isActive && !completed && (
                    <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {completed
                  ? "Analysis Complete!"
                  : statusQuery.data
                  ? getStatusMessage(statusQuery.data.status)
                  : steps[currentStep]?.title}
              </span>
              <span className="font-medium text-orange-600">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-3 bg-orange-100" />
          </div>

          {generateError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h4 className="font-semibold text-red-800">Analysis Failed</h4>
              </div>
              <p className="text-red-700 text-sm">
                Error: {generateError.message}
              </p>
            </div>
          )}

          {completed && (
            <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-green-800 mb-2">
                Your Creator Model is Ready!
              </h3>
              <p className="text-green-700 text-sm">
                We've analyzed your content and built a personalized
                intelligence model
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {connectedProfiles.map((profile, index) => (
            <div
              key={index}
              className="p-4 bg-orange-50 rounded-xl border border-orange-200"
            >
              <div className="font-medium text-orange-800">
                @{profile.username}
              </div>
              <div className="text-sm text-orange-600 capitalize">
                {profile.platform}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataProcessing;
