import React from 'react'
import ClientOnly from '../../components/ClientOnly';
import EmptyState from '../../components/EmptyState';
import getAllUsers from '../../actions/getAllUsers';
import InactiveServiceClient from './InactiveServiceClient';
import getListings, { IListingsParams } from '@/app/actions/getServices';

interface HomeProps {
  searchParams: IListingsParams;
}

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
        <InactiveServiceClient
        listings={listings}
        users={users}
        />
    </ClientOnly>
)

}

export default ListingPage