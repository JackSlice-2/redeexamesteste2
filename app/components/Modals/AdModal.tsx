"use client";

import React, { useEffect, useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../Inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import ImageUpload from '../Inputs/ImageUpload';
import Input from '../Inputs/Input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { companies } from '../../(routes)/myPartners/MyPartners';
import CompanyInput from '../Inputs/CompanyInput';
import CitySelect from '../Inputs/CitySelect';
import { DayPicker } from 'react-day-picker';
import Button from '../Button';

enum STEPS {
    CATEGORY = 0,
    COMPANY = 1,
    LOCATION = 2,
    INFO = 3,
    IMAGES = 4,
    DESCRIPTION = 5,
    CALENDAR = 6,
}

const RentModal = () => {
    const rentModal = useRentModal();
    const router = useRouter();
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            company: '',
            location: {
                "value": "Online",
                "label": "Online",
                "latlng": [
                    0,
                    0
                ],
                "region": "Default Region"
            },
            payNow: '',
            payThere: '',
            firstComeFirstServe: false,
            byAppointmentOnly: false,
            dates: [],
            selectedDates: [],
            imageSrc: '',
            title: '',
            description: '',
            startTime: '',
            endTime: '',
        }
    });

    const category = watch('category');
    const company = watch('company');
    const location = watch('location');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
        //Map Depends on location, Ignore warning below
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value -1)
    }
const onNext = () => {
    // Check for required fields based on the current step
    switch (step) {
        case STEPS.CATEGORY:
            if (!category) {
                toast.error('Category is required');
                return;
            }
            break;
        case STEPS.COMPANY:
            if (!company) {
                toast.error('Company is required');
                return;
            }
            break;
            case STEPS.LOCATION:
            if (location == null) {
                toast.error('Location is required');
                return;
            }
            break;
            case STEPS.INFO:
                const byAppointmentOnly = watch('byAppointmentOnly');
                const firstComeFirstServe = watch('firstComeFirstServe');
                if (byAppointmentOnly === firstComeFirstServe) {
                    toast.error('PorFavor Selecione o tipo de atendimento');
                    return;
                }
                break;
        case STEPS.IMAGES:
            if (!imageSrc) {
                toast.error('Image is required');
                return;
            }
            break;
        default:
            break;
    }

    setStep((value) => value + 1);
};

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step != STEPS.CALENDAR) {
            return onNext();
        }
        if (step === STEPS.CALENDAR && selectedDates.length === 0) {
            toast.error('At least one date must be selected');
            return; // Prevent form submission
        }
    
        setIsLoading(true);
        const datesStringArray = selectedDates.map(date => date.toISOString());
        data.dates = datesStringArray;
        data.selectedDates = selectedDates;
    
        data.payNow = parseInt(data.payNow, 10);
        data.payThere = parseInt(data.payThere, 10);
        (console.log(data))
        
        axios.post('/api/listings', data)
        .then(() => {
            toast.success("Anuncio Criado com Successo!")
            router.refresh();
            router.push('/')
            setStep(STEPS.CATEGORY);
            setSelectedDates([]);
            reset({
                byAppointmentOnly: false,
                firstComeFirstServe: false,
                location: location
            });
            rentModal.onClose();
        })
        .catch(() => {
            toast.error('Algo Deu Errado');
        }).finally(() => {
            setIsLoading(false);
        })
    }
    
    const actionLabel = useMemo(() => {
        if (step === STEPS.CALENDAR) {
            return 'Create';
        }

        return 'Next';
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back'
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
            title='Selecione o Tipo de Atendimento'
            subtitle='Escolha uma categoria'
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className='col-span-1'>
                            <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                            />
                        </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.COMPANY) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <div className='flex'>
                    <Heading 
                    title='Escolha o Parceiro Coorespondente'
                    subtitle='Escolha uma Empresa'
                    />
                    <div className='w-1/4 ml-auto'>
                    <Button
                    onClick={() => {}}
                    label='+ Novo Parceiro'
                    />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                    {companies.map((item) => (
                        <div key={item.label} className='col-span-1'>
                                <CompanyInput
                                onClick={(company) => setCustomValue('company', company)}
                                selected={company === item.label}
                                label={item.label}
                                imageSrc={item.imageSrc}
                                />
                            </div>
                    ))}
                </div>
            </div>
        )
    }

    const [isVirtual, setIsVirtual] = useState(true);

    useEffect(() => {
        if (isVirtual) {
            setValue('location', {
                value: "Online",
                label: "Online",
                latlng: [0, 0],
                region: "Default Region"
            });
        }
    }, [isVirtual, setValue]);

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
  <label>
 <input 
     className='h-6 w-6 border text-center font-medium border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none'

    type="checkbox"
    checked={isVirtual}
    onChange={(e) => {
      setIsVirtual(e.target.checked);
    }}
 />
 É uma consulta virtual?
