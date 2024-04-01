"use client";

import useCountries from '@/app/hooks/useCountries';
import React from 'react'
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';
import { PiXFill } from 'react-icons/pi';
import { CheckmarkIcon } from 'react-hot-toast';
import { BiCopy } from 'react-icons/bi';

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface PartnerInfoProps {
    description: string;
    firstComeFirstServe?: boolean;
    byAppointment?: boolean;
    payNow?: number;
    payThere?: number;
    companies: {
        imageSrc: string;
        label: string;
        description: string;
    } | undefined
    locationValue: string;
}

const PartnerInfo: React.FC<PartnerInfoProps> = ({
  description,
  firstComeFirstServe,
  byAppointment,
  payNow,
  payThere,
  companies,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

return (
  <>
  <div className='flex justify-between w-full'>
    <div className='w-1/2 flex flex-col gap-8'>
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
            <div>Parceiro Atual: {companies?.label}</div>
          </div>
          <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>
            {firstComeFirstServe ? <CheckmarkIcon /> : <PiXFill />} Ordem de Chegada
          </div>
            <div>
                <CheckmarkIcon />{} Horario Marcado
            </div>
            <div className='text-red'>
                <PiXFill color='red'/> {} consultsas Online (create Bool that stays in place of location STEP)
            </div>
            <hr />
          </div>
          <hr />
          {companies && (
            <ListingCategory
            imageSrc={companies.imageSrc}
            label={companies.label}
            description={description}
            />
          )}<br/>
          CNPJ: 000000-000/00
          <hr />
          <div className='w-2/3 p-2 border-gray-600 flex justify-center items-center'>
            {description} Descriçao dois pode ser mais detalhada
          </div>
        </div>
        </div>
        <div className='w-1/2 p-2 border-gray-600 h-1/2'>
          <Map center={coordinates}
          />
        </div>
      </div>
      <hr />
      <div className='flex flex-row overflow-x-auto hide-scrollbar w-full'>
        <div className='p-5 text-center hover:bg-sky-100 cursor-pointer '>
            <BiCopy /> Cidade: <br/>{locationValue}
        </div>
        <div className='p-5 text-center hover:bg-sky-100 cursor-pointer '>
            <BiCopy /> Endereço: <br/>av. Brasil, 1234
        </div>
        <div className='p-5 text-center hover:bg-sky-100 cursor-pointer '>
            <BiCopy /> Telefone: <br/>555555555
        </div>
        <div className='p-5 text-center hover:bg-sky-100 cursor-pointer '>
            <BiCopy /> WhatsApp: <br/>555555555
        </div>
        <div className='p-5 text-center hover:bg-sky-100 cursor-pointer '>
            <BiCopy /> Telegram: <br/>555555555
        </div>
        <div className='p-5 text-center hover:bg-sky-100 cursor-pointer '>
            <BiCopy /> e-mail: <br/>email@email.com
        </div>
    </div>
    <hr />
      <div className='flex gap-0.5 p-1'>
        <BiCopy /> Copiar Todos
      </div>
      </>
)
}

export default PartnerInfo