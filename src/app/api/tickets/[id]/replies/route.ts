import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-utils";

export async function POST(
  request: NextRequest,
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
  const ticket = await prisma.supportTicket.findUnique({ where: { id } });

  if (!ticket || ticket.userId !== (user as { id: string }).id) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  const body = await request.json();
  const { message } = body;

  if (!message || message.trim().length === 0) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const [reply] = await prisma.$transaction([
    prisma.ticketReply.create({
      data: { ticketId: id, userId: user.id, message: message.trim() },
    }),
    prisma.supportTicket.update({
      where: { id },
      data: { updatedAt: new Date() },
    }),
  ]);

  return NextResponse.json(reply, { status: 201 });
}
