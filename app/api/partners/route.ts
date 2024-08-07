import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {return NextResponse.error();
    };
    const body = await request.json();
    const {
        title,
        imageSrc,
        branchPhone,
        phone,
        whatsApp,
        phone2,
        email,
        address,
        mainCity,
        cities
    } = body;

    const citiesArray = Array.isArray(cities)? cities : [cities];
    const branchPhoneArray = Array.isArray(branchPhone)? branchPhone : [branchPhone];
    const branchAddressArray = Array.isArray(mainCity)? mainCity : [mainCity];

 
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
            phone2,
            email,
            address,
            mainCity: {
                set: branchAddressArray.map(branchAddressObj => branchAddressObj.value)
            },
            cities: {
                set: citiesArray.map(cityObj => cityObj.value)
            }
        }
    })

    return NextResponse.json(partner)
}