import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  cachedClient: PrismaClient | undefined;
};

let _client: PrismaClient | undefined;

function getClient() {
  if (!_client) {
    _client = globalForPrisma.cachedClient ?? new PrismaClient({
      log: ["error"],
    });
  }
  return _client;
}

// Lazy — PrismaClient only created on first property access at runtime
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getClient();
    const val = (client as Record<string, unknown>)[prop as string];
    if (typeof val === "function") {
      return val.bind(client);
    }
    return val;
  },
});
