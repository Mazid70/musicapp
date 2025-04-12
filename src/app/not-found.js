'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Animation from './error.json';
import Link from 'next/link';

// Dynamically import lottie-react so it only loads on the client
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Error = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className=" h-screen flex justify-center items-center px-4">
      <div className="text-center">
        {isClient && (
          <Lottie
            className="lg:h-[400px] lg:w-[600px] mx-auto"
            animationData={Animation}
            loop={true}
          />
        )}
        <h1 className="font-extrabold text-5xl mt-4">PAGE NOT FOUND</h1>
        <p className="font-semibold mt-2">
          The page you are looking for does not{' '}
          <span className="text-red-600">exist</span> or an error occurred.{' '}
          <br /> Please go back to the homepage.
        </p>
        <div className="flex justify-center mt-5">
          <Link
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-medium transition-all"
            href="/"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
