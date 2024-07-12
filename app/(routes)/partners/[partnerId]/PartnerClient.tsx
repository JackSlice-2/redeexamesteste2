"use client";

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ServiceHead';
import { SafePartner, SafeUser } from '@/app/types';
import React, { useCallback, useState } from 'react';
import PartnerInfo from '@/app/components/listings/PartnerInfo';
import Heading from '@/app/components/Heading';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '@/app/components/Button';
import { BiPencil } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

interface PartnerClientProps {
    partner: SafePartner & {
        user: SafeUser
    };
    currentUser?: SafeUser | null
}

const PartnerClient: React.FC<PartnerClientProps> = ({
    partner,
    currentUser,
}) => {

    // Extracting the ID from the URL
    const [id, setId] = useState('');
    const router = useRouter()
  const urlParts = window.location.pathname.split('/');
  const partnerId = urlParts[urlParts.length - 1];

    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
      setDeletingId(partnerId);
      console.log(`Deleting partner with ID: ${partnerId}`);
    
      // Adjusted to use query parameter
      axios.delete(`/api/partners/${partnerId}`)
        .then(() => {
          toast.success('Parceiro Apagado');
          // Refresh the page to reflect changes
          window.location.reload();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error)
        })
        .finally(() => {
          setDeletingId('');
        })
    }, []);
    

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto mt-20">
                <div className="flex flex-col gap-6">
                    <ListingHead
                    title={partner.title}
                    imageSrc={partner.imageSrc}
                    //@ts-ignore
                    locationValue={partner.locationValue}
                    id={partner.id}
                    currentUser={currentUser}
                    />
                    <div className="grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <PartnerInfo
                            title={partner.title}
                            imageSrc={partner.imageSrc}
                            cnpj={partner.cnpj || ''}
                            phone={partner.phone || ''}
                            email={partner.email || ''}
                            whatsApp={partner.whatsApp || ''}
                            telegram={partner.telegram || ''}
                            website={partner.website || ''}
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
