"use client";

import React, { useCallback, useState } from 'react'
import { SafeListing, SafeUser } from '../../types'
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../../components/listings/ListingCard';

interface PropertiesClientProps {
  listing: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listing,
  currentUser
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
        <Heading
        title='Meus Anuncios'
        subtitle='Lista de Anuncios'
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listing.map((listing: any) => (
          <ListingCard
            locationValue="location"
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Apagar Anuncio"
            currentUser={currentUser}
            secondaryActionLabel='Editar Anuncio'
          />
        ))}
        </div>
    </Container>
  )
}

export default PropertiesClient
