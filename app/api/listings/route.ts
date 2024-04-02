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
        hours
    } = body;

    const hoursArray = Array.isArray(hours) ? hours : [hours];
    const datesArray = Array.isArray(dates) ? dates : [dates];

 
    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            company,
            payNow,
            payThere,
            hours:{
                set: hoursArray
            },
            firstComeFirstServe,
            byAppointmentOnly,
            dates: {
                set: datesArray
            },
            locationValue: location.value,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)
}