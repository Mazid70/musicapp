'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAxiosAll } from '../CustomHooks/useAxiosAll';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isMPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const axioxAll = useAxiosAll();
  useEffect(() => {
    axioxAll.get('api/songs').then(res => {
      setSongs(res.data);
    });
    axioxAll.get('api/artists').then(res => {
      setArtists(res.data);
    });
  }, []);
  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        isMPlaying,
        setIsPlaying,
        songs,
        artists,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
