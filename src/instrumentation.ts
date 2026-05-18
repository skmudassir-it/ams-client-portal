import { PrismaClient } from "@prisma/client";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const prisma = new PrismaClient();

    try {
      const { execSync } = await import("child_process");
      execSync("npx prisma db push --skip-generate --accept-data-loss", {
        env: { ...process.env },
        stdio: "pipe",
      });
      console.log("✅ Database schema pushed successfully");
    } catch (e) {
      console.error("⚠️ Database push failed:", (e as Error).message);
    } finally {
      await prisma.$disconnect();
    }
  }
}
