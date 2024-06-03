import { Listing, Partner, User } from "@prisma/client";

export type SafeListing = Omit<
Listing,
'createdAt'
> & {
    createdAt: string;
};

export type SafeUser = Omit<
User,
'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null
};

export type SafePartner = Omit<
Partner,
'createdAt'
> & {
    createdAt: string;
};