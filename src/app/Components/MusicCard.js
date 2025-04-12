'use client'
import React from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { usePlayer } from '../lib/PlayerContext';

const MusicCard = ({ music }) => {
  const { setCurrentSong ,setIsPlaying} = usePlayer();
  const handleClick = () => {
    setCurrentSong(music);
    setIsPlaying(true);

  };
  return (
    <div
      className="group z-50 hover:bg-[#0A101A] relative p-5 rounded-lg hover:scale-105 overfolw-hidden transition-all "
    >
      <img src={music.imageUrl} alt="" className="group-hover:opacity-40  2xl:w-[375px] 2xl:max-h-[210px]" />
      <h1 className="text-lg font-medium">{music.name}</h1>
      <h1 className="text-gray-300">{music.artist}</h1>
      <MdPlayArrow onClick={handleClick} className="bg-[#FE476E] h-10 w-10 rounded-full hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer" />
    </div>
  );
};

export default MusicCard;