import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import {useSession} from "next-auth/react"

function Navbar() {
  const {data:session} = useSession()
  console.log(session);
  return (
    <div className='absolute flex items-center justify-between p-10 z-30  w-full font-mono'>
        <div className="logo">Logo</div>
        <div className="center flex gap-10 capitalize text-white z-10 cursor-pointer font-semibold">
            <Link href="/home"> products</Link>
            <Link href="/">service</Link>
            <Link href="/">collections</Link>
            <Link href="/">blog</Link>
        </div>
        <div className="enquiry z-10">
            <Button className="bg-yellow-700 rounded-full  active:scale-90">enquiry</Button>
        </div>
        
    </div>
  )
}

export default Navbar