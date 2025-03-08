
import { Github, Telegram, X } from "lucide-react";
import { useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  // Close sidebar when escape key is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEsc);
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-[280px] bg-background border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-white/10">
          <h2 className="font-semibold text-lg">Меню</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a 
                href="/"
                className="block px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
              >
                Главная
              </a>
            </li>
            <li>
              <a 
                href="https://disk.yandex.ru/d/XDLSrr2do9XMgA"
                className="block px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
              >
                О проекте
              </a>
            </li>
            <li>
              <a 
                href="https://t.me/mybagwallet"
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
              >
                <Telegram className="w-4 h-4" />
                Контакты
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/errDma/techno7AiFilmFinder"
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
