import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

function getPrismaClient() {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  
  const client = new PrismaClient({
    log: ["error"],
  });
  
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }
  
  return client;
}

// Lazy initialization — PrismaClient is only created when first accessed
export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop: string | symbol) {
    if (typeof prop !== "string") return undefined;
    const client = getPrismaClient();
    const value = (client as any)[prop];
    if (typeof value === "function") {
      return (...args: any[]) => (value as Function).apply(client, args);
    }
    return value;
  },
}) as PrismaClient;
