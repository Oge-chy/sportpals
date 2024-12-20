import { SignedOut, SignInButton,SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'

const Header = () => {
  return (
    <header className='w-full border-b'>
        <div className='wrapper flex items-center justify-between'>
            <Link href="/" className="inline-flex items-center w-36">
                <Image src="/assets/images/splogo.svg" width={38} height={38}
                alt= "Sp logo"
                />
                <span className="ml-1 font-semibold">Sportpals</span>
            </Link>

            <SignedIn>
                <nav className='md:flex-between hidden w-full max-w-xs'>
                <NavItems />
                </nav>
            </SignedIn>

            <div className='flex w-32 justify-end gap-3'>
            <SignedIn>
                <UserButton afterSignOutUrl='/'/>
                <MobileNav />
            </SignedIn>
                <SignedOut>
                    <Button asChild className='rounded-full bg-black text-white' size="lg">
                    <SignInButton />
                    </Button>
                </SignedOut>
            </div>
        </div>
    </header>
  )
}

export default Header