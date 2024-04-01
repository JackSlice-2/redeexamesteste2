import React from 'react'
import getCurrentUser from '../../actions/getCurrentUser'
import ClientOnly from '../../components/ClientOnly';
import EmptyState from '../../components/EmptyState';
import getReservations from '../../actions/getReservations';
import ReservationsClient from './ReservationsClient';

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
  return (
    <ClientOnly>
        <EmptyState 
        title='Unaothorized'
        subtitle='Please Login'
        />
    </ClientOnly>
  );
}
const reservations = await getReservations({
    authorId: currentUser.id
})

if (reservations.length === 0) {

    return (
        <ClientOnly>
            <EmptyState 
            title='No Reseervations found'
            subtitle='Looks like you have no resevatios yet'
            />
        </ClientOnly>
        )
    }


return (
    <ClientOnly>
        <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
        />
    </ClientOnly>
    )
}
export default ReservationsPage
