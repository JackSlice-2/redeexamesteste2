'use client';

import { SafeListing, SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import React from 'react'
import { format } from 'date-fns';
import Button from '../Button';

interface ServiceCardProps {
    data: SafeListing;
    currentUser?: SafeUser | null;
    locationValue: string;
    secondaryActionLabel?: string;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
    data,
    currentUser,
}) => {
    const router = useRouter();
    return (
        <div className='col-span-1 cursor-pointer group font-semibold rounded-xl p-3 hover:text-blue-700 bg-blue-200 hover:bg-blue-400'>
        <div onClick={() => router.push(`/listings/${data.id}`)}>
        <div className="flex flex-col w-full">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl object-fill"
                style={{ backgroundImage: `url(${data.imageSrc})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                    }}
                        >
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
                blue
                />
                </div>
                }
        </div>
    )
}

export default ServiceCard
