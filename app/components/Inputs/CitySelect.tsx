'use client';

import useCities from '@/app/hooks/useCities';
import React from 'react'
import Select from 'react-select'

export type CitySelectValue = {
    flag: string,
    label: string,
    latlng: number[],
    region: string,
    value: string,
    address: string,
    phoneNumber: string
}

interface CitySelectProps {
  value?: CitySelectValue;
  onChange: (value: CitySelectValue) => void;
  isClearable?: boolean
}

const CitySelect: React.FC<CitySelectProps> = ({
    value,
    onChange,
    isClearable
}) => {
  const { getAll } = useCities();

  return (
    <div>
      <Select 
      placeholder='Selecione uma Cidade'
      isClearable={isClearable}
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as CitySelectValue)}
      formatOptionLabel={(option: any) => (
        <div className='flex flex-row items-center gap-3'>
        <div>
          {option.label}        
        </div>
        </div>
      )}
      classNames={{
        control: () => 'p-1 border-2 ',
        input: () => 'text-lg',
        option: () => 'text-lg'
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
        }
      })}      
      />
    </div>
  )
}

export default CitySelect
