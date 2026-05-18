export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();

    const [totalInvoices, unpaidInvoices, openTickets, resolvedTickets] =
      await Promise.all([
        prisma.invoice.count({ where: { userId: user.id } }),
        prisma.invoice.count({
          where: { userId: user.id, status: { not: "paid" } },
        }),
        prisma.supportTicket.count({
          where: { userId: user.id, status: { in: ["open", "in_progress"] } },
        }),
        prisma.supportTicket.count({
          where: {
            userId: user.id,
            status: { in: ["resolved", "closed"] },
          },
        }),
      ]);

    return NextResponse.json({
      totalInvoices,
      unpaidInvoices,
      openTickets,
      resolvedTickets,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Not authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
