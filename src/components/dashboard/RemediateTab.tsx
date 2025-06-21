
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Copy, ExternalLink, Play, Send } from "lucide-react";

const RemediateTab = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState("");

  const workflows = [
    {
      id: "linkedin-post",
      title: "LinkedIn Professional Post",
      description: "Transform your video into a LinkedIn post with professional formatting",
      status: "ready",
      estimatedTime: "2 min",
      gradient: "from-orange-400 to-red-400"
    },
    {
      id: "twitter-thread", 
      title: "Twitter Thread Creation",
      description: "Break down your content into an engaging 5-part Twitter thread",
      status: "ready",
      estimatedTime: "3 min",
      gradient: "from-orange-400 to-yellow-400"
    },
    {
      id: "repost-schedule",
      title: "Optimal Time Repost",
      description: "Schedule your content to repost at the optimal time (2:00 PM EST)",
      status: "ready",
      estimatedTime: "1 min",
      gradient: "from-orange-500 to-pink-400"
    },
    {
      id: "lead-magnet",
      title: "Lead Generation Campaign",
      description: "Create a lead magnet and outreach sequence based on your content",
      status: "ready",
      estimatedTime: "5 min",
      gradient: "from-orange-400 to-orange-600"
    }
  ];

  const linkedinContent = `🚀 Just discovered a game-changing insight about content creation!

The biggest mistake creators make? Assuming their timing is perfect.

Here's what I learned from analyzing thousands of videos:

→ 68% of creators post during low-engagement windows
→ A simple 3-hour shift can boost views by 45%
→ Platform-specific timing matters more than overall "best times"

The solution? Data-driven posting schedules.

What's your biggest content challenge? Let me know in the comments 👇

#ContentStrategy #CreatorTips #VideoMarketing`;

  const twitterThread = [
    "🧵 Thread: Why your great content gets ignored (and how to fix it)",
    "1/ Most creators focus on content quality but ignore the timing game",
    "2/ Data shows 68% of posts happen during audience low-activity periods", 
    "3/ A simple 3-hour shift in posting time can increase engagement by 45%",
    "4/ Platform timing matters more than general 'best practice' times",
    "5/ The fix? Use data to find YOUR audience's peak activity windows"
  ];

  const handleExecuteWorkflow = (workflowId: string) => {
    setActiveWorkflow(workflowId);
    
    if (workflowId === "linkedin-post") {
      setGeneratedContent(linkedinContent);
    } else if (workflowId === "twitter-thread") {
      setGeneratedContent(twitterThread.join("\n\n"));
    }
    
    setTimeout(() => {
      setActiveWorkflow(null);
    }, 2000);
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
        <h2 className="text-3xl font-bold mb-4">Execute Workflows</h2>
        <p className="text-gray-600 text-lg">Run automated workflows to implement your content fixes</p>
      </div>

      <div className="grid gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-xl transition-all duration-300 cursor-hover glass-effect border-orange-100/50 rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${workflow.gradient} rounded-xl flex items-center justify-center`}>
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{workflow.title}</CardTitle>
                    <CardDescription className="mt-2 text-base">{workflow.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(workflow.status)}>
                    {activeWorkflow === workflow.id ? "Processing..." : "Ready"}
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center font-medium">
                    <Clock className="w-4 h-4 mr-1" />
                    {workflow.estimatedTime}
                  </span>
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
                
                {workflow.id === "repost-schedule" && (
                  <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Scheduler
                  </Button>
                )}
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
              <span>Content Generated Successfully!</span>
            </CardTitle>
            <CardDescription className="text-green-700 text-base">
              Your content has been generated and is ready to publish
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              value={generatedContent}
              readOnly
              className="h-48 bg-white border-green-200 rounded-xl resize-none"
            />
            <div className="flex space-x-3">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl cursor-hover px-6">
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 rounded-xl">
                <Send className="w-4 h-4 mr-2" />
                Post Directly
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RemediateTab;
