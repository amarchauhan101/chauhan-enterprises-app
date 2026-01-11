import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ArrowBigRight } from "lucide-react";

function Interior() {
  return (
    <div className="h-24 sm:h-64 w-full relative overflow-hidden">
      <Image
        fill
        src="/interior2.webp"
        alt="Interior design"
        className="object-cover ml-6  "
      />
    </div>
  );
}

export default Interior;
