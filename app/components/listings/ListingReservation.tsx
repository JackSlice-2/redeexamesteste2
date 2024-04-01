"use client";

import React from 'react'
import Calendar from '../Inputs/Calendar';
import { Range } from 'react-date-range';
import Button from '../Button';

interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
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
        <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
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
