
import React, { createContext, useContext, useState } from 'react';
import { DeezerTrack } from '../types/deezer';

interface PlayerContextType {
  currentTrack: DeezerTrack | null;
  isPlaying: boolean;
  setCurrentTrack: (track: DeezerTrack | null) => void;
  setIsPlaying: (playing: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<DeezerTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, setCurrentTrack, setIsPlaying, audioRef }}>
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
