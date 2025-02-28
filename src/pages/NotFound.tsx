
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="text-center max-w-md glass-morphism rounded-xl p-8">
        <h1 className="text-5xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-xl text-white/80 mb-6">Страница не найдена</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors duration-200"
        >
          Вернуться на главную
        </a>
      </div>
    </div>
  );
};

export default NotFound;
