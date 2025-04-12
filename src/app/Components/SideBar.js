import React from 'react';
import { PiMusicNotesFill } from 'react-icons/pi';
import { FaFire, FaUser, FaCompactDisc, FaMusic } from 'react-icons/fa';
import DashLink from './DashLink';
import './styles.css';
const SideBar = () => {
  return (
    <main className="h-screen  bg-gradient-to-b from-[#E33E9F] to-[#4D25AE] w-60 pr-[1px] z-60 ">
      <div className="bg-[#0F0D20] h-full w-full pl-6 pt-10 pr-0">
        {/* Icon  */}
        <div className="flex items-center gap-2 ">
          <div className="bg-[#FE476E] h-5 w-5 rounded-full flex justify-center items-center">
            <PiMusicNotesFill />
          </div>
          <h1 className="font-semibold text-sm">Music App</h1>
        </div>
        <h1 className="font-bold text-xl mt-5">Library</h1>
        <ul className="space-y-5 mt-5">
          <DashLink link="/" title="Trends" Icon={<FaFire />} />
          <DashLink link="/artists" title="Artists" Icon={<FaUser />} />
          <DashLink link="/albums" title="Albums" Icon={<FaCompactDisc />} />
          <DashLink link="/songs" title="Songs" Icon={<FaMusic />} />
        </ul>
      </div>
    </main>
  );
};

export default SideBar;
