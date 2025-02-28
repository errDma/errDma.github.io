
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import { useMovieSearch } from "../hooks/useMovieSearch";

const Index = () => {
  const { movies, isLoading, searchPerformed, searchMovies } = useMovieSearch();
  const [showContent, setShowContent] = useState(false);

  // Add entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-8 px-4 max-w-7xl mx-auto w-full">
        <div className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center justify-center my-12 md:my-20">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Поиск фильмов
            </h1>
            <p className="text-white/70 text-center max-w-lg mb-8">
              Опишите фильм, который хотите найти, и мы подберем подходящие варианты.
            </p>
            
            <SearchBar onSearch={searchMovies} isLoading={isLoading} />
            
            <MovieList 
              movies={movies} 
              isLoading={isLoading} 
              searchPerformed={searchPerformed} 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
