"use client";

import React, { useEffect, useMemo, useState } from 'react'
import Modal from './Modal'

import { categories } from '../navbar/Categories';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ImageUpload from '../Inputs/ImageUpload';
import Input from '../Inputs/Input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CitySelect from '../Inputs/CitySelect';
import { DayPicker } from 'react-day-picker';
import { SafePartner } from '@/app/types';
import useCreateServiceModal from '@/app/hooks/useCreateServiceModal';
import { ptBR } from 'date-fns/locale';
import ObjectInput from '../Inputs/ObjectInput';
import Header from '../Database/Header';

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
    const rentModal = useCreateServiceModal();
    const router = useRouter();
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

const [partners, setPartners] = useState<SafePartner[]>([]);

useEffect(() => {
    fetch('/api/fetchPartners')
     .then(response => response.json())
     .then(data => setPartners(data));
  }, []);
  
      
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
                "region": "Online"
            },
            latlng: [],
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
            isActive: true
        }
    });

    const category = watch('category');
    const company = watch('company');
    const location = watch('location')
    const latlng = watch('latlng')
    const imageSrc = watch('imageSrc');

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
    switch (step) {
        case STEPS.CATEGORY:
            if (!category) {
                toast.error('Category é required');
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
                    toast.error('Porfavor selecione o tipo de atendimento');
                    return;
                }
                break;
        case STEPS.IMAGES:
            if (!imageSrc) {
                toast.error('É preciso ter uma imagem ma Imagem');
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
            toast.error('É preciso preencher no minimo uma data');
            return;
        }
    
        setIsLoading(true);
        const datesStringArray = selectedDates.map(date => date.toISOString());
        data.dates = datesStringArray;
        data.selectedDates = selectedDates;

        const latlngStringArray = location.latlng.map((coord: number) => coord.toString());
        data.latlng = latlngStringArray;
    
        data.payNow = parseInt(data.payNow, 10);
        data.payThere = parseInt(data.payThere, 10);
        //(console.log("DATA before POST to API",data))
        
        axios.post('/api/listings', data)
        .then(() => {
            toast.success("Serviço Criado com Successo!")
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
            //console.log(errors)
            toast.error('Um Erro Occoreu. Se Persistir Entre em Contato com o Adminsitrador');
        }).finally(() => {
            setIsLoading(false);
        })
    }
    
    const actionLabel = useMemo(() => {
        if (step === STEPS.CALENDAR) {
            return 'Criar';
        }

        return 'Proximo';
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Voltar'
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Header
            title='Selecione o Tipo de Atendimento'
            subtitle='Escolha uma categoria'
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
                <div key={item.label} className='col-span-1'>
                    <ObjectInput
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
                <Header 
                title='Escolha o Parceiro Correspondente'
                subtitle='Se o Parceiro nao aparecer, reinicie a pagina e tente novamente.'
                />
                <div className="px-2 grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
                {partners.map((partner) => (
                    <ObjectInput
                        key={partner.id}
                        partner={partner}
                        selected={company === partner.title}
                        onClick={(value) => setCustomValue('company', value)}
                    />
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
                region: "Online"
            });
        }
    }, [isVirtual, setValue]);

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
            <label className={`flex flex-col mx-auto border-2 border-blue-400 rounded-xl p-2
            ${isVirtual ? 
            'hover:bg-blue-200/40 bg-blue-400' : 
            'hover:bg-blue-400 bg-blue-200/40'}
                `}>
                <input 
                className='h-6 w-6 border text-center font-medium border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none m-auto'
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
        <Header
          title='Aonde fica o local da consulta?'
          subtitle='Selecione a cidade coorespondente'
        />
        <CitySelect
          isClearable
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
      </>
    )}
            </div>
        )
    }

    const [selectedOption, setSelectedOption] = useState('');

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-6">
                <Header
                title='Detalhes do Atendimento'
                subtitle='Preencha os campos com atenção'
                />
                <div className='flex gap-2'>
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
                </div>
                <div className='flex flex-col gap-2 text-blue-500 justify-between'>
                    <div className='text-center font-bold text-md'>
                        Selecione um tipo de atendimento:
                    </div>
                    <button onClick={() => {
                        setSelectedOption('byAppointmentOnly');
                        setValue('byAppointmentOnly', true);
                        setValue('firstComeFirstServe', false);
                    }}
                        className={`p-2 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-outhover:font-medium
                        ${selectedOption === 'byAppointmentOnly' ? 'bg-blue-600 text-white font-bold shadow-lg border-2 border-blue-600' : 'bg-blue-200 text-gray-400'}`}
                    >
                        Horario Marcado
                    </button>
                    
                    <button onClick={() => {
                        setSelectedOption('firstComeFirstServe');
                        setValue('byAppointmentOnly', false);
                        setValue('firstComeFirstServe', true);
                    }}
                        className={`p-2 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-outhover:font-medium
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
                                <div className='flex gap-2 justify-center'>
                                    <div className='w-1/2'>
                                <div className='p-1'>
                                Das:
                                </div>
                                <Input 
                                    id="startTime"
                                    label="Ex.: 08:00"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                </div>
                                <div className='w-1/2'>
                                <div className='p-1'>
                                Até As:
                                </div>
                                <Input 
                                    id="endTime"
                                    label="Ex.: 12:00"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                </div>
                                </div>
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
                               <div className='flex gap-2 items-center'>
                                    <div>
                                <div className='p-1'>
                                Das:
                                </div>
                                <Input 
                                    id="startTime"
                                    label="Ex.: 08:00"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                </div>
                                <div>
                                <div className='p-1'>
                                Até As:
                                </div>
                                <Input 
                                    id="endTime"
                                    label="Ex.: 12:00"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                </div>
                                </div>
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
                <Header 
                title='Adicione uma Foto'
                subtitle='Uma foto Illustrando o Serviço'
                />
                <div className='max-h-64'>
                    <ImageUpload
                    value={imageSrc}
                    onChange={(value:any) => setCustomValue('imageSrc', value)}
                    />
                </div>
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Header 
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
                <div>
                <Input 
                id="description"
                label="Precisa de algum preparo?"
                disabled={isLoading}
                register={register}
                errors={errors}
                />
                    <div className='text-neutral-500 text-sm'>
                    (opcional)
                    </div>
                </div>
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
                <Header 
                    title='Selecione os dias do Atendimento'
                    subtitle='Selecione todos os dias que tera atendimento disponivel'
                />
                <div className='max-h-64 flex flex-col-2 border-t-2'>
                    <div className='w-1/2 text-blue-800 border-l-2 p-2 border-b-2'>
                        <DayPicker
                            locale={ptBR}
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
