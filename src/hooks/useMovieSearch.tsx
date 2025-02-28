
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
      const response = await fetch(`http://127.0.0.1:5000/film/?description=${encodeURIComponent(description)}`);
      
      if (!response.ok) {
        throw new Error("Ошибка получения данных");
      }
      
      const data = await response.json();
      
      // Обработка вложенного массива массивов
      let moviesArray: Movie[] = [];
      
      if (Array.isArray(data)) {
        // Проходим по внешнему массиву
        data.forEach(item => {
          if (Array.isArray(item)) {
            // Проходим по внутреннему массиву и добавляем каждый фильм
            item.forEach(movie => {
              // Очищаем img_url от лишних кавычек, если они есть
              if (movie.img_url) {
                movie.img_url = movie.img_url.replace(/^'|'$/g, '');
              }
              moviesArray.push(movie);
            });
          } else if (item && typeof item === 'object') {
            // Если элемент - это одиночный объект фильма
            if (item.img_url) {
              item.img_url = item.img_url.replace(/^'|'$/g, '');
            }
            moviesArray.push(item as Movie);
          }
        });
      } else if (data && typeof data === 'object') {
        // Если API вернул одиночный объект
        if (data.img_url) {
          data.img_url = data.img_url.replace(/^'|'$/g, '');
        }
        moviesArray = [data as Movie];
      }
      
      setMovies(moviesArray);
      
      if (moviesArray.length === 0) {
        toast.info("По вашему запросу ничего не найдено");
      }
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
