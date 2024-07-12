'use client';

import React from 'react'
import Container from '../Container'
import { GiWaterDrop } from 'react-icons/gi'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { FaStethoscope } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { HiComputerDesktop } from 'react-icons/hi2';

export const categories = [
    {
        label: 'Consultas Presenciais',
        icon: FaPeopleGroup,
        description: 'Entre em contato para obter o endereço da sua consulta.'
    },
    {
        label: 'Consultas Online',
        icon: HiComputerDesktop,
        description: 'Entre em contato para obter o link da sua consulta.'
    },
    {
        label: 'Exames',
        icon: FaStethoscope,
        description: 'Entre em contato para obter o endereço da sua consulta.'
    },
    {
        label: 'Exames de Sangue',
        icon: GiWaterDrop,
        description: 'Entre em contato para obter o endereço da sua consulta.'
    }
    
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === "/";

    if (!isMainPage) {
        return null;
    }

  return (
    <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto bg-blue-100 rounded-b-3xl">
            {categories.map((item) => (
                <CategoryBox
                    key={item.label}
                    label={item.label}
                    selected={category === item.label}
                    icon={item.icon}
                    />
            ))}
        </div>
    </Container>
  )
}

export default Categories
