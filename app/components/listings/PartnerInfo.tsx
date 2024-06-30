"use client";

import React from 'react'
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { BiCopy, BiPencil } from 'react-icons/bi';
import Image from 'next/image';
import Link from 'next/link';

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface PartnerInfoProps {
    imageSrc: string;
    title: string;
    cnpj?: string;
    address?: string;
    phone?: string;
    email?: string;
    whatsApp?: string;
    telegram?: string;
    website?: string;
    city?: string;
}

const PartnerInfo: React.FC<PartnerInfoProps> = ({
  imageSrc,
  title,
  cnpj,
  address,
  phone,
  email,
  whatsApp,
  telegram,
  website,
  city
}) => {

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
        <div className="text-3xl font-bold flex flex-row items-center gap-2 pb-8 pt-3">
            <div>Parceiro Atual: {title}</div>
          </div>
          CNPJ: {cnpj}
            <br/>
          <span>
            Site:
              <Link href={website || ''}
                className="underline hover:bg-gray-400 hover:text-white text-medium p-1 rounded-md pl-1">
                {title}.com
              </Link>
            </span>
            <hr />
          <div className='pb-2'/>
             <div className='p-2 border-gray-400 flex justify-center items-center border rounded-xl'>
             <Image
              alt='image'
              src={imageSrc}
              width={100}
              height={75}
              className='object-cover w-full rounded-md'
              />
          </div>
        </div>
        </div>
        <div className='w-1/2 p-2 lg:mt-10 border-gray-300 h-1/2'>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100 my-2'>
          {city}
        </div>
        <div className='p-2 mt-1'>
         <Map 
        center={[0,0]}
        />
        </div>
        </div>
      </div>
      <div className='mt-3'/>
    <div className='justify-center align-center items-center'>      
        <div className='flex flex-row overflow-x-auto hide-scrollbar w-full pt-2 gap-3 justify-center text-center '>

        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
      onClick={() => copyToClipboard(city || '')}
      >
          <BiCopy /> Cidade: <br/>
          <div className='font-medium text-xl'>
            {city}
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          onClick={() => copyToClipboard(address || '')}
          >
            <BiCopy /> Endereço: <br/>
          <div className='font-medium text-xl'>
            {address}
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          onClick={() => copyToClipboard(phone || '')}
          >
            <BiCopy /> Telefone: <br/>
          <div className='font-medium text-xl'>
            {phone}
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          onClick={() => copyToClipboard(whatsApp || '')}
          >
            <BiCopy /> WhatsApp: <br/>
          <div className='font-medium text-xl'>
            {whatsApp}
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          onClick={() => copyToClipboard(telegram || '')}
          >
            <BiCopy /> Telegram: <br/>
          <div className='font-medium text-xl'>
            {telegram}
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          onClick={() => copyToClipboard(email || '')}
          >
            <BiCopy /> E-Mail: <br/>
          <div className='font-medium text-xl'>
            {email}
          </div>
        </div>
    </div>
      <div className='m-2 ml-4 flex gap-0.5 justify-center text-center transition text-white rounded-xl p-2 w-1/5 cursor-pointer bg-blue-500 hover:bg-blue-300 shadow-md hover:text-black hover:font-medium'
        onClick={() => copyToClipboard(
          `E-Mail: ${email || ''}\n` +
          `WhatsApp: ${whatsApp || ''}\n` +
          `Telegram: ${telegram || ''}\n` +
          `Telefone: ${phone || ''}\n` +
          `Endereço: ${address || ''}\n` +
          `Cidade: ${city || ''}`
        )}
        >
        <BiCopy /> Copiar Todos
      </div>
      </div>
      <div className='pt-5'/>
    <hr />
      </>
)
}

export default PartnerInfo