import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row'>
        <Link href="/" className="inline-flex items-center w-36">
              <Image src="/assets/images/splogo.svg" width={38} height={38}
              alt= "Sp logo"
            />
            <span className="ml-1 font-semibold">Sportpals</span>
        </Link>

        <p>2024 Sportpals. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer