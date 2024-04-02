"use client";

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import React, { useMemo, useState } from 'react'
import { IconType } from 'react-icons';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { PiXFill } from 'react-icons/pi';
import { CheckmarkIcon } from 'react-hot-toast';
import CitySelect from '../Inputs/CitySelect';
import { FieldValues, useForm } from 'react-hook-form';
import SelectedCity from '../Inputs/SelectedCity';

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    firstComeFirstServe: boolean;
    byAppointmentOnly: boolean;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined
    locationValue: string;
    hours: string[0];
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    firstComeFirstServe,
    byAppointmentOnly,
    category,
    locationValue,
    hours
}) => {
    const { getByValue } = useCountries();
    const [isLoading, setIsLoading] = useState(false);
    const coordinates = getByValue(locationValue)?.latlng;


    const {
        setValue,
        watch,
    } = useForm<FieldValues>({
        defaultValues: {
            location: null,
        }
    });

    const location = watch('location');
    
    const Map = useMemo(() => dynamic(() => import('../Map'), {
      ssr: false
      //Map Depends on location, Ignore warning below
  }), [location])

      const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold text-center px-10 justify-between flex flex-row items-center gap-2">
            <div>Chame no whatApp: <br/> <FaWhatsapp/> </div>
            <div>Chame no Telegram: <br/> <FaTelegram /> </div>
          </div>
          <hr />
            <div className='flex flex-row overflow-x-auto hide-scrollbar'>
              <div className='p-3 text-center hover:bg-sky-100 cursor-pointer'>
                  Cidade: <br/>{locationValue}
              </div>
              <div className='p-3 text-center hover:bg-sky-100 cursor-pointer'>
                  Horario: <br/>{hours}
              </div>
              <div className='p-3 text-center hover:bg-sky-100 cursor-pointer'>
                  WhatsApp: <br/>555555555
              </div>
              <div className='p-3 text-center hover:bg-sky-100 cursor-pointer'>
                  Telefone: <br/>555555555
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
      {locationValue}
      <hr />

        <Map
        center={coordinates}
        />
    </div>
  )
}

export default ListingInfo
