import React from 'react';
import { SafeListing, SafeUser } from '../../types';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import ListingCard from '../../components/listings/ListingCard';

interface FavoritesClientProps {
    listings: SafeListing[];
    users: SafeUser[];
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({ listings, users }) => {
    const uniqueListings = Array.from(new Set(listings.map(listing => listing.id)))
        .map(id => listings.find(listing => listing.id === id))
        .filter(listing => listing !== undefined) as SafeListing[];

    return (
        <Container>
            <Heading title='Anuncios Inativos' subtitle='Lists de Anuncios Desativados' />
            <div className="mt-10 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {uniqueListings.map((listing) => (
                    <ListingCard
                        locationValue="location"
                        key={listing.id}
                        data={listing}
                        currentUser={users.find((user) => user.id === listing.userId) as SafeUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default FavoritesClient;
