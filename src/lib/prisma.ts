import { PrismaClient } from '@prisma/client';
import { dev } from '$app/environment';

// Singleton pattern pour éviter les multiples connexions en développement
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (dev) globalForPrisma.prisma = prisma;