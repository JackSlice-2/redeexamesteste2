"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);
    const rentModal = useRentModal();
    const menuRef = useRef<HTMLDivElement | null>(null);    const closeMenu = useCallback(() => {
      setIsOpen(false);
  }, []);

  const handleClickOutside = useCallback((event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  }, [closeMenu]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);


    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    const onRent = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      rentModal.onOpen();
    }, [currentUser, loginModal, rentModal])

  return (
    <div className='relative' ref={menuRef}>
      <div className="flex flex-rox items-center gap-3">
        {currentUser ? (
          <div className="hidden md:block text-sm font-semibold py-3 text-white px-4 rounded-full hover:bg-blue-300 transition cursor-pointer"
        onClick={onRent}
        >
            Crie um Exame/Consulta
        </div>
        ) : null}
        <div className="p-4 hidden md:py-1 px-8 text-neutral-200 md:flex flex-row items-center gap-3 rounded-full cursor-pointer hovor:shadow-md transition"
        onClick={toggleOpen}
        >
            <AiOutlineMenu size={20} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-4/5 bg-white font-medium overflow-hidden right-0 top-12 text-md">
            <div className="flex flex-col cursor-pointer">
                {currentUser ? (
                <>
                <div className='capitalize bg-blue-300 text-center'>
                <MenuItem onClick={() => {router.push('/'); closeMenu();}}
                  label={currentUser?.name || ''}
                  />
                </div>
                  <MenuItem onClick={() => {router.push('/'); closeMenu();}}
                  label='Inico'
                  />
                  <MenuItem onClick={() => {router.push('/inactiveAds'); closeMenu();}}
                  label='Anuncios Inativos'
                  />
                  <MenuItem onClick={() => {router.push('/myPartners'); closeMenu();}}
                  label='Meus Parceiros'
                  />
                  <MenuItem onClick={() => {router.push('/myAds'); closeMenu();}}
                  label='Meus Anuncios'
                  />
                  <MenuItem onClick={onRent}
                  label='Criar um Exame/Consulta'
                  />
                  <hr />
                  <MenuItem onClick={() => signOut()}
                  label='Fazer Logout'
                  />
                  <MenuItem onClick={registerModal.onOpen}
                  label='Criar um Novo Usuario'
                  />
                </>
                  ) : (
                <div className=''>
                  <MenuItem onClick={loginModal.onOpen}
                  label='Login'
                  />
                </div>
                )}
            </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
