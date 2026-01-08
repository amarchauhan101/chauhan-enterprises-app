import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

function Navbar({ ServiceRef, collectionRef, ProductRef,enquiryRef }) {
  const ScrollTo = (ref) => {
    ref.current?.scrollIntoView({
      behavior:"smooth",
      block:"start"

    })
  };
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="absolute flex items-center justify-between p-10 z-30  w-full font-mono">
      <div className="logo">Logo</div>
      <div className="center flex gap-10 capitalize text-white z-10 cursor-pointer font-semibold">
        <button className="cursor-pointer" onClick={() => ScrollTo(ProductRef)}> products</button>
        <button className="cursor-pointer" onClick={() => ScrollTo(ServiceRef)}>service</button>
        <button className="cursor-pointer" onClick={() => ScrollTo(ProductRef)}>collections</button>
        <button className="cursor-pointer">blog</button>
      </div>
      <div className="enquiry z-10">
        <Button onClick={() => ScrollTo(enquiryRef)} className="bg-yellow-700 rounded-full  active:scale-90">
          enquiry
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
