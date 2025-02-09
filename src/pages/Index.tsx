
import { Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { deezerApi } from "../services/deezer";
import Sidebar from "../components/Sidebar";
import NowPlaying from "../components/NowPlaying";
import SearchBar from "../components/SearchBar";
import { usePlayer } from "../contexts/PlayerContext";
import { DeezerTrack } from "../types/deezer";

const FeaturedCard = ({ title, subtitle, imageUrl, to }: { title: string; subtitle: string; imageUrl: string; to: string }) => (
  <Link to={to} className="group relative overflow-hidden rounded-lg aspect-square hover-scale cursor-pointer">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
    <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-300">{subtitle}</p>
    </div>
    <div className="absolute right-4 bottom-4 p-3 bg-green-500 text-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all z-30">
      <Play className="h-6 w-6" fill="currentColor" />
    </div>
  </Link>
);

const TrendingTrack = ({ track }: { track: DeezerTrack }) => {
  const { currentTrack, isPlaying, setCurrentTrack, setIsPlaying } = usePlayer();

  const handlePlay = () => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
      <div className="flex items-center gap-4">
        <img src={track.album.cover_medium} alt={track.title} className="w-12 h-12 rounded" />
        <div>
          <h4 className="font-medium">{track.title}</h4>
          <p className="text-sm text-gray-400">{track.artist.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">
          {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
        </span>
        <button 
          onClick={handlePlay}
          className="p-2 bg-green-500 text-white rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all"
        >
          {currentTrack?.id === track.id && isPlaying ? (
            <Play className="h-4 w-4" fill="currentColor" />
          ) : (
            <Play className="h-4 w-4" fill="currentColor" />
          )}
        </button>
      </div>
    </div>
  );
};

const Index = () => {
  const { data: trending } = useQuery({
    queryKey: ['trending'],
    queryFn: () => deezerApi.search('top charts'),
  });

  const featuredPlaylists = [
    {
      id: "1",
      title: "Chill Vibes",
      subtitle: "Perfect for relaxation",
      imageUrl: "https://e-cdns-images.dzcdn.net/images/playlist/1-1/500x500-000000-80-0-0.jpg",
    },
    {
      id: "2",
      title: "Workout Mix",
      subtitle: "Energy boost",
      imageUrl: "https://e-cdns-images.dzcdn.net/images/playlist/2-1/500x500-000000-80-0-0.jpg",
    },
    {
      id: "3",
      title: "Focus Flow",
      subtitle: "Stay productive",
      imageUrl: "https://e-cdns-images.dzcdn.net/images/playlist/3-1/500x500-000000-80-0-0.jpg",
    },
    {
      id: "4",
      title: "Party Hits",
      subtitle: "Weekend vibes",
      imageUrl: "https://e-cdns-images.dzcdn.net/images/playlist/4-1/500x500-000000-80-0-0.jpg",
    },
    {
      id: "5",
      title: "Jazz Collection",
      subtitle: "Smooth classics",
      imageUrl: "https://e-cdns-images.dzcdn.net/images/playlist/5-1/500x500-000000-80-0-0.jpg",
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Sidebar />
      
      <main className="flex-1 overflow-auto pb-24">
        <div className="p-6">
          <SearchBar />
          
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {featuredPlaylists.map((playlist) => (
                <FeaturedCard
                  key={playlist.id}
                  title={playlist.title}
                  subtitle={playlist.subtitle}
                  imageUrl={playlist.imageUrl}
                  to={`/playlist/${playlist.id}`}
                />
              ))}
            </div>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
            <div className="space-y-2">
              {trending?.data.slice(0, 5).map((track: DeezerTrack) => (
                <TrendingTrack key={track.id} track={track} />
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <NowPlaying />
    </div>
  );
};

export default Index;
