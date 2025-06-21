
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Eye, Heart, MessageCircle, Share, Target, Clock, Zap } from "lucide-react";

interface CreatorOverviewProps {
  onViewVideoAnalysis: () => void;
}

const CreatorOverview = ({ onViewVideoAnalysis }: CreatorOverviewProps) => {
  const creatorStats = {
    totalFollowers: "127.3K",
    avgEngagement: "4.7%",
    totalViews: "2.1M",
    contentPieces: 156,
    platforms: ["Instagram", "YouTube", "LinkedIn"]
  };

  const strengths = [
    {
      title: "Hook Mastery",
      score: 87,
      description: "Exceptional at capturing attention in first 3 seconds",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Audience Retention",
      score: 82,
      description: "Strong mid-content engagement and watch-through rates",
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Community Building",
      score: 76,
      description: "Active comment engagement and follower interaction",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const weaknesses = [
    {
      title: "Call-to-Action",
      score: 34,
      description: "CTAs are weak and don't drive enough conversions",
      icon: Zap,
      color: "text-red-600",
      bgColor: "bg-red-50",
      improvement: "Add clearer, more compelling CTAs"
    },
    {
      title: "Posting Consistency",
      score: 41,
      description: "Irregular posting schedule hurts algorithm performance",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      improvement: "Establish consistent daily posting times"
    }
  ];

  const recentPerformance = [
    { title: "LinkedIn Post - AI Productivity Tips", views: "12.3K", engagement: "8.2%", trend: "up", date: "2 days ago" },
    { title: "Instagram Reel - Morning Routine", views: "8.7K", engagement: "6.1%", trend: "up", date: "3 days ago" },
    { title: "YouTube Short - Code Review", views: "15.2K", engagement: "3.8%", trend: "down", date: "5 days ago" },
    { title: "LinkedIn Article - Remote Work", views: "6.1K", engagement: "12.4%", trend: "up", date: "1 week ago" }
  ];

  return (
    <div className="space-y-8">
      {/* Creator Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-orange-100/50 rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{creatorStats.totalFollowers}</div>
            <div className="text-sm text-gray-600">Total Followers</div>
          </CardContent>
        </Card>
        <Card className="glass-effect border-orange-100/50 rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{creatorStats.avgEngagement}</div>
            <div className="text-sm text-gray-600">Avg Engagement</div>
          </CardContent>
        </Card>
        <Card className="glass-effect border-orange-100/50 rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{creatorStats.totalViews}</div>
            <div className="text-sm text-gray-600">Total Views</div>
          </CardContent>
        </Card>
        <Card className="glass-effect border-orange-100/50 rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{creatorStats.contentPieces}</div>
            <div className="text-sm text-gray-600">Content Pieces</div>
          </CardContent>
        </Card>
      </div>

      {/* Strengths */}
      <Card className="glass-effect border-orange-100/50 rounded-2xl">
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
              <div key={index} className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100">
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
                  <p className="text-sm text-gray-600">{strength.description}</p>
                  <Progress value={strength.score} className="h-2 mt-2 bg-gray-100" />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Weaknesses */}
      <Card className="glass-effect border-orange-100/50 rounded-2xl">
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
              <div key={index} className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100">
                <div className={`p-3 rounded-xl ${weakness.bgColor}`}>
                  <Icon className={`w-5 h-5 ${weakness.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{weakness.title}</h4>
                    <Badge className="bg-red-100 text-red-700 border-red-200">
                      {weakness.score}/100
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{weakness.description}</p>
                  <div className="p-2 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-xs text-orange-700 font-medium">💡 {weakness.improvement}</p>
                  </div>
                  <Progress value={weakness.score} className="h-2 mt-2 bg-gray-100" />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recent Performance */}
      <Card className="glass-effect border-orange-100/50 rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Content Performance</CardTitle>
            <Button 
              onClick={onViewVideoAnalysis}
              className="gradient-orange text-white font-medium rounded-xl"
            >
              Analyze Individual Videos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPerformance.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all">
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
                  <div className={`flex items-center space-x-1 ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.trend === 'up' ? (
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
