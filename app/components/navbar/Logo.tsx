"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const Logo = () => {
    const router = useRouter();

  return (
    <div className='text-white font-semibold text-xl -mt-7'>
      <Image
      onClick={() => router.push('/')}
          alt='Logo'
          className='block cursor-pointer'
          height="150"
          width="170"
          priority
          src="/images/logo.png"
          />
          <div className="block cursor-pointer -mt-3" onClick={() => router.push('/')}>
          Rede Exames Online
          </div>
    </div>
  )
}

export default Logo