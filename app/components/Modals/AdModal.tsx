"use client";

import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../Inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '../Inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../Inputs/Counter';
import ImageUpload from '../Inputs/ImageUpload';
import Input from '../Inputs/Input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { companies } from '../../(routes)/myPartners/MyPartners';
import CompanyInput from '../Inputs/CompanyInput';
import CitySelect from '../Inputs/CitySelect';

enum STEPS {
    CATEGORY = 0,
    COMPANY = 1,
    LOCATION = 2,
    INFO = 3,
    IMAGES = 4,
    DESCRIPTION = 5,
    CALENDAR = 6,
    PRICE = 7
}

const RentModal = () => {
    const rentModal = useRentModal();
    const router = useRouter();

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
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: '',
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const company = watch('company');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
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
        setStep((value) => value +1)
    }
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step != STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success("Anuncio Criado com Successo!")
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(() => {
            toast.error('Algo Deu Errado');
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
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
                <Heading 
                title='Escolha o Parceiro Coorespondente'
                subtitle='Escolha uma Empresa'
                />
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

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
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
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title='Share some Basics About your Place'
                subtitle='What Amenities do you have?'
                />
                <Counter
                title='Number of Guests'
                subtitle='How Manu guests?'
                value={guestCount}
                onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                title='Number of Guests'
                subtitle='How Manu rooms?'
                value={roomCount}
                onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                title='Number of Guests'
                subtitle='How Manu baths?'
                value={bathroomCount}
                onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title='Add a Photo'
                subtitle='Show Guests'
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
                title='How would you describe?'
                subtitle='Short and sweet'
                />
                <Input 
                id="title"
                label="Title"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                <hr/>
                <Input 
                id="description"
                label="Description"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
            </div>
        )
    }

    if (step === STEPS.CALENDAR) {

        bodyContent = (
            <div className="flex flex-col gap-8">
            <Heading 
            title='Selecione os Dias disponiveis'
            subtitle='Selecione os dias que terao atgendimento'
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
               {/*Calendar*/}
            </div>
        </div>
    )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title='Now set your Price'
                subtitle='How much per night?'
                />
                <Input 
                id="price"
                label="Price"
                formatPrice
                type='number'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
            </div>
        )
    }



  return (
    <Modal 
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    title='Crie um Exame ou Consulta'
    body={bodyContent}
    />
  )
}

export default RentModal
