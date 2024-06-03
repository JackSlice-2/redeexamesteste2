import getCurrentUser from "../../actions/getCurrentUser";
import getPartners, { IPartnersParams } from "../../actions/getPartners";
import ClientOnly from "../../components/ClientOnly";
import Container from "../../components/Container";
import EmptyState from "../../components/EmptyState";
import ListingCard from "../../components/listings/PartnerCard";

interface PartnerPageProps {
  searchParams: IPartnersParams
}

export const dynamic = 'force-dynamic';

const PartnerPage = async ({ searchParams }: PartnerPageProps) => {
  const partners = await getPartners(searchParams);
  const currentUser = await getCurrentUser();

  if (partners.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="grid pt-40 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {partners.map((partner) => {
          return (
            <ListingCard
            data={partner}
            currentUser={currentUser}
            key={partner.id}
            />
          )
        })}
        </div>
      </Container>
    </ClientOnly>
  );
}
export default PartnerPage;