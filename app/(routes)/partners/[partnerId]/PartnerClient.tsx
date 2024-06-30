"use client";

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import { SafePartner, SafeUser } from '@/app/types';
import React from 'react'
import PartnerInfo from '@/app/components/listings/PartnerInfo';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

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
                            description={partner.title}
                        />
                    </div>
                </div>
            </div>
        </Container>
  )
}

export default PartnerClient;
