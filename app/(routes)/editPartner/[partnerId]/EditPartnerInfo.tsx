"use client";

import React, { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { BiCopy, BiTrash } from 'react-icons/bi';
import Image from 'next/image';
import Button from '../../../components/Button';
import { FaFloppyDisk } from 'react-icons/fa6';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { SafeUser } from '@/app/types';
import axios from 'axios';
import { redirect } from 'next/navigation';


const Map = dynamic(() => import('../../../components/Map'), {
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
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionId?: string;
    actionLabel?: string;
    currentUser?: SafeUser | null
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
  city,
  onAction,
  disabled,
  actionId = '',
  actionLabel,
  currentUser
}) => {

  const [formData, setFormData] = useState({
    title: title || '',
    imageSrc: imageSrc || '',
    cnpj: cnpj || '',
    address: address || '',
    phone: phone || '',
    email: email || '',
    whatsApp: whatsApp || '',
    telegram: telegram || '',
    website: website || '',
    city: city || ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const currentUrl = window.location.href;
  const partnerId = currentUrl.split("/").pop();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!currentUser) {
      toast.error('No currentUser');
      return;
    }  
    try {
      console.log(`URL: /api/partners/${partnerId}`);
      const response = await axios.patch(`/api/partners/${partnerId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.id}`,
        },
      });
  
      console.log('Partner updated successfully:', response.data);
      toast.success('Partner updated successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred after submitting the form.');
    }
  };
  
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

return (
  <>
      <form onSubmit={handleSubmit}>
  <div className='flex justify-between w-full'>
    <div className='w-1/2 flex flex-col gap-8'>
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-bold flex flex-row items-center gap-2 pb-8 pt-3">
            <div>Editando: 
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            /></div>
          </div>
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
         {/*<Map 
        center={[0,0]}
        />*/}
        </div>
        </div>
      </div>
      <div className='mt-3'/>
    <div className='justify-center align-center items-center'>      
        <div className='flex flex-row overflow-x-auto hide-scrollbar w-full pt-2 gap-3 justify-center text-center '>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
      >
          <BiCopy /> Cidade: <br/>
          <div className='font-medium text-xl'>
          <input
            size={10}
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          >
            <BiCopy /> Endereço: <br/>
          <div className='font-medium text-xl'>
          <input
            size={10}
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          >
            <BiCopy /> Telefone: <br/>
          <div className='font-medium text-xl'>
          <input
            size={10}
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          >
            <BiCopy /> WhatsApp: <br/>
          <div className='font-medium text-xl'>
          <input
            size={10}
            type="text"
            name="whatsApp"
            value={formData.whatsApp}
            onChange={handleChange}
          />
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
        >
          <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          >
            <BiCopy /> Telefone 2: <br/>
            <div className='font-medium text-xl'>
            <input
            size={10}
            type="text"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
          />
            </div>
          </div>
          <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          >
            <BiCopy /> Telefone 3: <br/>
            <div className='font-medium text-xl'>
            <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
            </div>
          </div>
          <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          >
            <BiCopy /> Telefone 4: <br/>
            <div className='font-medium text-xl'>
            <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
            </div>
          </div>
          <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-100'
          >
            <BiCopy /> Telefone 5: <br/>
            <div className='font-medium text-xl'>
            <input
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
          />
            </div>
          </div>
      </div>
    </div>
      <div className='m-2 ml-4 flex gap-0.5 justify-center text-center transition text-white rounded-xl p-2 w-1/5 cursor-pointer bg-blue-500 hover:bg-blue-300 shadow-md hover:text-black hover:font-medium'
        >
        <BiCopy /> Copiar Todos
      </div>
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
       <button className='bg-blue-500 rounded-md w-full justify-center align-middle px-auto py-5 gap-1 font-semibold my-2 text-white' type="submit">
        <FaFloppyDisk className='m-auto'/> 
        Salvar Alterações
      </button>
        </form>
      </>
)
}

export default PartnerInfo