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
{partner && (
  <div 
    onClick={() => onClick(partner.title)} 
    className='overflow-x-hidden relative rounded-xl flex flex-col text-center items-center justify-center align-middle hover:border-blue-900 transition cursor-pointer h-28'
    style={{ backgroundImage: `url(${partner.imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <div className={`absolute inset-0 bg-black flex flex-col justify-center items-center hover:bg-opacity-100 text-white
    ${selected ? 'bg-opacity-80' : 'bg-opacity-40'}
    ${selected ? 'font-bold' : ''}
    ${selected ? 'underline' : ''}
      `}>
      <span className='font-semibold text-wrap w-full'>{partner.title}</span>
    </div>
  </div>
)}


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