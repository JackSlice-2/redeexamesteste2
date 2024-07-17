import getCurrentUser from "../../actions/getCurrentUser";
import getPartners, { IPartnersParams } from "../../actions/getPartners";
import ClientOnly from "../../components/ClientOnly";
import Container from "../../components/Container";
import EmptyState from "../../components/EmptyState";
import ServiceCard from "../../components/listings/PartnerCard";

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
      {currentUser ? (
        <p className="text-lg font-bold translate-y-28 text-black">
          Parceiros Totais: {partners.length}
        </p>
          ): null}
        <div className="grid pt-36 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 ">
        {partners.map((partner, index) => {
          return (
            <div key={partner.id} 
            className={`rounded-xl p-1 
            ${index % 2 === 0 ? 'hover:text-blue-700' : 'hover:text-blue-700'}
            ${index % 2 === 0 ? 'hover:bg-blue-400' : 'hover:bg-blue-400'}
            ${index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-300'}
            `}>
            <ServiceCard
            data={partner}
            currentUser={currentUser}
            key={partner.id}
            />
          </div>
          )
        })}
        </div>
      </Container>
    </ClientOnly>
  );
}
export default PartnerPage;