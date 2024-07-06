"use client";

import React from 'react';
import Container from './Container';
import Logo from './navbar/Logo';
import { SafeUser } from '@/app/types';
import { FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='absolute w-full z-10 bg-blue-50'>
      <div className="py-4 bg-blue-400 rounded-t-3xl">
        <Container>
          <div className="flex flex-row items-center text-center justify-center md:justify-between gap-3 md:gap-0 pt-3">
            <Logo
            height={100}
            width={130}
            />
            <div>
            <h1 className='font-semibold'>
                    Fale Conosco
                </h1>
                <ul className='gap-2 flex'>
                    3434-1422 <br/>
                    98570-1422
                </ul>
            </div>
            <div className='gap-3'>
                <div>
                    Redeexames.online@gmail. 
                </div>
                <div>
                    Av. Bento Gonçalves, 81 Viamão RS
                </div>
            </div>
            <div>
            <h1 className='font-semibold'>
                Nos Siga Nas Redes Socias
                </h1>
                <ul className="gap-4 flex justify-center align-center p-1">
                    <FaWhatsapp />
                    <FaTelegram />
                    <FaInstagram />
                </ul>
            </div>
          </div>
        </Container>
        <div className="text-center text-xs">
        © 2024 Rede Exames Online. All rights reserved. | Privacy Policy
      </div>
      </div>
    </div>
  );
};

export default Navbar;
