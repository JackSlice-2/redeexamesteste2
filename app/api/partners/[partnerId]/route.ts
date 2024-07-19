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

    const { title, imageSrc, cities, branchPhone, phone, whatsApp, telegram, email, address } = await request.json();

    //for use when branchAddress[] recives the updates cityName
        //const cityNames = cities.map((city:any) => city.label);

        const branchPhoneString = branchPhone.map((PhoneObj:any) => PhoneObj.phoneNumber);

        const serializedUpdatedCities = cities.map(JSON.stringify);


    const partner = await prisma.partner.update({
        where: {
            id: partnerId,
            userId: currentUser.id
        },
        data: {
            title,
            imageSrc,
            email,
            branchPhone: {
                set: branchPhoneString,
              },
            phone,
            whatsApp,
            telegram,
            address,
            cities: {
                set: serializedUpdatedCities,
              }
        }
    });

    return NextResponse.json(partner);
}
