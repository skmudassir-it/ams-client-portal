import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getServerSession() {
  return auth();
}

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, createdAt: true },
  });
  if (!user) throw new Error("User not found");
  return user;
}

export async function requireAuth() {
  try {
    const user = await getCurrentUser();
    return user;
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
