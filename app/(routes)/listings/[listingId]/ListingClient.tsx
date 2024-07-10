"use client";

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ServiceHead';
import ListingInfo from '@/app/components/listings/ServiceInfoCard';
import ListingReservation from '@/app/components/listings/Calendar';
import { categories } from '@/app/components/navbar/Categories';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeListing, SafeUser } from '@/app/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range';
import toast from 'react-hot-toast';
import { BiPencil, BiTrash } from 'react-icons/bi';
import Button from '@/app/components/Button';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingClientProps {
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionId?: string;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    onAction,
    disabled,
    actionId = '',
}) => {

    const loginModel = useLoginModal();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModel.onOpen();
        }

        setIsLoading(true)
        
        axios.post('/api/reservations', {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(() => {
            toast.success('Listing Reserved');
            setDateRange(initialDateRange);

            router.push('/trips')
        })
        .catch(() => {
            toast.error('something went wrong');
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [dateRange, listing?.id, router, currentUser, loginModel])

    const category = useMemo(() => {
        return categories.find((item) =>
        item.label === listing.category);
    }, [listing.category]);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled) {
            return;
        }
      
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            onCancel(listing.id); 
        }
      }, [onAction, actionId, disabled]);


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
            <div className="max-w-screen-lg mx-auto mt-20">
                <div className="flex flex-col gap-6">
                    <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    //@ts-ignore
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                    heartButton
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                        startTime={listing.startTime || 'No Start Time'}
                        endTime={listing.endTime || 'No End Time'}
                        dates={listing.dates}
                        byAppointmentOnly={listing.byAppointmentOnly ?? false}
                        firstComeFirstServe={listing.firstComeFirstServe ?? false}
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        //@ts-ignore
                        locationValue={listing.locationValue}
                        latlng={listing.latlng}
                        title={listing.title}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                            endTime={listing.endTime || 'No End Time'}
                            dates={listing.dates}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {currentUser &&
            <>
            <Button
                    label="Editar Serviço"
                    icon={BiPencil}
                    onClick={() => router.push(`/editService/${listing.id}`)}
                    />
            <Button
            disabled={disabled}
            label="Apagar Serviço"
            onClick={handleCancel}
            red
            icon={BiTrash}
            />
            </>
        }
        </Container>
  )
}

export default ListingClient
