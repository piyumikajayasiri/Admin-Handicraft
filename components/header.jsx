"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="bg-[#306A9F]">
      <div className="shadow-lg p-8  flex flex-row gap-2 justify-between items-center">
        <div>
          Welcome <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white  font-bold px-6 py-2  flex items-center"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
