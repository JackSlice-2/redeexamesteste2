"use client";

import React from 'react'

interface MenuItemProps {
    onClick: () => void;
    label: string;
    small?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label,
    small
}) => {
  return (
    <div className={`px-3 hover:bg-blue-500 hover:text-white transition cursor-pointer
      ${small ? 'py-1' : 'py-3'}
      ${small ? 'font-light' : ''}
      `}
    onClick={onClick}
    >
      {label}
    </div>
  )
}

export default MenuItem
