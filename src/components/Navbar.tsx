import React from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link';

function Navbar() {
  return (
    <div className='border-b'>
        <div className='flex min-w-screen h-15 items-center px-4 container mx-auto'>
            <Link href='/'>
                <h1 className='text-red-800'>Vouch</h1>
            </Link>
        </div>
    </div>
  )
}

export default Navbar;