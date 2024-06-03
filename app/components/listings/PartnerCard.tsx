'use client';

import { SafePartner, SafeUser } from '@/app/types';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import Image from 'next/image';
import Button from '../Button';
import { BiPencil, BiTrash } from 'react-icons/bi';

interface PartnerCardProps {
    data: SafePartner;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    secondaryActionLabel?: string;
}

const PartnerCard: React.FC<PartnerCardProps> = ({
    data,
    onAction,
    actionLabel,
    secondaryActionLabel,
    disabled,
    actionId = '',
}) => {
    const router = useRouter();


    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]);

    const pathname = usePathname();

    const isMainPage = pathname !== "/partners";

    if (isMainPage) {
        return null;
    }

  return (
    <div className='col-span-1 cursor-pointer group rounded-md hover:bg-blue-200 hover:text-blue-700 p-2 font-semibold'
    >
    <div 
    onClick={() => router.push(`/partners/${data.id}`)}
    >
      <div className="flex flex-col w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <Image
            sizes='100%' 
            fill
            alt='partner'
            src={data.imageSrc}
            className='object-cover h-full w-full group-hover:scale-110 transition'
            />
        </div>
        <div className="text-lg">
            {data.title}
        </div>

        </div>
        </div>
        {onAction && actionLabel && (
            <Button 
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
            red
            icon={BiTrash}
            />
        )}
        {onAction && secondaryActionLabel && (
            <Button
            disabled={disabled}
            label={secondaryActionLabel}
            onClick={() => router.push(`/editPartners/${data.id}`)}
            icon={BiPencil}
            />
        )}
    </div>
  )
}

export default PartnerCard
