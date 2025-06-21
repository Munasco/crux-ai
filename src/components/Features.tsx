
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, MessageSquare, RefreshCw, Target, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Engagement Analysis",
      description: "Deep dive into retention curves, click-through rates, and audience drop-off points to understand exactly when and why viewers lose interest.",
      gradient: "from-orange-400 to-red-400"
    },
    {
      icon: Clock,
      title: "Timing Optimization",
      description: "Discover optimal posting times based on your audience's activity patterns and platform-specific engagement windows.",
      gradient: "from-orange-400 to-yellow-400"
    },
    {
      icon: MessageSquare,
      title: "Content Structure Insights",
      description: "AI-powered analysis of hooks, pacing, CTAs, and content flow to identify structural improvements.",
      gradient: "from-orange-500 to-pink-400"
    },
    {
      icon: RefreshCw,
      title: "Cross-Platform Repurposing",
      description: "Automatically generate LinkedIn posts, Twitter threads, and Instagram content from your existing videos.",
      gradient: "from-orange-400 to-amber-400"
    },
    {
      icon: Target,
      title: "Lead Generation Workflows",
      description: "Transform underperforming content into lead magnets with suggested CTAs and outreach strategies.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      title: "One-Click Remediation",
      description: "Execute suggested fixes with automated workflows for rescheduling, repurposing, and republishing content.",
      gradient: "from-orange-400 to-orange-600"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              optimize your content
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From diagnosis to remediation, Crux provides the complete toolkit for content optimization
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-orange-100/50 hover:shadow-xl transition-all duration-300 cursor-hover rounded-2xl glass-effect">
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed text-base">
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
