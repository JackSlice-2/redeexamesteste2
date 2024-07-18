"use client";

import React, { useCallback } from 'react'
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { BiCopy, BiTrash } from 'react-icons/bi';
import Image from 'next/image';
import Button from '../Button';

interface PartnerInfoProps {
    imageSrc: string;
    title: string;
    branchPhone?: string[];
    address?: string;
    phone?: string;
    email?: string;
    whatsApp?: string;
    telegram?: string;
    branchAddress?: string[];
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionId?: string;
    actionLabel?: string;
    cities?: string[];
}

const PartnerInfo: React.FC<PartnerInfoProps> = ({
  imageSrc,
  title,
  branchPhone,
  address,
  phone,
  email,
  whatsApp,
  telegram,
  branchAddress,
  onAction,
  disabled,
  actionId = '',
  actionLabel,
  cities
}) => {

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard');
    }, (err) => {
      console.error('Failed to copy text: ', err);
    });
 };

 const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation();
  if (disabled) {
      return;
  }

  const confirmed = window.confirm("Clique em OK para Apagar e clique em CANCEL para voltar");
  if (confirmed) {
      onAction?.(actionId);
  }
}, [onAction, actionId, disabled]);

// Assuming cities is an array of JSON strings
const parsedCities = cities?.map(cityJsonString => {
  const cityObj = JSON.parse(cityJsonString);
  return {
    value: cityObj.value,
    address: cityObj.address,
    phone: cityObj.phoneNumber
  };
});


return (
  <>
  <div className='flex justify-between w-full'>
    <div className='w-1/2 flex flex-col gap-8'>
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-bold flex items-center gap-2 pb-8 pt-3">
          <div className='text-neutral-500 font-semibold'>
            Parceiro Atual: 
          </div>
            {title}
          </div>
          <div className='pb-2'/>
             <div className='p-2 border-gray-400 flex justify-center items-center border rounded-xl'>
             <Image 
              loading="lazy"
              alt='image'
              src={imageSrc}
              width={100}
              height={100}
              className='object-contain w-full rounded-md'
              />
          </div>
        </div>
        </div>
        <div className='w-1/2 p-2 lg:mt-10 border-gray-300 h-1/2'>
        {parsedCities?.length === 0 &&
        <div className='bg-blue-600/30 text-xl border-dashed border-8 rounded-xl border-blue-700 text-center p-5 ml-2 font-semibold'>
            Esse Parceiro NAO tem nenhuma Filial.
            Clique em Editar Parceiros Abaixo para Adicionar Filiais!
          </div>
        }
         {parsedCities?.map((city, index) => (
  <div key={index}>
    <div className='flex justify-center items-center m-2 p-4 text-center hover:bg-blue-400 cursor-pointer font-semibold rounded-2xl shadow-sm bg-blue-200 my-2'>
      <span>
        {city.value}
      </span>
    </div>
    <div className='flex'>
      {city.address && (
        <div className='w-1/2 justify-center text-sm items-center m-2 p-2 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-200'>
          <span>
            {city.address}
          </span>
        </div>
      )}
      {city.phone && (
        <div className='w-1/2 justify-center text-sm items-center m-2 p-2 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-200'>
          <span>
            {city.phone}
          </span>
        </div>
      )}
    </div>
  </div>
))}
        </div>
      </div>
      <div className='mt-3'/>
    <div className='justify-center align-center items-center flex flex-row overflow-x-auto hide-scrollbar w-full pt-2 gap-3 text-center'>      
        
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-200'
          onClick={() => copyToClipboard(phone || '')}
          >
            <BiCopy /> Telefone: <br/>
          <div className='font-medium text-xl'>
            {phone}
          </div>
        </div>
        {address &&
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-200'
          onClick={() => copyToClipboard(address || '')}
          >
            <BiCopy /> Endereço: <br/>
          <div className='font-medium text-xl'>
            {address}
          </div>
        </div>
        }
        {whatsApp &&
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-200'
          onClick={() => copyToClipboard(whatsApp || '')}
          >
            <BiCopy /> WhatsApp: <br/>
          <div className='font-medium text-xl'>
            {whatsApp}
          </div>
        </div>
        }
          {telegram && (
          <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-200'
            onClick={() => copyToClipboard(telegram)}
          >
            <BiCopy /> Telefone 2: <br/>
            <div className='font-medium text-xl'>
              {telegram}
            </div>
          </div>
        )}
        {email && (
          <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-200'
            onClick={() => copyToClipboard(email)}
          >
            <BiCopy /> Telefone 3: <br/>
            <div className='font-medium text-xl'>
              {email}
            </div>
          </div>
        )}
    </div>
      <div className='m-2 ml-4 flex gap-0.5 justify-center text-center transition text-white rounded-xl p-2 w-1/5 cursor-pointer bg-blue-500 hover:bg-blue-300 shadow-md hover:text-black hover:font-medium'
        onClick={() => copyToClipboard(
          `E-Mail: ${email || ''}\n` +
          `WhatsApp: ${whatsApp || ''}\n` +
          `Telegram: ${telegram || ''}\n` +
          `Telefone: ${phone || ''}\n` +
          `Endereço: ${address || ''}
          `)}
        >
        <BiCopy /> Copiar Todos
      </div>
      <div className='pt-5'/>
    <hr />
    {onAction && actionLabel && (
            <Button 
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
            red
            icon={BiTrash}
            />
        )}
      </>
)
}

export default PartnerInfo