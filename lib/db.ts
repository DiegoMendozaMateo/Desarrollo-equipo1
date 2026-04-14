import { PrismaClient } from "@prisma/client";

// Declaramos el tipo para el objeto global
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Instanciamos o recuperamos la instancia existente
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Si no estamos en producción, guardamos la instancia en globalThis
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;