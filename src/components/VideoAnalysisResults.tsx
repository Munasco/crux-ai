import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Play, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share, 
  Target, 
  Zap, 
  Download, 
  Share2, 
  Save,
  Sparkles,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Send
} from "lucide-react";
import { Input } from "./ui/input";

interface VideoAnalysisResultsProps {
  analysis: {
    title: string;
    performance: string;
    insights: string[];
    recommendations: string[];
  };
  videoSource: File | string;
  onBack: () => void;
}

export function VideoAnalysisResults({ analysis, videoSource, onBack }: VideoAnalysisResultsProps) {
  const [saved, setSaved] = useState(false);

  const performanceScores = {
    hook: 92,
    retention: 85,
    engagement: 78,
    cta: 65
  };

  const metrics = {
    views: "45.2K",
    likes: "2.1K",
    comments: "234",
    shares: "156",
    engagement: "8.7%"
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getPerformanceLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Video Analysis Complete</h1>
              <p className="text-slate-500">Here's what we found about your content</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              {saved ? "Saved!" : "Save to Dashboard"}
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Video + Data */}
          <div className="space-y-6">
            {/* Video Preview */}
            <Card className="border-bg-sidebar rounded-lg shadow-none">
              <CardContent className="p-3">
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <div className="w-full aspect-video bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 text-orange-500" />
                      <p className="text-sm text-orange-700 font-medium">
                        {typeof videoSource === 'string' ? 'Video from Link' : videoSource.name}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    3:42
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                    {typeof videoSource === 'string' ? 'YouTube' : 'Uploaded Video'}
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    {analysis.performance} performance
                  </Badge>
                </div>

                <h3 className="text-xl font-bold mb-2">{analysis.title}</h3>
                <p className="text-gray-600 mb-4">Your video performed exceptionally well with strong engagement and retention. The hook was particularly effective, but there's room for improvement in your call-to-action.</p>
              </CardContent>
           
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Engagement Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-orange-50 rounded-xl">
                    <div className="font-bold text-orange-600">{metrics.views}</div>
                    <div className="text-xs text-gray-600">Views</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-xl">
                    <div className="font-bold text-orange-600">{metrics.likes}</div>
                    <div className="text-xs text-gray-600">Likes</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-xl">
                    <div className="font-bold text-orange-600">{metrics.comments}</div>
                    <div className="text-xs text-gray-600">Comments</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-xl">
                    <div className="font-bold text-orange-600">{metrics.shares}</div>
                    <div className="text-xs text-gray-600">Shares</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-xl">
                    <div className="font-bold text-orange-600">{metrics.engagement}</div>
                    <div className="text-xs text-gray-600">Engagement</div>
                  </div>
                </div>
              </CardContent>
         
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <span>Performance Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 p-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-orange-500" />
                      <span>Hook Effectiveness</span>
                    </span>
                    <div className="flex items-center space-x-3">
                      <Progress value={performanceScores.hook} className="w-24 h-2" />
                      <span className={`text-sm font-medium ${getPerformanceColor(performanceScores.hook)}`}>
                        {performanceScores.hook}/100
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-blue-500" />
                      <span>Audience Retention</span>
                    </span>
                    <div className="flex items-center space-x-3">
                      <Progress value={performanceScores.retention} className="w-24 h-2" />
                      <span className={`text-sm font-medium ${getPerformanceColor(performanceScores.retention)}`}>
                        {performanceScores.retention}/100
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>Engagement Rate</span>
                    </span>
                    <div className="flex items-center space-x-3">
                      <Progress value={performanceScores.engagement} className="w-24 h-2" />
                      <span className={`text-sm font-medium ${getPerformanceColor(performanceScores.engagement)}`}>
                        {performanceScores.engagement}/100
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span>Call-to-Action</span>
                    </span>
                    <div className="flex items-center space-x-3">
                      <Progress value={performanceScores.cta} className="w-24 h-2" />
                      <span className={`text-sm font-medium ${getPerformanceColor(performanceScores.cta)}`}>
                        {performanceScores.cta}/100
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - AI Chat Interface */}
          <div className="space-y-4 sticky top-4 right-4  max-h-screen overflow-y-auto">
            {/* AI Chat Messages */}
            <Card className="border-bg-sidebar rounded-lg shadow-none">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Message 1: Overview */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-gray-800 font-medium">Here's what we found about your video</p>
                      </div>
                    </div>
                  </div>

                  {/* Message 2: Performance Summary */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-gray-800 mb-2"><strong>Performance Summary:</strong></p>
                        <p className="text-gray-700 text-sm">Your video performed exceptionally well with strong engagement and retention. The hook was particularly effective, but there's room for improvement in your call-to-action.</p>
                      </div>
                    </div>
                  </div>

                  {/* Message 3: What Worked */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-gray-800 mb-2"><strong>What Worked:</strong></p>
                        <ul className="text-gray-700 text-sm space-y-1">
                          {analysis.insights.map((insight: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Message 4: Actionable Fixes */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-gray-800 mb-2"><strong>3 Actionable Fixes:</strong></p>
                        <div className="space-y-3">
                          {analysis.recommendations.slice(0, 3).map((rec: string, index: number) => (
                            <div key={index} className="flex items-start space-x-2">
                              <Badge className="bg-purple-200 text-purple-700 text-xs">
                                {index + 1}
                              </Badge>
                              <span className="text-gray-700 text-sm">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Input
                    placeholder="Ask us anything about your video"
                    className="border-bg-sidebar rounded-md shadow-none w-full mr-2"
                />
                <Button className="bg-orange-600 text-white rounded-md shadow-none">
                    <Send className="w-4 h-4 mr-2" />
                    Send
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 