import React from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link';
import localFont from "next/font/local";
import { silkscreenBold } from '@/app/layout';


function Navbar() {
  return (
    <div className='border-b'>
        <div className='flex min-w-screen h-10 items-center px-4 container mx-auto'>
            <Link href='/'>
                <h1 className={`${silkscreenBold.className} text-red-800 text-3xl`}>Vouch</h1>
            </Link>
        </div>
    </div>
  )
}

export default Navbar;