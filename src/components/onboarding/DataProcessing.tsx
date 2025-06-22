
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Loader2, Brain, Database, TrendingUp, CheckCircle } from "lucide-react";

interface DataProcessingProps {
  connectedProfiles: any[];
  onProcessingComplete: () => void;
}

const DataProcessing = ({ connectedProfiles, onProcessingComplete }: DataProcessingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const steps = [
    {
      id: "fetch",
      title: "Fetching Profile Data",
      description: "Collecting posts, videos, and engagement metrics",
      icon: Database,
      duration: 3000
    },
    {
      id: "analyze",
      title: "Content Analysis",
      description: "Analyzing content patterns, hooks, and performance",
      icon: TrendingUp,
      duration: 4000
    },
    {
      id: "embed",
      title: "Creating AI Model",
      description: "Building your personalized creator intelligence model",
      icon: Brain,
      duration: 5000
    }
  ];

  useEffect(() => {
    const processSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        
        // Simulate processing time with progress updates
        const stepDuration = steps[i].duration;
        const intervals = 20;
        const intervalDuration = stepDuration / intervals;
        
        for (let j = 0; j <= intervals; j++) {
          await new Promise(resolve => setTimeout(resolve, intervalDuration));
          const stepProgress = (i * 100 + (j / intervals) * 100) / steps.length;
          setProgress(stepProgress);
        }
      }
      
      setCompleted(true);
      setTimeout(() => {
        onProcessingComplete();
      }, 2000);
    };

    processSteps();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div >
        <h1 className="text-4xl font-bold mb-4">
          Building Your Creator{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Intelligence
          </span>
        </h1>
        <p className="text-gray-600 text-lg">
          Analyzing {connectedProfiles.length} platform{connectedProfiles.length !== 1 ? 's' : ''} to create your personalized insights
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
                  <div className={`p-3 rounded-xl ${
                    isCompleted 
                      ? 'bg-green-500' 
                      : isActive 
                        ? 'gradient-orange' 
                        : 'bg-gray-200'
                  } transition-all duration-300`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : isActive ? (
                      <Icon className="w-6 h-6 text-white animate-pulse" />
                    ) : (
                      <Icon className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      isActive ? 'text-orange-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
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
                {completed ? 'Analysis Complete!' : steps[currentStep]?.title}
              </span>
              <span className="font-medium text-orange-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3 bg-orange-100" />
          </div>

          {completed && (
            <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-green-800 mb-2">Your Creator Model is Ready!</h3>
              <p className="text-green-700 text-sm">
                We've analyzed your content and built a personalized intelligence model
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {connectedProfiles.map((profile, index) => (
            <div key={index} className="p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="font-medium text-orange-800">@{profile.username}</div>
              <div className="text-sm text-orange-600 capitalize">{profile.platform}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataProcessing;
