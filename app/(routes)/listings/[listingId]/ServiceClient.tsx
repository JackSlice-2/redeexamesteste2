"use client";

import Container from '@/app/components/Container';
import Header from '@/app/components/listings/Header';
import ServiceInfo from '@/app/components/listings/ServiceInfo';
import Calendar from '@/app/components/listings/Calendar';
import { categories } from '@/app/components/navbar/Categories';
import { SafeListing, SafeUser } from '@/app/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast';
import { BiPencil, BiTrash } from 'react-icons/bi';
import Button from '@/app/components/Button';

interface ListingClientProps {
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionId?: string;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    disabled,
}) => {

    const router = useRouter();

    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
      setDeletingId(id);
  
      axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Serviço Apagado com Sucesso');
        router.push("/")
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setDeletingId('');
      })
    }, [router]);

    const category = useMemo(() => {
        return categories.find((item) =>
        item.label === listing.category);
    }, [listing.category]);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled) {
            return;
        }
      
        const confirmed = window.confirm("Clique em OK para Apagar e clique em CANCEL para voltar");
        if (confirmed) {
            onCancel(listing.id); 
        }
      }, [disabled, listing, onCancel]);

  return (
        <Container>
            <div className="max-w-screen-lg mx-auto mt-20">
                <div className="flex flex-col gap-6">
                    <Header
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    //@ts-ignore
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                    floppyDiskButton
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ServiceInfo
                        startTime={listing.startTime || 'No Start Time'}
                        endTime={listing.endTime || 'No End Time'}
                        dates={listing.dates}
                        byAppointmentOnly={listing.byAppointmentOnly ?? false}
                        payNow={listing.payNow || 0}
                        payThere={listing.payThere || 0}
                        firstComeFirstServe={listing.firstComeFirstServe ?? false}
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        //@ts-ignore
                        locationValue={listing.locationValue}
                        latlng={listing.latlng}
                        title={listing.title}
                        company={listing.company || ''}
                        currentUser={currentUser}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <Calendar
                            endTime={listing.endTime || 'No End Time'}
                            dates={listing.dates}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {currentUser &&
            <>
            <div className='mb-3'>
            <Button
                    label="Editar Serviço"
                    icon={BiPencil}
                    green
                    onClick={() => router.push(`/editService/${listing.id}`)}
                    />
                    </div>
            <div className='mt-3'>
            <Button
            disabled={disabled}
            label="Apagar Serviço"
            onClick={handleCancel}
            red
            icon={BiTrash}
            />
            </div>
            </>
        }
        </Container>
  )
}

export default ListingClient
