"use client";

import React from 'react'
import { Range } from 'react-date-range';
import { DayPicker } from 'react-day-picker';
import { SafeListing } from '@/app/types';
import { ptBR } from 'date-fns/locale'; // Import the Portuguese locale



interface ListingReservationProps {
    dateRange: Range;
    data?: SafeListing;
    onSubmit: () => void;
    disabled?: boolean;
    dates?: string[];
    endTime?: string;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  dates,
  endTime
}) => {

  const dateObjects = dates?.map(date => new Date(date));

  return (
    <>
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
      <div className="flex flex-col items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          Temos atendimento nos dias marcados em azul!
        </div>
        <div className="font-light text-sm text-neutral-600">
          Ligue já e confira se há vaga para os dias abaixo!
          <br/>
          Os dias marcados como azul escuro são os disponíveis para atendimento!
        </div>
      </div>
      <hr />
      <div className='flex justify-center items-center w-full py-4 cursor-pointer'>
      <DayPicker
        selected={dateObjects}
        disabled={{ before: new Date() }}
        className="customDayPicker"
        locale={ptBR}
        modifiersStyles={{
          selected: {
          backgroundColor: '#007BFF',
          color: 'white',
          borderRadius: '1rem',
          border: '1px solid lightblue',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          },
          today: {
            color: 'blue',
            backgroundColor: 'transparent',
            border: '0px solid lightblue',
          },
          disabled: {
            color: '#ccc',
            border: '0px solid lightblue',
            backgroundColor: 'transparent',
          }
        }}
      />
      </div>
        <hr/>
    </div>
    <div className='p-2 max-h-56 rounded-lg overflow-y-auto cursor-pointer gap-1 border-2 border-blue-100 border-t-0'>
    {dates?.map(date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);
  const isDisabled = currentDate < today;
  const dateClass = isDisabled ? 'line-through' : '';
  const isToday = currentDate.getTime() === today.getTime();
  return (
    <div key={date} className={`capitalize border-2 border-blue-200 text-blue-600 p-2 rounded-lg hover:text-white hover:font-semibold hover:bg-blue-400 ${dateClass}`}>
      {new Date(date).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      <br />
      {isToday && <div className='font-semibold text-red-400'>{`Atendimento Encerra as: ${endTime}`}</div>}
    </div>
  );
})} 
</div>
    </>
  )
}

export default ListingReservation
