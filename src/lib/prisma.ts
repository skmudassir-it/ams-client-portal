import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// PrismaClient is created lazily at first use to avoid build-time errors
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({ log: ["error"] });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (globalForPrisma.prisma as any)[prop];
    return typeof value === "function" ? value.bind(globalForPrisma.prisma) : value;
  },
});
