import getListings from "@/app/actions/getServices";
import getCurrentUser from "../../actions/getCurrentUser";
import getPartners, { IPartnersParams } from "../../actions/getPartners";
import ClientOnly from "../../components/ClientOnly";
import Container from "../../components/Container";
import EmptyState from "../../components/EmptyState";
import SettingsClient from "./SettingsClient";
import getAllUsers from "@/app/actions/getAllUsers";

interface PartnerPageProps {
  searchParams: IPartnersParams
}

export const dynamic = 'force-dynamic';

const PartnerPage = async ({ searchParams }: PartnerPageProps) => {
  const partners = await getPartners(searchParams);
  const currentUser = await getCurrentUser();
  const services = await getListings(searchParams);
  const users = await getAllUsers();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
          <div className="mt-10 rounded-xl bg-slate-300 p-4">
            <SettingsClient
            users={users}
            currentUser={currentUser}
            partners={partners.length}
            services={services.length}
            />
          </div>
      </Container>
    </ClientOnly>
  );
}
export default PartnerPage;