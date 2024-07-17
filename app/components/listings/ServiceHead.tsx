"use client";

import { SafeUser } from '@/app/types';
import React from 'react'
import Heading from '../Heading';
import Image from 'next/image';
import FloppyDiskButton from '../FloppyDiskButton';

interface ServiceHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
    floppyDiskButton?: Boolean;
}

const ServiceHead: React.FC<ServiceHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser,
    floppyDiskButton
}) => {

  return (
    <>
    <Heading 
    title={title}
    subtitle={locationValue}
    />
    <div className="w-full md:w-5/6 h-[50vh] mx-auto overflow-hidden rounded-xl relative border-2 p-1 border-neutral-500/50 object-contain">
        <Image
        alt='image'
        src={imageSrc}
        fill
        className='object-fill w-full'
        />
      {floppyDiskButton && (
        <div className="absolute top-5 right-5">
            <FloppyDiskButton 
            listingId={id}
            currentUser={currentUser}
            />
        </div>
      )}
    </div>
    </>
  )
}

export default ServiceHead
