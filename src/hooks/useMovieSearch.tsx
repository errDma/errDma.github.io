import { useState } from "react";
import { toast } from "sonner";

interface Movie {
  id?: number;
  name: string;
  year?: string;
  img_url: string;
  overview?: string;
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
      const response = await fetch(`https://chainikback-denis1488.amvera.io/film/?description=${encodeURI(description)}`);
      
      if (!response.ok) {
        throw new Error("Ошибка получения данных");
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error("Unexpected data format");
      }
      
      let moviesArray = data.map(movie => {
        if (movie.img_url) {
          movie.img_url = movie.img_url.replace(/^\'|\'$/g, '');
        }
        return movie;
      });
      
      setMovies(moviesArray);
      
      if (moviesArray.length === 0) {
        toast.info("Po vashemu zaprosu nichego ne nai denno");
      }
    } catch (error) {
      console.error("Ошибка поиска фильмов:", error);
      toast.error("Ne udavilos' vypolnit poisk. Proverite podklyuchenie k API.");
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
