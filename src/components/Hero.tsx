
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 gradient-soft min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 glass-effect text-orange-700 px-5 py-3 rounded-full text-sm font-medium mb-8 cursor-shadow">
            <TrendingUp className="w-4 h-4" />
            <span>AI-Powered Content Intelligence</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8">
            Diagnose why your video{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              underperformed
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get instant insights on engagement drops, timing issues, and content structure - 
            plus actionable workflows to repurpose and remediate your content across platforms.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Link to="/dashboard">
              <Button size="lg" className="gradient-orange text-white px-10 py-4 text-lg font-semibold rounded-xl cursor-hover cursor-shadow border-0">
                Analyze Your Content
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="px-10 py-4 text-lg border-orange-200 hover:bg-orange-50 rounded-xl cursor-hover">
              <Play className="mr-3 w-5 h-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="glass-effect rounded-3xl p-10 cursor-shadow border border-orange-100/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center group cursor-hover">
                <div className="w-16 h-16 gradient-peach rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21L16.5 16.5" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Diagnose</h3>
                <p className="text-gray-600">Instant analysis of engagement drops and performance issues</p>
              </div>
              
              <div className="text-center group cursor-hover">
                <div className="w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Prescribe</h3>
                <p className="text-gray-600">Get specific fixes and optimization recommendations</p>
              </div>
              
              <div className="text-center group cursor-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Remediate</h3>
                <p className="text-gray-600">Execute workflows to repurpose and republish content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
