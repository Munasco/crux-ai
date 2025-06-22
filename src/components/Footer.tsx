import { ArrowRightIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" text-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-row justify-between items-start">

          <div className="">
            <p className="text-xl font-medium mb-4">
              Ready to optimize your content?
            </p>
            <button onClick={() => {
              window.location.href = "/onboarding";
            }} className="bg-orange-600 text-white px-2 py-2  pr-4 rounded-md flex  items-center gap-2">
              <div className="flex items-center justify-center bg-white text-orange-600 rounded-md p-2">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
              Get Started
            </button>
          </div>


          <div className="flex flex-row gap-16">
            <div>
              <h3 className="font-bold mb-6 text-lg">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
        </div>


        <div className="flex flex-row justify-between items-start mt-16">
          <div>
            <p className="text-gray-400 text-sm">
              &copy; 2025 Crux. All rights reserved.
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center mt-16 mx-auto">
          <img src="/footer-logo.png" alt="Crux" className="w-48 h-48 opacity-25" />
          <p className="text-center text-[#6E4532] text-[10em] ">
            crux.ai
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
