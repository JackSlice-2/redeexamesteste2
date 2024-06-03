import prisma from "@/app/libs/prismadb";

export interface IPartnersParams {
  userId?: string;
  title?: string;
}

export default async function getPartners(
  params: IPartnersParams
) {
  try {
    const {
      title
    } = params;

    let query: any = {};

    if (title) {
      query.title = title;
    }
    const partners = await prisma.partner.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safePartners = partners.map((partner) => ({
      ...partner,
      createdAt: partner.createdAt.toISOString(),
    }));

    return safePartners;
  } catch (error: any) {
    throw new Error(error);
  }
}
