import { PrismaClient } from "@prisma/client";

/** Singleton Connection */
export const prismaService: PrismaClient = new PrismaClient();
