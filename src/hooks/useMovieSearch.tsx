
import { useState } from "react";
import { toast } from "sonner";

interface Movie {
  id: number;
  name: string;
  img_url: string;
  year?: string;
  overview: string;
}

// Резервный список фильмов, который будет отображаться при ошибке API
const fallbackMovies: Movie[] = [
  {
    "id": 778,
    "img_url": "https://image.openmoviedb.com/kinopoisk-images/1599028/b28117f1-7add-4d6a-8db3-905cff37222e/orig",
    "name": "Тайна красной планеты",
    "overview": "Есть мерзкую брокколи, выносить мусор, рано ложиться спать – кому вообще нужны мамы, заставляющие это делать? Так думал Майло, пока не обнаружил, что его маму похитили марсиане. Тут-то и оказалось, что ему предстоит отправиться на другую планету, чтобы найти маму и вернуть ее домой."
  },
  {
    "id": 653,
    "img_url": "https://image.openmoviedb.com/kinopoisk-images/1629390/4f1a0e52-42b7-4433-accd-fe3901ded37f/orig",
    "name": "Мои соседи Ямада",
    "overview": "Ямада — обычная семья: папа, мама, бабушка, сын Нобору и дочка Ноноко. Но каждый день с ними происходит что-нибудь занятное: то Ноноко в супермаркете оставят, то папа с мамой устраивают сложнопостановочные бои за право взять пульт от телевизора, то бабушка затеет приготовление странного блюда бефстроганов."
  },
  {
    "id": 635,
    "img_url": "https://image.openmoviedb.com/kinopoisk-images/1599028/d89dc5c4-0fb3-41c9-8dc8-53178f8a243e/orig",
    "name": "Лучший",
    "overview": "Отец Велана умер, когда мальчик был еще совсем маленький, и его мама  второй раз вышла замуж. Теперь Велан живет со своим отчимом, мамой и младшим братом Баланом. Отчим всячески демонстрирует свою любовь и заботу родному сыну, а пасынку ничего не достается. Да он особо и не старается завоевать расположение своего отчима, который уверен в блестящем будущем своего сына и в никчемности пасынка. Проходит 15 лет и Велан становится инспектором полиции, получившего, вполне заслужено, прозвище «Лучший», а вот Балана интересует исключительно кино и Нирмала, в которую он влюблен и на которой мечтает жениться. Так они и живут, отец с пасынком ведут бесконечную войну, а мама пытается как-то примирить их между собой. Но однажды Велан возвращается домой и находит свою мать мертвой..."
  },
  {
    "id": 725,
    "img_url": "https://image.openmoviedb.com/kinopoisk-images/1900788/b92b23f6-8222-40e4-b77c-fa544eae9f2c/orig",
    "name": "Там, где живут чудовища",
    "overview": "Мальчик убегает из дома ночью после ссоры с мамой и оказывается в близлежащем парке. На рассвете он находит водоем и лодку, садится в нее и к вечеру следующего дня его прибивает к маленькому острову, населенному необычайными существами."
  },
  {
    "id": 105,
    "img_url": "'https://st.kp.yandex.net/images/film_iphone/iphone360_46019.jpg'",
    "name": "Баллада о солдате ",
    "overview": "Великая Отечественная война. Молодой солдат Алёша Скворцов совершает подвиг — подбивает два немецких танка. Командование собирается представить его к ордену; но Алёша просит дать ему отпуск; чтобы повидаться с мамой. Путь домой оказывается долог и непрост."
  }
];

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
      const corsProxy + url = encodeURIComponent(apiUrl);
      
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
      
      // При ошибке API показываем резервный список фильмов
      const cleanedFallbackMovies = fallbackMovies.map(movie => ({
        ...movie,
        img_url: movie.img_url ? movie.img_url.replace(/^'|'$/g, '') : movie.img_url
      }));
      
      setMovies(cleanedFallbackMovies);
      toast.info("API недоступен. Отображаем рекомендованные фильмы.", {
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { movies, isLoading, searchPerformed, searchMovies };
};
