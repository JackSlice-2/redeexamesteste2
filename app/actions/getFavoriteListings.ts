import prisma from "@/app/libs/prismadb";
import getAllUsers from "./getAllUsers";

export default async function getFavoriteListings() {
    const users = await getAllUsers();
    const favoriteListings = [];

    for (const user of users) {
        const userFavorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: user.inactiveServiceIds,
                },
            },
        });

        const userFavoritesSafe = userFavorites.map(listing => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }));

        favoriteListings.push(...userFavoritesSafe);
    }

    return favoriteListings;
}