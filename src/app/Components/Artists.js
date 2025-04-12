'use client'
import React from 'react';
import { usePlayer } from '../lib/PlayerContext';

const Artists = () => {
  const { artists, currentSong } = usePlayer();
  return (
    <main>
      <section
        className={`grid gap-5 p-10 ${
          currentSong ? 'grid-cols-5 ' : 'grid-cols-8'
        }`}
      >
        {artists.map((artist, index) => (
          <div
            key={artist._id}
            className={`py-10 text-center rounded-3xl h-[260px] ${
              (index + 1) % 2 == 0 ? 'bg-[#FE476E]' : 'bg-[#4D25AE]'
            }`}
          >
            <img
              src={artist.imageUrl}
              alt=""
              className="h-28 w-28 rounded-full mx-auto"
            />
            <h1 className="font-semibold text-lg mt-5">{artist.name}</h1>
            <h1 className="opacity-70 mt-1">{artist.totalPlays}M plays</h1>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Artists;