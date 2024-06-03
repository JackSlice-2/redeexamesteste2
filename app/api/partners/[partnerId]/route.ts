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