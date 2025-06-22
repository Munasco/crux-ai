import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Instagram, Linkedin, Twitter, Youtube, ArrowRight } from "lucide-react";

interface Platform {
  id: string;
  name: string;
  icon: any;
  color: string;
  gradient: string;
  description: string;
  metrics: string[];
}

interface PlatformSelectionProps {
  onPlatformsSelected: (platforms: string[]) => void;
}

const PlatformSelection = ({ onPlatformsSelected }: PlatformSelectionProps) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms: Platform[] = [
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-600",
      gradient: "from-pink-400 to-purple-500",
      description: "Analyze posts, stories, reels engagement",
      metrics: ["Engagement Rate", "Reach", "Story Views", "Reel Performance"]
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      color: "text-red-600",
      gradient: "from-red-400 to-red-600",
      description: "Deep video analytics and audience insights",
      metrics: ["Watch Time", "CTR", "Retention", "Subscriber Growth"]
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Linkedin,
      color: "text-blue-600",
      gradient: "from-blue-400 to-blue-600",
      description: "Professional content and network analysis",
      metrics: ["Post Impressions", "Profile Views", "Connection Growth", "Engagement"]
    },
    {
      id: "twitter",
      name: "Twitter/X",
      icon: Twitter,
      color: "text-slate-800",
      gradient: "from-slate-600 to-slate-800",
      description: "Tweet performance and audience insights",
      metrics: ["Impressions", "Retweets", "Replies", "Profile Clicks"]
    }
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleContinue = () => {
    if (selectedPlatforms.length > 0) {
      onPlatformsSelected(selectedPlatforms);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 flex flex-col">
      <div >
        <h1 className="text-4xl font-bold mb-2">
          Connect Your Creator{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Profiles
          </span>
        </h1>
        <p className="text-gray-600 text-lg">
          Select at least one platform to start analyzing your creator ecosystem
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  space-x-2 space-y-2">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isSelected = selectedPlatforms.includes(platform.id);

          return (
            <div
              key={platform.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl p-6 ${isSelected
                ? 'ring-2 ring-orange-400 shadow scale-105'
                : 'hover:scale-102'
                } border-2 border-slate-100 rounded-2xl bg-white`}
              onClick={() => togglePlatform(platform.id)}
            >
              <div className="pb-2">
                <div className="flex items-center justify-between ">
                  <div className="flex flex-col items-start justify-center gap-2">
                    <div className={`p-3 rounded-md bg-gradient-to-br ${platform.gradient}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-medium text-[#210F06]">{platform.name}</h3>
                  </div>
                  {isSelected && (
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">{platform.description}</p>
                <div className="flex flex-wrap gap-2">
                  {platform.metrics.map((metric, index) => (
                    <Badge key={index} className="bg-orange-50 text-orange-700 border-orange-200">
                      {metric}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <Button
          onClick={handleContinue}
          disabled={selectedPlatforms.length === 0}
          className="bg-orange-500 text-white font-semibold px-8 py-4 rounded-xl cursor-hover"
          size="lg"
        >
          Continue with {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}
          <ArrowRight className="ml-3 w-5 h-5" />
        </Button>

        {selectedPlatforms.length === 0 && (
          <p className="text-sm text-gray-500 mt-3">
            Select at least one platform to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default PlatformSelection;
