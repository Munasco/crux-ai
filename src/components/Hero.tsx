
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <TrendingUp className="w-4 h-4" />
            <span>AI-Powered Content Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Diagnose why your video{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              underperformed
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant insights on engagement drops, timing issues, and content structure - 
            plus actionable workflows to repurpose and remediate your content across platforms.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
                Analyze Your Content
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-purple-200 hover:bg-purple-50">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Diagnose</h3>
                <p className="text-gray-600 text-sm">Instant analysis of engagement drops and performance issues</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Prescribe</h3>
                <p className="text-gray-600 text-sm">Get specific fixes and optimization recommendations</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Remediate</h3>
                <p className="text-gray-600 text-sm">Execute workflows to repurpose and republish content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
