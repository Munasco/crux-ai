
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Upload Your Content",
      description: "Paste a video URL or upload directly. Supports YouTube, TikTok, Instagram, and more.",
      gradient: "from-orange-400 to-red-400"
    },
    {
      step: "02", 
      title: "Get Instant Diagnosis",
      description: "Our AI analyzes engagement patterns, timing, structure, and identifies specific performance issues.",
      gradient: "from-orange-400 to-yellow-400"
    },
    {
      step: "03",
      title: "Receive Prescriptions",
      description: "Get actionable recommendations for fixes, optimal timing, and repurposing strategies.",
      gradient: "from-orange-500 to-pink-400"
    },
    {
      step: "04",
      title: "Execute Workflows",
      description: "Run automated workflows to implement fixes, generate content, and schedule reposts.",
      gradient: "from-orange-400 to-orange-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 gradient-soft">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">
            How{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Crux Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From content upload to optimization in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full border-orange-100/50 hover:shadow-xl transition-all duration-300 cursor-hover rounded-2xl glass-effect">
                <CardHeader className="text-center pb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-lg`}>
                    {step.step}
                  </div>
                  <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-orange-500" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
