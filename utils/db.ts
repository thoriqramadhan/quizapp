import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {prisma: PrismaClient}
export const prisma = globalForPrisma.prisma ||
new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Opsional: untuk debugging
});

export async function disconnectPrisma() {
    try {
      console.log("Disconnecting Prisma...");
      await prisma.$disconnect();
      console.log("Disconnected successfully.");
    } catch (err) {
      console.error("Error while disconnecting Prisma:", err);
    }
  }
  