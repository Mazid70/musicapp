'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Animation from './loading.json';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
const loading = () => {
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
     setIsClient(true);
   }, []);
  return (
    <div className='flex w-full h-screen justify-center items-center'>
      {isClient && (
               <Lottie
                 className="lg:h-[400px] lg:w-[600px] mx-auto"
                 animationData={Animation}
                 loop={true}
               />
             )}
    </div>
  );
};

export default loading;