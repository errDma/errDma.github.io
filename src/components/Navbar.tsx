
import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 glass-morphism">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center">
          <h1 className="text-gradient font-semibold text-lg md:text-xl">
            FilmFinder
          </h1>
        </div>

        <div className="w-10" />
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </nav>
  );
};

export default Navbar;
