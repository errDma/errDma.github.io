
import { useState } from "react";

interface MovieCardProps {
  title: string;
  year?: string;
  posterUrl: string;
  overview?: string;
  index: number;
}

const MovieCard = ({ title, year, posterUrl, overview, index }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Add a slight delay to the animation based on index for a staggered effect
  const animationDelay = `${index * 0.05}s`;

  return (
    <div 
      className="flex flex-col p-4 rounded-lg glass-morphism hover:bg-white/10 transition-all duration-300 animate-slideUp"
      style={{ animationDelay }}
    >
      <div className="flex items-center">
        <div className="w-16 h-24 mr-4 overflow-hidden rounded-md relative flex-shrink-0">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-white/5 animate-pulse rounded-md"></div>
          )}
          {!imageError ? (
            <img
              src={posterUrl}
              alt={`Постер фильма ${title}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/30 text-xs">
              Нет<br/>постера
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm md:text-base font-medium truncate">
            {title}
          </h3>
          {year && (
            <p className="text-xs text-white/60">
              {year}
            </p>
          )}
          {overview && (
            <button 
              className="text-xs text-white/60 mt-1 hover:text-white/80 transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Скрыть описание" : "Показать описание"}
            </button>
          )}
        </div>
      </div>
      
      {isExpanded && overview && (
        <div className="mt-3 text-sm text-white/80 animate-fadeIn">
          <p>{overview}</p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
