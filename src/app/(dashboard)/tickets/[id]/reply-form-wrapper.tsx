"use client";

import { useRouter } from "next/navigation";
import { TicketReplyForm } from "@/components/tickets/ticket-reply-form";

export function TicketReplyFormWrapper({ ticketId }: { ticketId: string }) {
  const router = useRouter();
  return <TicketReplyForm ticketId={ticketId} onReplyAdded={() => router.refresh()} />;
}
