import React from 'react'
import ClientOnly from '../../components/ClientOnly';
import EmptyState from '../../components/EmptyState';
import getAllUsers from '../../actions/getAllUsers';
import getListings, { IListingsParams } from '@/app/actions/getServices';
import Container from '@/app/components/Container';
import Header from '@/app/components/Database/Header';
import ServiceCard from '@/app/components/Database/ServiceCard';
import { SafeUser } from '@/app/types';

interface HomeProps {
  searchParams: IListingsParams;
}

export const dynamic = "force-dynamic";

const ListingPage = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const users = await getAllUsers();

  if (listings.length === 0) {        
  return (
    <ClientOnly>
        <EmptyState 
        title='Nenhum Serviço Inativo Encontrado'
        subtitle='Todos os Serviços estão ativos.'
        />
    </ClientOnly>
  )
}

  return (
    <ClientOnly>
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
    </ClientOnly>
  )
}

export default ListingPage