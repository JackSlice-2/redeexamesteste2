"use client";

import { SafeListing, SafeUser } from '@/app/types';
import React, { useState } from 'react'
import { IconType } from 'react-icons';
import ServiceCategory from '@/app/components/listings/ServiceCategory';
import { PiXFill } from 'react-icons/pi';
import toast, { CheckmarkIcon } from 'react-hot-toast';
import { FieldValues, useForm } from 'react-hook-form';
import { FaFloppyDisk } from 'react-icons/fa6';
import axios from 'axios';
import { DayPicker } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/app/components/Inputs/ImageUpload';
import { ptBR } from 'date-fns/locale';
import CitySelect from '@/app/components/Inputs/CitySelect';

type CitySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
  address: string;
  phoneNumber: string;
};

interface ServiceInfoProps {
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

const ServiceInfo: React.FC<ServiceInfoProps> = ({
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
    title,
    dates,
    user,
    company
}) => {

  const [selectedDates, setSelectedDates] = useState<Date[]>(dates.map(dateStr => new Date(dateStr)));

  const [FirstComeFirstServe, setFirstComeFirstServe] = useState(firstComeFirstServe);
  const [ByAppointmentOnly, setByAppointmentOnly] = useState(byAppointmentOnly);

  const [selectedCity, setSelectedCity] = useState<CitySelectValue | null>(null);


    const {
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

      const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

      const currentUrl = window.location.href;
      const listingId = currentUrl.split("/").pop();
      const router = useRouter();
      
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const datesStringArray = selectedDates.map(date => date.toISOString());
        const payNowNumber = Number(formData.payNow);
        const payThereNumber = Number(formData.payThere);

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
      
          toast.success('Serviço Atualizado com Sucesso!');
          router.push(`/`)
        } catch (error) {
          toast.error('Um Erro Occoreu. Se Persistir Entre em Contato com o Adminsitrador');
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

    const toggleBoolean = (event: any) => {
      event.preventDefault();
      if (FirstComeFirstServe) {
        setFirstComeFirstServe(false);
        setByAppointmentOnly(true);
      } else {
        setFirstComeFirstServe(true);
        setByAppointmentOnly(false);
      }
      console.log("by", byAppointmentOnly, "first", firstComeFirstServe);
    };
    
    const setValue = (field: keyof typeof formData, value: any) => {
      setFormData(prevState => ({
        ...prevState,
        [field]: value,
      }));
    };

    const setCustomValue = (id: string, value: CitySelectValue) => {
      setValue(id as keyof typeof formData, value);
    };

    console.log(formData.locationValue)
    
  return (
    <form onSubmit={handleSubmit} className='col-span-4 flex flex-col gap-8'>
      <div className="flex flex-col gap-2">
          <hr />
          <div className='flex flex-row overflow-x-auto hide-scrollbar font-medium justify-center align-middle items-center'>
              <div className='mx-auto p-4 text-center hover:bg-sky-300 cursor-pointer rounded-xl'>
                  Cidade: <br/>{locationValue}
              </div>
              <div className='mx-auto p-4 text-center hover:bg-sky-300 rounded-xl'>
                  Horario: 
                  <br/>
                  <input
                  className='justify-center border-2 rounded-xl border-gray-600 px-1'
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
                  className='justify-center border-2 rounded-xl border-gray-600 px-1'
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
          Clique na Opçao Desejada:
    
          <button onClick={toggleBoolean}
           className={`flex justify-center my-2 gap-1 border-2 rounded-xl border-gray-600 w-1/2 p-1
            ${ByAppointmentOnly ? "bg-green-300" : "bg-red-300"}
            ${ByAppointmentOnly ? "underline" : "line-through"}
            ${ByAppointmentOnly ? "font-semibold" : "font-medium"}
            `}>
            {ByAppointmentOnly ? <CheckmarkIcon /> : <PiXFill size={20} color='red' /> }
          Horario Marcado
          </button>
        

        <button onClick={toggleBoolean}
           className={`flex justify-center my-2 gap-1 border-2 rounded-xl border-gray-600 w-1/2 p-1
            ${FirstComeFirstServe ? "bg-green-300" : "bg-red-300"}
            ${FirstComeFirstServe ? "underline" : "line-through"}
            ${FirstComeFirstServe ? "font-semibold" : "font-medium"}
            `}>  
            {FirstComeFirstServe ? <CheckmarkIcon /> : <PiXFill size={20} color='red' /> }
          Ordem de Chegada
          </button>

        </div>
        <hr />
        Selecione os dias Desejados:
        <div className='flex flex-col md:flex-row rounded-lg border-2'>
            <div className='w-1/2 p-5 text-blue-800'>
                <DayPicker
                    mode="multiple"
                    locale={ptBR}
                    selected={selectedDates}
                    onSelect={(date) => setSelectedDates(date || [])}
                    onDayClick={handleDayClick}
                    className='customDayPicker'
                    modifiers={{
                    selected: selectedDates,
                    }}
                    modifiersStyles={{
                      selected: {
                      backgroundColor: '#007BFF',
                      color: 'white',
                      borderRadius: '50px',
                      padding: '1px',
                      margin: '1px',
                      border: '1px solid lightblue',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      },
                      today: {
                        color: 'blue',
                        backgroundColor: 'transparent',
                        border: '2px solid lightblue',
                      },
                      disabled: {
                        color: '#ccc',
                        border: '0px solid lightblue',
                        backgroundColor: 'transparent',
                      }
                    }}
                />
            </div>
            <div className="selected-dates-list w-full md:w-1/2 p-2 max-h-auto rounded-lg overflow-y-auto cursor-pointer gap-1 border-blue-100 md:border-l-2">
                {selectedDates.sort((a, b) => a.getTime() - b.getTime()).map((date, index) => (
                    <div key={index} className="border-2 border-blue-200 text-blue-600 p-2 rounded-lg hover:text-white hover:font-semibold hover:bg-blue-400" onClick={() => handleDayClick(date)}>
                        {date.toDateString()}
                    </div>
                  ))}
                </div>
              </div>
          <hr />
          
        {category && (
          <ServiceCategory
          icon={category.icon}
          label={category.label}
          description={''}
          />
        )}
        <hr />
        {user &&
          <div className='font-medium'>
            {company}
          </div>
        }
        <hr />
        <div className="text-lg text-neutral-600">
          Titulo:
      <div className='font-semibold text-black'>
        <input className='border-2 border-gray-700 rounded-lg px-1'
              type="text"
              name="title"
              size={35}
              value={formData.title}
              onChange={handleChange}
            />
      </div>
      </div>
      <div className='text-neutral-600'>
      Preparo do Exame:
      <div className='font-semibold text-black'>
        <textarea 
          className='border-2 border-gray-700 rounded-lg px-1'
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder='Jejum de 8 Horas'
            />
            </div>
            </div>
      <hr />
      <div className='text-neutral-600'>
      Alterar Cidade do Exame/Consulta:
      <div className='font-semibold text-black w-1/2'>
        <CitySelect
        //@ts-ignore
        value={formData.locationValue[0]}
        onChange={(value) => {
          setSelectedCity(value);
          setCustomValue('locationValue', value);
        }}
        />
            </div>
            </div>
      <hr />
      {user &&
      <>
      <div className='text-neutral-600'>
          Valor A Ser Pago no Pix: 
          <div className='font-semibold text-black'>
            R$ <input className='border-2 border-gray-700 rounded-lg px-1'
              type="number"
              name="payNow"
              size={5}
              value={formData.payNow}
              onChange={handleChange}
            />
            </div>
            </div>
            <div className='text-neutral-600'>
            Valor A Ser Pago no Local: 
          <div className='font-semibold text-black'>
            R$ <input className='border-2 border-gray-700 rounded-lg px-1'
              type="number"
              name="payThere"
              size={5}
              value={formData.payThere}
              onChange={handleChange}
            />
      </div>
      </div>
      </>
      }
        <hr />
        <div>
        <div className='text-neutral-600 py-1'>
          Clique na Imagem abaixo para alterar:
        </div>
             <div className='p-2 border-gray-400 flex justify-center items-center border rounded-xl w-1/2'>
              <ImageUpload
                onChange={(value: any) => setValue("imageSrc", value)}
                value={formData.imageSrc || imageSrc}
              />
          </div>
          </div>
        <hr />
        <button className='relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full text-md my-2 bg-green-600 py-3 font-semibold text-white' type="submit">
        <FaFloppyDisk 
            size={22}
            className="absolute left-4 top-3"
            /> 
        Salvar Alterações
      </button>
        </form>
  )
}

export default ServiceInfo
