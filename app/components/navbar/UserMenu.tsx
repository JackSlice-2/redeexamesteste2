"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import usePartnerModal from '@/app/hooks/useCreatePartnerModal';
import useCreateServiceModal from '@/app/hooks/useCreateServiceModal';

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
    const rentModal = useCreateServiceModal();
    const partnerModal = usePartnerModal();
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

    const onPartner = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      partnerModal.onOpen();
    }, [currentUser, loginModal, partnerModal])

  return (
    <div className='relative' ref={menuRef}>
      <div className="flex flex-rox items-center gap-3">
        {currentUser ? (
          <>
          <div className='font-semibold cursor-default'>
          {currentUser?.name || ''}
          </div>

            <div className="p-4 hidden md:py-1 px-8 text-neutral-200 md:flex flex-row items-center gap-3 rounded-full cursor-pointer hovor:shadow-md transition"
        onClick={toggleOpen}
        >
            <AiOutlineMenu size={24}/>
        </div>
        </>
        ) : 
          <div onClick={loginModal.onOpen} className='text-neutral-500 font-thin cursor-pointer hover:text-neutral-800 hidden md:flex'>
            Admin
          </div>
        }
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[70vw] md:w-4/5 bg-white font-medium overflow-hidden right-0 top-12 text-md">
            <div className="flex flex-col">
                {currentUser ? (
                <>
                  <div className='capitalize bg-blue-300 text-center px-4 py-3 transition cursor-default'>
                    {currentUser?.name || ''}
                </div>
                  <MenuItem onClick={() => {router.push('/'); closeMenu();}}
                  label='Início'
                  />
                  <MenuItem onClick={() => {router.push('/inactiveAds'); closeMenu();}}
                  label='Serviços Inativos'
                  />
                  <MenuItem onClick={() => {router.push('/partners'); closeMenu();}}
                  label='Meus Parceiros'
                  />
                  <MenuItem onClick={onRent}
                  label='Criar Novo Serviço'
                  />
                  <MenuItem onClick={onPartner}
                  label='Criar Novo Parceiro'
                  />
                  <hr />
                  <MenuItem onClick={() => signOut()}
                  label='Fazer Logout'
                  small
                  />
                  <hr />
                  <MenuItem onClick={registerModal.onOpen}
                  label='Criar um Novo Usuário'
                  small
                  />
                </>
                  ) : (
                <div className=''>
                  <MenuItem onClick={loginModal.onOpen}
                  label='Login'
                  />
                  {/*<MenuItem onClick={registerModal.onOpen}
                  label='Criar um Novo Usuario'
                  />*/}
                </div>
                )}
            </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
