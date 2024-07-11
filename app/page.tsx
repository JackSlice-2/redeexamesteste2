import React from 'react';
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getServices";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ServiceCard";

interface HomeProps {
  searchParams: IListingsParams;
}

export const dynamic = "force-dynamic";

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // Sort listings randomly
  listings.sort(() => Math.random() - 0.5);

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <>
      <ClientOnly>
        <Container>
          <div className="grid pt-60 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {listings.map((listing, index) => (
              <div key={listing.id} 
              className={`rounded-xl p-1 
              ${index % 2 === 0 ? 'hover:text-blue-700' : 'hover:text-blue-700'}
              ${index % 2 === 0 ? 'hover:bg-blue-400' : 'hover:bg-blue-400'}
              ${index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-300'}
              `}>
              <ListingCard
                locationValue="location"
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
              </div>
            ))}
          </div>
        </Container>
      </ClientOnly>
    </>
  );
};

export default Home;
