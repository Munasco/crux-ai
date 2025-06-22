import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Clock,
  Eye,
  TrendingDown,
  Upload,
  Users,
  Calendar,
  Target,
  BarChart,
  Video,
  Loader2,
  CheckCircle,
  AlertCircle,
  Instagram,
  ThumbsUp,
  ArrowRight,
} from "lucide-react";
import { useDashboardGeneration } from "@/hooks/useDashboardGeneration";

const DiagnoseTab = () => {
  const navigate = useNavigate();
  const [creatorHandle, setCreatorHandle] = useState("");
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { generateDashboard, isGenerating, generateError, pollStatus } =
    useDashboardGeneration();
  const statusQuery = pollStatus(currentJobId!);

  useEffect(() => {
    if (statusQuery.data && statusQuery.data.status === "completed") {
      const username = creatorHandle.replace(/^@/, "").trim();

      // Show success message first
      setShowSuccessMessage(true);

      // Navigate to the creator's dashboard after a longer delay for better UX
      // This gives more time for data to be saved to Firestore
      setTimeout(() => {
        navigate(`/dashboard/${username}`);
      }, 3000); // Increased from 1 second to 3 seconds
    }
  }, [statusQuery.data, navigate, creatorHandle]);

  const handleAnalyze = () => {
    if (!creatorHandle.trim()) return;

    // Clean username (remove @ if present)
    const cleanUsername = creatorHandle.replace(/^@/, "").trim();

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
        console.log(statusQuery.data);
        return "Analysis completed successfully!";
      case "error":
        return "Analysis failed. Please try again.";
      default:
        return "Processing...";
    }
  };

  const resetAnalysis = () => {
    setCurrentJobId(null);
    setCreatorHandle("");
  };

  const getDisplayProgress = (status: string, progress: number): number => {
    if (status === "completed") {
      return 100;
    }
    switch (progress) {
      case 25:
        return 0;
      case 50:
        return 25;
      case 75:
        return 50;
      case 100: // This state is brief, just before 'completed'
        return 75;
      default:
        return 0; // Default for starting (progress: 0)
    }
  };

  // Mock data for demonstration (commented out but kept for reference)
  /*
  const creatorProfile = {
    handle: "@sarahcreates",
    followers: "47.2K",
    avgViews: "12.3K",
    engagementRate: "4.2%",
    contentPillars: ["Tech Reviews", "Lifestyle", "Productivity"],
    postingFrequency: "5x/week",
    peakTimes: ["2-4 PM EST", "7-9 PM EST"]
  };
  */

  // Mock diagnostic results (commented out but kept for reference)
  /*
  const diagnosticResults = [
    {
      icon: TrendingDown,
      title: "Declining Engagement Trend",
      severity: "high",
      description: "30% drop in engagement over last 4 weeks across all platforms",
      percentage: 78,
      gradient: "from-red-400 to-orange-400",
      insight: "Your audience is becoming less responsive to your current content mix"
    },
    {
      icon: Clock,
      title: "Suboptimal Content Timing",
      severity: "medium", 
      description: "Missing 60% of your audience's active hours consistently",
      percentage: 55,
      gradient: "from-orange-400 to-yellow-400",
      insight: "Your posting schedule doesn't align with follower activity patterns"
    },
    {
      icon: Target,
      title: "Content Pillar Imbalance",
      severity: "medium",
      description: "85% tech content, but lifestyle posts get 3x more engagement",
      percentage: 42,
      gradient: "from-orange-400 to-amber-400",
      insight: "Your highest-performing content type is underrepresented"
    },
    {
      icon: Users,
      title: "Audience Mismatch",
      severity: "high",
      description: "Creating for 25-35 age group, but 60% of followers are 18-25",
      percentage: 71,
      gradient: "from-red-500 to-pink-400",
      insight: "Content doesn't match your actual audience demographics"
    }
  ];
  */

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-l-red-400 bg-red-50/50";
      case "medium":
        return "border-l-orange-400 bg-orange-50/50";
      default:
        return "border-l-yellow-400 bg-yellow-50/50";
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div className=" mb-12">
        <h2 className="text-3xl font-semibold text-slate-900">
          Creator Profile Analysis
        </h2>
        <p className="text-slate-500">
          Deep dive into your content ecosystem, audience, and performance
          patterns
        </p>
      </div>

      <Card className="border-bg-sidebar rounded-lg shadow-none w-1/2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span>Analyze Creator Profile</span>
          </CardTitle>
          <CardDescription className="text-base">
            Enter your social handle to analyze your complete creator ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="creator-handle" className="text-base font-medium">
              Creator Handle or Profile URL
            </Label>
            <Input
              id="creator-handle"
              placeholder="@yourhandle or profile URL..."
              value={creatorHandle}
              onChange={(e) => setCreatorHandle(e.target.value)}
              className="mt-2 h-12 rounded-xl border-orange-200 focus:border-orange-400"
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={!creatorHandle || isGenerating}
            className="w-full gradient-orange text-white font-semibold h-12 rounded-xl cursor-hover"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting Analysis...
              </>
            ) : (
              "Analyze Instagram Profile"
            )}
          </Button>

          {generateError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">
                Error: {generateError.message}
              </p>
            </div>
          )}

          {currentJobId && statusQuery.data && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  {getStatusIcon(statusQuery.data.status)}
                  {getStatusMessage(statusQuery.data.status)}
                </span>
                <span>
                  {getDisplayProgress(
                    statusQuery.data.status,
                    statusQuery.data.progress
                  )}
                  %
                </span>
              </div>
              <Progress
                value={getDisplayProgress(
                  statusQuery.data.status,
                  statusQuery.data.progress
                )}
                className="h-3 bg-orange-100"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {statusQuery.data &&
        statusQuery.data.status === "completed" &&
        statusQuery.data.data && (
          <div className="space-y-6 animate-fade-in">
            {/* Success Message */}
            {showSuccessMessage && (
              <Card className="border-green-200 bg-green-50 rounded-2xl animate-pulse">
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2 text-green-800">
                    Analysis Complete! 🎉
                  </h3>
                  <p className="text-green-700 mb-4 text-lg">
                    Your Instagram profile has been analyzed successfully.
                    Redirecting you to your personalized dashboard...
                  </p>
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Preparing your dashboard</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Creator Profile Overview */}
            <Card className="gradient-pastel border-orange-200 rounded-2xl cursor-shadow">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {statusQuery.data.data.totalFollowers}
                    </div>
                    <div className="text-sm text-gray-600">Total Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {statusQuery.data.data.avgEngagement}
                    </div>
                    <div className="text-sm text-gray-600">Avg Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {statusQuery.data.data.highestViewCount}
                    </div>
                    <div className="text-sm text-gray-600">Highest Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {statusQuery.data.data.videoContentPieces}
                    </div>
                    <div className="text-sm text-gray-600">Video Content</div>
                  </div>
                </div>

                {/* Strengths */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Content Strengths:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {statusQuery.data.data.strengths.map((strength, index) => (
                      <Badge
                        key={index}
                        className="bg-green-100 text-green-700 border-green-200"
                      >
                        {strength.name} ({strength.score}%)
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Improvements */}
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Areas for Improvement:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {statusQuery.data.data.improvements.map(
                      (improvement, index) => (
                        <Badge
                          key={index}
                          className="bg-orange-100 text-orange-700 border-orange-200"
                        >
                          {improvement.name} ({improvement.score}%)
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Strengths Analysis */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center space-x-3">
                <ThumbsUp className="w-6 h-6 text-green-500" />
                <span>Content Strengths</span>
              </h3>
              {statusQuery.data.data.strengths.map((strength, index) => (
                <Card
                  key={`strength-${index}`}
                  className="border-l-4 border-green-400 bg-green-50/50 glass-effect rounded-2xl cursor-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-green-400 to-teal-400">
                        <ThumbsUp className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg">{strength.name}</h4>
                          <span className="text-sm font-semibold text-green-600">
                            {strength.score}/100 score
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          {strength.description}
                        </p>
                        <div className="mt-4">
                          <Progress
                            value={strength.score}
                            className="h-3 [&>div]:bg-green-400"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Improvements Analysis */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <span>Areas for Improvement</span>
              </h3>
              {statusQuery.data.data.improvements.map((improvement, index) => (
                <Card
                  key={`improvement-${index}`}
                  className="border-l-4 border-orange-400 bg-orange-50/50 glass-effect rounded-2xl cursor-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-400">
                        <TrendingDown className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg">
                            {improvement.name}
                          </h4>
                          <span className="text-sm font-semibold text-orange-600">
                            {improvement.score}/100 score
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          {improvement.description}
                        </p>
                        {improvement.suggestion && (
                          <div className="p-3 bg-orange-50 rounded-lg border border-orange-100 mb-4">
                            <p className="text-sm text-gray-700 font-medium">
                              Suggestion: {improvement.suggestion}
                            </p>
                          </div>
                        )}
                        <div className="mt-4">
                          <Progress value={improvement.score} className="h-3" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="gradient-soft border-orange-200 rounded-2xl cursor-shadow">
              <CardContent className="pt-8 text-center">
                <h3 className="font-bold text-xl mb-3">
                  Ready to optimize your creator strategy?
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Get personalized recommendations based on your complete
                  profile analysis
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={resetAnalysis}
                    variant="outline"
                    className="px-6 py-3 rounded-xl"
                  >
                    Analyze Another Profile
                  </Button>
                  <Button className="gradient-orange text-white font-semibold px-8 py-3 rounded-xl cursor-hover">
                    Get Personalized Recommendations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      {statusQuery.data && statusQuery.data.status === "error" && (
        <Card className="border-red-200 bg-red-50 rounded-2xl">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2 text-red-800">
              Analysis Failed
            </h3>
            <p className="text-red-700 mb-4">
              There was an error processing your Instagram profile. Please try
              again.
            </p>
            <Button
              onClick={resetAnalysis}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiagnoseTab;
