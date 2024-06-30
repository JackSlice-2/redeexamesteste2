"use client";

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import { SafePartner, SafeUser } from '@/app/types';
import React, { useCallback, useState } from 'react'
import PartnerInfo from '@/app/components/listings/PartnerInfo';
import ListingCard from '@/app/components/listings/ListingCard';
import { SafeListing } from '../../../types/index';
import Heading from '@/app/components/Heading';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface PartnerClientProps {
    partner: SafePartner & {
        user: SafeUser
    };
    currentUser?: SafeUser | null
    listing?: SafeListing[] | null;
}

const PartnerClient: React.FC<PartnerClientProps> = ({
    partner,
    currentUser,
    listing = []
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
  
    const onCancel = useCallback((id: string) => {
      setDeletingId(id);
  
      axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Anuncio Apagado');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setDeletingId('');
      })
    }, [router]);
    
  return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
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
                            city={partner.city || ''}
                        />
                    </div>
                        <Heading
                        title={`Lista de Anuncios da ${partner.title}`}
                        />
                </div>
            </div>
        </Container>
  )
}

export default PartnerClient;
