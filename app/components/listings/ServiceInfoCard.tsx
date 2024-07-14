"use client";

import { SafeListing, SafeUser } from '@/app/types';
import React from 'react'
import { IconType } from 'react-icons';
import ListingCategory from './ServiceCategory';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { PiXFill } from 'react-icons/pi';
import { CheckmarkIcon } from 'react-hot-toast';
import { FieldValues, useForm } from 'react-hook-form';
import Button from '../Button';

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
    payNow: number;
    payThere: number;
    company: string;
    currentUser?: SafeUser | null
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    description,
    firstComeFirstServe,
    byAppointmentOnly,
    category,
    locationValue,
    startTime,
    endTime,
    title,
    payThere,
    payNow,
    company,
    currentUser
}) => {

    const {
        watch,
    } = useForm<FieldValues>({
        defaultValues: {
            location: null,
        }
    });

    const handleWhatsAppButton = () => {
      const url = "https://api.whatsapp.com/send?phone=5551981859157&text=Hello%20from%20React!";
      window.open(url, '_blank');
    };
    const handleTelegramButton = () => {
      const url = "https://t.me/redeexames?start=+55051981859157";
      window.open(url, '_blank');
    };

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold text-center px-10 justify-center flex flex-col items-center gap-2">
          <Button 
          label='Chame no WhatsApp!'
          onClick={handleWhatsAppButton}
          green
          icon={FaWhatsapp}
          />
          <Button 
          label='Chame no Telegram!'
          onClick={handleTelegramButton}
          icon={FaTelegram}
          />
          </div>
          <hr />
            <div className='flex flex-row overflow-x-auto hide-scrollbar font-medium justify-center align-middle items-center'>
              <div className='mx-auto p-4 text-center hover:bg-sky-300 cursor-pointer rounded-xl'>
                  Cidade: <br/>{locationValue}
              </div>
              <div className='mx-auto p-4 text-center hover:bg-sky-300 cursor-pointer rounded-xl'>
                  Horario: <br/>{startTime} <br/>até {endTime}
              </div>
              <div className='mx-auto p-4 text-center hover:bg-sky-300 cursor-pointer rounded-xl'>
                  Telefone: <br/>51 98185-9157
              </div>
            </div>
          </div>
          <hr />
        <div>

        <span
           className={`flex justify-center my-2 gap-1 border-2 rounded-xl border-gray-600 w-2/3 md:w-1/2 p-1
            ${byAppointmentOnly ? "bg-green-300" : "bg-red-300"}
            ${byAppointmentOnly ? "underline" : "line-through"}
            ${byAppointmentOnly ? "font-semibold" : "font-medium"}
            `}>
            {byAppointmentOnly ? <CheckmarkIcon /> : <PiXFill size={20} color='red' /> }
          Horario Marcado
          </span>
        
        <span
           className={`flex justify-center my-2 gap-1 border-2 rounded-xl border-gray-600 w-2/3 md:w-1/2 p-1
            ${firstComeFirstServe ? "bg-green-300" : "bg-red-300"}
            ${firstComeFirstServe ? "underline" : "line-through"}
            ${firstComeFirstServe ? "font-semibold" : "font-light"}
            `}>  
            {firstComeFirstServe ? <CheckmarkIcon /> : <PiXFill size={20} color='red' /> }
          Ordem de Chegada
          </span>

        </div>
        <hr />
        {category && (
          <>
          <ListingCategory
          icon={category.icon}
          label={category.label}
          description={''}
          />
        <hr />
        </>
        )}
        {currentUser ?(
          <div className='font-medium'>
            {company}
          </div>) : null
        }
        {description &&
          <>
         <div className='text-neutral-600'>
            Preparo do Exame: 
            <div className='text-black flex max-w-10 border-box word-wrap'>
              {description}
            </div>
         </div>
        <hr />
        </>
        }
        <div className="text-lg font-light text-neutral-500">
          {title}
      </div>
      <hr />
      {locationValue} <br />
      <hr />
      {currentUser ? (
      <>
        <div className='text-neutral-600'>
          Valor Pra Pagar no Pix: 
          <div className='font-semibold text-black'>
            R$ {payNow}
          </div>
        </div>
        <div className='text-neutral-600'>
          Valor Pra Pagar no Local: 
          <div className='font-semibold text-black'>
            R$ {payThere}
          </div>
        </div>
      <hr />
      </>
      ): null}
    </div>
  )
}

export default ListingInfo
