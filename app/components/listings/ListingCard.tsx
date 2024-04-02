'use client';

import useCountries from '@/app/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../CloudButton';
import Button from '../Button';
import useFavorite from '@/app/hooks/useFavorite';

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    locationValue: string;
    hours?: string[0];
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    locationValue,
    onAction,
    actionLabel,
    hours,
    disabled,
    actionId = '',
    currentUser
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();

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

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start, "PP")} - ${format(end, 'PP')}`
    }, [reservation])

    const params = useSearchParams();
    const company = params?.get('company');
    const pathname = usePathname();

     if (hasFavorited && pathname !== '/inactiveAds') {
        return null;
        }

    const isMainPage = pathname === "/myPartners" && !company;

    if (isMainPage) {
        return null;
    }

  return (
    <div 
    onClick={() => router.push(`/listings/${data.id}`)}
    className='col-span-1 cursor-pointer group rounded-md hover:bg-blue-200 hover:text-blue-700 p-2 font-semibold'>
      <div className="flex flex-col w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <Image 
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
            {reservationDate || data.category}
        </div>
        <div className="flex flex-col">
        <div className="flex flex-row items-center gap-0.5">
            {data.locationValue}
        </div>
        { currentUser && (
            <div className='text-neutral-500 text-xs font-light'>
                {data.company} 
                <div className='text-neutral-500 text-sm'>
                    Pagament Pix: {data.payNow} <br/>
                    Pagament no Local: {data.payThere} <br/>
                    <div className='text-neutral-500 text-xs font-light'>
                        {data.firstComeFirstServe && data.byAppointmentOnly ? 'Ligue ja para informaçoes' :
                        data.firstComeFirstServe ? 'Ordem de Chegada' :
                        data.byAppointmentOnly ? 'Horario Marcado' : null}
                    </div>
                </div> 
               
            </div>
            )}
              <div className='text-neutral-500 text-xs'>
                    proximo atendimento: {format(new Date(data.dates[0]), 'dd/MM/yyyy')}
                    <br/>
                    A partir das:{data.hours} <br/>
                </div>  
            </div>
        </div>
        {onAction && actionLabel && (
            <Button 
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
            red
            />
        )}
    </div>
  )
}

export default ListingCard
