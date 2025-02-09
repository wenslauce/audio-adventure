
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { deezerApi } from "../services/deezer";
import { Play } from "lucide-react";
import Sidebar from "../components/Sidebar";
import NowPlaying from "../components/NowPlaying";
import { usePlayer } from "../contexts/PlayerContext";

const Artist = () => {
  const { id } = useParams();
  const { setCurrentTrack, setIsPlaying } = usePlayer();

  const { data: artist, isLoading } = useQuery({
    queryKey: ["artist", id],
    queryFn: () => deezerApi.getArtist(id || ""),
    enabled: !!id,
  });

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Sidebar />
      <main className="flex-1 overflow-auto pb-24">
        <div className="p-6">
          {isLoading ? (
            <div>Loading...</div>
          ) : artist ? (
            <>
              <div className="flex items-end gap-6 mb-8">
                <img
                  src={artist.picture_big}
                  alt={artist.name}
                  className="w-48 h-48 rounded-full shadow-xl"
                />
                <div>
                  <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
                  <p className="text-gray-400">{artist.nb_fan.toLocaleString()} fans</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {/* This would display albums, but the current API endpoint doesn't return them */}
                {/* You would need to make an additional API call to get albums */}
              </div>
            </>
          ) : null}
        </div>
      </main>
      <NowPlaying />
    </div>
  );
};

export default Artist;
