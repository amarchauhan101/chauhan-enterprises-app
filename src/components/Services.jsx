"use client";
import React, { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

function Services({ServiceRef}) {
  const imgRef = useRef(null);
  const parentVariant = {
    initial: {},
    hover: {},
  };
  const imgVariant = {
    initial: { scale: 0 },
    hover: { scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  };
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const imgRect = imgRef.current.getBoundingClientRect();
    console.log("rect", rect);
    x.set(e.clientX - rect.left - 80);
    y.set(e.clientY - rect.top - 80);
  };
  return (
    <div className="h-fit relative w-full bg-gradient-to-r from-black to-white">
      <div ref={ServiceRef} className="cnt flex flex-col gap-20 p-20">
        <h2 className="text-7xl text-white">Services</h2>
        <div className="header grid grid-cols-1 gap-10 ">
          <motion.div
            variants={parentVariant}
            initial="initial"
            whileHover="hover"
            onMouseMove={handleMouseMove}
            className="block1 relative grid grid-cols-3 border-b-2"
          >
            <motion.div
              variants={imgVariant}
              style={{ x, y }}
              ref={imgRef}
              className="img absolute h-72 w-72 z-20 pointer-events-none"
            >
              <img
                className="w-full h-full object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
              />
            </motion.div>
            <h4 className="text-2xl text-white font-bold">01</h4>
            <h1 className="text-2xl text-white font-semibold">Home Interior Design</h1>
            <p className="text-xl text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              pariatur animi error voluptatem quia molestias sit, minus, officia
              natus quo ratione voluptatum quis?
            </p>
          </motion.div>
          <motion.div
            variants={parentVariant}
            initial="initial"
            whileHover="hover"
            onMouseMove={handleMouseMove}
            className="block1 relative grid grid-cols-3 border-b-2"
          >
            <motion.div
              variants={imgVariant}
              style={{ x, y }}
              ref={imgRef}
              className="img absolute h-72 w-72 z-20 pointer-events-none"
            >
              <img
                className="w-full h-full object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1631249073981-35567d93a0d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwc3BhY2UlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D"
                alt=""
              />
            </motion.div>
            <h4 className="text-2xl text-white font-bold">02</h4>
            <h1 className="text-2xl text-white font-semibold">Office Space Design</h1>
            <p className="text-xl text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              pariatur animi error voluptatem quia molestias sit, minus, officia
              natus quo ratione voluptatum quis?
            </p>
          </motion.div>
          <motion.div
            variants={parentVariant}
            initial="initial"
            whileHover="hover"
            onMouseMove={handleMouseMove}
            className="block1 relative grid grid-cols-3 border-b-2"
          >
            <motion.div
              variants={imgVariant}
              style={{ x, y }}
              ref={imgRef}
              className="img absolute h-72 w-72 z-20 pointer-events-none"
            >
              <img
                className="w-full h-full object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
              />
            </motion.div>
            <h4 className="text-2xl text-white font-bold">03</h4>
            <h1 className="text-2xl text-white font-semibold">Home Interior Design</h1>
            <p className="text-xl text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              pariatur animi error voluptatem quia molestias sit, minus, officia
              natus quo ratione voluptatum quis?
            </p>
          </motion.div>
          <motion.div
            variants={parentVariant}
            initial="initial"
            whileHover="hover"
            onMouseMove={handleMouseMove}
            className="block1 relative grid grid-cols-3 border-b-2"
          >
            <motion.div
              variants={imgVariant}
              style={{ x, y }}
              ref={imgRef}
              className="img absolute h-72 w-72 z-20 pointer-events-none"
            >
              <img
                className="w-full h-full object-cover rounded-lg"
                src="https://plus.unsplash.com/premium_photo-1661295665154-34615f961f8c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2l0Y2hlbiUyMG1ha2VvdmVyfGVufDB8fDB8fHww"
              />
            </motion.div>
            <h4 className="text-2xl text-white font-bold">04</h4>
            <h1 className="text-2xl text-white font-semibold">Kitchen MakeOver Design</h1>
            <p className="text-xl text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              pariatur animi error voluptatem quia molestias sit, minus, officia
              natus quo ratione voluptatum quis?
            </p>
          </motion.div>

          <motion.div
            variants={parentVariant}
            initial="initial"
            whileHover="hover"
            onMouseMove={handleMouseMove}
            className="block1 relative grid grid-cols-3 border-b-2"
          >
            <motion.div
              variants={imgVariant}
              style={{ x, y }}
              ref={imgRef}
              className="img absolute h-72 w-72 z-20 pointer-events-none"
            >
              <img
                className="w-full h-full object-cover rounded-lg"
                src="https://plus.unsplash.com/premium_photo-1661876137625-64e3ebfce380?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8QmF0aHJvb20lMjBzdHlsZXxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
              />
            </motion.div>
            <h4 className="text-2xl text-white font-bold">05</h4>
            <h1 className="text-2xl text-white font-semibold">Bathroom Style Design</h1>
            <p className="text-xl text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              pariatur animi error voluptatem quia molestias sit, minus, officia
              natus quo ratione voluptatum quis?
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Services;
