"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
   const handleSignOut = () => {
    signOut({
      callbackUrl: "/auth/signin",
      redirect: true,
    });
  };

  return (
    <>
      <button
        className="bg-red-500 cursor-pointer hidden lg:block text-white px-4 py-2 rounded-3xl"
        onClick={handleSignOut}
      >
        Logout
      </button>
    </>
  );
}
