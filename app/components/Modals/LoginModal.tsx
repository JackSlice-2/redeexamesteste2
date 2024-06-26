"use client";

import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import toast from 'react-hot-toast';;
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const router = useRouter();
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
                toast.success('Logged In');
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    }
    
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='Bem-vindo de volta' subtitle='Faça login na sua conta!' 
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
            id='password'
            label='Senha'
            type='password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <div className="text-neutral-500 text-center mt-4 font-light">
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
    title='Login'
    actionLabel='Continue'
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default LoginModal;
