
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  name: string;
  year?: string;
  img_url: string;
  overview?: string;
}

interface MovieListProps {
  movies: Movie[];
  isLoading: boolean;
  searchPerformed: boolean;
}

const MovieList = ({ movies, isLoading, searchPerformed }: MovieListProps) => {
  // If loading, show skeleton
  if (isLoading) {
    return (
      <div className="mt-8 space-y-4 w-full max-w-xl mx-auto">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center p-4 rounded-lg glass-morphism animate-pulse">
            <div className="w-16 h-24 mr-4 bg-white/5 rounded-md shimmer"></div>
            <div className="flex-1">
              <div className="h-5 bg-white/5 rounded w-3/4 mb-2 shimmer"></div>
              <div className="h-4 bg-white/5 rounded w-1/4 shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // If no movies found after search
  if (searchPerformed && movies.length === 0) {
    return (
      <div className="mt-8 text-center text-white/70 w-full max-w-xl mx-auto p-8 glass-morphism rounded-lg">
        <p>Фильмы не найдены. Попробуйте изменить запрос.</p>
      </div>
    );
  }

  // If search not performed yet
  if (!searchPerformed && movies.length === 0) {
    return null;
  }

  // Display movie list
  return (
    <div className="mt-8 space-y-4 w-full max-w-xl mx-auto">
      {movies.map((movie, index) => (
        <MovieCard
          key={`${movie.name}-${index}`}
          title={movie.name}
          year={movie.year}
          posterUrl={movie.img_url}
          overview={movie.overview}
          index={index}
        />
      ))}
    </div>
  );
};

export default MovieList;
