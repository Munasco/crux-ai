
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, MessageSquare, RefreshCw, Target, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Engagement Analysis",
      description: "Deep dive into retention curves, click-through rates, and audience drop-off points to understand exactly when and why viewers lose interest."
    },
    {
      icon: Clock,
      title: "Timing Optimization",
      description: "Discover optimal posting times based on your audience's activity patterns and platform-specific engagement windows."
    },
    {
      icon: MessageSquare,
      title: "Content Structure Insights",
      description: "AI-powered analysis of hooks, pacing, CTAs, and content flow to identify structural improvements."
    },
    {
      icon: RefreshCw,
      title: "Cross-Platform Repurposing",
      description: "Automatically generate LinkedIn posts, Twitter threads, and Instagram content from your existing videos."
    },
    {
      icon: Target,
      title: "Lead Generation Workflows",
      description: "Transform underperforming content into lead magnets with suggested CTAs and outreach strategies."
    },
    {
      icon: Zap,
      title: "One-Click Remediation",
      description: "Execute suggested fixes with automated workflows for rescheduling, repurposing, and republishing content."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              optimize your content
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From diagnosis to remediation, Crux provides the complete toolkit for content optimization
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
