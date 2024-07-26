import React from 'react';
import { SafeListing, SafeUser } from '../../types';
import Container from '../../components/Container';
import ServiceCard from '../../components/listings/ServiceCard';
import Header from '@/app/components/listings/Header';

interface InactiveServiceClientProps {
    listings: SafeListing[];
    users: SafeUser[];
}

const InactiveServiceClient: React.FC<InactiveServiceClientProps> = ({ 
    listings, 
    users 
}) => {

    return (
        <Container>
            <Header 
                title='Serviços Inativos' 
                subtitle='Lists de Serviços Desativados' 
            />
            <div className="mt-10 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {listings.filter(listing => !listing.isActive).map((inactiveListing) => (
                    <ServiceCard
                        locationValue="location"
                        key={inactiveListing.id}
                        data={inactiveListing}
                        currentUser={users.find((user) => user.id === inactiveListing.userId) as SafeUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default InactiveServiceClient;
