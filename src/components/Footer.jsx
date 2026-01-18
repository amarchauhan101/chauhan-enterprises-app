"use client";
import Image from "next/image";
import React from "react";
import { FaInstagram, FaFacebookSquare, FaPhone, FaPhoneAlt, FaPhoneVolume, FaPhoneSlash, FaPhoneSquare, FaPhoneSquareAlt, FaBlenderPhone, FaPhoenixFramework, FaMailBulk, FaMailchimp, FaInbox } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
// import {  } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

function Footer() {
  return (
    <div className="lg:h-[40vh] h-fit border-t-[0.5px] w-full bg-black text-white">
      <div className="cnt h-full w-full lg:p-20 p-8 grid lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-8">
        <div className="left flex flex-col gap-6">
          <div className="logo flex items-center">
            <Image
              height={90}
              width={90}
              sizes="100vw"
              // className="lg:h-72 lg:w-72 h-44 w-44"
              src={"/logo.png"}
              alt="logo"
            />
            <h1 className="lg:text-2xl text-xl font-semibold font-[monospace,cursive]">
              Chauhan enterprises
            </h1>
            
          </div>
          <p className="text-xl w-1/2">
            We Design Space that reflect your style and story
          </p>
        </div>
        <div className="center flex flex-col gap-2">
          <ul type="none">
            <li className="lg:text-xl border-b-[0.5px] w-fit  hover:text-3xl cursor-pointer  transition-all ease-in-out">
              Home
            </li>
            <li className="lg:text-xl border-b-[0.5px] w-fit hover:text-3xl cursor-pointer  transition-all ease-in-out">
              Service
            </li>
            <li className="lg:text-xl border-b-[0.5px] w-fit hover:text-3xl cursor-pointer  transition-all ease-in-out">
              About Us
            </li>
            <li className="lg:text-xl border-b-[0.5px] w-fit hover:text-3xl cursor-pointer  transition-all ease-in-out">
              <a href="tel:9324898709">Contact Us</a>
            </li>
            
          </ul>
        </div>
        <div className="right flex flex-col lg:gap-10 gap-2">
          <div className="logos flex lg:gap-4 gap-2">
            <FaInstagram className="lg:text-6xl text-2xl lg:p-2 p-1  border cursor-pointer  rounded-full text-violet-700 bg-white" />
            <a href="tel:9324898709"><FaPhoneAlt className="lg:text-6xl text-2xl lg:p-2 p-1  border cursor-pointer  rounded-full text-green-700 bg-white" /></a>
            <a href="mailto:amarc9567@gmail.com"><IoMdMail className="lg:text-6xl lg:p-2 p-1  text-2xl  border cursor-pointer     rounded-full text-blue-700 bg-white" /></a>
          </div>
          <h1 className="lg:text-xl text-sm font-semibold">+91 9324898709</h1>
        </div>
      </div>
    </div>
  );
}

export default Footer;
