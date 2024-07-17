import prisma from "@/app/libs/prismadb";

export interface IPartnersParams {
  userId?: string;
  title?: string;
  description?: string;
  branchPhone?: string[];
  address?: string;
  phone?: string;
  email?: string;
  whatsApp?: string;
  telegram?: string;
  branchAddress?: string;
}

export default async function getPartners(
  params: IPartnersParams
) {
  try {
    const {
      title,
      branchPhone,
      address,
      phone,
      email,
      whatsApp,
      telegram,
      branchAddress,
    } = params;

    let query: any = {};

    if (title) {
      query.title = title;
    }
    if (branchPhone) {
      query.branchPhone = branchPhone;
    }
    if (address) {
      query.address = address;
    }
    if (phone) {
      query.phone = phone;
    }
    if (email) {
      query.email = email;
    }
    if (whatsApp) {
      query.whatsApp = whatsApp;
    }
    if (telegram) {
      query.telegram = telegram;
    }
    if (branchAddress) {
      query.branchAddress = branchAddress;
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
