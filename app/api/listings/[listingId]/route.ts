import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';

interface IParams {
    listingId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId != 'string') {
        throw new Error("Invalid ID");
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}



export async function PATCH(request: Request, { params }: { params: IParams }) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.error();
        }

        const { listingId } = params;

        if (!listingId || typeof listingId !== 'string') {
            throw new Error("Invalid ID");
        }

        const { title, description, imageSrc, category, company, payNow, payThere, firstComeFirstServe, byAppointmentOnly, startTime, endTime } = await request.json();

        // Additional validation of request body can go here

        const listing = await prisma.listing.update({
            where: {
                id: listingId,
                userId: currentUser.id,
            },
            data: {
                title,
                description,
                imageSrc,
                category,
                company,
                payNow,
                payThere,
                startTime,
                endTime,
                firstComeFirstServe,
                byAppointmentOnly,
                userId: currentUser.id,
            },
        });

        return NextResponse.json(listing);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