</label>

    {!isVirtual && (
      <>
        <Heading
          title='Aonde fica o local da consulta?'
          subtitle='Selecione a cidade coorespondente'
        />
        <CitySelect 
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map
          center={location?.latlng}
        />
      </>
    )}
            </div>
        )
    }

    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        console.log(selectedOption, "TRUE");
    }, [selectedOption]);

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title='Detalhes do Atendimento'
                subtitle='Preencha os campos com atenção'
                />
                <Input 
                id="payNow"
                label="Valor a ser Pago No Pix"
                formatPrice
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                <Input 
                id="payThere"
                label="Valor a ser Pago No Local"
                formatPrice
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                <div className='flex flex-row gap-2 text-blue-500 justify-between'>
                <div className='text-center font-bold text-md'>
                    Selecione um tipo de atendimento:
                </div>
                <button onClick={() => {
                    setSelectedOption('byAppointmentOnly');
                    setValue('byAppointmentOnly', true);
                    setValue('firstComeFirstServe', false);
                    console.log('firstComeFirstServe:', 'FALSE');
                }}
                    className={`p-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-outhover:font-medium
                    ${selectedOption === 'byAppointmentOnly' ? 'bg-blue-600 text-white font-bold shadow-lg border-2 border-blue-600' : 'bg-blue-200 text-gray-400'}`}
                >
                    Horario Marcado
                </button>
                
                <button onClick={() => {
                    setSelectedOption('firstComeFirstServe');
                    setValue('byAppointmentOnly', false);
                    setValue('firstComeFirstServe', true);
                    console.log('byAppointmentOnly:', 'FALSE');
                }}
                    className={`p-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-outhover:font-medium
                    ${selectedOption === 'firstComeFirstServe' ? 'bg-blue-600 text-white font-bold shadow-lg border-2 border-blue-600' : 'bg-blue-200 text-gray-400'}`}
                >
                    Por Ordem de Chegada
                </button>
                </div>
                {selectedOption && (
                    <>
                        {selectedOption === 'byAppointmentOnly' && (
                            <>
                                <Input 
                                    id="byAppointmentOnly"
                                    label="Horarios Disponiveis para Marcaçao"
                                    type='checkbox'
                                    disabled={isLoading}
                                    byAppointmentOnly
                                    register={register}
                                    errors={errors}
                                    checked={selectedOption === 'byAppointmentOnly'}
                                />
                                <Input 
                                    id="startTime"
                                    label="Ex.: 8:00"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                <Input 
                                    id="endTime"
                                    label="Ex.: 12:00"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                            </>
                        )}
                        {selectedOption === 'firstComeFirstServe' && (
                            <>
                                <Input 
                                    id="firstComeFirstServe"
                                    label="Horario de para chegada de Pacientes"
                                    firstComeFirstServe
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    checked={selectedOption === 'firstComeFirstServe'}
                                />
                                <Input 
                                    id="startTime"
                                    label="Ex.: 8:00"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                <Input 
                                    id="endTime"
                                    label="Ex.: 12:00"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                            </>
                        )}
                    </>
                )}
            </div>
        )
    }
    
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title='Adcione uma Foto'
                subtitle='Uma foto Illustrando o Serviço'
                />
                <div className='max-h-64'>
                    <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    />
                </div>
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title='Qual o Nome do Atendimento?'
                subtitle='Nome do Exame ou Especialidade do Medico'
                />
                <Input 
                id="title"
                label="Nome do Exame/Consulta"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                <hr/>
                <Input 
                id="description"
                label="Que tipo de Medico ou Exame será?"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
            </div>
        )
    }
    
    const isSelected = (date: Date) => {
        return selectedDates.some(selectedDate => selectedDate.getTime() === date.getTime());
    };
    
    const handleDayClick = (date: Date) => {
        setSelectedDates(prevSelectedDates => {
            if (prevSelectedDates.some(selectedDate => selectedDate.getTime() === date.getTime())) {
                // If the date is already selected, remove it from the array
                return prevSelectedDates.filter(selectedDate => selectedDate.getTime() !== date.getTime());
            } else {
                // If the date is not selected, add it to the array
                return [...prevSelectedDates, date];
            }
        });
    };
    
    if (step === STEPS.CALENDAR) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title='Selecione os dias do Atendimento'
                    subtitle='Selecione todos os dias que tera atendimento disponivel'
                />
                <div className='max-h-64 flex flex-col-2 border-t-2'>
                    <div className='w-1/2 text-blue-800 border-l-2 p-2 border-b-2'>
                        <DayPicker
                            mode="multiple"
                            className='customDayPickerAdModel'
                            selected={selectedDates}
                            onSelect={(date) => setSelectedDates(date || [])}
                            onDayClick={handleDayClick}
                            modifiers={{
                            selected: isSelected,
                        }}
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
                    </div>
                    <div className="selected-dates-list w-1/2 p-2 max-h-auto rounded-lg overflow-y-auto cursor-pointer gap-1 border-2 border-blue-100 border-t-0">
                        {selectedDates.sort((a, b) => a.getTime() - b.getTime()).map((date, index) => (
                            <div key={index} className="border-2 border-blue-200 text-blue-600 p-2 rounded-lg hover:text-white hover:font-semibold hover:bg-blue-400" onClick={() => handleDayClick(date)}>
                                {date.toDateString()}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    
    const resetFormAndSteps = () => {
    reset();
    setStep(STEPS.CATEGORY);
    setSelectedDates([]);
    setValue('byAppointmentOnly', false);
    setValue('firstComeFirstServe', false);
    selectedOption && setSelectedOption('');
}
    const handleClose = () => {
        rentModal.onClose();
        resetFormAndSteps();
    };

  return (
    <Modal 
    isOpen={rentModal.isOpen}
    onClose={handleClose}
    onSubmit={handleSubmit(onSubmit)}
    disabled={isLoading}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    title='Crie um Exame ou Consulta'
    body={bodyContent}
    />
  )
}

export default RentModal
