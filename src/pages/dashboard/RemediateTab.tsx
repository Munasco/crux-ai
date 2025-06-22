
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Copy, ExternalLink, Play, Send, Calendar, Users, BarChart3, Target } from "lucide-react";

const RemediateTab = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState("");

  const workflows = [
    {
      id: "content-calendar",
      title: "30-Day Content Calendar",
      description: "Generate optimized posting schedule with content mix rebalancing",
      status: "ready",
      estimatedTime: "3 min",
      gradient: "from-orange-400 to-red-400",
      icon: Calendar,
      impact: "+85% engagement potential"
    },
    {
      id: "audience-personas", 
      title: "Audience Persona Generator",
      description: "Create detailed profiles for your 18-25 demographic majority",
      status: "ready",
      estimatedTime: "4 min",
      gradient: "from-orange-400 to-yellow-400",
      icon: Users,
      impact: "+90% relevance boost"
    },
    {
      id: "posting-schedule",
      title: "Optimal Posting Schedule",
      description: "Setup automated posting for peak engagement windows",
      status: "ready",
      estimatedTime: "2 min",
      gradient: "from-orange-500 to-pink-400",
      icon: Clock,
      impact: "+120% reach potential"
    },
    {
      id: "collaboration-matches",
      title: "Creator Collaboration Finder",
      description: "Find and outreach to complementary creators for partnerships",
      status: "ready",
      estimatedTime: "6 min",
      gradient: "from-orange-400 to-orange-600",
      icon: Target,
      impact: "+50% follower growth"
    },
    {
      id: "engagement-templates",
      title: "High-Performance Templates",
      description: "Generate hooks, CTAs, and formats based on your top content",
      status: "ready",
      estimatedTime: "3 min",
      gradient: "from-orange-500 to-red-500",
      icon: BarChart3,
      impact: "+150% engagement"
    }
  ];

  const contentCalendar = `📅 30-DAY OPTIMIZED CONTENT CALENDAR

🎯 CONTENT MIX STRATEGY:
→ Lifestyle: 40% (12 posts) - Your highest engagement category
→ Tech Reviews: 35% (11 posts) - Your expertise area  
→ Productivity: 25% (7 posts) - Growing interest from audience

⏰ OPTIMAL POSTING SCHEDULE:
→ Monday/Wednesday/Friday: 2:00 PM EST
→ Tuesday/Thursday: 7:30 PM EST
→ Weekends: 11:00 AM EST

📈 WEEK 1 FOCUS: Lifestyle Content Boost
- Day 1: "My 5 AM Morning Routine" (lifestyle)
- Day 3: "Best Apps for Productivity" (tech/productivity blend)
- Day 5: "Weekend Reset Rituals" (lifestyle)

📊 EXPECTED RESULTS:
- 85% increase in overall engagement
- 120% increase in reach during peak times
- Better audience retention and growth

This calendar aligns with your audience's 18-25 demographic preferences and peak activity windows.`;

  const audiencePersonas = `👥 PRIMARY AUDIENCE PERSONAS

🎨 PERSONA 1: "Creative Casey" (35% of audience)
→ Age: 18-22, College student or recent grad
→ Interests: Aesthetic lifestyle, productivity hacks, budget-friendly tips
→ Pain Points: Time management, building routines, staying motivated
→ Content Preferences: Visual tutorials, day-in-life content, relatable struggles

💼 PERSONA 2: "Ambitious Alex" (25% of audience)  
→ Age: 22-25, Early career professional
→ Interests: Career growth, productivity tools, work-life balance
→ Pain Points: Career anxiety, imposter syndrome, burnout prevention
→ Content Preferences: Career advice, tool reviews, success stories

🌟 PERSONA 3: "Lifestyle Luna" (40% of audience)
→ Age: 19-24, Values-driven and wellness-focused
→ Interests: Self-care, minimalism, sustainable living, personal growth
→ Pain Points: Overwhelm, comparison, finding authentic voice
→ Content Preferences: Authentic storytelling, wellness tips, mindful living

📝 CONTENT RECOMMENDATIONS:
- Use casual, conversational tone
- Include relatable struggles and wins
- Focus on actionable, budget-friendly advice
- Show behind-the-scenes authenticity`;

  const handleExecuteWorkflow = (workflowId: string) => {
    setActiveWorkflow(workflowId);
    
    if (workflowId === "content-calendar") {
      setGeneratedContent(contentCalendar);
    } else if (workflowId === "audience-personas") {
      setGeneratedContent(audiencePersonas);
    }
    
    setTimeout(() => {
      setActiveWorkflow(null);
    }, 2500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-green-100 text-green-700 border-green-200";
      case "processing": return "bg-orange-100 text-orange-700 border-orange-200";
      case "completed": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Execute Creator Strategies</h2>
        <p className="text-gray-600 text-lg">Implement data-driven workflows to transform your creator profile</p>
      </div>

      <div className="grid gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-xl transition-all duration-300 cursor-hover glass-effect border-orange-100/50 rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${workflow.gradient} rounded-xl flex items-center justify-center`}>
                    <workflow.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{workflow.title}</CardTitle>
                    <CardDescription className="mt-2 text-base">{workflow.description}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(workflow.status)} style={{marginBottom: '8px'}}>
                    {activeWorkflow === workflow.id ? "Processing..." : "Ready"}
                  </Badge>
                  <div className="text-xs text-orange-600 font-semibold">{workflow.impact}</div>
                  <div className="text-xs text-gray-500 flex items-center justify-end font-medium mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {workflow.estimatedTime}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-3">
                <Button 
                  onClick={() => handleExecuteWorkflow(workflow.id)}
                  disabled={activeWorkflow === workflow.id}
                  className="gradient-orange text-white font-medium rounded-xl cursor-hover px-6"
                >
                  {activeWorkflow === workflow.id ? (
                    <>
                      <Play className="w-4 h-4 mr-2 animate-spin" />
                      Processing
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Execute
                    </>
                  )}
                </Button>
                
                <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {generatedContent && (
        <Card className="border-green-200 gradient-soft animate-fade-in rounded-2xl cursor-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-green-800">
              <CheckCircle className="w-6 h-6" />
              <span>Strategy Generated Successfully!</span>
            </CardTitle>
            <CardDescription className="text-green-700 text-base">
              Your personalized creator strategy is ready to implement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              value={generatedContent}
              readOnly
              className="h-64 bg-white border-green-200 rounded-xl resize-none text-sm"
            />
            <div className="flex space-x-3">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl cursor-hover px-6">
                <Copy className="w-4 h-4 mr-2" />
                Copy Strategy
              </Button>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 rounded-xl">
                <Send className="w-4 h-4 mr-2" />
                Export to Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RemediateTab;
