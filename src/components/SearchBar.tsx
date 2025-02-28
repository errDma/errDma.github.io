
import { Search } from "lucide-react";
import { KeyboardEvent, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Опишите фильм, который ищете..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="w-full py-3 px-4 pl-12 rounded-xl bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all duration-200 backdrop-blur-sm"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={`w-5 h-5 text-white/50 ${isLoading ? "animate-pulse" : ""}`} />
        </div>
      </div>
      <p className="text-xs text-white/50 mt-2 text-center">
        Нажмите Enter для поиска
      </p>
    </div>
  );
};

export default SearchBar;
