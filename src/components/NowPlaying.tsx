
import { useState } from "react";
import { Play, SkipBack, SkipForward, Volume2 } from "lucide-react";

const NowPlaying = () => {
  const [volume, setVolume] = useState(100);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-black/60 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded bg-white/10 animate-pulse"></div>
          <div>
            <h4 className="font-medium">No track playing</h4>
            <p className="text-sm text-gray-400">Select a track to play</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <SkipBack className="h-5 w-5" />
          </button>
          <button className="p-3 bg-white text-black rounded-full hover:scale-105 transition-transform">
            <Play className="h-6 w-6" fill="currentColor" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <SkipForward className="h-5 w-5" />
          </button>
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
