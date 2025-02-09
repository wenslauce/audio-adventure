
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { deezerApi } from "../services/deezer";
import { Play } from "lucide-react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import NowPlaying from "../components/NowPlaying";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => deezerApi.search(query),
    enabled: !!query,
  });

  const TrackItem = ({ track }: { track: any }) => (
    <div className="group flex items-center gap-4 p-4 rounded-lg hover:bg-white/10 transition-colors">
      <img
        src={track.album.cover_small}
        alt={track.title}
        className="w-12 h-12 rounded-md"
      />
      <div className="flex-1">
        <h3 className="font-medium">{track.title}</h3>
        <p className="text-sm text-gray-400">{track.artist.name}</p>
      </div>
      <button className="p-2 bg-green-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <Play className="h-4 w-4" fill="currentColor" />
      </button>
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Sidebar />
      <main className="flex-1 overflow-auto pb-24">
        <div className="p-6">
          <SearchBar />
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              {query ? `Results for "${query}"` : "Search for music"}
            </h2>
            
            {isLoading ? (
              <div className="text-gray-400">Loading...</div>
            ) : searchResults?.data ? (
              <div className="space-y-2">
                {searchResults.data.map((track: any) => (
                  <TrackItem key={track.id} track={track} />
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No results found</div>
            )}
          </div>
        </div>
      </main>
      <NowPlaying />
    </div>
  );
};

export default SearchResults;
