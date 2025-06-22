import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, Sparkles } from "lucide-react";

interface VideoAnalysisLoadingProps {
  videoSource: File | string;
  onComplete: (analysis: {
    title: string;
    performance: string;
    insights: string[];
    recommendations: string[];
  }) => void;
}

const loadingMessages = [
  "Extracting video metadata...",
  "Analyzing hook effectiveness...",
  "Processing engagement patterns...",
  "Identifying content strengths...",
  "Generating actionable insights...",
  "Preparing your analysis report..."
];

const loadingStages = [
  { name: "Uploading", progress: 15 },
  { name: "Processing", progress: 45 },
  { name: "Analyzing", progress: 75 },
  { name: "Insights Ready", progress: 100 }
];

export function VideoAnalysisLoading({ videoSource, onComplete }: VideoAnalysisLoadingProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Simulate completion after 8 seconds
          setTimeout(() => {
            onComplete({
              title: typeof videoSource === 'string' ? 'Video from Link' : videoSource.name,
              performance: 'excellent',
              insights: [
                "Strong hook captured attention in first 3 seconds",
                "High retention through first 30 seconds",
                "Engagement peaked at 1:15 mark",
                "Clear call-to-action drove conversions"
              ],
              recommendations: [
                "Use similar hook patterns for future content",
                "Optimize content length for your audience",
                "Add CTA earlier in the video",
                "Create follow-up content based on comments"
              ]
            });
          }, 1000);
          return 100;
        }
        
        const stage = Math.floor(prev / 25);
        if (stage !== currentStage) {
          setCurrentStage(stage);
        }
        
        return prev + 1;
      });
    }, 80);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [currentStage, onComplete, videoSource]);

  const getVideoPreview = () => {
    if (typeof videoSource === 'string') {
      // For links, show a placeholder
      return (
        <div className="w-full aspect-video bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="w-8 h-8 mx-auto mb-2 text-orange-500 animate-pulse" />
            <p className="text-sm text-orange-700 font-medium">Processing Video Link</p>
          </div>
        </div>
      );
    } else {
      // For files, show a shimmer effect
      return (
        <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-gray-500" />
              <p className="text-sm text-gray-600 font-medium">{videoSource.name}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analyzing Your Video</h1>
          <p className="text-gray-600">We're extracting insights to help you create better content</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Video Preview */}
          <div className="space-y-6">
            <Card className="border-bg-sidebar rounded-lg shadow-none">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-orange-500" />
                  Video Preview
                </h3>
                {getVideoPreview()}
              </CardContent>
            </Card>

            {/* Progress Indicator */}
            <Card className="border-bg-sidebar rounded-lg shadow-none">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Analysis Progress</h3>
                    <span className="text-sm text-gray-500">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{loadingStages[currentStage]?.name}</span>
                    <span className="text-orange-600 font-medium">
                      {loadingStages[currentStage + 1]?.name || "Complete"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Chat-like Messages */}
          <div className="space-y-4">
            <Card className="border-bg-sidebar rounded-lg shadow-none">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Loader2 className="w-5 h-5 mr-2 text-orange-500 animate-spin" />
                  AI Analysis in Progress
                </h3>
                
                <div className="space-y-4">
                  {loadingMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 transition-all duration-500 ${
                        index === currentMessageIndex ? 'opacity-100' : 'opacity-40'
                      }`}
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                      <div className="flex-1">
                        <p className="text-gray-700">{message}</p>
                        {index === currentMessageIndex && (
                          <div className="flex space-x-1 mt-2">
                            <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce" />
                            <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What We're Analyzing */}
                <Card className="border-bg-sidebar rounded-lg shadow-none bg-orange-50 border-orange-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-orange-800">What We're Analyzing</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-orange-700">Hook Effectiveness</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-orange-700">Audience Retention</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-orange-700">Engagement Patterns</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-orange-700">Call-to-Action</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 