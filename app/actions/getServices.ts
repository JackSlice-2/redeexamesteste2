import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  payNow?: boolean;
  payThere?: boolean;
  firstComeFirstServe?: boolean;
  byAppointmentOnly?: boolean;
  dates?: string[];
  locationValue?: string;
  latlng?: String[];
  category?: string;
  company?: string;
  startTime?: string;
  endTime?: string;
  title?: string
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      payNow,
      payThere,
      firstComeFirstServe,
      byAppointmentOnly,
      dates,
      locationValue,
      latlng,
      category,
      company,
      title,
      startTime,
      endTime
    } = params;

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (company) {
      query.company = company;
    }

    if (title) {
      query.title = title;
    }    

    if (payNow) {
      query.payNow = payNow;
    }

    if (payThere) {
      query.payThere = payThere;
    }

    if (startTime) {
      query.startTime = startTime;
    }

    if (endTime) {
      query.endTime = endTime;
    }

    if (firstComeFirstServe) {
      query.firstComeFirstServe = firstComeFirstServe;
    }

    if (byAppointmentOnly) {
      query.byAppointmentOnly = byAppointmentOnly;
    }

    if (dates) {
      query.dates = {
        hasSome: dates
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (latlng) {
      query.latlng = latlng;
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