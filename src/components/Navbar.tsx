import React from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link';
import { silkscreenBold } from '@/app/layout';
import { Cctv } from 'lucide-react';
import { SignedIn, UserButton } from '@clerk/nextjs';
import DashboardButton from './DashboardButton';


function Navbar() {
  return (
    <div className='border-b'>
        <div className='flex min-w-screen h-10 items-center px-4 container mx-auto'>
            <Link href='/' className='flex items-center gap-3 text-2xl text-red-700 mr-6 hover:opacity-90 transition-opacity'>
                <h1 className={`${silkscreenBold.className} bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent`}>Vouch</h1>
            </Link>
        <SignedIn>
          <div className='flex items-center space-x-5 ml-auto'>
            <DashboardButton />
            <ModeToggle />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </div>
  )
}

export default Navbar;