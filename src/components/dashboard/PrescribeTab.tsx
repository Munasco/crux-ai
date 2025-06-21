
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
      details: "Based on your audience analysis, posting at 2 PM could increase engagement by 45%"
    },
    {
      icon: RefreshCw,
      title: "LinkedIn Repurpose",
      category: "Repurposing",
      impact: "High",
      description: "Transform into a professional LinkedIn post with key takeaways",
      action: "Generate Post",
      details: "This content would perform well as educational content on LinkedIn"
    },
    {
      icon: Target,
      title: "Twitter Thread",
      category: "Repurposing",
      impact: "Medium",
      description: "Break down into a 5-part Twitter thread with engaging hooks",
      action: "Create Thread",
      details: "Your video's key points would make an excellent educational thread"
    },
    {
      icon: TrendingUp,
      title: "Lead Generation CTA",
      category: "Conversion",
      impact: "Medium",
      description: "Add a lead magnet offer to capture interested viewers",
      action: "Generate CTA",
      details: "Offer a free resource related to your video topic"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAction = (action: string) => {
    console.log(`Executing action: ${action}`);
    // This would trigger the actual workflow
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Recommended Fixes</h2>
        <p className="text-gray-600">Actionable strategies to improve your content performance</p>
      </div>

      <div className="grid gap-6">
        {recommendations.map((rec, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
                    <rec.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                    <CardDescription className="mt-1">{rec.category}</CardDescription>
                  </div>
                </div>
                <Badge className={getImpactColor(rec.impact)}>
                  {rec.impact} Impact
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{rec.description}</p>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{rec.details}</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => handleAction(rec.action)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {rec.action}
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Ready to implement these fixes?</h3>
            <p className="text-gray-600 mb-4">Move to the Remediate tab to execute these workflows automatically</p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Go to Remediate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescribeTab;
