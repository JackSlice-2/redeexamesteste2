import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  payNow?: boolean;
  payThere?: boolean;
  firstComeFirstServe?: boolean;
  byAppointmentOnly?: boolean;
  hours?: string[];
  dates?: string[];
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
  company?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      payNow,
      payThere,
      firstComeFirstServe,
      byAppointmentOnly,
      hours,
      dates,
      locationValue,
      startDate,
      endDate,
      category,
      company,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (company) {
      query.company = company;
    }

    if (payNow) {
      query.payNow = payNow;
    }

    if (payThere) {
      query.payThere = payThere;
    }

    if (firstComeFirstServe) {
      query.firstComeFirstServe = firstComeFirstServe;
    }

    if (byAppointmentOnly) {
      query.byAppointmentOnly = byAppointmentOnly;
    }

    if (hours) {
      query.hours = {
        hasSome: hours
      }
    }

    if (dates) {
      query.dates = {
        hasSome: dates
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}