"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

function SwiperComponent() {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={1.5}
      spaceBetween={10}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 50,
        modifier: 1,
        slideShadows: false,
      }}
      loop={true}
      modules={[EffectCoverflow, Autoplay]}
      className="mySwiper w-full h-full rounded-md"
    >
      <SwiperSlide className="bg-center bg-cover h-[90%] w-[300px] flex items-center">
        <img
          className="h-full w-full object-cover "
          src="https://media.istockphoto.com/id/2157389780/photo/the-room-features-roller-blinds-as-part-of-the-interior.webp?a=1&b=1&s=612x612&w=0&k=20&c=rd1HxTi6pjqVZiwb2YFBq5Y7wlnhUwsSIkQswk-AMUk="
        />
      </SwiperSlide>
      <SwiperSlide className="bg-center bg-cover h-full flex items-center justify-center">
        <img
          className="h-full w-full object-cover "
          src="https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxpdmluZyUyMHJvb218ZW58MHx8MHx8fDA%3D"
        />
      </SwiperSlide>
      <SwiperSlide className="bg-center bg-cover h-full flex items-center justify-center">
        <img
          className="h-full w-full object-cover "
          src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxpdmluZyUyMHJvb218ZW58MHx8MHx8fDA%3D"
        />
      </SwiperSlide>
      <SwiperSlide className="bg-center bg-cover h-full flex items-center justify-center">
        <img
          className="h-full w-full object-cover "
          src="https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D"
        />
      </SwiperSlide>
      <SwiperSlide className="bg-center bg-cover h-full flex items-center justify-center">
        <img
          className="h-full w-full object-cover "
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
        />
      </SwiperSlide>
      <SwiperSlide className="bg-center bg-cover h-full flex items-center justify-center">
        <img
          className="h-full w-full object-cover "
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
        />
      </SwiperSlide>
      <SwiperSlide className="bg-center bg-cover h-full flex items-center justify-center">
        <img
          className="h-full w-full object-cover "
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
        />
      </SwiperSlide>
      <SwiperSlide className="bg-center bg-cover h-full flex items-center justify-center">
        <img
          className="h-full w-full object-cover "
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
        />
      </SwiperSlide>
      <SwiperSlide className="bg-center bg-cover h-full flex items-center justify-center">
        <img
          className="h-full w-full object-cover "
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default SwiperComponent;
