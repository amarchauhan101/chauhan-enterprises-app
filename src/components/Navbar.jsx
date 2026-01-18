"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import LogoutButton from "./SignOut";

function Navbar({ ServiceRef, collectionRef, ProductRef, enquiryRef }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ScrollTo = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsMenuOpen(false); // Close mobile menu after clicking
  };
  const user = useSession();
  // console.log("user in nav",user);

  const { data } = useSession();
  console.log("session", data?.user?.role);
  const isAdmin = data?.user?.role === "admin";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/auth/signin",
      redirect: true,
    });
  };

  return (
    <div className="absolute flex items-center  justify-between px-6 py-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 md:py-6 lg:py-10 z-30 w-full font-mono">
      {/* Logo */}
      <div className="logo cursor-pointer text-white font-bold text-lg md:text-xl lg:text-2xl min-w-fit flex-shrink-0 mr-4">
        <Image
          height={90}
          width={90}
          sizes="100vw"
          // className="lg:h-72 lg:w-72 h-44 w-44"
          src={"/logo.png"}
          alt="logo"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="center hidden lg:flex gap-6 xl:gap-10 capitalize text-white z-10 cursor-pointer font-semibold absolute left-1/2 transform -translate-x-1/2">
        <button
          className="cursor-pointer hover:text-yellow-300 transition-colors duration-200"
          onClick={() => ScrollTo(ProductRef)}
        >
          products
        </button>
        <button
          className="cursor-pointer hover:text-yellow-300 transition-colors duration-200"
          onClick={() => ScrollTo(ServiceRef)}
        >
          service
        </button>
        <button
          className="cursor-pointer hover:text-yellow-300 transition-colors duration-200"
          onClick={() => ScrollTo(ProductRef)}
        >
          collections
        </button>
        <button className="cursor-pointer hover:text-yellow-300 transition-colors duration-200">
          blog
        </button>
      </div>

      {/* Mobile Menu Button & Enquiry Button */}
      <div className="flex items-center gap-3 z-10">
        {/* Enquiry Button */}
        <Button
          onClick={() => ScrollTo(enquiryRef)}
          className="bg-yellow-700 cursor-pointer hover:bg-yellow-800 rounded-full active:scale-90 transition-all duration-200 px-3 py-2 text-sm md:px-4 md:py-2 md:text-base"
        >
          enquiry
        </Button>
        {isAdmin ? (
          <Link
            href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/admin/dashboard`}
          >
            <Button className="bg-blue-700 hidden lg:block cursor-pointer hover:bg-blue-800 transition-all ease-in-out rounded-full active:scale-90  duration-200 px-3 py-2 text-sm md:px-4 md:py-2 md:text-base">
              Dashboard
            </Button>
          </Link>
        ) : (
          <></>
        )}
        <LogoutButton />
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-md transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-black transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMenu}
            className="text-black p-2 hover:bg-white/10 rounded-md"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-4 space-y-6 text-black">
          <button
            className="border-b-2 border-gray-200 text-left py-3 capitalize font-semibold hover:bg-gray-100 hover:text-yellow-700 transition-all duration-200 rounded-md px-2"
            onClick={() => ScrollTo(ProductRef)}
          >
            products
          </button>
          <button
            className="text-left py-3 capitalize font-semibold hover:bg-gray-100 hover:text-yellow-700 transition-all duration-200 rounded-md px-2"
            onClick={() => ScrollTo(ServiceRef)}
          >
            service
          </button>
          <button
            className="text-left py-3 capitalize font-semibold hover:bg-gray-100 hover:text-yellow-700 transition-all duration-200 rounded-md px-2"
            onClick={() => ScrollTo(collectionRef)}
          >
            collections
          </button>
          <Link
            href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/admin/dashboard`}
          >
            <button className="text-left py-3 capitalize font-semibold hover:bg-gray-100 hover:text-yellow-700 transition-all duration-200 rounded-md px-2">
              Dashboard
            </button>
          </Link>
          <button
            onClick={handleSignOut}
            className="text-left py-3 capitalize font-semibold hover:bg-gray-100 hover:text-yellow-700 transition-all duration-200 rounded-md px-2"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
