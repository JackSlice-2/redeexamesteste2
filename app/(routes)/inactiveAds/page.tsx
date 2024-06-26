import React from 'react'
import ClientOnly from '../../components/ClientOnly';
import EmptyState from '../../components/EmptyState';
import getFavoriteListings from '../../actions/getFavoriteListings';
import getAllUsers from '../../actions/getAllUsers';
import FavoritesClient from './InactiveAdsClient';

const ListingPage = async () => {
    const listings = await getFavoriteListings();
    const users = await getAllUsers();

    if (listings.length === 0) {
        
  return (
    <ClientOnly>
        <EmptyState 
        title='Nenhum Anuncio Inativo Encontrado'
        subtitle='Todos os anuncios estão ativos.'
        />
    </ClientOnly>
  )
}

return (
    <ClientOnly>
        <FavoritesClient
        listings={listings}
        users={users}
        />
    </ClientOnly>
)

}

export default ListingPage