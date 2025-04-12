'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const DashLink = ({ link, title, Icon }) => {
  const pathname = usePathname();
 return (
    <li>
      <Link
        href={link}
        className={`flex items-center gap-3 font-medium relative z-20 text-sm transition-all duration-200 ${
          pathname === link
            ? ' text-[#FE476E]  pl-5 border w-[101%] rounded-full rounded-r-none border-r-0 border-[#E33E9F]  h-10 bg-[#0F0D20]  before:absolute  before:w-5 before:h-5  before:-top-5   before:right-[1px] before:rounded-br-[20px] before:border-b-1 before:border-r-1 before:border-[#E33E9F] shadow-custom after:content-[] after:absolute after:w-5 after:h-5  after:-bottom-5 after:right-[1px] after:rounded-tr-[20px] after:border-t-1 after:border-r-1 after:border-[#E33E9F]'
            : 'text-gray-300'
        }`}
      >
        {Icon}
        <h1 className="text-white">{title}</h1>
      </Link>
    </li>
  );
};

export default DashLink;
