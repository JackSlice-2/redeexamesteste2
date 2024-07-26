"use client";
import useRegisterModal from '@/app/hooks/useRegisterModal';
import axios from 'axios';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import Input from '../Inputs/Input';
import toast from 'react-hot-toast';
import Header from '../Database/Header';
import Button from '../Button';
import { SafeUser } from '@/app/types';

interface RegisterModalProps {
    currentUser?: SafeUser | null
}

const RegisterModal: React.FC<RegisterModalProps> = ({
}) => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState('');

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        mode: "onChange",
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: role,
            isAdmin: false
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error("As senhas não coincidem");
            return
        }
        const dataToSend = {
            ...data,
            isAdmin: role === 'admin',
            role: role || 'client',
        };
        console.log("After Submit",role)
        console.log(dataToSend)
        setIsLoading(true);

        axios.post('/api/register', dataToSend)
        .then(() => {
            toast.success("Conta Criada com Sucesso")
            registerModal.onClose();
        })
        .catch((error) => {
            toast.error("Um Erro Occoreu. Se Persistir Entre em Contato com o Adminsitrador")
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

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
                <Input 
                id='confirmPassword'
                label='Confirmar Senha'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                isPassword
                />
            </div>
            <div className='p-1'>
                <div className='pb-2'>
                    Selecione o Cargo do Usuario:
                </div>
                <div className="role-selection gap-2 text-white flex">
                    <Button label='Gerente'
                    onClick={() => setRole('manager')}
                    className={`${role === "manager" ? 'bg-blue-500 text-white' : ''}`}
                    />
                    <Button label='Admin'
                    onClick={() => setRole('admin')}
                    className={`${role === "admin" ? 'bg-blue-500 text-white' : ''}`}
                    />
                    <Button label='Dev'
                    onClick={() => setRole('dev')}
                    className={`${role === "dev" ? 'bg-blue-500 text-white' : ''}`}
                    />
                </div>
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
