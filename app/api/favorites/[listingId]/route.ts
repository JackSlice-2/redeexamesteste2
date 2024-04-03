import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const { listingId } = params;
 
  if (!listingId || typeof listingId !== 'string') {
     throw new Error('Invalid ID');
  }
 
  // Fetch all users
  const users = await prisma.user.findMany();
 
  // Iterate over all users and update their favoriteIds
  for (const user of users) {
     let favoriteIds = [...(user.favoriteIds || [])];
     favoriteIds.push(listingId);
 
     await prisma.user.update({
       where: {
         id: user.id
       },
       data: {
         favoriteIds
       }
     });
  }
 
  // Return a response indicating success
  return NextResponse.json({ message: 'Listing added to favorites for all users.' });
 }
 

 export async function DELETE(request: Request, { params }: { params: IParams }) {
  const { listingId } = params;
 
  if (!listingId || typeof listingId !== 'string') {
     throw new Error('Invalid ID');
  }
 
  // Fetch all users
  const users = await prisma.user.findMany();
 
  // Iterate over all users and update their favoriteIds
  for (const user of users) {
     let favoriteIds = [...(user.favoriteIds || [])];
     favoriteIds = favoriteIds.filter((id) => id !== listingId);
 
     await prisma.user.update({
       where: {
         id: user.id
       },
       data: {
         favoriteIds
       }
     });
  }
 
  // Return a response indicating success
  return NextResponse.json({ message: 'Listing removed from favorites for all users.' });
 }
 