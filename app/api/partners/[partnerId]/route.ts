import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';

interface IParams {
    partnerId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error();
    }

    const { partnerId } = params;

    if (!partnerId || typeof partnerId != 'string') {
        throw new Error("Invalid ID");
    }

    const partner = await prisma.partner.deleteMany({
        where: {
            id: partnerId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(partner);
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { partnerId } = params;

    if (!partnerId || typeof partnerId !== 'string') {
        throw new Error("Invalid ID");
    }

    const { title, imageSrc, cities, cnpj, phone, whatsApp, telegram, email, address, website } = await request.json();

    const cityNames = cities.map((city:any) => city.label);


    const partner = await prisma.partner.update({
        where: {
            id: partnerId,
            userId: currentUser.id
        },
        data: {
            title,
            imageSrc,
            cnpj,
            phone,
            whatsApp,
            telegram,
            email,
            address,
            website,
            cities: {
                set: cityNames,
              }
        }
    });

    return NextResponse.json(partner);
}
