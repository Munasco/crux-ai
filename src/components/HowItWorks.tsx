import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Upload Your Content",
      description: "Paste a video URL or upload directly. Supports YouTube, TikTok, Instagram, and more.",
      gradient: "from-orange-400 to-red-400"
    },
    {
      step: "2",
      title: "Get Instant Diagnosis",
      description: "Our AI analyzes engagement patterns, timing, structure, and identifies specific performance issues.",
      gradient: "from-orange-400 to-yellow-400"
    },
    {
      step: "3",
      title: "Receive Prescriptions",
      description: "Get actionable recommendations for fixes, optimal timing, and repurposing strategies.",
      gradient: "from-orange-500 to-pink-400"
    },
    {
      step: "4",
      title: "Execute Workflows",
      description: "Run automated workflows to implement fixes, generate content, and schedule reposts.",
      gradient: "from-orange-400 to-orange-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 mb-12">
      <div className="container flex flex-row items-start justify-center mx-auto gap-16 px-6">
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-lg font-light text-gray-200">How It Works</span>
          </div>
          <img src="/logo.png" alt="Crux" className="w-64 h-64 opacity-15" />
          <p className="text-xl text-[#A27E6D] max-w-3xl leading-relaxed">
            From content upload to optimization in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="h-full border border-[#A27E6D] p-6">
                <div className="pb-4">
                  <div className="flex flex-col items-start gap-3">
                    <div className="text-2xl py-3 px-5 bg-orange-600 font-bold text-white">{step.step}
                    </div>
                    <h3 className="text-xl font-semibold tracking-wide text-orange-300">{step.title}</h3>
                  </div>
                </div>
                <div>
                  <p className="text-[#A27E6D] leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
