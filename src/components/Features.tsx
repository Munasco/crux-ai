import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, MessageSquare, RefreshCw, Target, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Engagement Analysis",
      description: "Deep dive into retention curves, click-through rates, and audience drop-off points to understand exactly when and why viewers lose interest.",
      gradient: "from-orange-400 to-red-400",
      image: "/placeholder.svg"
    },
    {
      icon: Clock,
      title: "Timing Optimization",
      description: "Discover optimal posting times based on your audience's activity patterns and platform-specific engagement windows.",
      gradient: "from-orange-400 to-yellow-400",
      image: "/placeholder.svg"
    },
    {
      icon: MessageSquare,
      title: "Content Structure Insights",
      description: "AI-powered analysis of hooks, pacing, CTAs, and content flow to identify structural improvements.",
      gradient: "from-orange-500 to-pink-400",
      image: "/placeholder.svg"
    },
    {
      icon: RefreshCw,
      title: "Cross-Platform Repurposing",
      description: "Automatically generate LinkedIn posts, Twitter threads, and Instagram content from your existing videos.",
      gradient: "from-orange-400 to-amber-400",
      image: "/placeholder.svg"
    },
    {
      icon: Target,
      title: "Lead Generation Workflows",
      description: "Transform underperforming content into lead magnets with suggested CTAs and outreach strategies.",
      gradient: "from-orange-500 to-red-500",
      image: "/placeholder.svg"
    },
    {
      icon: Zap,
      title: "One-Click Remediation",
      description: "Execute suggested fixes with automated workflows for rescheduling, repurposing, and republishing content.",
      gradient: "from-orange-400 to-orange-600",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section id="features" className="py-24 px-10 mx-4 rounded-xl bg-white">
      <div className="mx-auto px-6 flex flex-row justify-between items-start gap-16">
        {/* Fixed Side Text */}
        <div className="sticky top-24 w-1/3 flex-shrink-0">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-[#210F06] rounded-full"></div>
            <span className="text-lg font-light text-gray-500">Features</span>
          </div>
          <h2 className="text-4xl tracking-tight font-bold mb-6">
            Everything you need to{" "}
            <span className="bg-gray-400 bg-clip-text text-transparent tracking-tight">
              optimize your content
            </span>
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            From diagnosis to remediation, Crux provides the complete toolkit for content optimization
          </p>
        </div>
        
        {/* Scrollable Bento Grid */}
        <div className="w-2/3 flex-shrink-0">
          <div className="grid grid-cols-3 gap-4 auto-rows-fr">
            {/* Row 1: 2 cards */}
            <Card className="col-span-1 border-orange-100/50 hover:shadow-xl transition-all duration-300 cursor-hover rounded-2xl glass-effect">
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${features[0].gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{features[0].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed text-base">
                  {features[0].description}
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 border-orange-100/50 hover:shadow-xl transition-all duration-300 cursor-hover rounded-2xl glass-effect">
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${features[1].gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{features[1].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed text-base">
                  {features[1].description}
                </CardDescription>
              </CardContent>
            </Card>

            {/* Row 2: 1 card (centered) */}
            <Card className="col-span-1 col-start-2 border-orange-100/50 hover:shadow-xl transition-all duration-300 cursor-hover rounded-2xl glass-effect">
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${features[2].gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{features[2].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed text-base">
                  {features[2].description}
                </CardDescription>
              </CardContent>
            </Card>

            {/* Row 3: 2 cards */}
            <Card className="col-span-1 border-orange-100/50 hover:shadow-xl transition-all duration-300 cursor-hover rounded-2xl glass-effect">
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${features[3].gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <RefreshCw className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{features[3].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed text-base">
                  {features[3].description}
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 border-orange-100/50 hover:shadow-xl transition-all duration-300 cursor-hover rounded-2xl glass-effect">
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${features[4].gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <Target className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{features[4].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed text-base">
                  {features[4].description}
                </CardDescription>
              </CardContent>
            </Card>

            {/* Image Space */}
            <div className="col-span-1 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">{features[5].title}</h3>
                <p className="text-sm text-gray-600 mt-2">{features[5].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
