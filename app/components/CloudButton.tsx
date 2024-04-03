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

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId,
        currentUser
    })

    if (!currentUser) {
        return null;
    }

  return (
    <div 
    onClick={toggleFavorite}
    className='relative hover:opacity-80 transition cursor-pointer'>
        {!hasFavorited ? (
        <PiFloppyDiskFill
        size={35} 
        className='text-blue-200 bg-gray-500/80 rounded-full p-1'
        />
        ) : (
            <FaCloudDownloadAlt
            size={35}
            className='text-blue-200 bg-gray-500/80 rounded-full p-1'
            />
        )}
    </div>
  );
}

export default HeartButton
