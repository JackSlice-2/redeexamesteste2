'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import React, { useCallback } from 'react'

interface CompanyBoxProps {
    imageSrc?: string;
    label: string;
    selected?: boolean;
}

const CompanyBox: React.FC<CompanyBoxProps> = ({
    imageSrc,
    label,
    selected
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

    const updatedQuery: any = {
            ...currentQuery,
            company: label
        }

        if (params?.get('company') === label) {
            delete updatedQuery.company;
        }

    const url = qs.stringifyUrl({
            url: "/myPartners",
            query: updatedQuery
        }, {skipNull: true})

        router.push(url)
    }, [label, params, router]);

  return (
    <div 
    onClick={handleClick}
    className={`
    flex flex-col items-center justify-center gap-3 p-3 border-2 transition cursor-pointer rounded-lg 
    hover:border-blue-400 hover:text-blue-600 hover:bg-blue-100 
    ${selected ? 'border-b-blue-600' : 'border-transparent'}
    ${selected ? 'text-blue-600' : 'text-blue-400'}
    `}>
      {imageSrc && 
        <Image src={imageSrc} alt={label} width={60} height={60} />}
          <div className="font-medium text-sm">
            {label}
          </div>
    </div>
  )
}

export default CompanyBox
