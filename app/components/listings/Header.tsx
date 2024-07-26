"use client";

import { SafeUser } from '@/app/types';
import React from 'react'
import Image from 'next/image';

interface HeaderProps {
    imageSrc?: string;
    id?: string;
    currentUser?: SafeUser | null;
    title?: string;
    subtitle?: string;
    center?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    title,
    imageSrc,
    id,
    currentUser,
    subtitle,
    center,
}) => {

  return (
    <>
    <div className={center ? 'text-center' : 'text-start'}>
        <div className="text-2xl font-bold">
            {title}
        </div>
        <div className="font-light text-neutral-500 mt-2">
            {subtitle}
        </div>
    </div>
    {imageSrc &&
    <div className="w-full md:w-5/6 h-[50vh] mx-auto overflow-hidden rounded-xl relative border-2 p-1 border-neutral-500/50 object-contain">
        <Image 
        loading="lazy"
        alt='image'
        src={imageSrc}
        fill
        className='object-cover w-full'
        />
    </div>
}
    </>
  )
}

export default Header
