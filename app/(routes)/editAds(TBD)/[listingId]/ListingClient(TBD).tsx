"use client";
/*
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/AdInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { categories } from '@/app/components/navbar/Categories';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import axios from 'axios';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range';
import toast from 'react-hot-toast';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    reservations = []
}) => {

    const loginModel = useLoginModal();
    const router = useRouter();
    const disableDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [ ...dates, ...range]
        });
        return dates;
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalprice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModel.onOpen();
        }

        setIsLoading(true)
        
        axios.post('/api/reservations', {
            totalPrice,
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
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModel])

    //TODO:REMOVE THIS IN THE FUTURE, THIS MULTIPLIES TOTALPRICE x NUMBEROFDAYS
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalprice(dayCount * listing.price);
            }else {
                setTotalprice(listing.price)
            }
        }
    }, [dateRange, listing.price])

    const category = useMemo(() => {
        return categories.find((item) =>
        item.label === listing.category);
    }, [listing.category]);

  return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                       title={`Voce esta Editando: ${listing.title}
                       é um(a) ${category?.label} da empresa ${listing.company} de ${listing.locationValue}`}
                    imageSrc={listing.imageSrc}
                    //@ts-ignore
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                        startTime={listing.startTime || 'No Start Time'}
                        endTime={listing.endTime || 'No End Time'}
                        byAppointmentOnly={listing.byAppointmentOnly ?? false}
                        firstComeFirstServe={listing.firstComeFirstServe ?? false}
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        //@ts-ignore
                        locationValue={listing.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                            endTime={listing.endTime || 'No End Time'}
                            data={listing}
                            dates={listing.dates}
                            onChangeDate={(value) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
  )
}

export default ListingClient
*/