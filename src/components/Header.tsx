
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Crux
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="text-gray-600 hover:text-purple-600 transition-colors">
              Features
            </Link>
            <Link to="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">
              How it Works
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
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
