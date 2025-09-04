import React, { useState } from "react";
import { useDashboardGeneration, useSSEDashboardStatus } from "../hooks/useDashboardGeneration";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Loader2, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useToast } from "../hooks/use-toast";

export const DashboardGenerator: React.FC = () => {
  const [username, setUsername] = useState("");
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const { toast } = useToast();

  const { generateDashboard, isGenerating, generateError } = useDashboardGeneration();
  
  // Use SSE instead of polling for real-time updates
  const { status: statusData, isConnected, error: sseError } = useSSEDashboardStatus(currentJobId);

  const handleGenerate = () => {
    if (!username.trim()) return;

    generateDashboard(username, {
      onSuccess: (data) => {
        setCurrentJobId(data.jobId);
        // Show duration notification
        toast({
          title: "Analysis Started! 🚀",
          description: "This process typically takes 3-5 minutes. We'll analyze your Instagram data, follower metrics, and generate AI-powered insights in real-time.",
          duration: 8000, // Show for 8 seconds
        });
      },
      onError: (error) => {
        console.error("Failed to start generation:", error);
        toast({
          title: "Failed to Start Analysis",
          description: error.message || "Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Loader2 className="h-4 w-4 animate-spin" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter Instagram username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isGenerating}
            />
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !username.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Starting...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>

          {generateError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">
                Error: {generateError.message}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {currentJobId && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
          <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-900">
              Analysis in Progress
            </p>
            <p className="text-xs text-blue-700">
              This typically takes 3-5 minutes. You can watch the real-time progress below.
            </p>
          </div>
        </div>
      )}

      {currentJobId && (statusData || sseError) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isConnected ? (
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              ) : (
                <div className="w-2 h-2 bg-red-500 rounded-full" />
              )}
              {statusData ? getStatusIcon(statusData.status) : <AlertCircle className="h-4 w-4 text-orange-500" />}
              Real-time Status Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {statusData && (
              <>
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(statusData.status)}>
                    {statusData.status.replace("_", " ").toUpperCase()}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {statusData.progress}%
                  </span>
                </div>

                <Progress value={statusData.progress} className="w-full" />

                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600">{statusData.message}</p>
                  {isConnected && (
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                      Live
                    </span>
                  )}
                </div>

                {statusData.status === "completed" && statusData.data && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                    <h4 className="font-medium text-green-800 mb-2">
                      Dashboard Generated Successfully!
                    </h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <p>Followers: {statusData.data.totalFollowers}</p>
                      <p>Avg Engagement: {statusData.data.avgEngagement}</p>
                      <p>
                        Video Content: {statusData.data.videoContentPieces}{" "}
                        pieces
                      </p>
                    </div>
                  </div>
                )}

                {statusData.status === "error" && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-700 text-sm">
                      Generation failed. Please try again.
                    </p>
                  </div>
                )}
              </>
            )}
            
            {sseError && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-md">
                <p className="text-orange-700 text-sm">
                  {sseError === "Job not found" 
                    ? "Job not found. This might happen if the server was restarted. Please try generating the dashboard again."
                    : `Connection error: ${sseError}`
                  }
                </p>
                <Button 
                  className="mt-2" 
                  size="sm" 
                  variant="outline"
                  onClick={() => setCurrentJobId(null)}
                >
                  Clear Status
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!statusData && !sseError && currentJobId && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Connecting to live updates...</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
