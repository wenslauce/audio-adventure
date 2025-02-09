
import { Play } from "lucide-react";
import Sidebar from "../components/Sidebar";
import NowPlaying from "../components/NowPlaying";
import SearchBar from "../components/SearchBar";

const FeaturedCard = ({ title, subtitle, imageUrl }: { title: string; subtitle: string; imageUrl: string }) => (
  <div className="group relative overflow-hidden rounded-lg aspect-square hover-scale cursor-pointer">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
    <img src={imageUrl || "/placeholder.svg"} alt={title} className="object-cover w-full h-full" />
    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-300">{subtitle}</p>
    </div>
    <button className="absolute right-4 bottom-4 p-3 bg-green-500 text-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all z-30">
      <Play className="h-6 w-6" fill="currentColor" />
    </button>
  </div>
);

const TrendingTrack = ({ title, artist, duration }: { title: string; artist: string; duration: string }) => (
  <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded bg-white/10"></div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-400">{artist}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-400">{duration}</span>
      <button className="p-2 bg-green-500 text-white rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all">
        <Play className="h-4 w-4" fill="currentColor" />
      </button>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Sidebar />
      
      <main className="flex-1 overflow-auto pb-24">
        <div className="p-6">
          <SearchBar />
          
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <FeaturedCard
                title="Chill Vibes"
                subtitle="Perfect for relaxation"
                imageUrl="/placeholder.svg"
              />
              <FeaturedCard
                title="Workout Mix"
                subtitle="Energy boost"
                imageUrl="/placeholder.svg"
              />
              <FeaturedCard
                title="Focus Flow"
                subtitle="Stay productive"
                imageUrl="/placeholder.svg"
              />
              <FeaturedCard
                title="Party Hits"
                subtitle="Weekend vibes"
                imageUrl="/placeholder.svg"
              />
              <FeaturedCard
                title="Jazz Collection"
                subtitle="Smooth classics"
                imageUrl="/placeholder.svg"
              />
            </div>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
            <div className="space-y-2">
              <TrendingTrack
                title="Track Name 1"
                artist="Artist 1"
                duration="3:45"
              />
              <TrendingTrack
                title="Track Name 2"
                artist="Artist 2"
                duration="4:20"
              />
              <TrendingTrack
                title="Track Name 3"
                artist="Artist 3"
                duration="3:15"
              />
              <TrendingTrack
                title="Track Name 4"
                artist="Artist 4"
                duration="3:30"
              />
              <TrendingTrack
                title="Track Name 5"
                artist="Artist 5"
                duration="4:10"
              />
            </div>
          </section>
        </div>
      </main>
      
      <NowPlaying />
    </div>
  );
};

export default Index;
