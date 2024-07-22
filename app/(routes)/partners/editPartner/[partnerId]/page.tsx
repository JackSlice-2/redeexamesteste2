import getCurrentUser from '@/app/actions/getCurrentUser';
import getPartnerById from '@/app/actions/getPartnerById'
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import PartnerClient from './EditPartnerClient';

interface IParams {
  partnerId?: string;
}

const PartnerPage = async ({ params }: { params: IParams }) => {
  //@ts-ignore
  const partner = await getPartnerById(params);
  const currentUser = await getCurrentUser();
  if (!partner) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <PartnerClient
      partner={partner}
      currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default PartnerPage
