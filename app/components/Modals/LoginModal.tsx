"use client";

import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';

import Input from '../Inputs/Input';
import toast from 'react-hot-toast';;
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '../listings/Header';
import { PiEye, PiEyeClosed } from 'react-icons/pi';

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Login Realizado com Sucesso!');
                router.refresh();
                loginModal.onClose();
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    }

    const togglePasswordVisibility =() => {
        setShowPassword(!showPassword);
    };
    
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Header 
                title='Login de Administrador' 
                subtitle='Acesso proibido a pessoas nao autorizadas' 
            />
            <Input 
            id='email'
            label='E-Mail'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
            <div className='relative'>
                <Input 
                id='password'
                label='Senha'
                type={showPassword ? 'text' : 'password'}
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                <button onClick={togglePasswordVisibility} className='absolute right-0 top-0 mt-3 mr-2'>
                    {showPassword ? <PiEye size={40} /> : <PiEyeClosed size={40} />}
                </button>
            </div>
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4">
            <hr />
            <div className="text-neutral-500 text-center font-light">
                <div className='flex flex-row items-center gap-2 justify-center'>
                    <div>
                Login Somente Para Pessoas Authorizadas
                    </div>
                    <div 
                    className='text-neutral-800'>
                Duvidas? Ligue: <br />  3434-1422
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal 
    disabled={isLoading}
    isOpen={loginModal.isOpen}
    title='Login Admin'
    actionLabel='Entrar'
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default LoginModal;
