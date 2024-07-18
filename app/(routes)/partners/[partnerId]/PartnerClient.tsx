"use client";

import Container from '@/app/components/Container';
import { SafePartner, SafeUser } from '@/app/types';
import React, { useCallback, useState } from 'react';
import PartnerInfo from '@/app/components/listings/PartnerInfo';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '@/app/components/Button';
import { BiPencil } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

interface PartnerClientProps {
    partner: SafePartner & {
        user: SafeUser
    };
}

const PartnerClient: React.FC<PartnerClientProps> = ({
    partner,
}) => {

    const [id, setId] = useState('');
    const router = useRouter()
    const urlParts = window.location.pathname.split('/');
    const partnerId = urlParts[urlParts.length - 1];
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(partnerId);
        axios.delete(`/api/partners/${partnerId}`)
            .then(() => {
                toast.success('Parceiro Apagado');
                router.push('/partners')
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [partnerId, router]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto mt-20">
                <div className="flex flex-col gap-6">
                    <div className="grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <PartnerInfo
                            title={partner.title}
                            imageSrc={partner.imageSrc}
                            branchPhone={partner.branchPhone || ''}
                            phone={partner.phone || ''}
                            email={partner.email || ''}
                            whatsApp={partner.whatsApp || ''}
                            telegram={partner.telegram || ''}
                            branchAddress={partner.branchAddress || ''}
                            address={partner.address || ''}
                            cities={partner.cities || ''}
                            actionLabel="Apagar Parceiro"
                            onAction={() => onCancel(id)}
                        />
                    </div>
                    <Button
                        label="Editar Parceiro"
                        icon={BiPencil}
                        green
                        onClick={() => router.push(`/editPartner/${partnerId}`)}
                    />
                </div>
            </div>
        </Container>
    )
}

export default PartnerClient;
