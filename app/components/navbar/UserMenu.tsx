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
import usePartnerModal from '@/app/hooks/usePartnerModal';

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
            <div className="hidden md:block text-sm font-semibold py-3 text-white px-4 rounded-full hover:bg-blue-300 transition cursor-pointer"
          onClick={onRent}
          >
              Crie um Exame/Consulta
          </div>
          <div className="hidden md:block text-sm font-semibold py-3 text-white px-4 rounded-full hover:bg-blue-300 transition cursor-pointer"
          onClick={onPartner}
          >
              Adicione um Parceiro
          </div>
        </>
        ) : null}
        <div className="p-4 hidden md:py-1 px-8 text-neutral-200 md:flex flex-row items-center gap-3 rounded-full cursor-pointer hovor:shadow-md transition"
        onClick={toggleOpen}
        >
            <AiOutlineMenu size={20} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-4/5 bg-white font-medium overflow-hidden right-0 top-12 text-md">
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
                  label='Anúncios Inativos'
                  />
                  <MenuItem onClick={() => {router.push('/partners'); closeMenu();}}
                  label='Meus Parceiros'
                  />
                  <MenuItem onClick={() => {router.push('/myAds'); closeMenu();}}
                  label='Gerenciar Anúncios'
                  />
                  <hr />
                  <MenuItem onClick={() => signOut()}
                  label='Fazer Logout'
                  />
                  <MenuItem onClick={registerModal.onOpen}
                  label='Criar um Novo Usuário'
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
