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
                <span className='absolute font-semibold top-6 left-3'>R$</span>
            )}
                <input 
                    id={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    placeholder={label}
                    type={type}
                    className={`
                        font-light bg-white border-2 rounded-md outline-none disabled:opacity-70 disabled:cursor-not-allowed
                        ${isBooleanInput ? 'hidden' : 'peer'}
                        ${isBooleanInput ? 'text-center' : 'w-full'}
                        ${isBooleanInput ? 'p-6' : 'p-4'}
                        ${isBooleanInput ? 'font-wrap' : 'pt-6'}
                        ${formatPrice ? 'pl-9' : 'pl-4'}
                        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                    `}
                />
            </div>
    )
}

export default Input;
