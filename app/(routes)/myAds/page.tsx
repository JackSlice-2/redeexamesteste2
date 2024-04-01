import React from 'react'
import getCurrentUser from '../../actions/getCurrentUser';
import ClientOnly from '../../components/ClientOnly';
import EmptyState from '../../components/EmptyState';
import PropertiesClient from './AdsClient';
import getListings from '../../actions/getListings';

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                title='Unothorized'
                subtitle='Please Login'
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    })

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                title='No properties Found'
                subtitle='Looks like you havent made an ad'
                />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <PropertiesClient
        listing={listings}
        currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default PropertiesPage
