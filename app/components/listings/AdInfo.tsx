"use client";

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import React from 'react'
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';
import { BiCopy } from 'react-icons/bi';

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined
    locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    category,
    locationValue,
}) => {
    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold text-center px-10 justify-between flex flex-row items-center gap-2">
            <div>Chame no whatApp: <br/> [IMG]</div>
            <div>Chame no Telegram: <br/> [IMG]</div>
          </div>
          <hr />
            <div className='flex flex-row overflow-x-auto hide-scrollbar'>
              <div className='p-3 text-center hover:bg-sky-100 cursor-pointer'>
                  Cidade: <br/>Sao Paulo
              </div>
              <div className='p-3 text-center hover:bg-sky-100 cursor-pointer'>
                  Horario: <br/>10:00-16:00
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
          Ordem de Chegada
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
          {description} Descriçao cliente
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  )
}

export default ListingInfo
