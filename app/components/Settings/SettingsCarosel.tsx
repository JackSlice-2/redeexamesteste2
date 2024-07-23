'use client'

import { useState } from 'react';
import { SafeUser } from '@/app/types';
import Image from 'next/image';
import React from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

interface SettingsCaroselProps {
    currentUser?: SafeUser | null;
    partners?: number;
    services?: number;
    users?: SafeUser[] | null;
}

const SettingsCarosel: React.FC<SettingsCaroselProps> = ({ 
    users, 
    currentUser,
    partners,
    services
}) => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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
        <div className="bg-white shadow-md rounded-lg py-6 mx-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Outros Usiarios Ativos
            </h1>
            <div className="carousel-container relative w-full h-[40vh] overflow-hidden py-10">
                {users.map((user, index) => (
                    <>
                    <div
                        key={index}
                        className={`mt-5 absolute w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out ${
                            index === activeSlideIndex ? 'transform translate-x-0' : 'transform translate-x-[50%]'
                        }`}
                    >
                        <div className="max-w-4xl mx-auto px-4 py-8 my-5">
            <div className="bg-white shadow-2xl shadow-black rounded-full p-6">
                <div className="flex flex-col items-center space-y-4">
                    <Image src="/images/userMale.png"
                        alt="User Profile"
                        className="rounded-full w-32 h-32 object-cover"
                        width={128} height={128} />
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <p className="text-gray-600">Email do Usuário: {user.email}</p>
                    <p className="text-gray-600">Criou a Conta: {new Date(user.createdAt).toLocaleDateString()}</p>
                    <p className="text-gray-600">Última Atualização: {new Date(user.updatedAt).toLocaleDateString()}</p>
                    <p className="text-gray-600">Email Verificado: {user.emailVerified ? 'Sim' : 'Não'}</p>
                </div>
                <div className="mt-6">
                    <p className="text-lg font-semibold">Total de Parceiros:</p>
                    <p className="text-lg">{partners}</p>
                    <p className="text-lg font-semibold mt-2">Total de Serviços:</p>
                    <p className="text-lg">{services}</p>
                </div>
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
    );
};

export default SettingsCarosel;