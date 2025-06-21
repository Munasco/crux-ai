
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full glass-effect z-50 border-b border-orange-100/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="currentColor" fillOpacity="0.9"/>
                  <path d="M12 7l-7 3v7c0 3.5 2.5 6.5 7 7.5 4.5-1 7-4 7-7.5V10l-7-3z" fill="currentColor" fillOpacity="0.6"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-300 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Crux
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
              Features
            </Link>
            <Link to="#how-it-works" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
              How it Works
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button className="gradient-orange hover:shadow-lg text-white font-medium px-6 py-2 rounded-xl cursor-hover border-0">
                Try Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
