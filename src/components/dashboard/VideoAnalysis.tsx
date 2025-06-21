
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, TrendingUp, TrendingDown, Eye, Heart, MessageCircle, Share, Clock, Target, Zap } from "lucide-react";

interface VideoAnalysisProps {
  onBack: () => void;
}

const VideoAnalysis = ({ onBack }: VideoAnalysisProps) => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const videos = [
    {
      id: 1,
      title: "5 AI Tools That Will Replace Your Job in 2024",
      platform: "YouTube",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop",
      views: "45.2K",
      likes: "2.1K", 
      comments: "234",
      shares: "156",
      engagement: "8.7%",
      duration: "3:42",
      uploadDate: "3 days ago",
      performance: "excellent",
      hookScore: 92,
      retentionScore: 85,
      ctaScore: 34,
      summary: "This video performed exceptionally well due to a strong fear-based hook and trending topic. However, the call-to-action was weak.",
      insights: [
        "Hook captured attention immediately with 'replace your job' angle",
        "High retention through first 30 seconds (critical window)",
        "Engagement dropped at 2:15 - likely info overload",
        "CTA came too late and wasn't compelling enough"
      ],
      recommendations: [
        "Use similar fear-based hooks for future content",
        "Break down complex information into bite-sized chunks",
        "Add CTA earlier in the video (around 1:30 mark)",
        "Create follow-up content addressing viewer questions from comments"
      ]
    },
    {
      id: 2,
      title: "My Morning Routine for Maximum Productivity",
      platform: "Instagram",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      views: "12.8K",
      likes: "891",
      comments: "67",
      shares: "43",
      engagement: "6.2%",
      duration: "0:45",
      uploadDate: "1 week ago",
      performance: "good",
      hookScore: 76,
      retentionScore: 89,
      ctaScore: 45,
      summary: "Solid performance with great retention. The routine content resonated well with your audience but could use stronger CTAs.",
      insights: [
        "High completion rate (89%) indicates strong content value",
        "Comments show genuine interest in specific routine elements",
        "Posted during optimal time for your audience",
        "Visual aesthetic matched your brand perfectly"
      ],
      recommendations: [
        "Create detailed breakdown videos for each routine element",
        "Add clear CTA to drive traffic to detailed content",
        "Consider making this a weekly series",
        "Use similar visual style for future routine content"
      ]
    },
    {
      id: 3,
      title: "Why Most Startups Fail (Data Analysis)",
      platform: "LinkedIn",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      views: "8.9K",
      likes: "445",
      comments: "89",
      shares: "67",
      engagement: "12.4%",
      duration: "2:15",
      uploadDate: "2 weeks ago",
      performance: "excellent",
      hookScore: 88,
      retentionScore: 78,
      ctaScore: 72,
      summary: "Outstanding LinkedIn performance with high professional engagement. Data-driven content works well for your audience.",
      insights: [
        "Professional audience highly engaged with data insights",
        "Comments included industry leaders and potential collaborators",
        "Shared frequently in professional networks",
        "Strong CTA drove significant profile visits"
      ],
      recommendations: [
        "Create more data-driven startup content",
        "Engage with industry leaders who commented",
        "Turn this into a content series with different business topics",
        "Consider creating a downloadable resource mentioned in CTA"
      ]
    }
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'bg-green-100 text-green-700 border-green-200';
      case 'good': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'poor': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'YouTube': return 'bg-red-100 text-red-700';
      case 'Instagram': return 'bg-pink-100 text-pink-700';
      case 'LinkedIn': return 'bg-blue-100 text-blue-700';
      case 'Twitter': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (selectedVideo) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button 
            onClick={() => setSelectedVideo(null)} 
            variant="outline" 
            className="border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Videos
          </Button>
          <h2 className="text-2xl font-bold">Video Analysis</h2>
        </div>

        <Card className="glass-effect border-orange-100/50 rounded-2xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <img 
                    src={selectedVideo.thumbnail} 
                    alt={selectedVideo.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    {selectedVideo.duration}
                  </div>
                </div>
                <Badge className={getPlatformColor(selectedVideo.platform)}>
                  {selectedVideo.platform}
                </Badge>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">{selectedVideo.title}</h3>
                  <p className="text-gray-600 mb-4">{selectedVideo.summary}</p>
                  <Badge className={getPerformanceColor(selectedVideo.performance)}>
                    {selectedVideo.performance} performance
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-orange-50 rounded-xl">
                    <div className="font-bold text-orange-600">{selectedVideo.views}</div>
                    <div className="text-xs text-gray-600">Views</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-xl">
                    <div className="font-bold text-orange-600">{selectedVideo.likes}</div>
                    <div className="text-xs text-gray-600">Likes</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-xl">
                    <div className="font-bold text-orange-600">{selectedVideo.comments}</div>
                    <div className="text-xs text-gray-600">Comments</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-xl">
                    <div className="font-bold text-orange-600">{selectedVideo.engagement}</div>
                    <div className="text-xs text-gray-600">Engagement</div>
                  </div>
                </div>

                {/* Performance Scores */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Performance Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-orange-500" />
                        <span>Hook Effectiveness</span>
                      </span>
                      <div className="flex items-center space-x-3">
                        <Progress value={selectedVideo.hookScore} className="w-24 h-2" />
                        <span className="text-sm font-medium">{selectedVideo.hookScore}/100</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <span>Audience Retention</span>
                      </span>
                      <div className="flex items-center space-x-3">
                        <Progress value={selectedVideo.retentionScore} className="w-24 h-2" />
                        <span className="text-sm font-medium">{selectedVideo.retentionScore}/100</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-purple-500" />
                        <span>Call-to-Action</span>
                      </span>
                      <div className="flex items-center space-x-3">
                        <Progress value={selectedVideo.ctaScore} className="w-24 h-2" />
                        <span className="text-sm font-medium">{selectedVideo.ctaScore}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-effect border-orange-100/50 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Key Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {selectedVideo.insights.map((insight: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-effect border-orange-100/50 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <span>Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {selectedVideo.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Video Analysis</h2>
          <p className="text-gray-600">Deep dive into why each piece of content worked or didn't</p>
        </div>
        <Button 
          onClick={onBack}
          variant="outline" 
          className="border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Overview
        </Button>
      </div>

      <div className="grid gap-6">
        {videos.map((video) => (
          <Card 
            key={video.id} 
            className="glass-effect border-orange-100/50 rounded-2xl hover:shadow-xl transition-all cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full aspect-video object-cover rounded-xl"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-lg leading-tight">{video.title}</h3>
                    <Badge className={getPlatformColor(video.platform)}>
                      {video.platform}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">{video.summary}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{video.uploadDate}</span>
                    <Badge className={getPerformanceColor(video.performance)}>
                      {video.performance}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 bg-orange-50 rounded-lg">
                      <div className="font-semibold text-orange-600">{video.views}</div>
                      <div className="text-xs text-gray-600">Views</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded-lg">
                      <div className="font-semibold text-orange-600">{video.engagement}</div>
                      <div className="text-xs text-gray-600">Engagement</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Hook Score</span>
                      <span>{video.hookScore}/100</span>
                    </div>
                    <Progress value={video.hookScore} className="h-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideoAnalysis;
