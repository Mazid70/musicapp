'use client';
import React from 'react';
import { usePlayer } from '../lib/PlayerContext';
import { PiWaveformBold } from 'react-icons/pi';
import '../globals.css';
import Wave from './Wave';
const RightSide = () => {
  const { currentSong, songs } = usePlayer();
  const nextSongs = songs.filter(song => song.artist == currentSong?.artist);
  return (
    <main
      className={`${
        currentSong
          ? 'slide-in-right 2xl:w-[500px] xl:w-[350px] bg-gradient-to-b from-[#E33E9F] to-[#4D25AE] pl-[1px] '
          : 'hidden'
      }`}
    >
      <section className="bg-[#0F0D20] h-full w-full xl:px-5 2xl:px-10 overflow-y-auto scroll-hidden ">
        <h1 className="font-semibold text-lg mb-5 flex items-center gap-2">
          Currently Playing{' '}
          <PiWaveformBold className="text-2xl text-[#FE476E]" />{' '}
        </h1>

        <div className="bg-gradient-to-b from-[#4D25AE]  to-[#E33E9F] p-[1px] rounded-2xl z-10">
          <div className="bg-[#0F0D20] h-full w-full rounded-2xl">
            <div className="bg-gradient-to-b from-[#4d25ae40] to-[#e33e9f40] p-10 z-20 rounded-2xl">
              <div className="flex justify-center items-center">
               <Wave/>
                <img
                  src={currentSong?.imageUrl}
                  alt={currentSong?.imageUrl}
                  className="h-20 w-20 rounded-full mx-auto"
                />
                <Wave/>
              </div>
              <h1 className="font-bold text-xl text-center mt-4">
                {currentSong?.name}
              </h1>
              <ul className="flex mt-3 gap-10 list-disc opacity-80 justify-center">
                <li>{currentSong?.artist}</li>
                <li>{currentSong?.year}</li>
              </ul>
            </div>
          </div>
        </div>
        {/* next songs  */}
        <h1 className="font-semibold text-lg my-5 flex items-center gap-2">
          Next Songs <PiWaveformBold className="text-2xl text-[#FE476E]" />{' '}
        </h1>
        <div>
          {nextSongs.map(song => (
            <div
              key={song._id}
              className="bg-gradient-to-b from-[#4D25AE]  to-[#E33E9F] p-[1px] rounded-2xl z-10 mt-5 "
            >
              <div className="bg-[#0F0D20] h-full w-full rounded-2xl">
                <div
                  className={` rounded-2xl py-3 px-5 flex items-center gap-5 w-full ${
                    currentSong._id == song._id
                      ? 'bg-[#FE476E]'
                      : 'bg-[#0F0D20]'
                  }`}
                >
                  <img
                    src={song?.imageUrl}
                    alt=""
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    <h1 className="font-semibold ">{song?.name}</h1>
                    <h1 className="opacity-70 text-sm">
                      {song?.artist} -{song?.year}
                    </h1>
                  </div>
                  <div className="flex-1">
                    <h1 className="opacity-70 text-sm  text-end ">
                      {song?.duration}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default RightSide;