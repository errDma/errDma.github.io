
import { useState } from "react";
import { toast } from "sonner";

interface Movie {
  id: number;
  name: string;
  img_url: string;
  year?: string;
  overview: string;
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
      // Используем CORS прокси для обхода ограничений
      const corsProxy = "https://corsproxy.io/?";
      const apiUrl = `https://chainikback-denis1488.amvera.io/film/?description=${encodeURIComponent(description)}`;
      const url = corsProxy + encodeURIComponent(apiUrl);
      
      console.log("Выполняем запрос через CORS прокси:", url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
      }

      const data = await response.json();
      console.log("Ответ API:", data);

      // Обработка данных API - ожидаем массив объектов с фильмами
      if (Array.isArray(data)) {
        // Очистка URL изображений от лишних кавычек
        const cleanedMovies = data.map(movie => ({
          ...movie,
          img_url: movie.img_url ? movie.img_url.replace(/^'|'$/g, '') : movie.img_url
        }));
        
        setMovies(cleanedMovies);
        
        if (cleanedMovies.length === 0) {
          toast.info("По вашему запросу ничего не найдено");
        } else {
          toast.success(`Найдено фильмов: ${cleanedMovies.length}`);
        }
      } else {
        console.error("Получен неожиданный формат данных:", data);
        toast.error("Получен неожиданный формат данных от API");
        setMovies([]);
      }
    } catch (error) {
      console.error("Ошибка поиска фильмов:", error);
      toast.error("Не удалось выполнить поиск. Проверьте подключение к интернету.");
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { movies, isLoading, searchPerformed, searchMovies };
};
