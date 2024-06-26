import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    payNow?: boolean;
    payThere?: boolean;
    firstComeFirstServe?: boolean;
    byAppointmentOnly?: boolean;
    checked?: boolean;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    register,
    required,
    errors,
}) => {
    const isBooleanInput = id === 'firstComeFirstServe' || id === 'byAppointmentOnly';

    const isMoneyInput = formatPrice;

    return (
        <div className='w-full relative'>
            {isMoneyInput && (
                <span className='text-neutral-700 absolute top-5 left-4'>$</span>
            )}
            {isBooleanInput ? (
                <input 
                id={id}
                disabled={disabled}
                {...register(id)}
                type="checkbox"
                className={` hidden
                text-center font-wrap p-6 font-light bg-white border-2 rounded-md outline-none disabled:opacity-70 disabled:cursor-not-allowed
                ${formatPrice ? 'pl-9' : 'pl-4'}
                ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
                />
            ) : (
                <input 
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=' '
                type={type}
                className={`
                peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none disabled:opacity-70 disabled:cursor-not-allowed
                ${formatPrice ? 'pl-9' : 'pl-4'}
                ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
                />
            )}
            <label className={`
            absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
            ${formatPrice ? 'left-9' : 'left-4'}
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

export default Input;
