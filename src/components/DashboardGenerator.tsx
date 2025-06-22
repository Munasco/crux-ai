import React, { useState } from "react";
import { useDashboardGeneration } from "../hooks/useDashboardGeneration";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export const DashboardGenerator: React.FC = () => {
  const [username, setUsername] = useState("");
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);

  const { generateDashboard, isGenerating, generateError, pollStatus } =
    useDashboardGeneration();

  const statusQuery = pollStatus(currentJobId!);

  const handleGenerate = () => {
    if (!username.trim()) return;

    generateDashboard(username, {
      onSuccess: (data) => {
        setCurrentJobId(data.jobId);
      },
      onError: (error) => {
        console.error("Failed to start generation:", error);
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

      {currentJobId && statusQuery.data && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(statusQuery.data.status)}
              Generation Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className={getStatusColor(statusQuery.data.status)}>
                {statusQuery.data.status.replace("_", " ").toUpperCase()}
              </Badge>
              <span className="text-sm text-gray-500">
                {statusQuery.data.progress}%
              </span>
            </div>

            <Progress value={statusQuery.data.progress} className="w-full" />

            <p className="text-sm text-gray-600">{statusQuery.data.message}</p>

            {statusQuery.data.status === "completed" &&
              statusQuery.data.data && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <h4 className="font-medium text-green-800 mb-2">
                    Dashboard Generated Successfully!
                  </h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>Followers: {statusQuery.data.data.totalFollowers}</p>
                    <p>Avg Engagement: {statusQuery.data.data.avgEngagement}</p>
                    <p>
                      Video Content: {statusQuery.data.data.videoContentPieces}{" "}
                      pieces
                    </p>
                  </div>
                </div>
              )}

            {statusQuery.data.status === "error" && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">
                  Generation failed. Please try again.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {statusQuery.isLoading && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Loading status...</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
