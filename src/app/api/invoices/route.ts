export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-utils";
import { invoiceSchema } from "@/lib/validations";

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
  const search = searchParams.get("search");

  const where: Record<string, unknown> = { userId: user.id };
  if (status && status !== "all") where.status = status;
  if (search) {
    where.OR = [
      { invoiceNumber: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const [invoices, total] = await Promise.all([
    prisma.invoice.findMany({
      where,
      orderBy: { issuedDate: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.invoice.count({ where }),
  ]);

  return NextResponse.json({
    invoices,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
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
  const result = invoiceSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const { invoiceNumber, amount, currency, status, dueDate, description } = result.data;

  // Check for duplicate invoice number
  const existing = await prisma.invoice.findUnique({ where: { invoiceNumber } });
  if (existing) {
    return NextResponse.json(
      { error: "An invoice with this number already exists" },
      { status: 409 }
    );
  }

  const invoice = await prisma.invoice.create({
    data: {
      userId: user.id,
      invoiceNumber,
      amount,
      currency,
      status,
      issuedDate: new Date(),
      dueDate: new Date(dueDate),
      description,
    },
  });

  return NextResponse.json(invoice, { status: 201 });
}
