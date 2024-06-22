"use client";

import { SafeListing, SafeUser } from '@/app/types';
import React, { useMemo } from 'react'
import { IconType } from 'react-icons';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { PiXFill } from 'react-icons/pi';
import { CheckmarkIcon } from 'react-hot-toast';
import { FieldValues, useForm } from 'react-hook-form';

interface ListingInfoProps {
    user: SafeUser;
    data: SafeListing;
    description: string;
    firstComeFirstServe: boolean;
    byAppointmentOnly: boolean;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined
    locationValue: string;
    dates: string[];
    startTime: string;
    endTime: string;
    latlng: string[];
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    description,
    firstComeFirstServe,
    byAppointmentOnly,
    category,
    locationValue,
    startTime,
    endTime,
    latlng
}) => {

    const {
        watch,
    } = useForm<FieldValues>({
        defaultValues: {
            location: null,
        }
    });

    // Convert latlng from string[] to number[]
    const convertedLatlng = latlng.map(coord => parseFloat(coord));

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location, convertedLatlng]);


  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold text-center px-10 justify-between flex flex-row items-center gap-2">
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <div className='bg-green-400 hover:bg-green-600 hover:text-white hover:font-semibold cursor-pointer rounded-2xl text-center p-2 items-center flex gap-1 border-gray-200 border-2 shadow-md' >
              Chame no whatsApp!
              <FaWhatsapp/> 
            </div>
        </a>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <div className='bg-blue-400 hover:bg-blue-600 hover:text-white hover:font-semibold cursor-pointer rounded-2xl text-center p-2 items-center flex gap-1 border-gray-200 border-2 shadow-md' >
              Chame no Telegram!
              <FaTelegram /> 
            </div>
        </a>
          </div>
          <hr />
            <div className='flex flex-row overflow-x-auto hide-scrollbar'>
              <div className='p-3 text-center hover:bg-sky-100 cursor-pointer'>
                  Cidade: <br/>{locationValue}
              </div>
              <div className='p-3 text-center hover:bg-sky-100 cursor-pointer'>
                  Horario: <br/>{startTime} - {endTime}
              </div>
              <div className='p-3 text-center hover:bg-sky-100 cursor-pointer'>
                  WhatsApp: <br/>51 985647950
              </div>
              <div className='p-3 text-center hover:bg-sky-100 cursor-pointer'>
                  Telefone: <br/>51 985647988
              </div>
              <div className='p-3 text-center hover:bg-sky-100 cursor-pointer'>
                  Fixo: <br/>3434-1422
              </div>
            </div>
          </div>
          <hr />
        <div>
          {firstComeFirstServe ? <CheckmarkIcon /> : <PiXFill color='red' />} Ordem de Chegada
          {byAppointmentOnly ? <CheckmarkIcon /> : <PiXFill color='red' />} Horario Marcado
        </div>
        <hr />
        {category && (
          <ListingCategory
          icon={category.icon}
          label={category.label}
          description={description}
          />
        )}
        <hr />
        <div className="text-lg font-light text-neutral-500">
          {description}
      </div>
      <hr />
      {locationValue} <br />
    
      <hr />

        <Map
        center={convertedLatlng}
        />
    </div>
  )
}

export default ListingInfo
