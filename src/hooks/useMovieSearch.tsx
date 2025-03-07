
import { useState } from "react";
import { toast } from "sonner";

export const useMovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const searchMovies = async (description) => {
    if (!description.trim()) return;

    setIsLoading(true);
    setSearchPerformed(true);
    
    try {
      const url = `https://chainikback-denis1488.amvera.io/film/?description=${encodeURIComponent(description)}`;
      const response = await fetch(url);

      // Проверка статуса ответа
      if (!response.ok) {
        throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
      }

      const data = await response.json();
      console.log("Ответ API:", data); // Логирование для отладки

      // Обработка формата данных API
      let moviesArray = [];
      
      // Проверяем, является ли ответ массивом массивов
      if (Array.isArray(data) && data.length > 0) {
        // Собираем все фильмы из всех подмассивов
        data.forEach(subArray => {
          if (Array.isArray(subArray)) {
            moviesArray = [...moviesArray, ...subArray];
          }
        });
      } else if (Array.isArray(data)) {
        moviesArray = data;
      } else if (data.films && Array.isArray(data.films)) {
        moviesArray = data.films;
      }

      // Очистка URL изображений от лишних кавычек, если они есть
      moviesArray = moviesArray.map(movie => ({
        ...movie,
        img_url: movie.img_url ? movie.img_url.replace(/^'|'$/g, '') : movie.img_url
      }));

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

  return { movies, isLoading, searchPerformed, searchMovies };
};
