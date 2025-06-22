import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sparkles, 
  Copy, 
  CheckCircle, 
  Loader2, 
  Target, 
  Users, 
  TrendingUp,
  Zap
} from "lucide-react";

interface PitchGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  brand: {
    name: string;
    industry: string;
    description: string;
  };
  userData: {
    recentVideo: string;
    audienceSize: string;
    engagementRate: string;
    topPerformingContent: string;
  };
}

export function PitchGenerator({ isOpen, onClose, brand, userData }: PitchGeneratorProps) {
  const [generatedPitch, setGeneratedPitch] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pitchStyle, setPitchStyle] = useState("professional");

  const generatePitch = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const pitches = {
        professional: `Hi ${brand.name} team!

I'm a content creator in the ${brand.industry} space, and I recently analyzed my top-performing video "${userData.recentVideo}" which achieved ${userData.engagementRate} engagement with my ${userData.audienceSize} audience.

My content focuses on ${userData.topPerformingContent}, and I believe there's a perfect alignment between what I create and ${brand.name}'s mission to ${brand.description.toLowerCase()}.

I'd love to discuss how we could create authentic content that showcases ${brand.name} in a way that resonates with my engaged community. I'm particularly excited about the opportunity to demonstrate how your products/services can enhance my audience's daily lives.

Would you be open to a brief call to explore potential collaboration opportunities?

Best regards,
[Your Name]`,

        casual: `Hey ${brand.name}! 👋

I'm a creator who's been crushing it with content about ${userData.topPerformingContent} - my recent video "${userData.recentVideo}" hit ${userData.engagementRate} engagement with my ${userData.audienceSize} followers!

I've been following ${brand.name} for a while and love how you're ${brand.description.toLowerCase()}. I think my audience would absolutely love what you're doing.

I'd love to chat about creating some authentic content together. My followers trust my recommendations, and I only partner with brands I genuinely believe in.

Let's make something awesome happen! 🚀

[Your Name]`,

        data_driven: `Subject: Partnership Opportunity - ${userData.audienceSize} Engaged Audience in ${brand.industry}

Hi ${brand.name} Partnership Team,

I'm reaching out with a data-driven partnership opportunity that could deliver significant value for ${brand.name}.

RECENT PERFORMANCE:
• Video: "${userData.recentVideo}"
• Engagement Rate: ${userData.engagementRate}
• Audience Size: ${userData.audienceSize}
• Content Focus: ${userData.topPerformingContent}

ALIGNMENT OPPORTUNITY:
${brand.name}'s focus on ${brand.description.toLowerCase()} perfectly complements my audience's interests in ${userData.topPerformingContent}.

PROPOSED COLLABORATION:
I'd like to create authentic content that demonstrates how ${brand.name} enhances the daily lives of my engaged community, with measurable results and transparent reporting.

Would you be available for a 15-minute call to discuss this opportunity?

Best regards,
[Your Name]`
      };

      setGeneratedPitch(pitches[pitchStyle as keyof typeof pitches]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span>Generate Custom Pitch for {brand.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Data Summary */}
          <Card className="border-bg-sidebar">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2 text-orange-500" />
                Your Content Analysis
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Recent Video:</span>
                  <p className="font-medium">{userData.recentVideo}</p>
                </div>
                <div>
                  <span className="text-gray-500">Audience:</span>
                  <p className="font-medium">{userData.audienceSize}</p>
                </div>
                <div>
                  <span className="text-gray-500">Engagement:</span>
                  <p className="font-medium">{userData.engagementRate}</p>
                </div>
                <div>
                  <span className="text-gray-500">Content Focus:</span>
                  <p className="font-medium">{userData.topPerformingContent}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pitch Style Selection */}
          <div>
            <h3 className="font-semibold mb-3">Choose Your Pitch Style</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                variant={pitchStyle === "professional" ? "default" : "outline"}
                onClick={() => setPitchStyle("professional")}
                className="h-auto p-4 flex flex-col items-start space-y-2 border-bg-sidebar"
              >
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Professional</span>
                </div>
                <span className="text-xs text-left">Formal, business-focused approach</span>
              </Button>
              
              <Button
                variant={pitchStyle === "casual" ? "default" : "outline"}
                onClick={() => setPitchStyle("casual")}
                className="h-auto p-4 flex flex-col items-start space-y-2 border-bg-sidebar"
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">Casual</span>
                </div>
                <span className="text-xs text-left">Friendly, conversational tone</span>
              </Button>
              
              <Button
                variant={pitchStyle === "data_driven" ? "default" : "outline"}
                onClick={() => setPitchStyle("data_driven")}
                className="h-auto p-4 flex flex-col items-start space-y-2 border-bg-sidebar"
              >
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">Data-Driven</span>
                </div>
                <span className="text-xs text-left">Metrics and results focused</span>
              </Button>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <Button
              onClick={generatePitch}
              disabled={isGenerating}
              className="bg-orange-600 hover:bg-orange-700 px-8"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Pitch...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Custom Pitch
                </>
              )}
            </Button>
          </div>

          {/* Generated Pitch */}
          {generatedPitch && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Your Custom Pitch</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="border-orange-200 text-orange-600"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Pitch
                    </>
                  )}
                </Button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border">
                <Textarea
                  value={generatedPitch}
                  readOnly
                  className="min-h-[200px] border-0 bg-transparent resize-none"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                  Send Pitch
                </Button>
                <Button variant="outline" className="flex-1 border-orange-200 text-orange-600">
                  Save Template
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 