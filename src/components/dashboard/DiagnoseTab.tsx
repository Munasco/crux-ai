
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Eye, TrendingDown, Upload, Users, Calendar, Target, BarChart, Video } from "lucide-react";

const DiagnoseTab = () => {
  const [creatorHandle, setCreatorHandle] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 4000);
  };

  const creatorProfile = {
    handle: "@sarahcreates",
    followers: "47.2K",
    avgViews: "12.3K",
    engagementRate: "4.2%",
    contentPillars: ["Tech Reviews", "Lifestyle", "Productivity"],
    postingFrequency: "5x/week",
    peakTimes: ["2-4 PM EST", "7-9 PM EST"]
  };

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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-l-red-400 bg-red-50/50";
      case "medium": return "border-l-orange-400 bg-orange-50/50";
      default: return "border-l-yellow-400 bg-yellow-50/50";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Creator Profile Analysis</h2>
        <p className="text-gray-600 text-lg">Deep dive into your content ecosystem, audience, and performance patterns</p>
      </div>

      <Card className="glass-effect border-orange-100/50 rounded-2xl cursor-shadow">
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
            <Label htmlFor="creator-handle" className="text-base font-medium">Creator Handle or Profile URL</Label>
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
            disabled={!creatorHandle || isAnalyzing}
            className="w-full gradient-orange text-white font-semibold h-12 rounded-xl cursor-hover"
          >
            {isAnalyzing ? "Analyzing Creator Profile..." : "Analyze Complete Profile"}
          </Button>
          
          {isAnalyzing && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Analyzing content patterns, audience, and engagement...</span>
                <span>73%</span>
              </div>
              <Progress value={73} className="h-3 bg-orange-100" />
            </div>
          )}
        </CardContent>
      </Card>

      {showResults && (
        <div className="space-y-6 animate-fade-in">
          {/* Creator Profile Overview */}
          <Card className="gradient-pastel border-orange-200 rounded-2xl cursor-shadow">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{creatorProfile.followers}</div>
                  <div className="text-sm text-gray-600">Total Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{creatorProfile.avgViews}</div>
                  <div className="text-sm text-gray-600">Avg Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{creatorProfile.engagementRate}</div>
                  <div className="text-sm text-gray-600">Engagement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{creatorProfile.postingFrequency}</div>
                  <div className="text-sm text-gray-600">Posting Frequency</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700">Content Pillars:</span>
                {creatorProfile.contentPillars.map((pillar, index) => (
                  <Badge key={index} className="bg-orange-100 text-orange-700 border-orange-200">
                    {pillar}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <h3 className="text-2xl font-bold flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <span>Profile Performance Issues</span>
          </h3>
          
          {diagnosticResults.map((result, index) => (
            <Card key={index} className={`border-l-4 ${getSeverityColor(result.severity)} glass-effect rounded-2xl cursor-shadow`}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${result.gradient}`}>
                    <result.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg">{result.title}</h4>
                      <span className="text-sm font-semibold text-orange-600">{result.percentage}% impact</span>
                    </div>
                    <p className="text-gray-600 mb-2">{result.description}</p>
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-100 mb-4">
                      <p className="text-sm text-gray-700 font-medium">{result.insight}</p>
                    </div>
                    <div className="mt-4">
                      <Progress value={result.percentage} className="h-3 bg-orange-100" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="gradient-soft border-orange-200 rounded-2xl cursor-shadow">
            <CardContent className="pt-8 text-center">
              <h3 className="font-bold text-xl mb-3">Ready to optimize your creator strategy?</h3>
              <p className="text-gray-600 mb-6 text-lg">Get personalized recommendations based on your complete profile analysis</p>
              <Button className="gradient-orange text-white font-semibold px-8 py-3 rounded-xl cursor-hover">
                View Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DiagnoseTab;
