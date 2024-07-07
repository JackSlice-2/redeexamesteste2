"use client";

import React from 'react'


interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    center
}) => {
  return (
    <div className={`text-center ${center ? '' : 'text-start'} overflow-hidden`}>
      <div className="text-2xl font-bold overflow-wrap break-word whitespace-normal">
          {title}
      </div>
      <div className="font-light text-neutral-500 mt-2 overflow-wrap break-word whitespace-normal">
          {subtitle}
      </div>
    </div>
  )
}

export default Heading
