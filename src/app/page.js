import SideBar from './Components/SideBar';
import { collectionNames, connectDB } from './lib/connectDB';
import MusicCard from './Components/MusicCard';
import RightSide from './Components/RightSide';
import Slider from './Components/Home/Slider';
import './globals.css';
import Artists from './Components/Artists';
const Home = async () => {
  const rawSongs = await connectDB(collectionNames.SONGS).find({}).toArray();

  const musics = rawSongs.map(music => ({
    ...music,
    _id: music._id.toString(),
  }));
  return (
    <main className="fixed inset-0  flex justify-center bg-[#0F0D20]">
      <SideBar />
      <div className="flex-1 overflow-y-scroll scroll-hidden pb-20">
        <Slider />
        <Artists/>
        <div className=" grid xl:grid-cols-3 2xl:grid-cols-4  2xl:p-10 xl:p-5">
          {musics.map(music => (
            <MusicCard key={music._id} music={music} />
          ))}
        </div>
      </div>
      <RightSide />
    </main>
  );
};

export default Home;
