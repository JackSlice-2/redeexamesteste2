"use client";

import React, { useEffect, useMemo, useState } from 'react'
import Modal from './Modal'
import usePartnerModal from '@/app/hooks/usePartnerModal'
import Heading from '../Heading';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ImageUpload from '../Inputs/ImageUpload';
import Input from '../Inputs/Input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

enum STEPS {
    INFO = 0,
    IMAGES = 1,
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
        }
    });

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
        if (step != STEPS.IMAGES) {
            return onNext();
        }
        setIsLoading(true); 
        (console.log(data))
        
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
        title='Qual o Nome do Novo Parceiro?'
        subtitle='Nome ou Fantasia da Empresa'
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
    
    const resetFormAndSteps = () => {
    reset();
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
    title='Adcione um Parceiro'
    body={bodyContent}
    />
  )
}

export default PartnerModal
