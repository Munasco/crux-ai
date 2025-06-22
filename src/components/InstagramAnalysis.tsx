import React, { useState } from "react";
import { useDashboardGeneration } from "../hooks/useDashboardGeneration";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Instagram,
  TrendingUp,
  Users,
  Video,
  Target,
} from "lucide-react";

export const InstagramAnalysis: React.FC = () => {
  const [username, setUsername] = useState("");
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);

  const { generateDashboard, isGenerating, generateError, pollStatus } =
    useDashboardGeneration();

  const statusQuery = pollStatus(currentJobId!);

  const handleStartAnalysis = () => {
    if (!username.trim()) return;

    // Clean username (remove @ if present)
    const cleanUsername = username.replace(/^@/, "").trim();

    generateDashboard(cleanUsername, {
      onSuccess: (data) => {
        setCurrentJobId(data.jobId);
      },
      onError: (error) => {
        console.error("Failed to start analysis:", error);
      },
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

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

  const resetAnalysis = () => {
    setCurrentJobId(null);
    setUsername("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-2xl font-bold">
          <Instagram className="h-8 w-8 text-pink-500" />
          Instagram Analysis
        </div>
        <p className="text-gray-600">
          Enter your Instagram username to get detailed insights about your
          content performance
        </p>
      </div>

      {/* Input Section */}
      {!currentJobId && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Start Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Instagram Username
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Enter username (e.g., dammythedesigner)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isGenerating}
                    className="pl-10"
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleStartAnalysis()
                    }
                  />
                </div>
                <Button
                  onClick={handleStartAnalysis}
                  disabled={isGenerating || !username.trim()}
                  className="min-w-[120px]"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Starting...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>
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
      )}

      {/* Progress Section */}
      {currentJobId && statusQuery.data && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(statusQuery.data.status)}
              Analysis Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Badge and Progress */}
            <div className="flex items-center justify-between">
              <Badge
                className={`${getStatusColor(statusQuery.data.status)} border`}
              >
                {statusQuery.data.status.replace("_", " ").toUpperCase()}
              </Badge>
              <span className="text-sm font-medium text-gray-600">
                {statusQuery.data.progress}% Complete
              </span>
            </div>

            <Progress value={statusQuery.data.progress} className="h-3" />

            <p className="text-sm text-gray-600 text-center">
              {getStatusMessage(statusQuery.data.status)}
            </p>

            {/* Results Section */}
            {statusQuery.data.status === "completed" &&
              statusQuery.data.data && (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Analysis Complete!
                    </h4>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 p-3 bg-white rounded-md">
                        <Users className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-xs text-gray-500">Followers</p>
                          <p className="font-semibold">
                            {statusQuery.data.data.totalFollowers}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 bg-white rounded-md">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-xs text-gray-500">
                            Avg Engagement
                          </p>
                          <p className="font-semibold">
                            {statusQuery.data.data.avgEngagement}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 bg-white rounded-md">
                        <Video className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="text-xs text-gray-500">Video Content</p>
                          <p className="font-semibold">
                            {statusQuery.data.data.videoContentPieces} pieces
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={resetAnalysis}
                        variant="outline"
                        size="sm"
                      >
                        Analyze Another Account
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        View Full Report
                      </Button>
                    </div>
                  </div>
                </div>
              )}

            {/* Error State */}
            {statusQuery.data.status === "error" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Analysis Failed
                </h4>
                <p className="text-red-700 text-sm mb-3">
                  There was an error processing your Instagram account. Please
                  try again.
                </p>
                <Button onClick={resetAnalysis} variant="outline" size="sm">
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {statusQuery.isLoading && (
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-3">
              <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
              <span className="text-gray-600">Loading analysis status...</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
