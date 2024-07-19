'use client';

import { SafePartner } from '@/app/types';
import Image from 'next/image';
import React from 'react'
import { IconType } from 'react-icons';
import { GiEmptyHourglass } from 'react-icons/gi';

interface CompanyInputProps {
  partner?: SafePartner;
  icon?: IconType;
  label?: string;
  selected: boolean;
  onClick: (value: string) => void;
}

const ObjectInput: React.FC<CompanyInputProps> = ({ 
    partner, 
    selected, 
    onClick,
    icon: Icon,
    label,
 }) => {
  return (
    <>
    {partner &&
      <div onClick={() => onClick(partner.title)} className={`rounded-xl border-2 p-2 flex flex-col text-center items-center hover:border-blue-900 hover:bg-blue-100 transition cursor-pointer 
      ${selected? 'bg-blue-100' : ''}
      ${selected? 'hover:bg-blue-900' : ''}
      ${selected? 'border-blue-900' : ''}
      `}>
          <Image 
            loading="lazy" src={partner.imageSrc} alt={partner.title} width={80} height={40} />
          <div className='font-bold'>{partner.title}</div>
      </div>
    }

      {label &&
      <div onClick={() => onClick(label)}
        className={`
        rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
        `}>
            {Icon &&
      <Icon size={30}/>
            }
      <div className='font-semibold'>
        {label}
      </div>
    </div>
    }
      </>

  );
};
export default ObjectInput