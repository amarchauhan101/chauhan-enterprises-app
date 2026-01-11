import React from "react";
import { Button } from "./ui/button";
import Swiper from "./Swiper";
import SwiperComponent from "./Swiper";

function Priority() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:h-[40vh] h-fit text-black p-4  overflow-hidden">
      <div className="left flex items-start gap-4 p-4 flex-col z-10">
        <div>
          <h2 className="text-sm opacity-12">Perfect Partner</h2>
          <h1 className="lg:text-4xl text-2xl lg:w-[70%] w-full font-semibold ">
            We have prioriy for creating a Dream home Design
          </h1>
        </div>
        <p className="lg:text-md text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore
          dignissimos nostrum, saepe optio quo quam ipsam, tenetur reiciendis,
          asperiores natus quasi. Sed, harum.
        </p>
        <a href="tel:8080686585"><Button>Contact Us</Button></a>
      </div>

      <div className="z-10 h-full overflow-hidden">
        <SwiperComponent />
      </div>
    </div>
  );
}

export default Priority;
