'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoArrowBack, IoHomeSharp } from "react-icons/io5";

const HomeButton: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className="absolute top-4 right-4 m-4">
      <Link
        href={pathname === '/admin' ? '/' : '/admin'}
        className="block bg-white rounded-full shadow-xl h-8 w-8 p-1.5 hover:bg-theme-gold"
      >
        {pathname === '/admin' ? (<IoHomeSharp className="w-full h-full" />) : (<IoArrowBack className="w-full h-full" />)}
      </Link>
    </div >
  );
};

export default HomeButton;
