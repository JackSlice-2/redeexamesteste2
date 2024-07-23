"use client";

import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import usePartnerModal from '@/app/hooks/useCreatePartnerModal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ImageUpload from '../Inputs/ImageUpload';
import Input from '../Inputs/Input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CitySelect from '../Inputs/CitySelect';
import Header from '../listings/Header';

enum STEPS {
    INFO = 0,
    ADDRESS= 1,
    CONTACT= 2,
    IMAGES = 3,
}

const PartnerModal = () => {
    const partnerModal = usePartnerModal();
    const router = useRouter();
    const [step, setStep] = useState(STEPS.INFO);
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
            imageSrc: '',
            title: '',
            branchPhone:  [],
            address: '',
            phone:  '',
            whatsApp:  '',
            phone2:  '',
            email:  '',
            cities:  [],
            mainCity: []
        }
    });

    const imageSrc = watch('imageSrc');
    const phone = watch('phone');
    const mainCity = watch('mainCity');


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
        case STEPS.ADDRESS:
            if (!mainCity) {
                toast.error('city is required');
                return;
            }
            break;
            case STEPS.CONTACT:
            if (!phone) {
                toast.error('Telefone de Contato is required');
                return;
            }
            break;
        default:
            break;
        }
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step != STEPS.IMAGES) {
            return onNext();
        }
            if (!imageSrc) {
                toast.error('Image is required');
                return;
            }
        setIsLoading(true); 
        
        axios.post('/api/partners', data)
        .then(() => {
            toast.success("Parceiro Criado com Successo!")
            router.refresh();
            router.push('/')
            setStep(STEPS.INFO);
            partnerModal.onClose();
        })
        .catch(() => {
            toast.error('Algo Deu Errado');
        }).finally(() => {
            setIsLoading(false);
        })
    }
    
    const actionLabel = useMemo(() => {
        if (step === STEPS.IMAGES) {
            return 'Criar';
        }
        return 'Próximo';
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return undefined;
        }
        return 'Voltar'
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
        <Header 
        title='Informaçoes Basicas do Parceiro'
        subtitle='Informaçoes de Identificaçao'
        />
        <Input 
        id="title"
        label="Nome do Parceiro"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        </div>
    )

    if (step === STEPS.ADDRESS) {
        bodyContent = (
            <div className="flex flex-col gap-8">
            <Header 
            title='Informaçoes de Endereço'
            subtitle='Aonde a Central do Parceiro é Localizado?'
            />
            <Input 
            id="address"
            label="Endereço Completo"
            disabled={isLoading}
            register={register}
            errors={errors}
            />
            <CitySelect
            value={mainCity}
            onChange={(value) => setCustomValue('mainCity', value)}
            />
        </div>
        )
    }

    if (step === STEPS.CONTACT) {
        bodyContent = (
            <div className="flex flex-col gap-8">
            <Header 
            title='Informaçoes de Contato'
            subtitle='Informaçoes para Entrar em Contato com o Parceiro'
            />
            <Input 
            id="phone"
            label="Telefone de Contato"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
            <div>
            <Input 
            id="whatsApp"
            label="WhatsApp para Contato"
            disabled={isLoading}
            register={register}
            errors={errors}
            />
             <div className='text-neutral-500 text-sm'>
            (opcional)
            </div>
            </div>
            <div>
            <Input 
            id="phone2"
            label="Telefone 2"
            disabled={isLoading}
            register={register}
            errors={errors}
            />
            <div className='text-neutral-500 text-sm'>
           (opcional)
           </div>
           </div>
            <div>
            <Input 
            id="email"
            label="Telefone 3"
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

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Header 
                title='Adicione uma Foto'
                subtitle='Uma Foto do Logo ou da Empresa do Parceiro'
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
    
    const resetFormAndSteps = () => {
        reset({
            imageSrc: '',
            title: '',
            address: '',
            phone: '',
            whatsApp: '',
            phone2: '',
            email: '',
        });    
        setStep(STEPS.INFO);
}
    const handleClose = () => {
        partnerModal.onClose();
        resetFormAndSteps();
    };

  return (
    <Modal 
    isOpen={partnerModal.isOpen}
    onClose={handleClose}
    onSubmit={handleSubmit(onSubmit)}
    disabled={isLoading}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.INFO ? undefined : onBack}
    title='Adicione um Parceiro'
    body={bodyContent}
    />
  )
}

export default PartnerModal
