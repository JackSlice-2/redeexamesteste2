"use client";

import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types';
import Categories from './Categories';

interface Navbarprops {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<Navbarprops> = ({
  currentUser
}) => {
  console.log({ currentUser })
  
  return (
    <div className='absolute w-full z-10 bg-blue-50'>
      <div className="py-4 bg-blue-400 rounded-b-3xl">
        <Container>
        <div className="flex flex-row items-center text-center justify-center md:justify-between gap-3 md:gap-0">
        <Logo />
        <UserMenu currentUser={currentUser}/>
        </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar
