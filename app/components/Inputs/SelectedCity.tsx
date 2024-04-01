'use client';

import useCities from '@/app/hooks/useCities';
import React, { useMemo } from 'react'
import Select from 'react-select'

export type SelectedCityValue = {
    flag: string,
    label: string,
    latlng: number[],
    region: string,
    value: string
}

interface SelectedCityProps {
    value?: SelectedCityValue;
    onChange: (value: SelectedCityValue) => void;
    locationValue: string;
}

const SelectedCity: React.FC<SelectedCityProps> = ({
    value,
    onChange,
    locationValue
}) => {
  const { getAll } = useCities();

  const filteredCities = useMemo(() => {
    return getAll().filter(city => city.label.toLowerCase().includes(locationValue.toLowerCase()));
 }, [getAll, locationValue]);

  return (
    <div>
      <Select 
      placeholder='Selecione uma Cidade'
      isClearable
      isDisabled
      value={filteredCities}
      formatOptionLabel={(option: any) => (
        <div className='flex flex-row items-center gap-3'>
          <div>{option.flag}</div>
          <div>{option.label}, </div>
          <span className='text-neutral-500 ml-1'>
            {option.region}
          </span>
        </div>
      )}
      styles={{
        dropdownIndicator: (provided) => ({
          ...provided,
          display: 'none',
        }),
     }}
      classNames={{
        control: () => 'p-3 border-2',
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

export default SelectedCity
