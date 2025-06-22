import { Button } from "@/components/ui/button";
import { ArrowRight, Play, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section 
      className="pt-32 pb-20 min-h-screen flex items-center relative overflow-hidden bg-[#210F06]"
      style={{
        backgroundImage: 'url(/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-[5.6em] font-medium leading-tighter tracking-tighter font-sans text-white mb-4">
            Optimize your entire{" "} <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              creator ecosystem
            </span>
          </h1>

          <p className="text-xl text-[#E9D6CB] font-sans mb-12 max-w-xl leading-tight  mx-auto font-thin">
            Unlock data-driven insights to optimize your creator profile across all platforms.
          </p>


          <Link to="/dashboard">
            <Button size="lg" className="bg-orange-50 text-orange-900 px-10 py-6 text-lg font-semibold rounded-xl cursor-hover cursor-shadow border-0">
              Analyze Your Profile
            </Button>
          </Link>


          {/*
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
                <p className="text-gray-600">Complete creator profile analysis with audience insights and performance patterns</p>
              </div>
              
              <div className="text-center group cursor-hover">
                <div className="w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Prescribe</h3>
                <p className="text-gray-600">Strategic recommendations for content mix, timing, and audience alignment</p>
              </div>
              
              <div className="text-center group cursor-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Remediate</h3>
                <p className="text-gray-600">Execute optimization workflows for content calendars, audience targeting, and growth</p>
              </div>
            </div>
          </div>
          */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
