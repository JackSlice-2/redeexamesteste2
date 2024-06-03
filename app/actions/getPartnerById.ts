import prisma from '@/app/libs/prismadb'

interface IParams {
    partnerId: string
}

export default async function getPartnerById (
    params: IParams
) { 
    try {
        const { partnerId } = params;

        const partner = await prisma.partner.findUnique({
            where: {
                id: partnerId
            },
            include: {
                user: true
            }
        });

        if (!partner) {
            return null
        }

        return {
            ...partner,
            createdAt: partner.createdAt.toISOString(),
            user: {
                ...partner.user,
                createdAt: partner.user.createdAt.toISOString(),
                updatedAt: partner.user.updatedAt.toISOString(),
                emailVerified: partner.user.emailVerified?.toISOString() || null,
            }
        }
    } catch (error: any) {
        throw new Error(error);
    }
}