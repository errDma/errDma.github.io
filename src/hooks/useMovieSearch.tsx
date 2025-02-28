
import { useState } from "react";
import { toast } from "sonner";

interface Movie {
  name: string;
  year?: string;
  img_url: string;
}

export const useMovieSearch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const searchMovies = async (description: string) => {
    if (!description.trim()) return;

    setIsLoading(true);
    setSearchPerformed(true);
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/film/?description=${encodeURIComponent(description)}`);
      
      if (!response.ok) {
        throw new Error("Ошибка получения данных");
      }
      
      const data = await response.json();
      
      // Ensure we're getting an array even if only one result
      const moviesArray = Array.isArray(data) ? data : [data];
      
      setMovies(moviesArray);
    } catch (error) {
      console.error("Ошибка поиска фильмов:", error);
      toast.error("Не удалось выполнить поиск. Проверьте подключение к API.");
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    movies,
    isLoading,
    searchPerformed,
    searchMovies,
  };
};
