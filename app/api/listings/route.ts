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
        description,
        imageSrc,
        category,
        company,
        payNow,
        payThere,
        firstComeFirstServe,
        byAppointmentOnly,
        dates,
        location,
    } = body;
 
    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            company,
            payNow,
            payThere,
            firstComeFirstServe,
            byAppointmentOnly,
            dates: {
                set: dates
            },
            locationValue: location.value,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)
}