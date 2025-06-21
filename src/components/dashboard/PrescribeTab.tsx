
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Copy, RefreshCw, Target, TrendingUp, Users, Calendar, BarChart3, Zap } from "lucide-react";

const PrescribeTab = () => {
  const recommendations = [
    {
      icon: TrendingUp,
      title: "Content Mix Rebalancing",
      category: "Strategy",
      impact: "High",
      description: "Increase lifestyle content to 40% of your posting schedule",
      action: "Generate Content Calendar",
      details: "Your lifestyle posts get 3x engagement but only make up 15% of content. Rebalancing could increase overall engagement by 85%",
      gradient: "from-orange-400 to-yellow-400",
      metrics: "Potential +85% engagement"
    },
    {
      icon: Clock,
      title: "Optimal Posting Schedule",
      category: "Timing",
      impact: "High", 
      description: "Shift 70% of posts to 2-4 PM and 7-9 PM EST windows",
      action: "Create Schedule Template",
      details: "Your audience is 4x more active during these windows. Currently missing 60% of peak engagement opportunities",
      gradient: "from-orange-400 to-red-400",
      metrics: "Potential +120% reach"
    },
    {
      icon: Users,
      title: "Audience Realignment",
      category: "Demographics",
      impact: "High",
      description: "Create content targeting 18-25 age group (60% of your followers)",
      action: "Generate Audience Personas",
      details: "Your content targets 25-35 but most followers are 18-25. Alignment could dramatically improve engagement",
      gradient: "from-orange-500 to-pink-400",
      metrics: "Potential +90% engagement"
    },
    {
      icon: RefreshCw,
      title: "Cross-Platform Optimization",
      category: "Distribution",
      impact: "Medium",
      description: "Repurpose top performers across TikTok, Instagram, and YouTube Shorts",
      action: "Setup Repurposing Workflow",
      details: "Your viral content isn't being leveraged across platforms. Multi-platform strategy could 3x your reach",
      gradient: "from-orange-400 to-orange-600",
      metrics: "Potential +200% reach"
    },
    {
      icon: Target,
      title: "Creator Collaboration Strategy",
      category: "Growth",
      impact: "Medium",
      description: "Partner with 3-5 creators in complementary niches for audience expansion",
      action: "Find Collaboration Matches",
      details: "Creators with similar engagement rates in lifestyle/productivity niches for mutual growth",
      gradient: "from-orange-400 to-amber-400",
      metrics: "Potential +50% new followers"
    },
    {
      icon: Zap,
      title: "Engagement Boost Tactics",
      category: "Engagement",
      impact: "Medium",
      description: "Implement proven engagement hooks and CTAs based on your top performers",
      action: "Generate Hook Templates",
      details: "Analysis of your top 10 posts reveals specific patterns that drive 5x more comments",
      gradient: "from-orange-500 to-red-500",
      metrics: "Potential +150% comments"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-green-100 text-green-700 border-green-200";
      case "Medium": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleAction = (action: string) => {
    console.log(`Executing action: ${action}`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Strategic Recommendations</h2>
        <p className="text-gray-600 text-lg">Data-driven strategies to optimize your entire creator ecosystem</p>
      </div>

      <div className="grid gap-6">
        {recommendations.map((rec, index) => (
          <Card key={index} className="hover:shadow-xl transition-all duration-300 cursor-hover glass-effect border-orange-100/50 rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 bg-gradient-to-br ${rec.gradient} rounded-xl`}>
                    <rec.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{rec.title}</CardTitle>
                    <CardDescription className="mt-2 text-base">{rec.category}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getImpactColor(rec.impact)} font-medium px-3 py-1 rounded-lg mb-2`}>
                    {rec.impact} Impact
                  </Badge>
                  <div className="text-xs text-orange-600 font-semibold">{rec.metrics}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-gray-700 text-base">{rec.description}</p>
              <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                <p className="text-sm text-gray-600">{rec.details}</p>
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={() => handleAction(rec.action)}
                  className="gradient-orange text-white font-medium rounded-xl cursor-hover px-6"
                >
                  {rec.action}
                </Button>
                <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl">
                  <Copy className="w-4 h-4 mr-2" />
                  Save Strategy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="gradient-pastel border-orange-200 rounded-2xl cursor-shadow">
        <CardContent className="pt-8 text-center">
          <h3 className="font-bold text-xl mb-3">Ready to implement these strategies?</h3>
          <p className="text-gray-600 mb-6 text-lg">Move to Remediate to execute these optimization workflows</p>
          <Button className="gradient-orange text-white font-semibold px-8 py-3 rounded-xl cursor-hover">
            Execute Strategies
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescribeTab;
