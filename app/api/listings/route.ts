import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new Response(JSON.stringify({ error: "No current user" }), { status: 401 });
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
            latlng,
            startTime,
            endTime
        } = body;

        const datesArray = Array.isArray(dates)? dates : [dates];
        const latlngArray = Array.isArray(latlng)? latlng : [latlng];

        const listing = await prisma.listing.create({
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
                latlng: {
                    set: latlngArray
                },
                dates: {
                    set: datesArray
                },
                locationValue: location.value,
                userId: currentUser.id
            }
        })

        return new Response(JSON.stringify(listing), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
