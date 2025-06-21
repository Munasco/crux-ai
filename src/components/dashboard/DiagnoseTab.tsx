
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
      percentage: 68
    },
    {
      icon: Clock,
      title: "Suboptimal Posting Time",
      severity: "medium", 
      description: "Posted 3 hours after your audience's peak activity window",
      percentage: 45
    },
    {
      icon: Eye,
      title: "Weak Call-to-Action",
      severity: "medium",
      description: "No clear CTA detected in first 30 seconds of content",
      percentage: 32
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-orange-600 bg-orange-50 border-orange-200";
      default: return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Content Diagnostics</h2>
        <p className="text-gray-600">Upload or paste your video URL to analyze performance issues</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Content</span>
          </CardTitle>
          <CardDescription>
            Supports YouTube, TikTok, Instagram, and direct video uploads
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="video-url">Video URL or Upload</Label>
            <Input
              id="video-url"
              placeholder="https://youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <Button 
            onClick={handleAnalyze}
            disabled={!videoUrl || isAnalyzing}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Content"}
          </Button>
          
          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Analyzing engagement patterns...</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {showResults && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-xl font-semibold flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>Performance Issues Detected</span>
          </h3>
          
          {diagnosticResults.map((result, index) => (
            <Card key={index} className={`border-l-4 ${getSeverityColor(result.severity)}`}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-white">
                    <result.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{result.title}</h4>
                      <span className="text-sm font-medium">{result.percentage}% impact</span>
                    </div>
                    <p className="text-gray-600 text-sm">{result.description}</p>
                    <div className="mt-3">
                      <Progress value={result.percentage} className="h-2" />
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
