"use client";

import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import usePartnerModal from '@/app/hooks/useCreatePartnerModal'
import Heading from '../Heading';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ImageUpload from '../Inputs/ImageUpload';
import Input from '../Inputs/Input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CitySelect from '../Inputs/CitySelect';

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
            telegram:  '',
            email:  '',
            cities:  [],
            branchAddress: []
        }
    });

    const imageSrc = watch('imageSrc');
    const phone = watch('phone');
    const branchAddress = watch('branchAddress');


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
            if (!branchAddress) {
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
        //(console.log(data))
        
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
        return 'Next';
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return undefined;
        }
        return 'Back'
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
        <Heading 
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
            <Heading 
            title='Informaçoes de Endereço'
            subtitle='Aonde o Parceiro é Localizado?'
            />
            <CitySelect
            value={branchAddress}
            onChange={(value) => setCustomValue('branchAddress', value)}
            />
            <Input 
            id="address"
            label="Endereço Completo"
            disabled={isLoading}
            register={register}
            errors={errors}
            />
        </div>
        )
    }

    if (step === STEPS.CONTACT) {
        bodyContent = (
            <div className="flex flex-col gap-8">
            <Heading 
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
            <Input 
            id="whatsApp"
            label="WhatsApp para Contato"
            disabled={isLoading}
            register={register}
            errors={errors}
            />
            <Input 
            id="telegram"
            label="Telefone 2"
            disabled={isLoading}
            register={register}
            errors={errors}
            />
            <Input 
            id="email"
            label="Telefone 3"
            disabled={isLoading}
            register={register}
            errors={errors}
            />
        </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title='Adicione uma Foto'
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
    
    const resetFormAndSteps = () => {
        reset({
            imageSrc: '',
            title: '',
            address: '',
            phone: '',
            whatsApp: '',
            telegram: '',
            email: '',
        });    setStep(STEPS.INFO);
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
