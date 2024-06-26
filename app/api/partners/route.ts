import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json();
    const {
        title,
        imageSrc,
        cnpj,
        phone,
        whatsApp,
        telegram,
        email,
        address,
        city,
        website
    } = body;
 
    const partner = await prisma.partner.create({
        data: {
            title,
            imageSrc,
            userId: currentUser.id,
            cnpj,
            phone,
            whatsApp,
            telegram,
            email,
            address,
            city,
            website
        }
    })

    return NextResponse.json(partner)
}