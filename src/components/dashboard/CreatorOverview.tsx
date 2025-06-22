import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Target,
  Clock,
  Zap,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useCreatorData } from "@/hooks/useDashboardGeneration";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface CreatorOverviewProps {
  onViewVideoAnalysis: () => void;
  username?: string;
}

const OverviewSkeleton = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Skeleton className="h-24 rounded-lg" />
      <Skeleton className="h-24 rounded-lg" />
      <Skeleton className="h-24 rounded-lg" />
      <Skeleton className="h-24 rounded-lg" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="h-64 rounded-lg" />
      <Skeleton className="h-64 rounded-lg" />
    </div>
    <Skeleton className="h-96 rounded-lg" />
  </div>
);

const CreatorOverview = ({
  onViewVideoAnalysis,
  username,
}: CreatorOverviewProps) => {
  const [retryCount, setRetryCount] = useState(0);
  const [isWaitingForData, setIsWaitingForData] = useState(false);

  const {
    data: apiResponse,
    isLoading,
    error,
    refetch,
  } = useCreatorData(username);

  // Check if we should wait for data (when coming from analysis)
  useEffect(() => {
    if (username && !isLoading && !apiResponse?.success && retryCount < 3) {
      setIsWaitingForData(true);
      // Retry after 2 seconds
      const timer = setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        refetch();
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsWaitingForData(false);
    }
  }, [username, isLoading, apiResponse, retryCount, refetch]);

  const handleRetry = () => {
    setRetryCount(0);
    setIsWaitingForData(false);
    refetch();
  };

  // Show loading state while waiting for data
  if (isWaitingForData) {
    return (
      <div className="space-y-8">
        <Card className="border-orange-200 bg-orange-50 rounded-2xl">
          <CardContent className="pt-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <RefreshCw className="h-6 w-6 animate-spin text-orange-600" />
              <span className="text-lg font-semibold text-orange-800">
                Loading your dashboard data...
              </span>
            </div>
            <p className="text-orange-700 mb-4">
              We're retrieving your analysis results. This may take a few
              moments.
            </p>
            <div className="flex items-center justify-center gap-2 text-orange-600">
              <span className="text-sm">Attempt {retryCount + 1} of 3</span>
            </div>
          </CardContent>
        </Card>
        <OverviewSkeleton />
      </div>
    );
  }

  // Show error state
  if (error && retryCount >= 3) {
    return (
      <div className="space-y-8">
        <Card className="border-red-200 bg-red-50 rounded-2xl">
          <CardContent className="pt-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2 text-red-800">
              Unable to Load Dashboard Data
            </h3>
            <p className="text-red-700 mb-6">
              We couldn't retrieve your analysis results. This might be because:
            </p>
            <ul className="text-red-700 mb-6 text-left max-w-md mx-auto space-y-2">
              <li>• The analysis is still processing</li>
              <li>• There was an issue saving the data</li>
              <li>• The username doesn't match our records</li>
            </ul>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleRetry}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button
                onClick={() => (window.location.href = "/dashboard/diagnose")}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Run New Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <OverviewSkeleton />;
  }

  // --- PREVIEW DATA (FALLBACK) ---
  const previewData = {
    creatorStats: {
      totalFollowers: "3.2K",
      avgEngagement: "4.7%",
      totalViews: "2.1K",
      contentPieces: 15,
      platforms: ["Instagram", "YouTube", "LinkedIn"],
    },
    strengths: [
      {
        title: "Hook Mastery",
        score: 87,
        description: "Exceptional at capturing attention in first 3 seconds",
        icon: Target,
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
      {
        title: "Audience Retention",
        score: 82,
        description: "Strong mid-content engagement and watch-through rates",
        icon: Eye,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
      {
        title: "Community Building",
        score: 76,
        description: "Active comment engagement and follower interaction",
        icon: Users,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
      },
    ],
    weaknesses: [
      {
        title: "Call-to-Action",
        score: 34,
        description: "CTAs are weak and don't drive enough conversions",
        icon: Zap,
        color: "text-red-600",
        bgColor: "bg-red-50",
        improvement: "Add clearer, more compelling CTAs",
      },
      {
        title: "Posting Consistency",
        score: 41,
        description: "Irregular posting schedule hurts algorithm performance",
        icon: Clock,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        improvement: "Establish consistent daily posting times",
      },
    ],
  };
  // ---------------------------------

  const hasRealData = apiResponse?.success && apiResponse.data?.avgEngagement;
  const realData = hasRealData ? apiResponse.data : null;

  const creatorStats = hasRealData
    ? {
        totalFollowers: realData.totalFollowers,
        avgEngagement: realData.avgEngagement,
        totalViews: realData.highestViewCount,
        contentPieces: realData.videoContentPieces,
        platforms: ["Instagram"],
      }
    : previewData.creatorStats;

  const strengths = hasRealData
    ? realData.strengths.map((s) => ({
        title: s.name,
        score: s.score,
        description: s.description,
        icon: Target,
        color: "text-green-600",
        bgColor: "bg-green-50",
      }))
    : previewData.strengths;

  const weaknesses = hasRealData
    ? realData.improvements.map((i) => ({
        title: i.name,
        score: i.score,
        description: i.description,
        improvement: i.suggestion,
        icon: Zap,
        color: "text-red-600",
        bgColor: "bg-red-50",
      }))
    : previewData.weaknesses;

  const recentPerformance = [
    {
      title: "LinkedIn Post - AI Productivity Tips",
      views: "12.3K",
      engagement: "8.2%",
      trend: "up",
      date: "2 days ago",
    },
    {
      title: "Instagram Reel - Morning Routine",
      views: "8.7K",
      engagement: "6.1%",
      trend: "up",
      date: "3 days ago",
    },
    {
      title: "YouTube Short - Code Review",
      views: "15.2K",
      engagement: "3.8%",
      trend: "down",
      date: "5 days ago",
    },
    {
      title: "LinkedIn Article - Remote Work",
      views: "6.1K",
      engagement: "12.4%",
      trend: "up",
      date: "1 week ago",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Success Indicator for Real Data */}
      {hasRealData && (
        <Card className="border-green-200 bg-green-50 rounded-2xl">
          <CardContent className="pt-4 text-center">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">
                Showing analysis results for{" "}
                <a
                  href={`https://instagram.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  @{username}
                </a>
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Creator Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className=" border-bg-sidebar rounded-lg shadow-none">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {creatorStats.totalFollowers}
            </div>
            <div className="text-sm text-gray-600">Total Followers</div>
          </CardContent>
        </Card>
        <Card className=" border-bg-sidebar rounded-lg shadow-none">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {creatorStats.avgEngagement}
            </div>
            <div className="text-sm text-gray-600">Avg Engagement</div>
          </CardContent>
        </Card>
        <Card className=" border-bg-sidebar rounded-lg shadow-none">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {creatorStats.totalViews}
            </div>
            <div className="text-sm text-gray-600">
              Max Number of Views for a Post
            </div>
          </CardContent>
        </Card>
        <Card className=" border-bg-sidebar rounded-lg shadow-none">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {creatorStats.contentPieces}
            </div>
            <div className="text-sm text-gray-600">Content Pieces</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <Card className=" border-bg-sidebar rounded-lg shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Your Strengths</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {strengths.map((strength, index) => {
              const Icon = strength.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100"
                >
                  <div className={`p-3 rounded-xl ${strength.bgColor}`}>
                    <Icon className={`w-5 h-5 ${strength.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{strength.title}</h4>
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        {strength.score}/100
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {strength.description}
                    </p>
                    <Progress
                      value={strength.score}
                      className="h-2 mt-2 bg-gray-100"
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card className=" border-bg-sidebar rounded-lg shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <span>Areas for Improvement</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weaknesses.map((weakness, index) => {
              const Icon = weakness.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl border border-gray-100"
                >
                  <div className={`p-3 rounded-xl ${weakness.bgColor}`}>
                    <Icon className={`w-5 h-5 ${weakness.color}`} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{weakness.title}</h4>
                        <Badge className="bg-red-100 text-red-700 border-red-200">
                          {weakness.score}/100
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">
                        {weakness.description}
                      </p>
                    </div>
                    <div className="p-2 mb-3 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-xs text-orange-700 font-medium">
                        💡 {weakness.improvement}
                      </p>
                    </div>
                    <Progress
                      value={weakness.score}
                      className="h-2 mt-2 bg-gray-100"
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recent Performance */}
      <Card className=" border-bg-sidebar rounded-lg shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Content Performance</CardTitle>
            <Button
              onClick={onViewVideoAnalysis}
              className=" text-white font-medium rounded-sm bg-orange-600 hover:bg-orange-700 transition-all duration-300"
            >
              Analyze Individual Videos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPerformance.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="font-semibold">{item.views}</div>
                    <div className="text-xs text-gray-500">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{item.engagement}</div>
                    <div className="text-xs text-gray-500">Engagement</div>
                  </div>
                  <div
                    className={`flex items-center space-x-1 ${
                      item.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.trend === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorOverview;
