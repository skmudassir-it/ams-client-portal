import { getServerSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { TicketForm } from "@/components/tickets/ticket-form";

export default async function NewTicketPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return <TicketForm />;
}
