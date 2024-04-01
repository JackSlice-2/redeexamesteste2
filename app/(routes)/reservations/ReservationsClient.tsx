'use client';

import React, { useCallback, useState } from 'react'
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import { SafeReservation, SafeUser } from '../../types';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import ListingCard from '../../components/listings/ListingCard';

interface ReservationsClientProps {
    reservations: SafeReservation[];
    currentUser: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deleteingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("reservation Cancelled");
            router.refresh();
        })
        .catch(() => {
            toast.error('something went wrong');
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [router])

  return (
    <Container>
        <Heading 
        title='Reservations'
        subtitle='Bookings on your Properties'
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
            <ListingCard
            locationValue="location"
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deleteingId === reservation.id}
            actionLabel='Cancel guest reservation'
            currentUser={currentUser}
            />
        ))}
        </div>
    </Container>
  )
}

export default ReservationsClient
