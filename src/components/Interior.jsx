import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ArrowBigRight } from "lucide-react";

function Interior() {
  return (
    <div className="h-64 w-full relative">
      <Image
        fill
        src="/interior.avif"
        alt="Interior design"
        className="object-cover object-center"
      />
      <Button className="absolute bottom-0 rounded-full left-44 flex items-center gap-3 px-10 py-6">
        <h2 className="text-md font-semibold">Book Now</h2>
        <span className="flex items-center justify-center p-2 bg-black text-white rounded-full">
          <ArrowBigRight />
        </span>
      </Button>
    </div>
  );
}

export default Interior;
