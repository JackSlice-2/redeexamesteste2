'use client';

import React, { useCallback, useMemo, useState } from 'react'
import Modal from './Modal'
import useSearchModalModal from '@/app/hooks/useSearchModal'
import { useRouter, useSearchParams } from 'next/navigation';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import CountrySelect, { CountrySelectValue } from '../Inputs/CountrySelect';
import qs from 'query-string';
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calendar from '../Inputs/Calendar';
import Counter from '../Inputs/Counter';

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModalModal();

    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setdateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    }, [])

    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, [])

    const onSubmit = useCallback(async () => {
        if (step != STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, [guestCount, bathroomCount, dateRange, router, location, roomCount, onNext, params, step, searchModal])

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'SEARCH';
        }

        return "NEXT"
    }, [step])

    const secondairyActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }

        return "BAKC"
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
            title='Where do you wanna go?'
            subtitle='find the perfect location'
            />
            <CountrySelect 
            value={location}
            onChange={(value) =>
                setLocation(value as CountrySelectValue)
            }
            />
            <hr />
            <Map 
            center={location?.latlng}
            />
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
            title='When do you wanna go?'
            subtitle='find the perfect time'
            />
            <Calendar 
            value={dateRange}
            onChange={(value) => setdateRange(value.selection)}
            />
            </div>
    )
}

    if (step === STEPS.INFO) {
        bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
            title='More Information'
            subtitle='find the perfect place'
            />
            <Counter 
            title="guests"
            subtitle='how many guests are coming?'
            value={guestCount}
            onChange={(value) => setGuestCount(value)}
            />
            <Counter 
            title="rooms"
            subtitle='how many rooms needed?'
            value={roomCount}
            onChange={(value) => setRoomCount(value)}
            />
            <Counter 
            title="bathrooms"
            subtitle='how many bathrooms needed?'
            value={bathroomCount}
            onChange={(value) => setBathroomCount(value)}
            />
            </div>
        )
    }



  return (
    <Modal
    isOpen={searchModal.isOpen}
    onClose={searchModal.onClose}
    onSubmit={onSubmit}
    title='Filters'
    actionLabel={actionLabel}
    secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    secondaryActionLabel={secondairyActionLabel}
    body={bodyContent}
    />
  )
}

export default SearchModal
