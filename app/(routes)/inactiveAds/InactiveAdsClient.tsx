import React from 'react'
import { SafeListing, SafeUser } from '../../types'
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import ListingCard from '../../components/listings/ListingCard';

interface User {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    hashedPassword: string | null;
    favoriteIds: string[];
  }

interface FavoritesClientProps{
    listings: SafeListing[];
    users: SafeUser[];
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    users
    
}) => {
  return (
    <Container>
        <Heading 
        title='Anuncios Inativos'
        subtitle='Lists de Anuncios Desativados'
        />
        <div className="mt-10 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {listings.map((listing) => (
                <ListingCard
                    locationValue="location"
                    key={listing.id}
                    data={listing}
                />
            ))}
        </div>
    </Container>
  )
}

export default FavoritesClient
