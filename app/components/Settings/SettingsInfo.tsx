'use client'

import { SafeUser } from '@/app/types'
import Image from 'next/image';
import React from 'react'
import Button from '../Button';
import { BiPencil } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import Container from '../Container';

interface SettingsInfoProps {
    currentUser?: SafeUser | null;
    partners?: number;
    services?: number;
}

const SettingsInfo: React.FC<SettingsInfoProps> = ({
    currentUser,
    partners,
    services
}) => {

    const router = useRouter()

    if (!currentUser) {
        return null
    }
  return (
    <Container>
    <div className="px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 gap-2">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Detalhes do Usuario
            </h1>
            <div className='lg:mx-40'>
                <Image src='/images/userMale.png'
                alt="User" className="w-1/3 h-1/4 lg:h-80 object-cover mb-4 rounded-lg" 
                width={300} height={300}
                />
                <div className='flex'>
                <div className='pt-2 gap-2'>
                    <h2 className="text-xl font-semibold">
                        {currentUser.name}
                    </h2>
                    <p className="text-gray-700">
                        Email do Usuario: {currentUser.email}
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
                        isAdmin: {currentUser.isAdmin ? 'Yes' : "No"}
                    </p>
                    <p className="text-gray-700">
                        Role: {currentUser.role}
                    </p>
                    </div>

                    <div className='ml-auto w-1/2'>
                            <p className="text-lg font-bold text-black py-1 text-center mb-5">
                                Total de Parceiros: {partners} <br/>
                                Total de Servicos: {services}
                            </p>
                        <div className="w-full">
                            <Button
                                onClick={() => router.push(`/settings/editUser/${currentUser.id}`)}
                                label='Editar Usuario'
                                green
                                icon={BiPencil}
                            />
                        </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    </Container>
  )
}

export default SettingsInfo
