'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
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
            category: label
        }
        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }
    const url = qs.stringifyUrl({
            url: "/",
            query: updatedQuery
        }, {skipNull: true})
        router.push(url)
    }, [label, params, router]);

  return (
    <div 
    onClick={handleClick}
    className={`
    flex flex-col items-center justify-center gap-3 p-3 border-b-2 transition cursor-pointer hover:text-blue-800 hover:font-semibold
    ${selected ? 'border-b-blue-600' : 'border-transparent'}
    ${selected ? 'text-blue-600' : 'text-blue-400'}
    `}>
      <Icon size={30} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  )
}

export default CategoryBox
