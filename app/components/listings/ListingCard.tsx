'use client';

import { SafeListing, SafeUser } from '@/app/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../CloudButton';
import Button from '../Button';
import useFavorite from '@/app/hooks/useFavorite';
import { BiPencil, BiTrash } from 'react-icons/bi';

interface ListingCardProps {
    data: SafeListing;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    locationValue: string;
    secondaryActionLabel?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    onAction,
    actionLabel,
    secondaryActionLabel,
    disabled,
    actionId = '',
    currentUser
}) => {
    const router = useRouter();
    const { hasFavorited } = useFavorite({
        listingId: data.id,
        currentUser
    });

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (disabled) {
                return;
            }
            onAction?.(actionId);
        }, [onAction, actionId, disabled]);

    const pathname = usePathname();

    if (hasFavorited && pathname !== '/inactiveAds' && pathname !== '/partners') {
        return null;
    }

  return (
    <div className='col-span-1 cursor-pointer group rounded-md hover:bg-blue-200 hover:text-blue-700 p-2 font-semibold'
    >
    <div 
    onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <Image
            sizes='100%' 
            fill
            alt='listing'
            src={data.imageSrc}
            className='object-cover h-full w-full group-hover:scale-110 transition'
            />
            <div className="absolute top-3 right-3">
                <HeartButton 
                listingId={data.id}
                currentUser={currentUser}
                />
            </div>
        </div>
        <div className="text-lg">
            {data.title}
        </div>
        <div className="font-light text-neutral-500">
            {data.category}
        </div>
        <div className="flex flex-col">
        <div className="flex flex-row items-center gap-0.5">
            {data.locationValue}
        </div>
        { currentUser && (
            <div className='text-neutral-500 text-xs font-light'>
                {data.company} 
                <div className='text-neutral-500 text-sm'>
                    Pagamento Pix: {data.payNow} <br/>
                    Pagamento no Local: {data.payThere} <br/>
                    <div className='text-neutral-500 text-xs font-light'>
                        {data.firstComeFirstServe && data.byAppointmentOnly ? 'Ligue ja para informaçoes' :
                        data.firstComeFirstServe ? 'Ordem de Chegada' :
                        data.byAppointmentOnly ? 'Horario Marcado' : null}
                    </div>
                </div> 
            </div>
            )}
              <div className='text-neutral-500 text-xs pb-2'>
                    Próximo Atendimento: {format(new Date(data.dates[0]), 'dd/MM/yyyy')}
                    <br/>
                    A partir das: {data.startTime} <br/>
                </div>  
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
            onClick={() => router.push(`/editListings/${data.id}`)}
            icon={BiPencil}
            />
        )}
    </div>
  )
}

export default ListingCard
