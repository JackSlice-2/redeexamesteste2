"use client";

import Container from '@/app/components/Container';
import { SafePartner, SafeUser } from '@/app/types';
import React, { useCallback, useState } from 'react';
import PartnerInfo from '../../../../components/Database/EditPartnerInfo';
import axios from 'axios';
import toast from 'react-hot-toast';
import EditUserInfo from '@/app/components/Settings/EditUserInfo';

interface UserClientProps {
    partners?: SafePartner & {
        user: SafeUser
    };
    currentUser?: SafeUser | null
}

const UserClient: React.FC<UserClientProps> = ({
    partners,
    currentUser,
}) => {

    const [id, setId] = useState('');
    const urlParts = window.location.pathname.split('/');
    const userId = urlParts[urlParts.length - 1];

    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
      setDeletingId(userId);
    
      axios.delete(`/api/partners/${userId}`)
        .then(() => {
          toast.success('Parceiro Apagado com Sucesso!');
          window.location.reload();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error)
        })
        .finally(() => {
          setDeletingId('');
        })
    }, [userId]);
    
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto mt-20">
                <div className="flex flex-col gap-6">
                    <div className="grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <EditUserInfo
                    currentUser={currentUser}
                    id={currentUser?.id || ''}
                    email={currentUser?.email || ''}
                    image={currentUser?.image || ''}
                    name={currentUser?.name || ''}
                    userId={userId}
                     />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default UserClient;
