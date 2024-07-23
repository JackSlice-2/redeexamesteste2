import prisma from "@/app/libs/prismadb"
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email,
        name,
        password,
        role,
        isAdmin,
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
            role,
            isAdmin,
        }
    });

    return NextResponse.json(user);
}