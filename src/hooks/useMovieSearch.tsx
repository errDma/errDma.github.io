import { useState } from "react";
import { toast } from "sonner";

export const useMovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchMovies = async (description) => {
    if (!description.trim()) return;

    setIsLoading(true);
    try {
      const url = `http://127.0.0.1:5000/film/?description=${encodeURIComponent(description)}`;
      const response = await fetch(url);

      // Проверка статуса ответа
      if (!response.ok) {
        throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
      }

      const data = await response.json();
      console.log("Ответ API:", data); // Логирование для отладки

      // Гибкая обработка формата данных
      let moviesArray = Array.isArray(data) ? data : data.films || [];
      if (!Array.isArray(moviesArray)) {
        throw new Error("Неожиданный формат данных: ожидался массив");
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

  return { movies, isLoading, searchMovies };
};
