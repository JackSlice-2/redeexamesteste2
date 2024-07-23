'use client'

import { SafeUser } from '@/app/types'
import Image from 'next/image';
import React from 'react'
import Button from '../Button';
import { BiPencil } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Container from '../Container';
import ImageUpload from '../Inputs/ImageUpload';

interface EditUserInfoProps {
    currentUser?: SafeUser | null;
    partners?: number;
    services?: number;
    id: string;
    name?: string;
    email?: string;
    image?: string;
    userId?: string;
}

const EditUserInfo: React.FC<EditUserInfoProps> = ({
    currentUser,
    partners,
    services,
    name,
    image,
    email,
    userId,
    id
}) => {

    const router = useRouter()

    if (!currentUser) {
        return null
    }
  return (
    <div className="px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 gap-2">
            <h1 className="text-3xl font-bold">
            <div className='text-neutral-400'>
                Editando Usuario:
            </div> 
                {name}
            </h1>
            <div className='text-neutral-400'>
                ({id})
            </div>
            <div className='lg:mx-40 pt-4'>
                <div className='rounded-xl border p-3 border-gray-200'>
                <ImageUpload
                onChange={() => {}}
                value={image || ''}
                />
                </div>
                <div className='flex'>
                <div className='gap-2 pt-5'>
                    <h2 className="text-xl font-semibold">
                    <input
                         type='text'
                         placeholder={name}
                         className='border border-gray-700 p-1 rounded-xl'
                        />
                    </h2>
                    <p className="text-gray-700 pt-1">
                        Email do Usuario: 
                        <input
                         type='text'
                         placeholder={email}
                         className='border border-gray-700 p-1 rounded-xl'
                        />
                    </p>
                    <p className="text-gray-700">
                        Criou a Conta: {new Date(currentUser.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                        Ultima Atualização: {new Date(currentUser.updatedAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                        Email Verificado: {currentUser.emailVerified ? 'Yes' : 'No'}
                    </p>
                    <p className="text-gray-700">
                        Admin: Yes
                    </p>
                    </div>
                    <div className='ml-auto w-1/2 mt-10'>
                        <div className="w-full">
                                {/*onClick={() => router.push(`/settings/editUser/${currentUser.id}`)}*/}
                            <Button
                                onClick={() => toast.error('Em Manutençao. Implementaremos essa Função em Breve...')}
                                label='Salvar Alteraçoes'
                                green
                                icon={BiPencil}
                            />
                        </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default EditUserInfo
