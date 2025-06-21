
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
      estimatedTime: "2 min"
    },
    {
      id: "twitter-thread", 
      title: "Twitter Thread Creation",
      description: "Break down your content into an engaging 5-part Twitter thread",
      status: "ready",
      estimatedTime: "3 min"
    },
    {
      id: "repost-schedule",
      title: "Optimal Time Repost",
      description: "Schedule your content to repost at the optimal time (2:00 PM EST)",
      status: "ready",
      estimatedTime: "1 min"
    },
    {
      id: "lead-magnet",
      title: "Lead Generation Campaign",
      description: "Create a lead magnet and outreach sequence based on your content",
      status: "ready",
      estimatedTime: "5 min"
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
      case "ready": return "bg-green-100 text-green-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Execute Workflows</h2>
        <p className="text-gray-600">Run automated workflows to implement your content fixes</p>
      </div>

      <div className="grid gap-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{workflow.title}</CardTitle>
                  <CardDescription className="mt-1">{workflow.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(workflow.status)}>
                    {activeWorkflow === workflow.id ? "Processing..." : "Ready"}
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {workflow.estimatedTime}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => handleExecuteWorkflow(workflow.id)}
                  disabled={activeWorkflow === workflow.id}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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
                  <Button variant="outline">
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
        <Card className="border-green-200 bg-green-50 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span>Content Generated Successfully!</span>
            </CardTitle>
            <CardDescription className="text-green-700">
              Your content has been generated and is ready to publish
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={generatedContent}
              readOnly
              className="h-40 bg-white border-green-200"
            />
            <div className="flex space-x-2">
              <Button className="bg-green-600 hover:bg-green-700">
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
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
