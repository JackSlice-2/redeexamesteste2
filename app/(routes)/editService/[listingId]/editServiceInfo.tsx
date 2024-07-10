"use client";

import { SafeListing, SafeUser } from '@/app/types';
import React, { useMemo, useState } from 'react'
import { IconType } from 'react-icons';
import ListingCategory from '@/app/components/listings/ServiceCategory';
import dynamic from 'next/dynamic';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { PiXFill } from 'react-icons/pi';
import toast, { CheckmarkIcon } from 'react-hot-toast';
import { FieldValues, useForm } from 'react-hook-form';
import { FaFloppyDisk } from 'react-icons/fa6';
import axios from 'axios';

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
    title: string;
    imageSrc: string;
    payNow: string;
    payThere: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    description,
    firstComeFirstServe,
    byAppointmentOnly,
    category,
    locationValue,
    imageSrc,
    payNow,
    payThere,
    startTime,
    endTime,
    latlng,
    title,
    dates,
    user
}) => {

    const {
        watch,
    } = useForm<FieldValues>({
        defaultValues: {
            location: null,
        }
    });
    const [formData, setFormData] = useState({
        title: title || '',
        description: description || '',
        locationValue: locationValue || '',
        startTime: startTime || '',
        endTime: endTime || ''
      });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

      const currentUrl = window.location.href;
      const listingId = currentUrl.split("/").pop();
      
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (!user) {
          toast.error('No currentUser');
          return;
        }  
        try {
          const response = await axios.patch(`/api/listings/${listingId}`, formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.id}`,
            },
          });
      
          console.log('Service updated successfully:', response.data);
          toast.success('Service updated successfully');
        } catch (error) {
          console.error('Error submitting form:', error);
          toast.error('An error occurred after submitting the form.');
        }
      };


  return (
    <form onSubmit={handleSubmit} className='col-span-4 flex flex-col gap-8'>
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold text-center px-10 justify-between flex flex-row items-center gap-2">
        <a href="https://api.whatsapp.com/send/?phone=5551981859157&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
            <div className='bg-green-400 hover:bg-green-600 hover:text-white hover:font-semibold cursor-pointer rounded-2xl text-center p-2 items-center flex gap-1 border-gray-200 border-2 shadow-md' >
              Chame no whatsApp!
              <FaWhatsapp className='mr-1' size={30}/> 
            </div>
        </a>
        <a href="https://t.me/redeexames?start=+55051981859157" target="_blank" rel="noopener noreferrer">
            <div className='bg-blue-400 hover:bg-blue-600 hover:text-white hover:font-semibold cursor-pointer rounded-2xl text-center p-2 items-center flex gap-1 border-gray-200 border-2 shadow-md' >
              Chame no Telegram!
              <FaTelegram className='mr-1' size={30}/> 
            </div>
        </a>
          </div>
          <hr />
            <div className='flex flex-row overflow-x-auto hide-scrollbar'>
              <div className='mx-auto p-3 text-center hover:bg-sky-100 cursor-pointer'>
                  Cidade: <br/>{locationValue}
              </div>
              <div className='mx-auto p-3 text-center hover:bg-sky-100 cursor-pointer'>
                  Horario: <br/>
                  <input
              type="text"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            /> <br/>até
                <input
              type="text"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
              </div>
              <div className='mx-auto p-3 text-center hover:bg-sky-100 cursor-pointer'>
                  Telefone: <br/>51 98185-9157
              </div>
            </div>
          </div>
          <hr />
        <div>
          <span className="flex pb-2 gap-1">
            {firstComeFirstServe ? <CheckmarkIcon /> : <PiXFill size={20} color='red' />}
            Ordem de Chegada
          </span>
          <span className="flex pt-2 gap-1">
            {byAppointmentOnly ? <CheckmarkIcon /> : <PiXFill size={20} color='red' />}
            Horario Marcado
          </span>
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
        <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
      </div>
      <hr />
      <input
              type="text"
              name="locationValue"
              value={formData.locationValue}
              onChange={handleChange}
            />
      <br />
      <hr />
        <hr />
       <button className='bg-blue-500 rounded-md w-full justify-center align-middle px-auto py-5 gap-1 font-semibold my-2 text-white' type="submit">
        <FaFloppyDisk className='m-auto'/> 
        Salvar Alterações
      </button>
        </form>
  )
}

export default ListingInfo
