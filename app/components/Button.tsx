"use client";

import React from 'react'
import { IconType } from 'react-icons';

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    small?: boolean;
    red?: boolean;
    icon?: IconType;
    green?: boolean;
    blue?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    small,
    icon: Icon,
    blue,
    red,
    green
}) => {
  return (
    <button 
    onClick={onClick}
    disabled={disabled}
    className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-xl hover:opacity-50 transition w-full font-medium
        ${blue ? 'bg-blue-500' : ''}
        ${blue ? 'border-blue-500' : 'border-blue-500'}
        ${blue ?  'text-white' : 'text-blue-500'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
        ${red ? 'bg-red-500' : ''}
        ${red ? 'border-red-500' : ''}
        ${red ?  'text-white' : 'text-blue-500'}
        ${green ?  'text-white' : 'text-blue-500'}
        ${green ? 'bg-green-600' : ''}
        ${green ? 'border-green-600' : ''}
        `}>
        {Icon && (
            <Icon
            size={24}
            className={`absolute
              ${small ? 'top-0' : 'top-3'}
              ${small ? 'left-0' : 'left-4'}
              `}
            />
        )}
      {label}
    </button>
  )
}

export default Button