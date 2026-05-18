import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/auth-utils";
import { redirect, notFound } from "next/navigation";
import { TicketDetail } from "@/components/tickets/ticket-detail";
import { TicketReplyList } from "@/components/tickets/ticket-reply-list";
import { TicketReplyFormWrapper } from "./reply-form-wrapper";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const { id } = await params;
  const ticket = await prisma.supportTicket.findUnique({
    where: { id },
    include: {
      replies: {
        orderBy: { createdAt: "asc" },
        include: { user: { select: { name: true } } },
      },
    },
  });

  if (!ticket || ticket.userId !== session.user?.id) notFound();

  return (
    <div className="space-y-6">
      <TicketDetail ticket={ticket as any} />
      <div>
        <h2 className="text-lg font-semibold mb-3">Replies</h2>
        <TicketReplyList replies={ticket.replies as any} />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-3">Add Reply</h2>
        <TicketReplyFormWrapper ticketId={ticket.id} />
      </div>
    </div>
  );
}
