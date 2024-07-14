'use client';

import { SafeListing, SafeUser } from '@/app/types';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import { format } from 'date-fns';
import FloppyDiskButton from '../FloppyDiskButton';
import Button from '../Button';
import useFavorite from '@/app/hooks/useFavorite';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';

interface ListingCardProps {
    data: SafeListing;
    currentUser?: SafeUser | null;
    locationValue: string;
    secondaryActionLabel?: string;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
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
    const { isInactive } = useFavorite({
        listingId: data.id,
        currentUser
    });
    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled) {
            return;
        }
      
    const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            onAction?.(actionId);
        }
    }, [onAction, actionId, disabled]);

    const pathname = usePathname();

    if (isInactive && pathname !== '/inactiveAds' && pathname !== '/partners') {
        return null;
    }

  return (
    <div className='col-span-1 cursor-pointer group rounded-md p-3 font-semibold'>
    <div onClick={() => router.push(`/listings/${data.id}`)}>
      <div className="flex flex-col w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl object-fill"
            style={{ backgroundImage: `url(${data.imageSrc})`, 
                     backgroundSize: 'cover', 
                     backgroundPosition: 'center' 
                   }}
                    >
        <div className="absolute top-3 right-3">
            <FloppyDiskButton 
                listingId={data.id}
                currentUser={currentUser}
            />
        </div>
    </div>
    <div className="text-md font-semibold w-fit mt-1 hover:text-black">
        {data.title}
    </div>
    <div className=" text-neutral-600 hover:text-black">
        {data.category}
    </div>
    <div className="flex flex-col">
    <div className="flex flex-row items-center gap-0.5 hover:text-black">
        {data.locationValue}
    </div>
    { currentUser && (
        <div className="text-neutral-600">
            <div className='hover:text-black'>
                {data.company} 
            </div>
            <div className='hover:text-black text-sm'>
                Pagamento Pix: {data.payNow}
            </div> 
            <div className='hover:text-black text-sm'>
                Pagamento no Local: {data.payThere}
            </div> 
            <div className='hover:text-black text-sm'>
                {
                    data.firstComeFirstServe ? 'Ordem de Chegada' 
                    :
                    data.byAppointmentOnly ? 'Horario Marcado' 
                    : 
                    null
                }
            </div>
        </div>
    )}
    {data.dates[0] ?
        <div className='text-neutral-600 text-sm'>
            <div className='hover:text-black'>
                Próximo Atendimento: {format(new Date(data.dates[0]), 'dd/MM/yyyy')}
            </div>  
            <div className='hover:text-black'>
                A partir das: {data.startTime}
            </div>  
        </div>
        :
        <div className='text-neutral-600 text-sm'>
            <div className='hover:text-black'>
                Entre em Contato Para Saber Mais!
            </div>  
            <div className='hover:text-black'>
                Ligua para saber quando terá atendimento! 
            </div>  
            </div>  
            }

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
            onClick={() => router.push(`/editService/${data.id}`)}
            icon={BiPencil}
            />
        )}
        {!currentUser &&
           <div className="text-center justify-center gap-1 flex mt-3">
            <Button
            label='Chame no WhatsApp!'
            onClick={() => {}}
             small
             green
            />
            <Button
            label='Chame no Telegram!'
            onClick={() => {}}
             small
            />
            </div>
            }
    </div>
  )
}

export default ListingCard
