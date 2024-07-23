import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import UserClient from './EditUserClient';

interface IParams {
  partnerId?: string;
}

const PartnerPage = async ({ params }: { params: IParams }) => {
  //@ts-ignore
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <UserClient
      currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default PartnerPage
