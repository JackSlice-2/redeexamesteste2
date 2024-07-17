import getPartnerById from '@/app/actions/getPartnerById'
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import PartnerClient from './PartnerClient';

interface IParams {
  partnerId?: string;
}

const PartnerPage = async ({ params }: { params: IParams }) => {
  //@ts-ignore
  const partner = await getPartnerById(params);
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
      />
    </ClientOnly>
  )
}

export default PartnerPage
