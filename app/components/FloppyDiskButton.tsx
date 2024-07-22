"use client";

import React from 'react'
import { SafeUser } from '../types';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import useFavorite from '../hooks/useFavorite';
import { PiFloppyDiskFill } from 'react-icons/pi';

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const FloppyDiskButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {
    const { isInactive, toggleActive } = useFavorite({
        listingId,
        currentUser
    })

    if (!currentUser) {
        return null;
    }
  return (
    <div 
    onClick={toggleActive}
    className='relative hover:opacity-80 transition cursor-pointer hover:scale-125 hover:text-blue-200 hover:bg-gray-500/80 bg-neutral-300 rounded-full p-1'>
        {!isInactive ? (
        <PiFloppyDiskFill size={30}/>
        ) : (
        <FaCloudDownloadAlt size={30}/>
        )}
    </div>
  );
}

export default FloppyDiskButton