"use client";

import { SafeListing, SafeUser } from '@/app/types';
import React, { useEffect, useMemo, useState } from 'react'
import { IconType } from 'react-icons';
import ListingCategory from '@/app/components/listings/ServiceCategory';
import dynamic from 'next/dynamic';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { PiXFill } from 'react-icons/pi';
import toast, { CheckmarkIcon } from 'react-hot-toast';
import { FieldValues, useForm } from 'react-hook-form';
import { FaFloppyDisk } from 'react-icons/fa6';
import axios from 'axios';
import { DayPicker } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/app/components/Inputs/ImageUpload';

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
    payNow: number;
    payThere: number;
    company: string;
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
    user,
    company
}) => {

  const [selectedDates, setSelectedDates] = useState<Date[]>(dates.map(dateStr => new Date(dateStr)));

  const [FirstComeFirstServe, setFirstComeFirstServe] = useState(firstComeFirstServe);
  console.log(firstComeFirstServe)
  console.log(FirstComeFirstServe)
  const [ByAppointmentOnly, setByAppointmentOnly] = useState(byAppointmentOnly);
  console.log(byAppointmentOnly);
  console.log(ByAppointmentOnly);


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
        endTime: endTime || '',
        payNow: payNow,
        payThere: payThere,
        dates: selectedDates,
        firstComeFirstServe: FirstComeFirstServe,
        byAppointmentOnly: ByAppointmentOnly,
        company: company,
        imageSrc: imageSrc
      });
      console.log(formData)

      const updateFormData = () => {
        setFormData({
          title: title,
          imageSrc: imageSrc,
          description: description,
          locationValue: locationValue,
          startTime: startTime,
          endTime: endTime,
          payNow: payNow,
          payThere: payThere,
          company: company,
          dates: selectedDates,
          firstComeFirstServe: FirstComeFirstServe,
          byAppointmentOnly: ByAppointmentOnly,
        });
      };
      

      const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    

      const currentUrl = window.location.href;
      const listingId = currentUrl.split("/").pop();
      const router = useRouter();

      
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (!user) {
          toast.error('No currentUser');
          return;
        }  
        const datesStringArray = selectedDates.map(date => date.toISOString());

           // Parse payNow and payThere to numbers
    const payNowNumber = Number(formData.payNow);
    const payThereNumber = Number(formData.payThere);

    // Validate the parsed numbers
    if (isNaN(payNowNumber) || isNaN(payThereNumber)) {
      toast.error('Invalid payment amount entered');
      return;
    }

    const dataToSend = {
      ...formData,
      payNow: payNowNumber,
      payThere: payThereNumber,
      dates: datesStringArray,
  };
        try {
          const response = await axios.patch(`/api/listings/${listingId}`, dataToSend, 
            {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.id}`,
            },
          });
      
          console.log('Service updated successfully:', response.data);
          toast.success('Service updated successfully');
          router.push(`/listings/${listingId}`)
        } catch (error) {
          console.error('Error submitting form:', error);
          toast.error('An error occurred after submitting the form.');
        }
      };
    
    const handleDayClick = (date: Date) => {
        setSelectedDates(prevSelectedDates => {
            if (prevSelectedDates.some(selectedDate => selectedDate.getTime() === date.getTime())) {
                return prevSelectedDates.filter(selectedDate => selectedDate.getTime() !== date.getTime());
            } else {
                return [...prevSelectedDates, date];
            }
        });
    };

    const toggleFirstComeFirstServe = (event: any) => {
      event.preventDefault();
      setFirstComeFirstServe(prevState => true); // Toggle the value
      setByAppointmentOnly(prevState => false); 
      updateFormData();
    };
    
    const toggleByAppointmentOnly = (event: any) => {
      event.preventDefault();
      setByAppointmentOnly(prevState => true); // Toggle the value
      setFirstComeFirstServe(prevState => false);
      updateFormData();
    };

    const setValue = (field: keyof typeof formData, value: any) => {
      setFormData(prevState => ({
        ...prevState,
        [field]: value,
      }));
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
          <div className='flex flex-row overflow-x-auto hide-scrollbar font-medium justify-center align-middle items-center'>
              <div className='mx-auto p-4 text-center hover:bg-sky-300 cursor-pointer rounded-xl'>
                  Cidade: <br/>{locationValue}
              </div>
              <div className='mx-auto p-4 text-center hover:bg-sky-300 rounded-xl'>
                  Horario: 
                  <br/>
                  <input
                    type="text"
                    size={3}
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                  /> 
                  <br/>
                  <div className='p-1'>
                  até
                  </div>
                  <input
                    type="text"
                    size={3}
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                  />
              </div>
              <div className='mx-auto cursor-pointer p-4 text-center hover:bg-sky-300 rounded-xl'>
                  Telefone: <br/>51 98185-9157
              </div>
            </div>
          </div>
          <hr />
        <div>
    
      
          <button onClick={toggleByAppointmentOnly}
           className={`flex justify-center my-2 gap-1 border-2 rounded-xl border-gray-600 w-1/2 p-1
            ${ByAppointmentOnly ? "bg-red-300" : "bg-green-300"}
            ${ByAppointmentOnly ? "line-through" : "underline"}
            `}>
            {ByAppointmentOnly ? <PiXFill size={20} color='red' /> : <CheckmarkIcon /> }
          Horario Marcado
          </button>
        

        <button onClick={toggleFirstComeFirstServe}
           className={`flex justify-center my-2 gap-1 border-2 rounded-xl border-gray-600 w-1/2 p-1
            ${FirstComeFirstServe ? "bg-red-300" : "bg-green-300"}
            ${FirstComeFirstServe ? "line-through" : "underline"}
            `}>  
            {FirstComeFirstServe ? <PiXFill size={20} color='red' /> : <CheckmarkIcon /> }
          Ordem de Chegada
          </button>

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
        {user &&
          <div className='font-medium'>
            {company}
          </div>
        }
        <hr />
        <div className="text-lg font-light text-neutral-500">
        <input className='border-2 border-gray-700 rounded-xl px-1'
              type="text"
              name="title"
              size={35}
              value={formData.title}
              onChange={handleChange}
            />
      </div>
      Preparo do Exame:
      <input className='border-2 border-gray-700 rounded-xl px-1'
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
      <hr />
      Alterar Cidade do Exame/Consulta:
      <input className='border-2 border-gray-700 rounded-xl px-1'
              type="text"
              name="locationValue"
              size={5}
              value={formData.locationValue}
              onChange={handleChange}
            />
      <hr />
      {user &&
      <>
      <div>Alterar Valor Pra Pagar no Pix: <br/>
        <input className='border-2 border-gray-700 rounded-xl px-1'
              type="number"
              name="payNow"
              size={5}
              value={formData.payNow}
              onChange={handleChange}
            />
            </div>
          <div>Alterar Valor Pra Pagar no Local: <br/>
          <input className='border-2 border-gray-700 rounded-xl px-1'
              type="number"
              name="payThere"
              size={5}
              value={formData.payThere}
              onChange={handleChange}
            />
      </div>
      </>
      }
            <div className='max-h-64 flex flex-col-2 border-t-2'>
                    <div className='w-1/2 text-blue-800 border-l-2 p-2 border-b-2'>
                        <DayPicker
                            mode="multiple"
                            className='customDayPickerAdModel'
                            selected={selectedDates}
                            onSelect={(date) => setSelectedDates(date || [])}
                            onDayClick={handleDayClick}
                            modifiers={{
                            selected: selectedDates,
                        }}
                        modifiersStyles={{
                            selected: {
                            backgroundColor: '#007BFF',
                            color: 'white',
                            borderRadius: '1rem',
                            border: '1px solid #007BFF',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                            },
                        }}
                        />
                    </div>
                    <div className="selected-dates-list w-1/2 p-2 max-h-auto rounded-lg overflow-y-auto cursor-pointer gap-1 border-2 border-blue-100 border-t-0">
                        {selectedDates.sort((a, b) => a.getTime() - b.getTime()).map((date, index) => (
                            <div key={index} className="border-2 border-blue-200 text-blue-600 p-2 rounded-lg hover:text-white hover:font-semibold hover:bg-blue-400" onClick={() => handleDayClick(date)}>
                                {date.toDateString()}
                            </div>
                        ))}
                    </div>
                </div>
        <hr />
        <div className='pb-2'/>
             <div className='p-2 border-gray-400 flex justify-center items-center border rounded-xl'>
              <ImageUpload
                onChange={(value) => setValue("imageSrc", value)}
                value={imageSrc}
              />
          </div>
        <hr />

       <button className='bg-green-600 rounded-md w-full justify-center align-middle px-auto py-5 gap-1 font-semibold my-2 text-white' type="submit">
        <FaFloppyDisk className='m-auto'/> 
        Salvar Alterações
      </button>
        </form>
  )
}

export default ListingInfo
