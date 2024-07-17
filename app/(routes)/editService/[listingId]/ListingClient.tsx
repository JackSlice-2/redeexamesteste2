"use client";

import Container from '@/app/components/Container';
import ServiceHead from '@/app/components/listings/ServiceHead';
import ServiceInfo from './editServiceInfo';
import ListingReservation from '@/app/components/listings/Calendar';
import { categories } from '@/app/components/navbar/Categories';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeListing, SafeUser } from '@/app/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range';
import toast from 'react-hot-toast';

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
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser,
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

  return (
        <Container>
            <div className="max-w-screen-lg mx-auto mt-20">
                <div className="flex flex-col gap-6">
                    <ServiceHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    //@ts-ignore
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                    floppyDiskButton
                    />
                    <div className="mt-6">
                        <ServiceInfo
                        startTime={listing.startTime || 'No Start Time'}
                        endTime={listing.endTime || 'No End Time'}
                        dates={listing.dates}
                        byAppointmentOnly={listing.byAppointmentOnly ?? false}
                        payNow={listing.payNow || 0}
                        payThere={listing.payThere || 0}
                        firstComeFirstServe={listing.firstComeFirstServe ?? false}
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        //@ts-ignore
                        locationValue={listing.locationValue}
                        latlng={listing.latlng}
                        title={listing.title}
                        company={listing.company || ''}
                        imageSrc={listing.imageSrc}
                        />
                    </div>
                </div>
            </div>
        </Container>
  )
}

export default ListingClient
