import Company from "./MyPartners";
import getCurrentUser from "../../actions/getCurrentUser";
import getListings, { IListingsParams } from "../../actions/getListings";
import ClientOnly from "../../components/ClientOnly";
import Container from "../../components/Container";
import EmptyState from "../../components/EmptyState";
import ListingCard from "../../components/listings/ListingCard";

interface MyPartnersProps {
  searchParams: IListingsParams
}

export const dynamic = 'force-dynamic';

const MyPartners = async ({ 
  searchParams, 
}: MyPartnersProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <Company />
        <EmptyState showReset 
          title="Nenhum Anuncio Enocntrado"
          subtitle="Crie um anuncio para ser encontrado por outros usuários."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Company />
      <Container>
        <div className="grid pt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          return (
            <ListingCard
            locationValue="location"
            currentUser={currentUser}
            key={listing.id}
            data={listing}
            />
          )
        })}
        </div>
      </Container>
    </ClientOnly>
  );
}
export default MyPartners;