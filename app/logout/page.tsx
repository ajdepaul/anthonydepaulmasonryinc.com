'use server';

import { buttonVariants } from "@/app/components/ui/button";
import { H } from "@/app/components/ui/header";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoArrowForward } from "react-icons/io5";

const LogoutPage: React.FC = async () => {
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) { redirect('/api/auth/logout'); }

  return (
    <div className="grow flex items-center justify-center">
      <div className="flex flex-col items-center bg-white text-black p-8 rounded-xl shadow-xl">
        <H level="1">You have been logged out.</H>
        <div className="w-16 border-t border-black my-6" />
        <Link href="/" className={buttonVariants()}>
          Return home <IoArrowForward className="inline" />
        </Link>
      </div>
    </div>
  );
};

export default LogoutPage;
