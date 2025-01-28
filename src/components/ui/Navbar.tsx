import { silkscreenBold } from '@/app/layout';
import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import DashboardButton from './DashboardButton';
import { ModeToggle } from './ModeToggle';


function Navbar() {
  return (
    <div className='border-b'>
        <div className='flex min-w-screen h-14 items-center px-4 container mx-auto'>
            <Link href='/' className='flex items-center gap-3 text-4xl text-red-700 mr-6 hover:opacity-90 transition-opacity'>
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