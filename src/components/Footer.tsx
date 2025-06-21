
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="currentColor" fillOpacity="0.9"/>
                  <path d="M12 7l-7 3v7c0 3.5 2.5 6.5 7 7.5 4.5-1 7-4 7-7.5V10l-7-3z" fill="currentColor" fillOpacity="0.6"/>
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Crux
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              The intelligent content optimization platform that diagnoses performance issues and provides actionable remediation workflows.
            </p>
          </div>
          
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
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Crux. All rights reserved. Built for creators who want to optimize their content impact.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
