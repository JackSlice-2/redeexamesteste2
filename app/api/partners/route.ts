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
        branchPhone,
        phone,
        whatsApp,
        telegram,
        email,
        address,
        branchAddress
    } = body;

    const citiesArray = Array.isArray(branchAddress)? branchAddress : [branchAddress];
    const branchPhoneArray = Array.isArray(branchPhone)? branchPhone : [branchPhone];

 
    const partner = await prisma.partner.create({
        data: {
            title,
            imageSrc,
            userId: currentUser.id,
            branchPhone: {
                set: branchPhoneArray.map(branchPhoneObj => branchPhoneObj.value)
            },
            phone,
            whatsApp,
            telegram,
            email,
            address,
            branchAddress: {
                set: citiesArray.map(branchAddress => branchAddress.value)
            }
        }
    })

    return NextResponse.json(partner)
}