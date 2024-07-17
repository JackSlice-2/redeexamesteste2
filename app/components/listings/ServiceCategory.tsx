'use client';

import Image from 'next/image';
import React from 'react'
import { IconType } from 'react-icons';

interface ServiceCategoryProps {
    icon?: IconType;
    imageSrc?: string;
    label: string;
    description: string;
}

const ServiceCategory: React.FC<ServiceCategoryProps> = ({
    icon: Icon,
    imageSrc,
    label,
    description
}) => {
  return (
    <div className='flex flex-col gap-6'>
      <div className="flex flex-row items-center gap-4">
      {imageSrc ? (
        <>
          <Image src={imageSrc} width={50} height={50} alt={label} className='w-16 h-16 rounded-lg' /> 
        </>
      ) : Icon ? (
        <Icon size={40} className='text-neutral-600' />
      ) : null}
        <div className="flex flex-col">
            <div className="text-lg font-semibold">
                {label}
            </div>
            <div className="text-neutral-500 font-light">
                {description}
            </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCategory
