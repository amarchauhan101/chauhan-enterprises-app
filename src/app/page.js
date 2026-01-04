import AllProducts from "@/components/Home";
import Nav from "@/components/Home";
import SignInPage from "@/components/SignInPage";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { auth } from "../lib/auth";
export default async function Home() {
  const session = await auth();
  console.log("sesison in home", session);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {session ? <AllProducts /> : <SignInPage />}
    </div>
  );
}
