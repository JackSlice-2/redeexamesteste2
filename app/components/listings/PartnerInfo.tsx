"use client";

import useCountries from '@/app/hooks/useCountries';
import React from 'react'
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';
import { PiXFill } from 'react-icons/pi';
import toast, { CheckmarkIcon } from 'react-hot-toast';
import { BiCopy } from 'react-icons/bi';

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface PartnerInfoProps {
    description: string;
    firstComeFirstServe?: boolean;
    byAppointmentOnly?: boolean;
    payNow?: number;
    payThere?: number;
    companies: {
        imageSrc: string;
        label: string;
        description: string;
        cnpj: string;
        address: string;
        phone: string;
        email: string;
        whatsApp: string;
        telegram: string;
        website: string;
        city: string;
    } | undefined
    locationValue: string;
}

const PartnerInfo: React.FC<PartnerInfoProps> = ({
  description,
  firstComeFirstServe,
  byAppointmentOnly,
  payNow,
  payThere,
  companies,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard');
    }, (err) => {
      console.error('Failed to copy text: ', err);
    });
 };

return (
  <>
  <div className='flex justify-between w-full'>
    <div className='w-1/2 flex flex-col gap-8'>
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-bold flex flex-row items-center gap-2 pb-8 pt-5">
            <div>Parceiro Atual: {companies?.label}</div>
          
            <div className='p-1'>
          <hr />
          </div> 
          </div>
          <div className='p-1'>
          <hr />
          </div>   
           {companies && (
            <ListingCategory
            imageSrc={companies.imageSrc}
            label={companies.label}
            description={description}
            />
          )}<br/>
          CNPJ: {companies?.cnpj}
          <div className='p-1'>
              <hr />
              </div>         
             <div className='w-2/3 p-3 border-gray-600 flex justify-center items-center'>
            {description}
          </div>
        </div>
        </div>
        <div className='w-1/2 p-2 border-gray-600 h-1/2'>
         <Map center={coordinates}
          />
        </div>
      </div>
      <div className='p-1'>
    <hr />
    </div>      <div className='justify-center align-center items-center'>      
        <div className='flex flex-row overflow-x-auto hide-scrollbar w-full p-2 gap-3 justify-center text-center '>

        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
      onClick={() => copyToClipboard(companies?.city || '')}
      >
          <BiCopy /> Cidade: <br/>
          <div className='font-medium text-xl'>
            {companies?.city}
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          onClick={() => copyToClipboard(companies?.address || '')}
          >
            <BiCopy /> Endereço: <br/>
          <div className='font-medium text-xl'>
            {companies?.address}
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          onClick={() => copyToClipboard(companies?.phone || '')}
          >
            <BiCopy /> Telefone: <br/>
          <div className='font-medium text-xl'>
            {companies?.phone}
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          onClick={() => copyToClipboard(companies?.whatsApp || '')}
          >
            <BiCopy /> WhatsApp: <br/>
          <div className='font-medium text-xl'>
            {companies?.whatsApp}
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          onClick={() => copyToClipboard(companies?.telegram || '')}
          >
            <BiCopy /> Telegram: <br/>
          <div className='font-medium text-xl'>
            {companies?.telegram}
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          onClick={() => copyToClipboard(companies?.email || '')}
          >
            <BiCopy /> E-Mail: <br/>
          <div className='font-medium text-xl'>
            {companies?.email}
          </div>
        </div>
    </div>
      <div className='flex gap-0.5 justify-center text-center transition text-white rounded-xl p-1 w-1/5 cursor-pointer bg-blue-500 hover:bg-blue-400 shadow-md'
        onClick={() => copyToClipboard(
          `E-Mail: ${companies?.email || ''}\n` +
          `WhatsApp: ${companies?.whatsApp || ''}\n` +
          `Telegram: ${companies?.telegram || ''}\n` +
          `Telefone: ${companies?.phone || ''}\n` +
          `Endereço: ${companies?.address || ''}\n` +
          `Cidade: ${companies?.city || ''}`
        )}
        >
        <BiCopy /> Copiar Todos
      </div>
      </div>

      <div className='p-1'>
    <hr />
    </div>
      </>
)
}

export default PartnerInfo