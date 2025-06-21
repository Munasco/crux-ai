
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Copy, RefreshCw, Target, TrendingUp } from "lucide-react";

const PrescribeTab = () => {
  const recommendations = [
    {
      icon: Clock,
      title: "Optimal Repost Time",
      category: "Timing",
      impact: "High",
      description: "Repost this content at 2:00 PM EST when your audience is most active",
      action: "Schedule Repost",
      details: "Based on your audience analysis, posting at 2 PM could increase engagement by 45%",
      gradient: "from-orange-400 to-yellow-400"
    },
    {
      icon: RefreshCw,
      title: "LinkedIn Repurpose",
      category: "Repurposing",
      impact: "High",
      description: "Transform into a professional LinkedIn post with key takeaways",
      action: "Generate Post",
      details: "This content would perform well as educational content on LinkedIn",
      gradient: "from-orange-400 to-red-400"
    },
    {
      icon: Target,
      title: "Twitter Thread",
      category: "Repurposing",
      impact: "Medium",
      description: "Break down into a 5-part Twitter thread with engaging hooks",
      action: "Create Thread",
      details: "Your video's key points would make an excellent educational thread",
      gradient: "from-orange-500 to-pink-400"
    },
    {
      icon: TrendingUp,
      title: "Lead Generation CTA",
      category: "Conversion",
      impact: "Medium",
      description: "Add a lead magnet offer to capture interested viewers",
      action: "Generate CTA",
      details: "Offer a free resource related to your video topic",
      gradient: "from-orange-400 to-orange-600"
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
        <h2 className="text-3xl font-bold mb-4">Recommended Fixes</h2>
        <p className="text-gray-600 text-lg">Actionable strategies to improve your content performance</p>
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
                <Badge className={`${getImpactColor(rec.impact)} font-medium px-3 py-1 rounded-lg`}>
                  {rec.impact} Impact
                </Badge>
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
                  Copy Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="gradient-pastel border-orange-200 rounded-2xl cursor-shadow">
        <CardContent className="pt-8 text-center">
          <h3 className="font-bold text-xl mb-3">Ready to implement these fixes?</h3>
          <p className="text-gray-600 mb-6 text-lg">Move to the Remediate tab to execute these workflows automatically</p>
          <Button className="gradient-orange text-white font-semibold px-8 py-3 rounded-xl cursor-hover">
            Go to Remediate
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescribeTab;
