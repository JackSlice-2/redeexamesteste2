"use client";

import React from 'react'
import { Range } from 'react-date-range';
import Button from '../Button';
import { DayPicker } from 'react-day-picker';
import { SafeListing, SafeUser } from '@/app/types';


interface ListingReservationProps {
    dateRange: Range;
    data?: SafeListing;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    dates?: string[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
  dates
}) => {

  console.log(dates);
  const dateObjects = dates?.map(date => new Date(date));
  console.log(dateObjects);


  return (
    <>
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
      <div className="flex flex-col items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          Selecione os dias que tem disponibilidade
        </div>
        <div className="font-light text-sm text-neutral-600">
          Selecione os dias e clique em Mensagem Personalizada! para enviar uma menasagem personalizada solicitando este atendimento
        </div>
      </div>
      <hr />
      <DayPicker
        selected={dateObjects}
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

        <hr/>
        <div className="p-4">
          <Button
          disabled={disabled}
          label="Mensagem Personalizada!"
          onClick={onSubmit}
          />
        </div>
    </div>
<div className='p-2 max-h-56 rounded-lg overflow-y-auto cursor-pointer gap-1 border-2 border-blue-100 border-t-0'>
    {dates?.map(date => (
      <div key={date} className='border-2 border-blue-200 text-blue-600 p-2 rounded-lg hover:text-white hover:font-semibold hover:bg-blue-400'>
        {new Date(date).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
))}      
</div>
    </>
  )
}

export default ListingReservation
