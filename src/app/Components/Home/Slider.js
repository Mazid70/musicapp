'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { usePlayer } from '@/app/lib/PlayerContext';

const Slider = () => {
  const {songs}=usePlayer()
  return (
    <div className="">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          direction: 'vertical',
        }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="w-[95%] h-[40vh] mt-10"
      >
        {songs.map((song, index) => (
          <SwiperSlide
            key={index}
            className="rounded-xl overflow-hidden relative"
          >
            <img
              src={song.imageUrl}
              alt={song.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <h3 className="text-lg font-bold">{song.name}</h3>
              <p className="text-sm text-gray-300">
                {song.artist} - {song.plays} Plays
              </p>
              <div className="absolute bottom-4 right-4">
                {/* Add any additional content here */}
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-pagination absolute right-2 top-1/2 -translate-y-1/2" />
      </Swiper>
    </div>
  );
};

export default Slider;