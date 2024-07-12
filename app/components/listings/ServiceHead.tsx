"use client";

import { SafeUser } from '@/app/types';
import React, { ReactComponentElement } from 'react'
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../CloudButton';

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
    heartButton?: Boolean;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser,
    heartButton
}) => {

  return (
    <>
    <Heading 
    title={title}
    subtitle={locationValue}
    />
    <div className="w-full h-[60vh] overflow-hidden rounded-xl relative border-2 p-1 border-neutral-500/50 object-contain">
        <Image
        alt='image'
        src={imageSrc}
        fill
        className='object-fill w-full'
        />
      {heartButton && (
        <div className="absolute top-5 right-5">
            <HeartButton 
            listingId={id}
            currentUser={currentUser}
            />
        </div>
      )}
    </div>
    </>
  )
}

export default ListingHead
