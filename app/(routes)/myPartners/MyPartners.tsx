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
        description: 'Informaçoes Basicas da Empresa Parceira',
        cnpj: '01.001.001/0000-01',
        city: 'São Paulo',
        address: 'Rua dos Bobos, 1  - São Paulo - SP',
        phone: '(11) 1000-1000',
        email: 'sidi@sidi.com.br',
        whatsApp: '(11) 1000-1000',
        telegram: '(11) 1000-1000',
        website: 'sidi.com.br',
    },
    {
        label: 'IMI',
        imageSrc: '/images/IMI.jpg',
        description: 'Informaçoes Basicas da Empresa Parceira',
        cnpj: '02.002.002/0000-02',
        address: 'Rua dos Bobos, 2  - São Paulo - SP',
        city: 'São Paulo',
        phone: '(22) 2000-2000',
        email: 'imi@imi.com.br',
        whatsApp: '(22) 2000-2000',
        telegram: '(22) 2000-2000',
        website: 'imi.com.br',
    },
    {
        label: 'JJ',
        imageSrc: '/images/JJ.jpeg',
        description: 'Informaçoes Basicas da Empresa Parceira',
        cnpj: '03.003.003/0000-03',
        address: 'Rua dos Bobos, 3  - São Paulo - SP',
        city: 'São Paulo',
        phone: '(33) 3000-3000',
        email: 'jj@jj.com.br',
        whatsApp: '(33) 3000-3000',
        telegram: '(33) 3000-3000',
        website: 'jj.com.br',
    },
    {
        label: 'Rede Saude',
        imageSrc: '/images/vida.png',
        description: 'Informaçoes Basicas da Empresa Parceira',
        cnpj: '04.004.004/0000-04',
        address: 'Rua dos Bobos, 4  - São Paulo - SP',
        city: 'São Paulo',
        phone: '(44) 4000-4000',
        email: 'redesaude@redesaude.com.br',
        whatsApp: '(44) 4000-4000',
        telegram: '(44) 4000-4000',
        website: 'redesaude.com.br',
    },
    {
        label: 'SUS',
        imageSrc: '/images/sus.png',
        description: 'Informaçoes Basicas da Empresa Parceira',
        cnpj: '05.005.005/0000-05',
        address: 'Rua dos Bobos, 5  - São Paulo - SP',
        city: 'São Paulo',
        phone: '(55) 5000-5000',
        email: 'sus@sus.com.br',
        whatsApp: '(55) 5000-5000',
        telegram: '(55) 5000-5000',
        website: 'sus.com.br',
    },
    {
        label: 'Laboratorio',
        imageSrc: '/images/clicul.jpeg',
        description: 'Informaçoes Basicas da Empresa Parceira',
        cnpj: '06.006.006/0000-06',
        address: 'Rua dos Bobos, 6  - São Paulo - SP',
        city: 'São Paulo',
        phone: '(66) 6000-6000',
        email: 'laboratorio@laboratorio.com.br',
        whatsApp: '(66) 6000-6000',
        telegram: '(66) 6000-6000',
        website: 'laboratorio.com.br',
    },
    {
        label: 'Rede Exames',
        imageSrc: '/images/sbcm.jpeg',
        description: 'Informaçoes Basicas da Empresa Parceira',
        cnpj: '07.007.007/0000-07',
        address: 'Rua dos Bobos, 7  - São Paulo - SP',
        city: 'São Paulo',
        phone: '(77) 7000-7000',
        email: 'redeexames@redeexames.com.br',
        whatsApp: '(77) 7000-7000',
        telegram: '(77) 7000-7000',
        website: 'redeexames.com.br',
    },
    {
        label: 'SOS',
        imageSrc: '/images/SOS.png',
        description: 'Informaçoes Basicas da Empresa Parceira',
        cnpj: '08.008.008/0000-08',
        address: 'Rua dos Bobos, 8  - São Paulo - SP',
        city: 'São Paulo',
        phone: '(88) 8000-8000',
        email: 'sos@sos.com.be',
        whatsApp: '(88) 8000-8000',
        telegram: '(88) 8000-8000',
        website: 'sos.com.br',
    },
    {
        label: 'Hospital de Clinicas',
        imageSrc: '/images/rs.jpeg',
        description: 'Informaçoes Basicas da Empresa Parceira',
        cnpj: '09.009.009/0000-09',
        address: 'Rua dos Bobos, 9  - São Paulo - SP',
        city: 'São Paulo',
        phone: '(99) 9000-9000',
        email: 'hospitaldeclinicas@hospitaldeclinicas.com.br',
        whatsApp: '(99) 9000-9000',
        telegram: '(99) 9000-9000',
        website: 'hospitaldeclinicas.com.br',
    },
    {
        label: 'Hospital Pronto Socorro',
        imageSrc: '/images/HPS.jpg',
        description: 'Informaçoes Basicas da Empresa Parceira',
        cnpj: '10.010.010/0000-10',
        address: 'Rua dos Bobos, 10  - São Paulo - SP',
        city: 'São Paulo',
        phone: '(10) 1000-1000',
        email: 'hospitalprontosocorro@hospitalprontosocorro.com.br',
        whatsApp: '(10) 1000-1000',
        telegram: '(10) 1000-1000',
        website: 'hospitalprontosocorro.com.br',
    },
    {
        label: 'UBS',
        imageSrc: '/images/UBS.png',
        description: 'Informaçoes Basicas da Empresa Parceira',
        cnpj: '11.011.011/0000-11',
        address: 'Rua dos Bobos, 11  - São Paulo - SP',
        city: 'São Paulo',
        phone: '(11) 1100-1100',
        email: 'ubs@ubs.com.br',
        whatsApp: '(11) 1100-1100',
        telegram: '(11) 1100-1100',
        website: 'ubs.com.br',
    },
    {
        label: 'Hells Pass Hospital',
        imageSrc: '/images/hell.webp',
        description: 'Informaçoes Basicas da Empresa Parceira',
        cnpj: '12.012.012/0000-12',
        address: 'Rua dos Bobos, 12  - São Paulo - SP',
        city: 'São Paulo',
        phone: '(12) 1200-1200',
        email: 'hellspasshosplital@hellspasshospital.com.br',
        whatsApp: '(12) 1200-1200',
        telegram: '(12) 1200-1200',
        website: 'hellspasshospital.com.br',
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
                        description='Informaçoes Basicas da Empresa Parceira'
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
