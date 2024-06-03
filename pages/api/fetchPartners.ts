import prisma from '@/app/libs/prismadb';

export default async function handler(req:any, res:any) {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safePartners = partners.map((partner) => ({
     ...partner,
      createdAt: partner.createdAt.toISOString(),
    }));

    res.status(200).json(safePartners);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch partners' });
  }
}
