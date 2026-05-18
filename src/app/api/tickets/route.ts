export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-utils";

export async function GET(request: NextRequest) {
  try {
    await getCurrentUser();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getCurrentUser();
  if (user instanceof NextResponse) return user;

  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = { userId: user.id };
  if (status && status !== "all") where.status = status;
  if (category && category !== "all") where.category = category;
  if (search) {
    where.OR = [{ subject: { contains: search } }, { description: { contains: search } }];
  }

  const [tickets, total] = await Promise.all([
    prisma.supportTicket.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.supportTicket.count({ where }),
  ]);

  const plainTickets = tickets.map((t) => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }));

  return NextResponse.json({
    tickets: plainTickets,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

export async function POST(request: NextRequest) {
  try {
    await getCurrentUser();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getCurrentUser();
  if (user instanceof NextResponse) return user;

  const body = await request.json();
  const { category, subject, description, priority } = body;

  if (!subject || !description || !category) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const ticket = await prisma.supportTicket.create({
    data: {
      userId: user.id,
      category,
      subject,
      description,
      priority: priority || "normal",
    },
  });

  return NextResponse.json(ticket, { status: 201 });
}
