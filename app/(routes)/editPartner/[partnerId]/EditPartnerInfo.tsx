"use client";

import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { BiTrash } from 'react-icons/bi';
import Button from '../../../components/Button';
import { FaFloppyDisk } from 'react-icons/fa6';
import { SafeUser } from '@/app/types';
import axios from 'axios';
import CitySelect from '@/app/components/Inputs/CitySelect';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/app/components/Inputs/ImageUpload';

type CitySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

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
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionId?: string;
    actionLabel?: string;
    currentUser?: SafeUser | null;
    cities?: string[];
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
  onAction,
  disabled,
  actionId = '',
  actionLabel,
  currentUser,
  cities
}) => {

  const [selectedCity, setSelectedCity] = useState<CitySelectValue | null>(null);
  const router = useRouter()

useEffect(() => {
  if (cities && cities.length > 0) {
    const cityObject: CitySelectValue = {
      flag: '',
      label: cities[0],
      latlng: [0, 0],
      region: '',
      value: cities[0],
    };

    setSelectedCity(cityObject);
  }
}, [cities]);

  const [formData, setFormData] = 
  useState({
    title: title || '',
    imageSrc: imageSrc || '',
    cnpj: cnpj || '',
    address: address || '',
    phone: phone || '',
    email: email || '',
    whatsApp: whatsApp || '',
    telegram: telegram || '',
    website: website || '',
    cities: cities ? cities.map(city => ({ label: city })) : [],
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
      const response = await axios.patch(`/api/partners/${partnerId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.id}`,
        },
      });
  
      toast.success('Partner updated successfully');
      router.push(`/partners/${partnerId}`);
    } catch (error) {
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

const removeCity = (indexToRemove: number) => {
  setFormData(prevState => ({
    ...prevState,
    cities: prevState.cities.filter((_, index) => index !== indexToRemove),
  }));
};

const setValue = (field: keyof typeof formData, value: any) => {
  setFormData(prevState => ({
    ...prevState,
    [field]: value,
  }));
};

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
          Para Editar a Imagem, Clique nela e Adcione uma Nova!
             <div className='p-2 border-gray-400 flex justify-center items-center border rounded-xl'>
              <ImageUpload
                onChange={(value) => setValue("imageSrc", value)}
                value={imageSrc}
              />
          </div>
        </div>
        </div>
        <div className='w-1/2 p-2 lg:mt-10 border-gray-300 h-1/2 '>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer shadow-sm my-2 bg-blue-200 rounded-lg font-medium'>
          <div className='pb-2'>
            Clique para Alterar ou Adicionar Filiais!
          </div>
        <CitySelect
          value={selectedCity || {'flag': "",
            'label': "",
            'latlng': [0],
            'region': "",
            'value': ""}
          }  onChange={(city) => {
              setSelectedCity(city);
              setFormData(prevState => ({
                ...prevState,
                cities: prevState.cities.includes(city) ? prevState.cities : [...prevState.cities, city],
              }));
            }}
          />

        </div>
        <div className='mb-auto'>

        {formData.cities.map((city, index) => (
        <div key={index} className='mb-2 flex justify-between items-center m-2 p-4 text-center hover:bg-blue-400 cursor-pointer  rounded-2xl shadow-sm bg-blue-100 my-2'>
          <span>
            {city.label}
          </span> 
          <div className='w-1/3'>
          <Button
          label='Remover'
          onClick={(event) => {
            event.preventDefault();
            removeCity(index);
          }}
          outline
          />
        </div>
        </div>
        ))}
        </div>
        </div>
      </div>
      <div className='mt-3'/>
    <div className='justify-center align-center items-center'>      
        <div className='flex flex-row overflow-x-auto hide-scrollbar w-full pt-2 gap-3 text-center '>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-200'
      >
             Endereço: <br/>
          <div className='font-medium text-xl'>
          <input className='border-2 border-gray-700 rounded-lg px-1'
            size={10}
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-200'
          >
             Telefone: <br/>
          <div className='font-medium text-xl'>
          <input className='border-2 border-gray-700 rounded-lg px-1'
            size={10}
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          </div>
        </div>
        <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-200'
          >
             WhatsApp: <br/>
          <div className='font-medium text-xl'>
          <input className='border-2 border-gray-700 rounded-lg px-1'
            size={10}
            type="text"
            name="whatsApp"
            value={formData.whatsApp}
            onChange={handleChange}
          />
          </div>
        </div>
          <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-200'
          >
             Telefone 2: <br/>
            <div className='font-medium text-xl'>
            <input className='border-2 border-gray-700 rounded-lg px-1'
            size={10}
            type="text"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
          />
            </div>
          </div>
          <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-200'
          >
             Telefone 3: <br/>
            <div className='font-medium text-xl'>
            <input className='border-2 border-gray-700 rounded-lg px-1'
            size={10}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
            </div>
          </div>
          <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-200'
          >
             Telefone 4: <br/>
            <div className='font-medium text-xl'>
            <input className='border-2 border-gray-700 rounded-lg px-1'
            size={10}
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
            </div>
          </div>
          <div className='p-4 text-center hover:bg-blue-400 cursor-pointer rounded-2xl shadow-sm bg-blue-200'
          >
             Telefone 5: <br/>
            <div className='font-medium text-xl'>
            <input className='border-2 border-gray-700 rounded-lg px-1'
            size={10}
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
          />
            </div>
          </div>
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
        <button className='relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full text-md my-2 bg-green-600 py-3 font-semibold text-white' type="submit">
        <FaFloppyDisk 
            size={22}
            className="absolute left-4 top-3"
            /> 
        Salvar Alterações
      </button>
        </form>
      </>
)
}

export default PartnerInfo