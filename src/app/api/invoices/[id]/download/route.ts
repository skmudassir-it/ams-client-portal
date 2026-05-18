export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await getCurrentUser();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getCurrentUser();
  if (user instanceof NextResponse) return user;

  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({ where: { id } });

  if (!invoice || invoice.userId !== (user as { id: string }).id) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const content = `
AMS IT Services — Invoice ${invoice.invoiceNumber}
====================================================
Date: ${invoice.issuedDate.toISOString().split("T")[0]}
Due Date: ${invoice.dueDate.toISOString().split("T")[0]}
Status: ${invoice.status.toUpperCase()}
Amount: $${invoice.amount.toFixed(2)}
Description: ${invoice.description}
----------------------------------------------------
Thank you for your business!
  `.trim();

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename="invoice-${invoice.invoiceNumber}.txt"`,
    },
  });
}
