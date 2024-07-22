"use client";
import useRegisterModal from '@/app/hooks/useRegisterModal';
import axios from 'axios';
import React, { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';

import Input from '../Inputs/Input';
import toast from 'react-hot-toast';
import useLoginModal from '@/app/hooks/useLoginModal';
import Header from '../listings/Header';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
        .then(() => {
            toast.success("Conta Criada com Sucesso")
            registerModal.onClose();
            loginModal.onOpen();
        })
        .catch((error) => {
            toast.error("Um Erro Occoreu. Se Persistir Entre em Contato com o Adminsitrador")
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Header title='Seja bem-Vindo a RedeExames!' subtitle='Crie sua Conta!' 
            />
            <Input 
            id='email'
            label='E-Mail'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
            <Input 
            id='name'
            label='Name'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
            <div className='relative'>
                <Input 
                id='password'
                label='Senha'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                isPassword
                />
            </div>
        </div>
    );

  return (
    <Modal 
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title='Register'
    actionLabel='Continue'
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    />
  )
}

export default RegisterModal
