
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Clock, Eye, TrendingDown, Upload } from "lucide-react";

const DiagnoseTab = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const diagnosticResults = [
    {
      icon: TrendingDown,
      title: "Low Retention at 12s",
      severity: "high",
      description: "Significant drop-off detected - likely due to slow hook delivery",
      percentage: 68,
      gradient: "from-red-400 to-orange-400"
    },
    {
      icon: Clock,
      title: "Suboptimal Posting Time",
      severity: "medium", 
      description: "Posted 3 hours after your audience's peak activity window",
      percentage: 45,
      gradient: "from-orange-400 to-yellow-400"
    },
    {
      icon: Eye,
      title: "Weak Call-to-Action",
      severity: "medium",
      description: "No clear CTA detected in first 30 seconds of content",
      percentage: 32,
      gradient: "from-orange-400 to-amber-400"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-l-red-400 bg-red-50/50";
      case "medium": return "border-l-orange-400 bg-orange-50/50";
      default: return "border-l-yellow-400 bg-yellow-50/50";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Content Diagnostics</h2>
        <p className="text-gray-600 text-lg">Upload or paste your video URL to analyze performance issues</p>
      </div>

      <Card className="glass-effect border-orange-100/50 rounded-2xl cursor-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <span>Upload Content</span>
          </CardTitle>
          <CardDescription className="text-base">
            Supports YouTube, TikTok, Instagram, and direct video uploads
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="video-url" className="text-base font-medium">Video URL or Upload</Label>
            <Input
              id="video-url"
              placeholder="https://youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="mt-2 h-12 rounded-xl border-orange-200 focus:border-orange-400"
            />
          </div>
          
          <Button 
            onClick={handleAnalyze}
            disabled={!videoUrl || isAnalyzing}
            className="w-full gradient-orange text-white font-semibold h-12 rounded-xl cursor-hover"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Content"}
          </Button>
          
          {isAnalyzing && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Analyzing engagement patterns...</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-3 bg-orange-100" />
            </div>
          )}
        </CardContent>
      </Card>

      {showResults && (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-bold flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <span>Performance Issues Detected</span>
          </h3>
          
          {diagnosticResults.map((result, index) => (
            <Card key={index} className={`border-l-4 ${getSeverityColor(result.severity)} glass-effect rounded-2xl cursor-shadow`}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${result.gradient}`}>
                    <result.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg">{result.title}</h4>
                      <span className="text-sm font-semibold text-orange-600">{result.percentage}% impact</span>
                    </div>
                    <p className="text-gray-600 mb-4">{result.description}</p>
                    <div className="mt-4">
                      <Progress value={result.percentage} className="h-3 bg-orange-100" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiagnoseTab;
