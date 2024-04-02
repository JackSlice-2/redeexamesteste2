"use client";

import React from 'react'

interface MenuItemProps {
    onClick: () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label
}) => {
  return (
    <div className='px-4 py-3 hover:bg-blue-500 hover:text-white transition'
    onClick={onClick}
    >
      {label}
    </div>
  )
}

export default MenuItem
