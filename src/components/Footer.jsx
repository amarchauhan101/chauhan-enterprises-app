'use client'
import React from 'react'
import { FaInstagram,FaFacebookSquare } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
// import {  } from "react-icons/fa";

function Footer() {
  return (
    <div className='lg:h-[40vh] h-fit border-t-[0.5px] w-full bg-black text-white'>
        <div className="cnt h-full w-full lg:p-20 p-8 grid lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-8">
          <div className="left flex flex-col gap-6">
            <h1 className="lg:text-2xl text-xl font-semibold font-[monospace,cursive]">Chauhan Enterprises</h1>
            <p className='text-xl w-1/2'>We Design Space that reflect your style and story</p>
          </div>
          <div className="center flex flex-col gap-2">
            <ul type="none">
              <li className='lg:text-xl border-b-[0.5px] w-fit  hover:text-3xl cursor-pointer  transition-all ease-in-out'>Home</li>
              <li className='lg:text-xl border-b-[0.5px] w-fit hover:text-3xl cursor-pointer  transition-all ease-in-out'>Service</li>
              <li className='lg:text-xl border-b-[0.5px] w-fit hover:text-3xl cursor-pointer  transition-all ease-in-out'>About Us</li>
              <li className='lg:text-xl border-b-[0.5px] w-fit hover:text-3xl cursor-pointer  transition-all ease-in-out'>Contact Us</li>
              <li className='lg:text-xl border-b-[0.5px] w-fit hover:text-3xl cursor-pointer  transition-all ease-in-out'>Listing</li>
            </ul>
          </div>
          <div className="right flex flex-col lg:gap-10 gap-2">
            <div className="logos flex lg:gap-4 gap-2">
              <FaInstagram className="lg:text-6xl text-2xl lg:p-2 p-1  border cursor-pointer  rounded-full text-violet-700 bg-white"/>
              <TbWorld className="lg:text-6xl text-2xl lg:p-2 p-1  border cursor-pointer  rounded-full text-blue-700 bg-white"/>
              <FaFacebookSquare className="lg:text-6xl lg:p-2 p-1  text-2xl  border cursor-pointer     rounded-full text-blue-700 bg-white"/>
            </div>
            <h1 className='lg:text-xl text-sm font-semibold'>+91 12345 67890</h1>
          </div>
        </div>
    </div>
  )
}

export default Footer