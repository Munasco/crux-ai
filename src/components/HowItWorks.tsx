
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Upload Your Content",
      description: "Paste a video URL or upload directly. Supports YouTube, TikTok, Instagram, and more.",
      color: "from-purple-500 to-purple-600"
    },
    {
      step: "02", 
      title: "Get Instant Diagnosis",
      description: "Our AI analyzes engagement patterns, timing, structure, and identifies specific performance issues.",
      color: "from-blue-500 to-blue-600"
    },
    {
      step: "03",
      title: "Receive Prescriptions",
      description: "Get actionable recommendations for fixes, optimal timing, and repurposing strategies.",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      step: "04",
      title: "Execute Workflows",
      description: "Run automated workflows to implement fixes, generate content, and schedule reposts.",
      color: "from-violet-500 to-violet-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Crux Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From content upload to optimization in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl`}>
                    {step.step}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-gray-400" />
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
