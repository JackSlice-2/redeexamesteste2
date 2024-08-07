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
import Avatar from './Avatar';

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
          <div className='text-sm'>
            Usuario atual:
          </div>
          <div className='font-semibold cursor-default border-3 shadow-lg bg-blue-500 border-blue-900 text-white rounded-2xl p-3'>
          {currentUser?.name || ''}
          </div>
          <div className='rounded-full border-neutral-100/50 p-1 flex flex-row border-2 justify-between cursor-pointer'
          onClick={toggleOpen}
          >
            <Avatar src={currentUser.image}/>
            <div className="p-3 hidden md:py-1 text-neutral-200 md:flex flex-row items-center gap-3 rounded-full hovor:shadow-md transition"
        >
            <AiOutlineMenu size={24}/>
        </div>
        </div>
        </>
        ) : 
          <div onClick={loginModal.onOpen} className='text-neutral-400 font-thin cursor-pointer hover:text-neutral-800 hidden md:flex'>
            Admin
          </div>
        }
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[70vw] md:w-11/12 bg-white font-medium overflow-hidden right-0 top-12 text-md">
            <div className="flex flex-col">
                {currentUser ? (
                <>
                  <div className='capitalize bg-blue-300 text-center px-4 py-3 transition cursor-default'>
                    {currentUser?.name || ''}
                </div>
                  <MenuItem onClick={() => {router.push('/'); closeMenu();}}
                  label='Início'
                  />
                  <MenuItem onClick={onRent}
                  label='Criar Novo Serviço'
                  />
                  <MenuItem onClick={onPartner}
                  label='Criar Novo Parceiro'
                  />
                  <MenuItem onClick={() => {router.push('/partners'); closeMenu();}}
                  label='Meus Parceiros'
                  />
                  <MenuItem onClick={() => {router.push('/inactive'); closeMenu();}}
                  label='Serviços Inativos'
                  />
                  <MenuItem onClick={() => {router.push('/settings'); closeMenu();}}
                  label='Configurações'
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
