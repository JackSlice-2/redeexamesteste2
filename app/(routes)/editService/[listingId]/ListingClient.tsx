"use client";

import Container from '@/app/components/Container';
import ServiceInfo from './editServiceInfo';
import { categories } from '@/app/components/navbar/Categories';
import { SafeListing, SafeUser } from '@/app/types';
import React, { useMemo } from 'react'

interface ListingClientProps {
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
}) => {

    const category = useMemo(() => {
        return categories.find((item) =>
        item.label === listing.category);
    }, [listing.category]);

  return (
        <Container>
            <div className="max-w-screen-lg mx-auto mt-20">
                <div className="flex flex-col gap-6">
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
