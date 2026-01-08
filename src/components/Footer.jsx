'use client'
import React from 'react'
import { FaInstagram,FaFacebookSquare } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
// import {  } from "react-icons/fa";

function Footer() {
  return (
    <div className='h-[40vh] border-t-2 w-full bg-black text-white'>
        <div className="cnt h-full w-full p-20 grid grid-cols-3">
          <div className="left flex flex-col gap-6">
            <h1 className='text-2xl font-semibold'>Logo</h1>
            <p className='text-xl w-1/2'>We Design Space that reflect your style and story</p>
          </div>
          <div className="center flex flex-col gap-2">
            <ul type="none">
              <li className='text-xl hover:text-3xl cursor-pointer  transition-all ease-in-out'>Home</li>
              <li className='text-xl hover:text-3xl cursor-pointer  transition-all ease-in-out'>Service</li>
              <li className='text-xl hover:text-3xl cursor-pointer  transition-all ease-in-out'>About Us</li>
              <li className='text-xl hover:text-3xl cursor-pointer  transition-all ease-in-out'>Contact Us</li>
              <li className='text-xl hover:text-3xl cursor-pointer  transition-all ease-in-out'>Listing</li>
            </ul>
          </div>
          <div className="right flex flex-col gap-10">
            <div className="logos flex gap-4">
              <FaInstagram className="text-6xl  border cursor-pointer p-2 rounded-full text-violet-700 bg-white"/>
              <TbWorld className="text-6xl  border cursor-pointer p-2 rounded-full text-blue-700 bg-white"/>
              <FaFacebookSquare className="text-6xl  border cursor-pointer p-2 rounded-full text-blue-700 bg-white"/>
            </div>
            <h1 className='text-xl font-semibold'>+91 12345 67890</h1>
          </div>
        </div>
    </div>
  )
}

export default Footer