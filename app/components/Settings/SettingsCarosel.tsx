'use client'

import { useState } from 'react';
import { SafeUser } from '@/app/types';
import Image from 'next/image';
import React from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import Container from '../Container';
import Button from '../Button';
import useRegisterModal from '@/app/hooks/useRegisterModal';

interface SettingsCaroselProps {
    partners?: number;
    services?: number;
    users?: SafeUser[] | null;
    isAdmin?: boolean;
}

const SettingsCarosel: React.FC<SettingsCaroselProps> = ({ 
    users, 
    partners,
    services,
    isAdmin
}) => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const registerModal = useRegisterModal();

    if (!users || users.length === 0) {
        return <p>No users found.</p>;
    }

    const totalSlides = users.length;

    const nextSlide = () => {
        setActiveSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    const prevSlide = () => {
        setActiveSlideIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    };

    return (
        <Container>
            <div className="bg-white rounded-lg mx-4">
                <h1 className="text-3xl font-bold text-center">
                    Usuarios Ativos
                </h1>
            <div className="carousel-container relative w-full h-[55vh] overflow-hidden">
            {users.map((user, index) => (
                <>
                    <div key={index}
                    className={`absolute w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out 
                        ${index === activeSlideIndex ? 
                        'transform -translate-x-[15%]' : 
                        'transform translate-x-[45%] lg:translate-x-[30%]'
                    }`}>
                        <div>
                            <div className="bg-white shadow-lg shadow-neutral-500 rounded-full p-6">
                                <div className="flex flex-col items-center space-y-4">
                                    <Image src="/images/userMale.png" alt="User Profile"
                                    className="rounded-full w-32 h-32 object-cover" width={128} height={128} 
                                    />
                                    <h2 className="text-2xl font-semibold">     
                                        {user.name}
                                    </h2>
                            <p className="text-gray-600">
                                Email do Usuário: {user.email}
                            </p>
                            <p className="text-gray-600">
                                Criou a Conta: {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">
                                Última Atualização: {new Date(user.updatedAt).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">
                                Email Verificado: {user.emailVerified ? 'Sim' : 'Não'}
                            </p>
                        </div>
                    <p className="text-gray-700 text-center">
                            isAdmin: {user.isAdmin ? 'Yes' : "No"}
                        </p>
                        <p className="text-gray-700 text-center">
                            Role: {user.role}
                        </p>
                    </div>
                </div>
                    </div>
                    </>
                ))}
            </div>
            <hr/>
            <div className='flex flex-row justify-between mx-4 mt-2'>
                <button onClick={prevSlide} 
            className="btn-prev bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer flex items-center m-1 gap-1">
                <BiLeftArrow />Anterior
            </button>
            <button onClick={nextSlide} 
            className="btn-next bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer flex items-center m-1 gap-1">
                Proximo<BiRightArrow />
            </button>
            </div>
        </div>
        <Button 
            onClick={registerModal.onOpen}
            className='w-80 mt-4'
            label='Criar um Novo Usuário'
            blue
            />
        </Container>
    );
};

export default SettingsCarosel;