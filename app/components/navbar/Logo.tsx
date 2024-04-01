"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const Logo = () => {
    const router = useRouter();

  return (
    <div className='text-white font-semibold text-xl'>
      <Image
      onClick={() => router.push('/')}
          alt='Logo'
          className='hidden md:block cursor-pointer'
          height="150"
          width="170"
          src="/images/logo.png"
          />
          <div className="hidden md:block cursor-pointer" onClick={() => router.push('/')}>
          Rede Exame Online
          </div>
    </div>
  )
}

export default Logo
