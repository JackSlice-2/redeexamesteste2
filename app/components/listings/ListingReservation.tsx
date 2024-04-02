"use client";

import React from 'react'
import { Range } from 'react-date-range';
import Button from '../Button';
import { DayPicker } from 'react-day-picker';


interface ListingReservationProps {
    dateRange: Range;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
}) => {

  

  return (
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
    
      modifiersStyles={{
          selected: {
          backgroundColor: '#007BFF', // Modern blue color
          color: 'white',
          borderRadius: '1rem',
          border: '1px solid #007BFF', // Add a border for a modern touch
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth
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
  )
}

export default ListingReservation
