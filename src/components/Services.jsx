"use client";
import React, { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");

    const update = () => setIsMobile(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function Services({ ServiceRef }) {
  // Create separate refs and motion values for each service
  const imgRef1 = useRef(null);
  const imgRef2 = useRef(null);
  const imgRef3 = useRef(null);
  const imgRef4 = useRef(null);
  const imgRef5 = useRef(null);

  const parentVariant = {
    initial: {},
    hover: {},
  };
  const ismobile = useIsMobile();
  console.log("ismobile", ismobile);

  const imgVariant = {
    initial: { scale: 0 },
    hover: { scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  };

  // Create separate motion values for each service
  const x1 = useMotionValue(0);
  const y1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const y2 = useMotionValue(0);
  const x3 = useMotionValue(0);
  const y3 = useMotionValue(0);
  const x4 = useMotionValue(0);
  const y4 = useMotionValue(0);
  const x5 = useMotionValue(0);
  const y5 = useMotionValue(0);

  // Create separate mouse move handlers for each service
  const createMouseMoveHandler = (x, y) => (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - 80);
    y.set(e.clientY - rect.top - 80);
  };
  return (
    <div className="h-fit relative w-full bg-gradient-to-r from-black to-white">
      <div
        ref={ServiceRef}
        className="cnt flex flex-col lg:gap-20 gap-10 lg:p-20 p-8"
      >
        <h2 className="lg:text-7xl text-2xl text-white">Services</h2>
        <div className="header grid grid-cols-1 lg:gap-10 gap-6">
          <motion.div
            variants={parentVariant}
            initial={ismobile ? false : "initial"}
            whileHover={ismobile ? false : "hover"}
            onMouseMove={ismobile ? undefined : createMouseMoveHandler(x1, y1)}
            className="block1 relative grid lg:grid-cols-3 grid-cols-1 gap-4 lg:gap-2 border-b-2 pb-6"
          >
            <motion.div
              variants={ismobile ? {} : imgVariant}
              style={ismobile ? {} : { x:x1,y:y1}}
              initial={ismobile ? {scale:1} : "initial"}
              animate={ismobile ? {scale:1}:undefined}
              ref={imgRef1}
              className="img lg:absolute lg:h-72 lg:w-72 h-48 w-full lg:z-20 z-10 lg:pointer-events-none order-first lg:order-none"
            >
              <img
                className="w-full h-full object-cover object-fit rounded-lg"
                src="https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Home Interior Design"
              />
            </motion.div>
            <div className="content-section lg:col-span-3 space-y-2">
              <div className="flex items-center gap-4">
                <h4 className="lg:text-2xl text-lg text-white font-bold">01</h4>
                <h1 className="lg:text-2xl text-lg text-white font-semibold">
                  Home Interior Design
                </h1>
              </div>
              <p className="lg:text-xl text-sm text-gray-200 lg:max-w-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                pariatur animi error voluptatem quia molestias sit, minus,
                officia natus quo ratione voluptatum quis?
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={parentVariant}
            initial={ismobile ? false : "initial"}
            whileHover={ismobile ? false : "hover"}
            onMouseMove={ismobile ? undefined : createMouseMoveHandler(x2, y2)}
            className="block1 relative grid lg:grid-cols-3 grid-cols-1 gap-4 lg:gap-2 border-b-2 pb-6"
          >
            <motion.div
              variants={ismobile ? {} : imgVariant}
              style={ismobile ? {} : { x: x2, y: y2 }}
               initial={ismobile ? {scale:1} : "initial"}
               animate={ismobile ? {scale:1}:undefined}
              ref={imgRef2}
              className="img lg:absolute lg:h-72 lg:w-72 h-48 w-full lg:z-20 z-10 lg:pointer-events-none order-first lg:order-none"
            >
              <img
                className="w-full h-full object-cover object-fit rounded-lg"
                src="https://images.unsplash.com/photo-1631249073981-35567d93a0d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwc3BhY2UlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D"
                alt="Office Space Design"
              />
            </motion.div>
            <div className="content-section lg:col-span-3 space-y-2">
              <div className="flex items-center gap-4">
                <h4 className="lg:text-2xl text-lg text-white font-bold">02</h4>
                <h1 className="lg:text-2xl text-lg text-white font-semibold">
                  Office Space Design
                </h1>
              </div>
              <p className="lg:text-xl text-sm text-gray-200 lg:max-w-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                pariatur animi error voluptatem quia molestias sit, minus,
                officia natus quo ratione voluptatum quis?
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={parentVariant}
            initial={ismobile ? false : "initial"}
            whileHover={ismobile ? false : "hover"}
            onMouseMove={ismobile ? undefined : createMouseMoveHandler(x3, y3)}
            className="block1 relative grid lg:grid-cols-3 grid-cols-1 gap-4 lg:gap-2 border-b-2 pb-6"
          >
            <motion.div
              variants={ismobile ? {} : imgVariant}
              style={ismobile ? {} : { x: x3, y: y3 }}
               initial={ismobile ? {scale:1} : "initial"}
               animate={ismobile ? {scale:1}:undefined}
              ref={imgRef3}
              className="img lg:absolute lg:h-72 lg:w-72 h-48 w-full lg:z-20 z-10 lg:pointer-events-none order-first lg:order-none"
            >
              <img
                className="w-full h-full object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Luxury Interior Design"
              />
            </motion.div>
            <div className="content-section lg:col-span-3 space-y-2">
              <div className="flex items-center gap-4">
                <h4 className="lg:text-2xl text-lg text-white font-bold">03</h4>
                <h1 className="lg:text-2xl text-lg text-white font-semibold">
                  Luxury Interior Design
                </h1>
              </div>
              <p className="lg:text-xl text-sm text-gray-200 lg:max-w-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                pariatur animi error voluptatem quia molestias sit, minus,
                officia natus quo ratione voluptatum quis?
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={parentVariant}
            initial={ismobile ? false : "initial"}
            whileHover={ismobile ? false : "hover"}

            onMouseMove={ismobile ? undefined : createMouseMoveHandler(x4, y4)}
            className="block1 relative grid lg:grid-cols-3 grid-cols-1 gap-4 lg:gap-2 border-b-2 pb-6"
          >
            <motion.div
              variants={ismobile ? {} : imgVariant}
              style={ismobile ? {} : { x: x4, y: y4 }}
               initial={ismobile ? {scale:1} : "initial"}
               animate={ismobile ? {scale:1}:undefined}
              ref={imgRef4}
              className="img lg:absolute lg:h-72 lg:w-72 h-48 w-full lg:z-20 z-10 lg:pointer-events-none order-first lg:order-none"
            >
              <img
                className="w-full h-full object-cover rounded-lg"
                src="https://plus.unsplash.com/premium_photo-1661295665154-34615f961f8c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2l0Y2hlbiUyMG1ha2VvdmVyfGVufDB8fDB8fHww"
                alt="Kitchen MakeOver Design"
              />
            </motion.div>
            <div className="content-section lg:col-span-3 space-y-2">
              <div className="flex items-center gap-4">
                <h4 className="lg:text-2xl text-lg text-white font-bold">04</h4>
                <h1 className="lg:text-2xl text-lg text-white font-semibold">
                  Kitchen MakeOver Design
                </h1>
              </div>
              <p className="lg:text-xl text-sm text-gray-200 lg:max-w-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                pariatur animi error voluptatem quia molestias sit, minus,
                officia natus quo ratione voluptatum quis?
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={parentVariant}
            initial={ismobile ? false : "initial"}
            whileHover={ismobile ? false : "hover"}
            onMouseMove={ismobile ? undefined : createMouseMoveHandler(x5, y5)}
            className="block1 relative grid lg:grid-cols-3 grid-cols-1 gap-4 lg:gap-2 border-b-2 pb-6"
          >
            <motion.div
              variants={ismobile ? {} : imgVariant}
              style={ismobile ? {} : { x: x5, y: y5 }}
              initial={ismobile ? {scale:1} : "initial"}
              animate={ismobile ? {scale:1}:undefined}
              ref={imgRef5}
              className="img lg:absolute lg:h-72 lg:w-72 h-48 w-full lg:z-20 z-10 lg:pointer-events-none order-first lg:order-none"
            >
              <img
                className="w-full h-full object-cover rounded-lg"
                src="https://plus.unsplash.com/premium_photo-1661876137625-64e3ebfce380?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8QmF0aHJvb20lMjBzdHlsZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Bathroom Style Design"
              />
            </motion.div>
            <div className="content-section lg:col-span-3 space-y-2">
              <div className="flex items-center gap-4">
                <h4 className="lg:text-2xl text-lg text-white font-bold">05</h4>
                <h1 className="lg:text-2xl text-lg text-white font-semibold">
                  Bathroom Style Design
                </h1>
              </div>
              <p className="lg:text-xl text-sm text-gray-200 lg:max-w-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                pariatur animi error voluptatem quia molestias sit, minus,
                officia natus quo ratione voluptatum quis?
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Services;
