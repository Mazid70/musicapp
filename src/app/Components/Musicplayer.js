'use client';

import { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Repeat,
  Shuffle,
  Volume2,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { usePlayer } from '../lib/PlayerContext';



const formatTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const { currentSong,isMPlaying } = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.1);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setDurationFunc = () => setDuration(audio.duration);

    audio.volume = volume;
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', setDurationFunc);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', setDurationFunc);
    };
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (currentSong && audio) {
      audio.src = currentSong.musicUrl;
      audio.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = e => {
    const audio = audioRef.current;
    const value = (e.target.value / 100) * duration;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolume = e => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleEnded = () => {
    const audio = audioRef.current;
    if (isLooping) {
      audio.play();
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className={isMPlaying?'transition-all duration-500 z-50 absolute left-0 bottom-0 bg-gradient-to-r from-[#2e003f] via-[#1d0033] to-[#2e003f] p-4 rounded-t-xl text-white w-full  mx-auto shadow-lg':'hidden'}>
      <audio ref={audioRef} loop={isLooping} onEnded={handleEnded} />

      <div className="flex items-center justify-between px-4">
        <button
          onClick={togglePlay}
          className="bg-pink-500 p-4 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>

        <div className="flex items-center w-full mx-6 gap-2">
          <SkipBack className="opacity-70 hover:opacity-100" />
          <span className="text-sm w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="w-full accent-pink-500 h-1 cursor-pointer"
          />
          <span className="text-sm w-10">{formatTime(duration)}</span>
          <SkipForward className="opacity-70 hover:opacity-100" />
        </div>

        <div className="flex items-center gap-4">
          <Repeat
            onClick={() => setIsLooping(!isLooping)}
            className={`cursor-pointer transition-all ${
              isLooping ? 'text-pink-500' : 'opacity-70 hover:opacity-100'
            }`}
          />
          <Shuffle
            onClick={() => setIsShuffling(!isShuffling)}
            className={`cursor-pointer transition-all ${
              isShuffling ? 'text-pink-500' : 'opacity-70 hover:opacity-100'
            }`}
          />
          <div className="flex items-center gap-2">
            <Volume2 />
            <input
              type="range"
              value={volume * 100}
              onChange={handleVolume}
              className="accent-pink-500 w-24 h-1 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
