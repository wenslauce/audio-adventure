
import { useState } from "react";
import { Search, Home, Library, Plus, Music2 } from "lucide-react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside className="w-64 h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Music2 className="h-8 w-8" />
        <h1 className="text-xl font-bold">Musica</h1>
      </div>
      
      <nav className="flex flex-col gap-2">
        <a href="/" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
          <Home className="h-5 w-5" />
          <span>Home</span>
        </a>
        <a href="/search" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
          <Search className="h-5 w-5" />
          <span>Search</span>
        </a>
        <a href="/library" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
          <Library className="h-5 w-5" />
          <span>Your Library</span>
        </a>
      </nav>
      
      <div className="mt-6">
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Create Playlist</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
