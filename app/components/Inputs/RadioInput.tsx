import React, { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface RadioInputProps {
    id: string;
    label: string;
    disabled?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const RadioInput: React.FC<RadioInputProps> = ({
    id,
    label,
    disabled,
    register,
    errors
}) => {
    
// Assuming you have a state or a way to manage the boolean value
const [isTrue, setIsTrue] = useState(true);

// Function to handle radio button change
const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert the string value back to a boolean
    const value = e.target.value === 'true';
    setIsTrue(value);
};

    return (
        <div className='w-full relative'>
            <input 
                id={`${id}-true`}
                disabled={disabled}
                {...register(id)}
                type="radio"
                value="true"
                onChange={handleRadioChange}
                className={`
                peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
                ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
            />
            <label htmlFor={`${id}-true`}>Yes</label>
            <input 
                id={`${id}-false`}
                disabled={disabled}
                {...register(id)}
                type="radio"
                value="false"
                onChange={handleRadioChange}
                className={`
                peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
                ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
            />
            <label htmlFor={`${id}-false`}>No</label>
            <label className={`
            absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
            left-4
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-47
            ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
            `}>
                {label}
            </label>
        </div>
    )
}

export default RadioInput;
