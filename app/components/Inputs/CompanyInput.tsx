'use client';

import Image from 'next/image';
import React from 'react'
import { IconType } from 'react-icons';

interface CompanyInputProps {
    icon?: IconType;
    imageSrc?: string;
    label: string;
    selected: boolean;
    onClick: (value: string) => void;
}

const CompanyInput: React.FC<CompanyInputProps> = ({
    icon: Icon,
    imageSrc,
    label,
    selected,
    onClick

}) => {
  return (
    <div onClick={() => onClick(label)}
        className={`
        rounded-xl border-2 p-2 flex flex-col text-center items-center hover:border-blue-900 hover:bg-blue-100 transition cursor-pointer
        ${selected ? 'bg-blue-100' : ''}
        `}>
      {
        Icon ? 
          <Icon size={30}/> 
        : 
        imageSrc ? 
          <Image src={imageSrc} alt={label} width={80} height={40} />
        : null}
      <div className='font-bold'>
        {label}
      </div>
    </div>
  )
}

export default CompanyInput
