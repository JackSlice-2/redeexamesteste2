'use client';

import React from 'react'
import Container from '../../components/Container'
import CompanyBox from '../../components/PartnerBox'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Button from '@/app/components/Button';
import PartnerInfo from '@/app/components/listings/PartnerInfo';

export const companies = [
    {
        label: 'SIDI',
        imageSrc: '/images/sidi.png',
        description: 'Entre em contato para obter o endereço da sua consulta.'
    },
    {
        label: 'IMI',
        imageSrc: '/images/IMI.jpg',
        description: 'Entre em contato para obter o link da sua consulta.'
    },
    {
        label: 'JJ',
        imageSrc: '/images/JJ.jpeg',
        description: 'Entre em contato para obter o endereço da sua consulta.'
    },
    {
        label: 'Rede Saude',
        imageSrc: '/images/vida.png',
        description: 'Entre em contato para obter o endereço da sua consulta.'
    },
    {
        label: 'SUS',
        imageSrc: '/images/sus.png',
        description: 'Entre em contato para obter o endereço da sua consulta.'
    },
    {
        label: 'Laboratorio',
        imageSrc: '/images/clicul.jpeg',
        description: 'Entre em contato para obter o endereço da sua consulta.'
    },
    {
        label: 'Rede Exames',
        imageSrc: '/images/sbcm.jpeg',
        description: 'Entre em contato para obter o endereço da sua consulta.'
    },
    {
        label: 'SOS',
        imageSrc: '/images/SOS.png',
        description: 'Entre em contato para obter o endereço da sua consulta.'
    },
    {
        label: 'Hospital de Clinicas',
        imageSrc: '/images/rs.jpeg',
        description: 'Entre em contato para obter o endereço da sua consulta.'
    },
    {
        label: 'Hospital Pronto Socorro',
        imageSrc: '/images/HPS.jpg',
        description: 'Entre em contato para obter o endereço da sua consulta.'
    },
    {
        label: 'UBS',
        imageSrc: '/images/UBS.png',
        description: 'Entre em contato para obter o endereço da sua consulta.'
    },
    {
        label: 'Hells Pass Hospital',
        imageSrc: '/images/hell.webp',
        description: 'Entre em contato para obter o endereço da sua consulta.'
    },
    
]

const Company = () => {
    const router = useRouter();
    const params = useSearchParams();
    const company = params?.get('company');
    const pathname = usePathname();

    const isMainPage = pathname === "/myPartners" && !company;

    return (
        <Container>
            {!isMainPage && (
                <>
                    <PartnerInfo
                        description='Entre em contato para obter o endereço da sua consulta.'
                        companies={companies.find((item) => item.label === company)}
                        locationValue='Brazil'
                    />

                    <Button 
                        label='Voltar'
                        onClick={() => router.push('/myPartners')}
                        small
                    />
                </>
                )
            }
            {isMainPage && (
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto">
                {companies.map((item) => (
                    <CompanyBox
                        key={item.label}
                        label={item.label}
                        selected={company === item.label}
                        imageSrc={item.imageSrc}
                        />
                ))}
            </div>
            )
        }
        </Container>
      )
    }

export default Company
