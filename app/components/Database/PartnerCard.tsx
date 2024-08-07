'use client';

import { SafePartner } from '@/app/types';
import {  useRouter } from 'next/navigation';
import React from 'react'
import Image from 'next/image';

interface PartnerCardProps {
    data: SafePartner;
}

const PartnerCard: React.FC<PartnerCardProps> = ({
    data,
}) => {
    const router = useRouter();

  return (
    <div className='col-span-1 cursor-pointer group rounded-md font-bold'
    >
    <div 
    onClick={() => router.push(`/partners/${data.id}`)}
    >
      <div className="flex flex-col w-full hover:text-neutral-100">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <Image 
            loading="lazy"
            sizes='100%' 
            width={400}
            height={400}
            alt='partner'
            src={data.imageSrc}
            className='object-cover h-full w-full group-hover:scale-110 transition'
            />
        </div>
        <div className="text-lg pt-8 text-center">
            {data.title}
        </div>
        </div>
        </div>
    </div>
  )
}

export default PartnerCard
