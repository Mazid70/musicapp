'use client';
import React, { useState } from 'react';
import { FaCloudUploadAlt, FaUserCircle } from 'react-icons/fa';
import { SiYoutubemusic } from 'react-icons/si';
import { BiSolidAlbum } from 'react-icons/bi';
import { GiDuration } from 'react-icons/gi';
import {
  MdBloodtype,
  MdDateRange,
  MdOutlineFileUpload,
  MdStarRate,
} from 'react-icons/md';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import Image from 'next/image';
import { useAxiosAll } from '../CustomHooks/useAxiosAll';

const imageHosting = process.env.NEXT_PUBLIC_IMAGE_HOSTING;
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHosting}`;
const cloudinaryAPI = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

const UploadPage = () => {
  const [img, setImg] = useState(null);
  const [music, setMusic] = useState(null);
  const axiosAll=useAxiosAll()
  const handleUpload = async e => {
    e.preventDefault();
      const formData = new FormData();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const artist = form.artist.value;
    const album = form.album.value;
    const genre = form.genre.value;
    const year = form.year.value;
    const rating = form.rating.value;
    const duration = form.duration.value;
    let imageUrl;
    let musicUrl = '';
   formData.append('image', image);
    // Upload Image to ImgBB
   if (image) {
     const res = await axiosAll.post(imageHostingAPI, formData, {
       headers: {
         'content-type': 'multipart/form-data',
       },
     });
     if (res.data.success) {
       imageUrl = res.data.data.display_url;
     }
   }
    // Upload Music to Dropbox
    if (music) {
      const musicData = new FormData();
      musicData.append('file', music);
      musicData.append('upload_preset', uploadPreset);
      musicData.append('resource_type', 'video'); // For audio, use 'video'

      const res = await axiosAll.post(cloudinaryAPI, musicData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.secure_url) {
        musicUrl = res.data.secure_url;
      }
    }
    // Send Data to Backend API
    const songData = {
      name,
      artist,
      album,
      genre,
      year,
      rating,
      duration,
      imageUrl,
      musicUrl,
    };
    await axiosAll.post('/api/upload', songData);
    
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleUpload}
        className="bg-gradient-to-br from-[#4D25AE33] to-[rgba(227,62,159,0.2)] p-10 w-[400px] space-y-3"
      >
        <h1 className="text-center font-bold text-3xl">Upload A Song</h1>

        {/* Song Name */}
        <div className="w-full relative">
          <input
            type="text"
            className="h-11 border-b w-full placeholder:text-white outline-0 pl-8"
            placeholder="Song name"
            name="name"
            required
          />
          <SiYoutubemusic className="absolute top-3" />
        </div>

        {/* Artist Name */}
        <div className="w-full relative">
          <input
            type="text"
            className="h-11 border-b w-full placeholder:text-white outline-0 pl-8"
            placeholder="Artist name"
            name="artist"
            required
          />
          <FaUserCircle className="absolute top-3" />
        </div>

        {/* Album Name */}
        <div className="w-full relative">
          <input
            type="text"
            className="h-11 border-b w-full placeholder:text-white outline-0 pl-8"
            placeholder="Album name"
            name="album"
            required
          />
          <BiSolidAlbum className="absolute top-3" />
        </div>

        {/* Genre & Year */}
        <div className="flex justify-between gap-5">
          <div className="w-full relative">
            <input
              type="text"
              className="h-11 border-b w-full placeholder:text-white outline-0 pl-8"
              placeholder="Genre"
              name="genre"
              required
            />
            <MdBloodtype className="absolute top-3" />
          </div>
          <div className="w-full relative">
            <input
              type="text"
              className="h-11 border-b w-full placeholder:text-white outline-0 pl-8"
              placeholder="Release Year"
              name="year"
              required
            />
            <MdDateRange className="absolute top-3" />
          </div>
        </div>

        {/* Rating & Duration */}
        <div className="flex justify-between gap-5">
          <div className="w-full relative">
            <input
              type="text"
              className="h-11 border-b w-full placeholder:text-white outline-0 pl-8"
              placeholder="Rating"
              name="rating"
              required
            />
            <MdStarRate className="absolute top-3" />
          </div>
          <div className="w-full relative">
            <input
              type="text"
              className="h-11 border-b w-full placeholder:text-white outline-0 pl-8"
              placeholder="Duration"
              name="duration"
              required
            />
            <GiDuration className="absolute top-3" />
          </div>
        </div>

        {/* Upload Cover Image */}
        <h1 className="mb-2">Cover Image:</h1>
        <div className="relative cursor-pointer">
          <div className="w-full h-20 border border-dashed py-2">
            <input
              type="file"
              className="h-full w-full opacity-0"
              name='image'
              onChange={e => setImg(e.target.files[0])}
            />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <FaCloudUploadAlt className="text-2xl" />
              <h1 className="font-medium">Click Here to upload</h1>
            </div>
          </div>
        </div>
        {img && (
          <div className="w-full h-12 justify-between bg-[#202124] flex gap-3 pr-2">
            <Image
              src={URL.createObjectURL(img)}
              alt={img?.name}
              height={10}
              width={100}
            />

            <div>
              <h1 className="">{img?.name}</h1>
              <h1 className="text-xs text-gray-400">
                {(img.size / 1024).toFixed(2)}KB
              </h1>
            </div>
            <RiDeleteBack2Fill
              className="text-red-500 text-2xl justify-self-end self-center cursor-pointer"
              onClick={() => setImg(null)}
            />
          </div>
        )}
        {/* Upload Music File */}
        <h1 className="mb-2">Music file:</h1>
        <div className="h-10 flex w-full items-center gap-5">
          <div className="border relative h-[99%] w-32 px-2">
            <input
              onChange={e => setMusic(e.target.files[0])}
              type="file"
              className="h-full w-full opacity-0"
            />
            <div className="absolute top-2 flex gap-2 pointer-events-none">
              <MdOutlineFileUpload className=" text-xl" />
              <span>Upload file</span>
            </div>
          </div>
          <h1 className="text-xs flex-1">
            {music ? music.name.substring(0, 40) + '...' : 'No File chosen'}
          </h1>
        </div>

        {/* Submit Button */}
        <div>
          <input
            type="submit"
            value="Upload"
            className="w-full h-11 bg-[#4D25AE] text-white font-medium"
          />
        </div>
      </form>
    </main>
  );
};

export default UploadPage;
