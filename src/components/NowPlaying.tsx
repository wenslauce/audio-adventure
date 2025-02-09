
import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { usePlayer } from "../contexts/PlayerContext";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const NowPlaying = () => {
  const [volume, setVolume] = useState(100);
  const { currentTrack, isPlaying, setIsPlaying, audioRef, currentTime, duration } = usePlayer();

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.preview;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-black/60 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <img 
            src={currentTrack.album.cover_medium} 
            alt={currentTrack.title}
            className="w-12 h-12 rounded-md"
          />
          <div>
            <h4 className="font-medium">{currentTrack.title}</h4>
            <p className="text-sm text-gray-400">{currentTrack.artist.name}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <SkipBack className="h-5 w-5" />
            </button>
            <button 
              className="p-3 bg-white text-black rounded-full hover:scale-105 transition-transform"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" fill="currentColor" />
              ) : (
                <Play className="h-6 w-6" fill="currentColor" />
              )}
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <div className="w-96 h-1 bg-white/20 rounded-full">
              <div 
                className="h-full bg-white rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
