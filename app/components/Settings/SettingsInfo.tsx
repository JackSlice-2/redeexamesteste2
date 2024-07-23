'use client'

import { SafeUser } from '@/app/types'
import Image from 'next/image';
import React from 'react'
import Button from '../Button';
import { BiPencil } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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
    <div>

    <div className="w-full px-4 py-8">
    <h1 className="text-2xl font-bold mb-3">Perfil de Usuario</h1>
        <p className="text-lg font-bold text-black py-1">
          Total de Parceiros: {partners} <br/>
          Total de Servicos: {services}
        </p>
    <div className="bg-white shadow-md rounded-lg p-6">
        <Image src='/images/userMale.png'
        alt="User" className="w-1/2 h-48 object-cover mb-4 rounded-lg" 
        width={200} height={200}/>
        <h2 className="text-xl font-semibold">
            {currentUser.name}
        </h2>
        <p className="text-gray-700">
            Email do Usuario: {currentUser.email}
        </p>
        <p className="text-gray-700">Criou a Conta: {new Date(currentUser.createdAt).toLocaleDateString()}</p>
        <p className="text-gray-700">Ultima Atualização: {new Date(currentUser.updatedAt).toLocaleDateString()}</p>
        <p className="text-gray-700">Email Verificado: {currentUser.emailVerified ? 'Yes' : 'No'}</p>
        <div className='w-1/3 ml-auto'>
        {/*onClick={() => router.push(`/settings/editSettings/${currentUser.id}`)}*/}
        <Button
        onClick={() => toast.error('Em Manutençao. Implementaremos essa Função em Breve...')}
        label='Editar Usuario'
        green
        icon={BiPencil}
     />
    </div>
        </div>
    </div>
    </div>
  )
}

export default SettingsInfo
