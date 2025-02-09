
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative max-w-xl w-full">
      <input
        type="text"
        placeholder="Search for songs, artists, or albums..."
        className="w-full h-12 pl-12 pr-4 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-white/40 transition-colors"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default SearchBar;
