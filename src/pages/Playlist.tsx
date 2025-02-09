
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { deezerApi } from "../services/deezer";
import { Play, Pause } from "lucide-react";
import Sidebar from "../components/Sidebar";
import NowPlaying from "../components/NowPlaying";
import { usePlayer } from "../contexts/PlayerContext";
import { DeezerTrack } from "../types/deezer";

const Playlist = () => {
  const { id } = useParams();
  const { currentTrack, isPlaying, setCurrentTrack, setIsPlaying } = usePlayer();

  const { data: playlist, isLoading } = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => deezerApi.getPlaylist(id || ""),
    enabled: !!id,
  });

  const handlePlay = (track: DeezerTrack) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Sidebar />
      <main className="flex-1 overflow-auto pb-24">
        <div className="p-6">
          {isLoading ? (
            <div>Loading...</div>
          ) : playlist ? (
            <>
              <div className="flex items-end gap-6 mb-8">
                <img
                  src={playlist.picture_big}
                  alt={playlist.title}
                  className="w-48 h-48 rounded-lg shadow-xl"
                />
                <div>
                  <h1 className="text-4xl font-bold mb-2">{playlist.title}</h1>
                  <p className="text-gray-400">
                    {playlist.tracks.data.length} tracks
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {playlist.tracks.data.map((track: DeezerTrack) => (
                  <div
                    key={track.id}
                    className="group flex items-center gap-4 p-4 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <button
                      onClick={() => handlePlay(track)}
                      className="p-2 bg-green-500 text-white rounded-full"
                    >
                      {currentTrack?.id === track.id && isPlaying ? (
                        <Pause className="h-4 w-4" fill="currentColor" />
                      ) : (
                        <Play className="h-4 w-4" fill="currentColor" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h3 className="font-medium">{track.title}</h3>
                      <p className="text-sm text-gray-400">{track.artist.name}</p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {Math.floor(track.duration / 60)}:
                      {String(track.duration % 60).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </main>
      <NowPlaying />
    </div>
  );
};

export default Playlist;
