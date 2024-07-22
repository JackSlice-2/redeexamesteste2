'use client';

import React from 'react';
import { IconType } from 'react-icons';
import { SafePartner } from '@/app/types';

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
  const name = partner?.title || label;

  return (
    <div
      onClick={() => onClick(name || '')}
      className={`cursor-pointer transition flex flex-col rounded-xl
        ${selected && label && "border-black"}
        ${label
          ? 'border-2 p-4 gap-3 hover:border-black'
          :
           'relative text-center items-center justify-center align-middle overflow-x-hidden hover:border-blue-900 h-28'}
           `}
      style={{
        backgroundImage: `url(${partner?.imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {partner && (
        <div
          className={`absolute inset-0 bg-black flex flex-col justify-center items-center rounded-xl 
            ${selected ? 
            'border-2 border-black bg-opacity-90' : 'bg-opacity-50 hover:bg-opacity-30'}
            `}
        />
      )}
      {Icon && <Icon size={30} />}
      <div
        className={`font-bold z-10 pointer-events-none
          ${partner ? 'text-white' : ''}
          ${partner && selected ? 'bg-' : ''}
          `}
      >
        {name}
      </div>
    </div>
  );
};

export default ObjectInput;
