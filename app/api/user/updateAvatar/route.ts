// Import necessary modules and functions
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
    userId?: string; // Assuming the user ID is passed as a parameter
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error(); // Return an error response if no current user is found
    }

    const { userId } = params;

    if (!userId || typeof userId !== 'string') {
        throw new Error("Invalid ID"); // Throw an error if the user ID is invalid
    }

    const { image } = await request.json(); // Extract the new image path from the request body

    // Update the user's avatar image in the database
    const user = await prisma.user.update({
        where: {
            id: userId, // Use the provided user ID to find the correct user
        },
        data: {
            image, // Set the new image path
        },
    });

    return NextResponse.json(user); // Return the updated user object
}
