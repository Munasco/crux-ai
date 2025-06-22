import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" fixed w-full bg-[#120A04] z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-1">
            <img src="/logo.png" alt="Crux" className="w-10 h-10" />
            <span className="text-2xl font-semibold font-sans text-white">
              Crux
            </span>
          </Link>



          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="#features" className="text-orange-50   font-sans hover:text-orange-500 transition-colors font-medium">
                Features
              </Link>
              <Link to="#how-it-works" className="text-orange-50 font-sans hover:text-orange-500 transition-colors font-medium">
                How it Works
              </Link>
             
            </nav>
            <Link to="/dashboard">
              <Button className=" bg-orange-50 hover:shadow-lg text-[#210F06] font-medium px-6 py-3 rounded-xl cursor-hover border-0">
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
