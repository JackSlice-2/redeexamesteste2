'use client';

import { SafePartner } from '@/app/types';
import Image from 'next/image';
import React from 'react'

// Inside CompanyInput component
interface CompanyInputProps {
  partner: SafePartner;
  selected: boolean;
  onClick: (value: string) => void;
}

const CompanyInput: React.FC<CompanyInputProps> = ({ partner, selected, onClick }) => {
  return (
      <div onClick={() => onClick(partner.title)} className={`rounded-xl border-2 p-2 flex flex-col text-center items-center hover:border-blue-900 hover:bg-blue-100 transition cursor-pointer ${selected? 'bg-blue-100' : ''}`}>
          <Image src={partner.imageSrc} alt={partner.title} width={80} height={40} />
          <div className='font-bold'>{partner.title}</div>
      </div>
  );
};


export default CompanyInput
