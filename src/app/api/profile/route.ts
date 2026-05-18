export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-utils";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (user instanceof NextResponse) return user;
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (user instanceof NextResponse) return user;

    const { name, email } = await request.json();
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { name, email },
      select: { id: true, name: true, email: true },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
