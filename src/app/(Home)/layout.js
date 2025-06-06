import RightSide from '../Components/RightSide';
import SideBar from '../Components/SideBar';
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
export default function HomeLayout({ children }) {
  return (
    <main className="flex ">
      <SideBar />
      {children}
      <RightSide />
    </main>
  );
}
