"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

interface LogoProps {
  label?: string
  width: number
  height: number
}

const Logo: React.FC<LogoProps> = ({
  label,
  width,
  height
  }) => {
    const router = useRouter();

  return (
    <div className='text-white font-semibold text-xl -mt-7'>
      <Image
      onClick={() => router.push('/')}
          alt='Logo'
          className='block cursor-pointer'
          height={height}
          width={width}
          priority
          src="/images/logo.png"
          />
          <div className="block cursor-pointer -mt-3" onClick={() => router.push('/')}>
          {label}
          </div>
    </div>
  )
}

export default Logo